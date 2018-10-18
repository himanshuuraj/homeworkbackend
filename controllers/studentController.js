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
  let student = new StudentDetails({
    name: req.body.name,
    studentId: uuid(),
    parentId: { type: String, required: true },
    parentName: { type: String, required: true },
    email: { type: String, required: true },
    classId: { type: String, required: true },
    className: { type: String, required: true },
    sectionId: { type: String, required: true },
    sectionName: { type: String, required: true },
    dob: { type: Number, required: false },
    phone: { type: String, required: false },
    bloodGroup: { type: String, required: false },
    gender: { type: String, required: false },
    deleted: { type: Boolean, required: true }
  });
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
