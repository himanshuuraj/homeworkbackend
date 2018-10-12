"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = undefined;

var _config = require("./../config/config");

var UserDetails = require("../models/user");
var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  //res.send("Greetings from the Test controller!");
  res.status(404).json({ text: "Not found" });
};

exports.user_create = function (req, res) {
  var user = new UserDetails({
    name: req.body.name,
    email: req.body.email,
    dob: req.body.dob,
    phone: req.body.phone,
    password: req.body.password
  });
  bcrypt.genSalt(10, function (err, salt) {
    return bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) throw err;
      user.password = hash;
      user.save().then(function (user) {
        return res.json(user);
      }).catch(function (err) {
        return console.log(err);
      });
    });
  });
};

exports.get_user = function (req, res) {
  UserDetails.findById(req.params.id, function (err, user) {
    if (err) return res.json(err); //next(err);
    res.send(user);
  });
};

exports.user_update = function (req, res) {
  if (req.body.password) {
    bcrypt.genSalt(10, function (err, salt) {
      return bcrypt.hash(req.body.password, salt, function (err, hash) {
        if (err) throw err;
        var obj = req.body;
        obj.password = hash;
        UserDetails.findByIdAndUpdate(req.params.id, { $set: obj }, function (err, user) {
          if (err) res.send(err);
          res.send("User udpated.");
        });
      });
    });
  } else {
    UserDetails.findByIdAndUpdate(req.params.id, { $set: obj }, function (err, user) {
      if (err) res.send(err);
      res.send("User udpated.");
    });
  }
};

exports.user_delete = function (req, res) {
  UserDetails.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};

var login = exports.login = function login(req, res) {
  var email = req.query.email;
  var password = req.query.password;
  if (!email) {
    res.json({ text: "Please insert email" });
    return;
  }
  if (!password) {
    res.json({ text: "Please insert password" });
    return;
  }
  UserDetails.findOne({ email: email }, function (err, user) {
    if (err) res.json({ text: "user not found", err: err });else {
      bcrypt.compare(password, user.password, function (err, result) {
        console.log(result);
        if (result == true) {
          var payload = {
            email: user.email,
            name: user.name,
            phone: user.phone
          };
          jwt.sign(payload, _config.key, { expiresIn: _config.timeToExpireToken }, function (err, token) {
            res.status(200).json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          res.status(400).json({
            text: "Invalid username or password"
          });
        }
      });
    }
  });
};