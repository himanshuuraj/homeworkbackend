var UserDetails = require("../models/user");
var bcrypt = require("bcryptjs");
import { key } from "./../config/config";
import { timeToExpireToken } from "./../config/config";
const jwt = require("jsonwebtoken");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  //res.send("Greetings from the Test controller!");
  res.status(404).json({ text: "Not found" });
};

exports.userCreate = function(req, res) {
  var user = new UserDetails({
    name: req.body.name,
    email: req.body.email,
    dob: req.body.dob,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address
  });
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user
        .save()
        .then(user => res.json(user))
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
