var StudentDetails = require("../models/student");
import { uuid, responseObj } from "./../global/utils";

exports.studentCreate = function(req, res) {
  let obj = req.body;
  obj.deleted = false;
  obj.userType = "student";
  obj.studentName = req.body.name;
  let student = new StudentDetails(obj);
  student
    .save()
    .then(student => {
      responseObj.success = true;
      responseObj.body = student;
      responseObj.param = req.body;
      responseObj.message = "Student Created Successfully";
      return res.json(responseObj);
    })
    .catch(err => {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.body;
      responseObj.message = "Error in creating student";
      return res.json(responseObj);
    });
};

exports.studentGet = function(req, res) {
  StudentDetails.findById(req.params.studentId, function(err, student) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in getting student data";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = student;
      responseObj.param = req.params;
      responseObj.message = "Student Data";
      return res.json(responseObj);
    }
  });
};

exports.studentUpdate = function(req, res) {
  let obj = req.body;
  StudentDetails.findByIdAndUpdate(
    req.params.studentId,
    { $set: obj },
    function(err, student) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.param = req.params;
        responseObj.message = "Error in updating student";
        return res.json(responseObj);
      } else {
        responseObj.success = true;
        responseObj.body = student;
        responseObj.param = req.params;
        responseObj.message = "Student updated successfully";
        return res.json(responseObj);
      }
    }
  );
};

exports.studentDelete = function(req, res) {
  StudentDetails.findByIdAndRemove(req.params.studentId, function(
    err,
    student
  ) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in deleting student";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = student;
      responseObj.param = req.params;
      responseObj.message = "Student deleted successfully";
      return res.json(responseObj);
    }
  });
};
