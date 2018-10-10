"use strict";

var UserDetails = require("../models/user");
var bcrypt = require("bcryptjs");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send("Greetings from the Test controller!");
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
    if (err) return next(err);
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