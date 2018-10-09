// app.js
import { dev_db_url } from "././config/config";
var express = require("express");
var bodyParser = require("body-parser");

var userDetails = require("./routes/userDetails");
var app = express();

// Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB = dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// middleware routing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", userDetails);

// default route here
app.get("/", (req, res) => {
  res.send("Hello World");
});

// default port here
var port = 8080;
app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
