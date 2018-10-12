"use strict";

var _config = require("././config/config");

var express = require("express"); // app.js

var bodyParser = require("body-parser");
var passport = require("passport");
var userDetails = require("./routes/userDetails");
var app = express();
var jwt = require("jsonwebtoken");
var url = require("url");
require("./config/passport");
// Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB = _config.dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// middleware routing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  var url_parts = url.parse(req.url);
  if (url_parts.pathname === "/user/login" || url_parts.pathname === "/user/create") {
    return next();
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "Options") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
    return res.status(200).json({});
  }
  var token = req.body.token || req.query.token || req.headers["authorization"];
  if (token) {
    token = jwt.verify(token, _config.key, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Failed to authenticate token.",
          err: err
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

app.use("/user", userDetails);

// default port here
var port = 8080;
app.listen(port, function () {
  console.log("Server is up and running on port numner " + port);
});

// Response for post here
// res.json({
//   message: in case of success true,
//   success : true or false,
//   body : data send from the frontend - revert it back,
//   error : in case of success false,
//   token : only in case of login
// });