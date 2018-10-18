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
  var teacher = new TeacherDetails(obj);
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(teacher.password, salt, (err, hash) => {
      if (err) throw err;
      teacher.password = hash;
      teacher
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    })
  );
};

exports.teacherGet = function(req, res) {
  TeacherDetails.findById(req.params.teacherId, function(err, user) {
    if (err) return res.json(err); //next(err);
    res.send(user);
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
          function(err, user) {
            if (err) res.send(err);
            res.send("User udpated.");
          }
        );
      })
    );
  } else {
    TeacherDetails.findByIdAndUpdate(
      req.params.teacherId,
      { $set: obj },
      function(err, user) {
        if (err) res.send(err);
        res.send("User udpated.");
      }
    );
  }
};

exports.teacherDelete = function(req, res) {
  TeacherDetails.findByIdAndRemove(req.params.teacherId, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};

export let teacherLogin = (req, res) => {
  let email = req.query.email;
  let password = req.query.password;
  if (!email) {
    res.json({ text: "Please insert email" });
    return;
  }
  if (!password) {
    res.json({ text: "Please insert password" });
    return;
  }
  TeacherDetails.findOne({ email: email }, (err, teacher) => {
    if (err) res.json({ text: "user not found", err });
    else {
      if (teacher === null) {
        return res.status(400).json({
          success: false,
          error: "Invalid username or password"
        });
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
              return res.status(200).json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({
            success: false,
            error: "Invalid username or password"
          });
        }
      });
    }
  });
};
