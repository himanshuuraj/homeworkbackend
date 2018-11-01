var StudentAndHomeworkDetails = require("../models/studentAndHomework");
import { uuid } from "../global/utils";

exports.studentAndHomeworkCreate = function(req, res) {
  let obj = req.body;
  obj.StudentAndHomeworkId = "SH" + uuid();
  let StudentAndHomeworkDetails = new StudentAndHomeworkDetails(obj);
  StudentAndHomeworkDetails.save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
};

exports.studentAndHomeworkGet = function(req, res) {
  StudentAndHomeworkDetails.findById(req.params.studentAndHomeworkId, function(
    err,
    studentHomework
  ) {
    if (err) return next(err); //res.json(err);
    res.send(studentHomework);
  });
};

exports.studentAndHomeworkUpdate = function(req, res) {
  let obj = req.body;
  StudentAndHomeworkDetails.findByIdAndUpdate(
    req.params.studentAndHomeworkId,
    { $set: obj },
    function(err, studentHomework) {
      if (err) res.send(err);
      res.send("Student Homework udpated.");
    }
  );
};

exports.studentAndHomeworkDelete = function(req, res) {
  StudentAndHomeworkDetails.findByIdAndRemove(
    req.params.studentAndHomeworkId,
    function(err) {
      if (err) return next(err);
      res.send("Deleted successfully!");
    }
  );
};
