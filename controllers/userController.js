var UserDetails = require("../models/user");
var bcrypt = require("bcryptjs");
import { key } from "./../config/config";
import { timeToExpireToken } from "./../config/config";
import { uuid } from "./../global/utils";
const jwt = require("jsonwebtoken");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.status(404).json({ text: "Not found" });
};

exports.userCreate = function(req, res) {
  let obj = req.body;
  obj.deleted = false;
  obj.id = "PR" + uuid();
  obj.children = [];
  obj.userType = "parent";
  var user = new UserDetails(obj);
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user
        .save()
        .then(user =>{
            // console.log(user, 18);
            delete user.password;
            delete user._id;
            return res.json(user);
        })
        .catch(err => console.log(err));
    })
  );
};

exports.userGet = function(req, res) {
  UserDetails.findById(req.params.id, function(err, user) {
    if (err) return res.json(err); //next(err);
    res.send(user);
  });
};

exports.userUpdate = function(req, res) {
  if (req.body.password) {
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        let obj = req.body;
        obj.password = hash;
        UserDetails.findByIdAndUpdate(req.params.id, { $set: obj }, function(
          err,
          user
        ) {
          if (err) res.send(err);
          res.send("User udpated.");
        });
      })
    );
  } else {
    UserDetails.findByIdAndUpdate(req.params.id, { $set: obj }, function(
      err,
      user
    ) {
      if (err) res.send(err);
      res.send("User udpated.");
    });
  }
};

exports.userDelete = function(req, res) {
  UserDetails.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};

export let userLogin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email) {
    return res.json({ text: "Please insert email" });
  }
  if (!password) {
    return res.json({ text: "Please insert password" });
  }
  UserDetails.findOne({ email: email }, (err, user) => {
    if (err) res.json({ text: "user not found", err });
    else {
      if (user === null) {
        return res.status(400).json({
          success: false,
          error: "Invalid username or password"
        });
      }
      bcrypt.compare(password, user.password, function(err, result) {
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
