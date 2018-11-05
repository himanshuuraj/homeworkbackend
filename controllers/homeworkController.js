var HomeworkDetails = require("../models/homework");
import { uuid, responseObj } from "../global/utils";

exports.homeworkCreate = function(req, res) {
  let obj = req.body;
  obj.homeworkId = "HW" + uuid();
  obj.createdAt = new Date().getTime();
  obj.deleted = false;
  let homework = new HomeworkDetails(obj);
  homework.save()
    .then(homework => {
      responseObj.success = true;
      responseObj.body = homework;
      responseObj.param = req.body;
      responseObj.message = "Homework Created Successfully";
      return res.json(responseObj);
    })
    .catch(err => {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.body;
      responseObj.message = "Error in creating homework";
      return res.json(responseObj);
    });
};

exports.homeworkGet = function(req, res) {
  HomeworkDetails.findById(req.params.homeworkId, function(err, homework) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in getting homework";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = homework;
      responseObj.param = req.params;
      responseObj.message = "Homework Data";
      return res.json(responseObj);
    }
  });
};

exports.homeworkUpdate = function(req, res) {
  let obj = req.body;
  HomeworkDetails.findByIdAndUpdate(
    req.params.homeworkId,
    { $set: obj },
    function(err, homework) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.param = req.params;
        responseObj.message = "Error in updating homework";
        return res.json(responseObj);
      } else {
        responseObj.success = true;
        responseObj.body = homework;
        responseObj.param = req.params;
        responseObj.message = "Homework updated successfully";
        return res.json(responseObj);
      }
    }
  );
};

exports.homeworkDelete = function(req, res) {
  HomeworkDetails.findByIdAndRemove(req.params.homeworkId, function(
    err,
    homework
  ) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in deleting homework";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = homework;
      responseObj.param = req.params;
      responseObj.message = "Homework deleted successfully";
      return res.json(responseObj);
    }
  });
};
