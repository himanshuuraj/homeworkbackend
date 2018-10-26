var StudentDetails = require("../models/student");
import { uuid } from "./../global/utils";

exports.studentCreate = function(req, res) {
  let obj = req.body;
  obj.deleted = false;
  obj.studentId = uuid();
  let student = new StudentDetails(obj);
  student
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
};

exports.studentGet = function(req, res) {
  StudentDetails.findById(req.params.studentId, function(err, user) {
    if (err) return next(err); //res.json(err);
    res.send(user);
  });
};

exports.studentUpdate = function(req, res) {
  let obj = req.body;
  StudentDetails.findByIdAndUpdate(
    req.params.studentId,
    { $set: obj },
    function(err, user) {
      if (err) res.send(err);
      res.send("Student udpated.");
    }
  );
};

exports.studentDelete = function(req, res) {
  StudentDetails.findByIdAndRemove(req.params.studentId, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};

exports.studentHomeworkUpdate = (req, res) => {
  StudentDetails.findByIdAndUpdate(
    req.params.studentId,
    { $set: obj },
    function(err, student) {
      if (err) res.send(err);
      res.send(student);
    }
  );
};
