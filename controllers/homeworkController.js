var HomeworkDetails = require("../models/homework");
import { uuid, responseObj } from "../global/utils";

exports.homeworkGetByTeacher = (req, res) => {
  let teacherId = req.params.teacherId;
  HomeworkDetails.find({teacherId : teacherId}, function(err, homeworks) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in getting homeworks";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = homeworks;
      responseObj.param = req.params;
      responseObj.message = "Homeworks data";
      return res.json(responseObj);
    }
  });
}

exports.homeworkListByClassAndSection = (req, res)  => {
  let classAndSectionId = req.params.classAndSectionId;
  HomeworkDetails.find({classAndSectionId : classAndSectionId}, function(err, homeworks) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in getting homeworks";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = homeworks;
      responseObj.param = req.params;
      responseObj.message = "Homeworks list";
      return res.json(responseObj);
    }
  });
}

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
