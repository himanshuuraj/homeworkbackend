var TeacherDetails = require("../models/teacher");
var bcrypt = require("bcryptjs");
import { key } from "./../config/config";
import { timeToExpireToken } from "./../config/config";
const jwt = require("jsonwebtoken");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  //res.send("Greetings from the Test controller!");
  res.status(404).json({ text: "Not found" });
};

exports.teacherCreate = function(req, res) {
  let obj = req.body;
  obj.delete = false;
  obj.userType = "teacher";
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

exports.teacherGet = function(req, res) {
  TeacherDetails.findById(req.params.teacherId, function(err, teacher) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in getting teacher data";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = teacher;
      responseObj.param = req.params;
      responseObj.message = "Teacher Data";
      return res.json(responseObj);
    }
  });
};

exports.teacherUpdate = function(req, res) {
  if (req.body.password) {
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        let obj = req.body;
        obj.password = hash;
        TeacherDetails.findByIdAndUpdate(
          req.params.teacherId,
          { $set: obj },
          function(err, teacher) {
            if (err) {
              responseObj.success = false;
              responseObj.error = err;
              responseObj.param = req.params;
              responseObj.message = "Error in updating teacher";
              return res.json(responseObj);
            } else {
              responseObj.success = true;
              responseObj.body = teacher;
              responseObj.param = req.params;
              responseObj.message = "Teacher updated successfully";
              return res.json(responseObj);
            }
          }
        );
      })
    );
  } else {
    TeacherDetails.findByIdAndUpdate(
      req.params.teacherId,
      { $set: obj },
      function(err, teacher) {
        if (err) {
          responseObj.success = false;
          responseObj.error = err;
          responseObj.param = req.params;
          responseObj.message = "Error in updating teacher";
          return res.json(responseObj);
        } else {
          responseObj.success = true;
          responseObj.body = teacher;
          responseObj.param = req.params;
          responseObj.message = "Teacher updated successfully";
          return res.json(responseObj);
        }
      }
    );
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
  let email = req.query.email;
  let password = req.query.password;
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
        if (result == true) {
          const payload = {
            email: user.email,
            name: user.name,
            phone: user.phone
          };
          jwt.sign(
            payload,
            key,
            { expiresIn: timeToExpireToken },
            (err, token) => {
              responseObj.success = true;
              responseObj.body = parent;
              responseObj.param = req.body;
              responseObj.message = "login successful";
              responseObj.token = "Bearer " + token;
              return res.json(responseObj);
            }
          );
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
