var StudentAndHomeworkDetails = require("../models/studentAndHomework");
import { uuid } from "../global/utils";

exports.studentAndHomeworkCreate = function(req, res) {
  let obj = req.body;
  obj.StudentAndHomeworkId = "SH" + uuid();
  let StudentAndHomeworkDetails = new StudentAndHomeworkDetails(obj);
  StudentAndHomeworkDetails.save()
    .then(studentHomework => {
      responseObj.success = true;
      responseObj.body = studentHomework;
      responseObj.param = req.body;
      responseObj.message = "Student and homework mapping Created Successfully";
      return res.json(responseObj);
    })
    .catch(err => {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.body;
      responseObj.message = "Error in creating student and homework mapping";
      return res.json(responseObj);
    });
};

exports.studentAndHomeworkGet = function(req, res) {
  StudentAndHomeworkDetails.findById(req.params.studentAndHomeworkId, function(
    err,
    studentHomework
  ) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in getting class and section";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = studentHomework;
      responseObj.param = req.params;
      responseObj.message = "Class And Section Data";
      return res.json(responseObj);
    }
  });
};

exports.studentAndHomeworkUpdate = function(req, res) {
  let obj = req.body;
  StudentAndHomeworkDetails.findByIdAndUpdate(
    req.params.studentAndHomeworkId,
    { $set: obj },
    function(err, studentHomework) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.param = req.params;
        responseObj.message = "Error in updating student homework";
        return res.json(responseObj);
      } else {
        responseObj.success = true;
        responseObj.body = studentHomework;
        responseObj.param = req.params;
        responseObj.message = "Student Homework updated successfully";
        return res.json(responseObj);
      }
    }
  );
};

exports.studentAndHomeworkDelete = function(req, res) {
  StudentAndHomeworkDetails.findByIdAndRemove(
    req.params.studentAndHomeworkId,
    function(err) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.param = req.params;
        responseObj.message = "Error in deleting student homework";
        return res.json(responseObj);
      } else {
        responseObj.success = true;
        responseObj.body = classAndSection;
        responseObj.param = req.params;
        responseObj.message = "Student Homework deleted successfully";
        return res.json(responseObj);
      }
    }
  );
};
