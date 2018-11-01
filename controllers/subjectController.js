var SubjectDetails = require("../models/subject");
import { uuid } from "../global/utils";

exports.subjectCreate = function(req, res) {
  let obj = req.body;
  objsubjectId = uuid();
  let SubjectDetails = new SubjectDetails(obj);
  SubjectDetails.save()
    .then(subject => res.json(subject))
    .catch(err => console.log(err));
};

exports.subjectGet = function(req, res) {
  SubjectDetails.findById(req.params.subjectId, function(err, subject) {
    if (err) return next(err);
    res.send(subject);
  });
};

exports.subjectUpdate = function(req, res) {
  let obj = req.body;
  SubjectDetails.findByIdAndUpdate(
    req.params.subjectId,
    { $set: obj },
    function(err, subject) {
      if (err) res.send(err);
      res.send("Subject udpated.");
    }
  );
};

exports.subjectDelete = function(req, res) {
  SubjectDetails.findByIdAndRemove(req.params.subjectId, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};
