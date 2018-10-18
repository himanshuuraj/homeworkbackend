var StudentDetails = require("../models/student");
var bcrypt = require("bcryptjs");
import { key } from "../config/config";
import { timeToExpireToken } from "../config/config";
const jwt = require("jsonwebtoken");
import { uuid } from "./../global/utils";

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  //res.send("Greetings from the Test controller!");
  res.status(404).json({ text: "Not found" });
};

exports.student_create = function(req, res) {
  let obj = req.body;
  obj.deleted = false;
  obj.studentId = uuid();
  let student = new StudentDetails(obj);
  student
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
};

exports.get_student = function(req, res) {
  StudentDetails.findById(req.params.studentId, function(err, user) {
    if (err) return next(err); //res.json(err);
    res.send(user);
  });
};

exports.student_update = function(req, res) {
  StudentDetails.findByIdAndUpdate(
    req.params.studentId,
    { $set: obj },
    function(err, user) {
      if (err) res.send(err);
      res.send("User udpated.");
    }
  );
};

exports.user_delete = function(req, res) {
  UserDetails.findByIdAndRemove(req.params.studentId, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};
