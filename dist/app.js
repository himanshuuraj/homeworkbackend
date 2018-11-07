"use strict";

var _config = require("././config/config");

var express = require("express"); // app.js

var cors = require("cors");
var bodyParser = require("body-parser");
var parentDetails = require("./routes/parentDetails");
var studentDetails = require("./routes/studentDetails");
var teacherDetails = require("./routes/teacherDetails");
var homeworkDetails = require("./routes/homeworkDetails");
var classAndSectionDetails = require("./routes/classAndSectionDetails");
var subjectDetails = require("./routes/subjectDetails");
var studentHomeworkDetails = require("./routes/studentHomeworkDetails");
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
app.use(cors());
// app.use((req, res, next) => {
//   var url_parts = url.parse(req.url);
//   if (
//     url_parts.pathname === "/parent/login" ||
//     url_parts.pathname === "/parent/create"
//   ) {
//     return next();
//   }
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   if (req.method === "Options") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
//     return res.status(200).json({});
//   }
//   var token = req.body.token || req.query.token || req.headers["authorization"];
//   if (token) {
//     token = jwt.verify(token, key, function(err, decoded) {
//       if (err) {
//         return res.status(401).json({
//           success: false,
//           message: "Failed to authenticate token.",
//           err
//         });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//       success: false,
//       message: "No token provided."
//     });
//   }
// });

app.use("/parent", parentDetails);
app.use("/student", studentDetails);
app.use("/teacher", teacherDetails);
app.use("/homework", homeworkDetails);
app.use("/classAndSection", classAndSectionDetails);
app.use("/subject", subjectDetails);
app.use("/studenthomework", studentHomeworkDetails);
// default port here
var port = 8080;
app.listen(port, function () {
  console.log("Server is up and running on port numner " + port);
});