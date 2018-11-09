var SubjectDetails = require("./../models/subject");
import { uuid, responseObj } from "./../global/utils";
import { teacherGetService, teacherUpdateService } from "./teacherController";
import { classAndSectionUpdateService, classAndSectionGetService } from "./classAndSectionController";

exports.teacherGetAll = (req, res) => {
  SubjectDetails.find({ teacherId : req.params.teacherId})
    .exec((err, subjects) => {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.message = "Error in getting Subject List";
      } else {
        responseObj.success = true;
        responseObj.body = subjects;
        responseObj.message = "Subjects List";
      }
      return res.json(responseObj);
    });
}

exports.subjectGetAll = (req, res) => {
  SubjectDetails.find({})
    .sort("subjectName")
    .exec((err, subjects) => {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.message = "Error in getting Subject List";
      } else {
        responseObj.success = true;
        responseObj.body = subjects;
        responseObj.message = "Subjects List";
      }
      return res.json(responseObj);
    });
};

exports.subjectCreate = async function(req, res) {
  let obj = req.body;
  let responseObj = await subjectCreateService(obj, req.body);
  let resObj = responseObj.body;

  let teacher = await teacherGetService(obj.teacherId, {});
  teacher = teacher.body;
  teacher.subjects.push({
      subjectId : resObj._id,
      subjectName : resObj.subjectName
  });
  await teacherUpdateService(obj.teacherId, teacher, {});

  let classAndSection = await classAndSectionGetService(resObj.classAndSectionId, null);
  classAndSection = classAndSection.body;
  classAndSection.subjects.push({
      subjectId : resObj._id,
      subjectName : resObj.subjectName
  });
  await classAndSectionUpdateService(resObj.classAndSectionId, classAndSection, {});

  return res.json(responseObj);
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

export let subjectCreateService = (obj, param) => {
  return new Promise(function(resolve, reject) {
    let subject = new SubjectDetails(obj);
    subject
      .save()
      .then(subject => {
        responseObj.success = true;
        responseObj.body = subject;
        responseObj.param = param;
        responseObj.message = "Subject Created Successfully";
        resolve(responseObj);
      })
      .catch(err => {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.param = param;
        responseObj.message = "Error in creating subject";
        resolve(responseObj);
      });
  });
};
