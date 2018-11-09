var TeacherDetails = require("../models/teacher");
var bcrypt = require("bcryptjs");
import { key } from "./../config/config";
import { timeToExpireToken } from "./../config/config";
const jwt = require("jsonwebtoken");
import { uuid, responseObj } from "../global/utils";

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.status(404).json({ text: "Not found" });
};

exports.teacherGetAll = (req, res) => {
  TeacherDetails.find({})
    .sort("teacherName")
    .exec((err, teachers) => {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.message = "Error in getting teachers List";
        return res.json(responseObj);
      } else {
        responseObj.success = true;
        responseObj.body = teachers;
        responseObj.message = "Teachers List";
        return res.json(responseObj);
      }
    });
};

exports.teacherCreate = function(req, res) {
  let obj = req.body;
  obj.delete = false;
  //  obj.teacherId = "TEA" + uuid();
  obj.userType = "teacher";
  obj.teacherName = req.body.name;
  var teacher = new TeacherDetails(obj);
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(teacher.password, salt, (err, hash) => {
      if (err) throw err;
      teacher.password = hash;
      teacher
        .save()
        .then(teacher => {
          delete teacher.password;
          delete teacher._id;
          responseObj.success = true;
          responseObj.body = teacher;
          responseObj.param = req.body;
          responseObj.message = "Teacher Created Successfully";
          return res.json(responseObj);
        })
        .catch(err => {
          responseObj.success = false;
          responseObj.error = err;
          responseObj.param = req.body;
          responseObj.message = "Error in creating teacher";
          return res.json(responseObj);
        });
    })
  );
};

exports.teacherGet = async function(req, res) {
  let obj = await teacherGetService(req.params.teacherId, req.params);
  return res.json(obj);
};

exports.teacherUpdate = async function(req, res) {
  let obj = req.body;
  let id = req.params.teacherId;
  if (req.body.password) {
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(req.body.password, salt, async function(err, hash) {
        if (err) throw err;
        obj.password = hash;
        let resObj = await teacherUpdateService(id, obj, req.params);
        return res.json(resObj);
      })
    );
  } else {
    let resObj = await teacherUpdateService(id, obj, req.params);
    return res.json(resObj);
  }
};

exports.teacherDelete = function(req, res) {
  TeacherDetails.findByIdAndRemove(req.params.teacherId, function(
    err,
    teacher
  ) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in deleting teacher";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = teacher;
      responseObj.param = req.params;
      responseObj.message = "Teacher deleted successfully";
      return res.json(responseObj);
    }
  });
};

export let teacherLogin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email) {
    responseObj.param = req.body;
    responseObj.message = "Please insert email";
    return res.json(responseObj);
  }
  if (!password) {
    responseObj.param = req.body;
    responseObj.message = "Please insert password";
    return res.json(responseObj);
  }
  TeacherDetails.findOne({ email: email }, (err, teacher) => {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.body;
      responseObj.message = "Error in getting teacherDetail";
      return res.json(responseObj);
    } else {
      if (teacher === null) {
        responseObj.success = false;
        responseObj.body = teacher;
        responseObj.param = req.body;
        responseObj.message = "Invalid username or password";
        return res.json(responseObj);
      }
      bcrypt.compare(password, teacher.password, function(err, result) {
        console.log(result);
        if (result === true) {
          responseObj.success = true;
          responseObj.body = teacher;
          responseObj.param = req.body;
          responseObj.message = "login successful";
          // responseObj.token = "Bearer " + token;
          return res.status(200).json(responseObj);
          // const payload = {
          //   email: teacher.email,
          //   name: teacher.name,
          //   phone: teacher.phone
          // };
          // jwt.sign(
          //   payload,
          //   key,
          //   { expiresIn: timeToExpireToken },
          //   (err, token) => {
          //     if(err){
          //       console.log(1);
          //       responseObj.success = false;
          //       responseObj.error = err;
          //       responseObj.param = req.body;
          //       responseObj.message = "login unsuccessful";
          //       return res.json(responseObj);
          //     }else{
          //       console.log(2, token);
          //       responseObj.success = true;
          //       responseObj.body = parent;
          //       responseObj.param = req.body;
          //       responseObj.message = "login successful";
          //       responseObj.token = "Bearer " + token;
          //       return res.status(200).json(responseObj);
          //     }
          //   }
          // );
        } else {
          responseObj.success = false;
          responseObj.body = parent;
          responseObj.param = req.body;
          responseObj.message = "Invalid parentname or password";
          return res.json(responseObj);
        }
      });
    }
  });
};

export let teacherUpdateService = function(id, obj, param) {
  return new Promise(function(resolve, reject) {
    TeacherDetails.findByIdAndUpdate(id, { $set: obj }, function(err, teacher) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.message = "Error in updating teacher";
      } else {
        responseObj.success = true;
        responseObj.body = teacher;
        responseObj.message = "Teacher updated successfully";
      }
      responseObj.param = param;
      resolve(responseObj);
    });
  });
};

export let teacherGetService = function(id, param) {
  return new Promise(function(resolve, reject) {
    TeacherDetails.findById(id, function(err, teacher) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.message = "Error in getting teacher data";
      } else {
        responseObj.success = true;
        responseObj.body = teacher;
        responseObj.message = "Teacher Data";
      }
      responseObj.param = param;
      resolve(responseObj);
    });
  });
};
