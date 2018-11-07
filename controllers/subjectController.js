var SubjectDetails = require("../models/subject");
import { uuid, responseObj } from "../global/utils";


exports.subjectGetAll = (req, res) => {
  SubjectDetails.find({}).sort('subjectName').exec((err, subjects) => {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.message = "Error in getting Subject List";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = subjects;
      responseObj.message = "Subjects List";
      return res.json(responseObj);
    }
  });
}

exports.subjectCreate = function(req, res) {
  let obj = req.body;
  obj.subjectId = "SUB" + uuid();
  let subject = new SubjectDetails(obj);
  subject.save()
    .then(subject => {
      responseObj.success = true;
      responseObj.body = subject;
      responseObj.param = req.body;
      responseObj.message = "Subject Created Successfully";
      return res.json(responseObj);
    })
    .catch(err => {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.body;
      responseObj.message = "Error in creating subject";
      return res.json(responseObj);
    });
};

exports.subjectGet = function(req, res) {
  SubjectDetails.findById(req.params.subjectId, function(err, subject) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in getting subject data";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = subject;
      responseObj.param = req.params;
      responseObj.message = "Subject Data";
      return res.json(responseObj);
    }
  });
};

exports.subjectUpdate = function(req, res) {
  let obj = req.body;
  SubjectDetails.findByIdAndUpdate(
    req.params.subjectId,
    { $set: obj },
    function(err, subject) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.param = req.params;
        responseObj.message = "Error in updating subject";
        return res.json(responseObj);
      } else {
        responseObj.success = true;
        responseObj.body = subject;
        responseObj.param = req.params;
        responseObj.message = "Subject updated successfully";
        return res.json(responseObj);
      }
    }
  );
};

exports.subjectDelete = function(req, res) {
  SubjectDetails.findByIdAndRemove(req.params.subjectId, function(
    err,
    subject
  ) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in deleting subject";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = subject;
      responseObj.param = req.params;
      responseObj.message = "Student deleted successfully";
      return res.json(responseObj);
    }
  });
};
