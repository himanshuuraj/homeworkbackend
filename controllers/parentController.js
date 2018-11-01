var ParentDetails = require("../models/parent");
var bcrypt = require("bcryptjs");
import { key } from "./../config/config";
import { timeToExpireToken } from "./../config/config";
import { uuid } from "./../global/utils";
const jwt = require("jsonwebtoken");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.status(404).json({ text: "Not found" });
};

exports.parentCreate = function(req, res) {
  let obj = req.body;
  obj.deleted = false;
  obj.id = "PR" + uuid();
  obj.children = [];
  obj.userType = "parent";
  var parent = new ParentDetails(obj);
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(parent.password, salt, (err, hash) => {
      if (err) throw err;
      parent.password = hash;
      parent
        .save()
        .then(parent =>{
            // console.log(parent, 18);
            delete parent.password;
            delete parent._id;
            return res.json(parent);
        })
        .catch(err => console.log(err));
    })
  );
};

exports.parentGet = function(req, res) {
  ParentDetails.findById(req.params.id, function(err, parent) {
    if (err) return res.json(err); //next(err);
    res.send(parent);
  });
};

exports.parentUpdate = function(req, res) {
  if (req.body.password) {
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        let obj = req.body;
        obj.password = hash;
        ParentDetails.findByIdAndUpdate(req.params.id, { $set: obj }, function(
          err,
          parent
        ) {
          if (err) res.send(err);
          res.send("Parent udpated.");
        });
      })
    );
  } else {
    ParentDetails.findByIdAndUpdate(req.params.id, { $set: obj }, function(
      err,
      parent
    ) {
      if (err) res.send(err);
      res.send("Parent udpated.");
    });
  }
};

exports.parentDelete = function(req, res) {
  ParentDetails.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};

export let parentLogin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email) {
    return res.json({ text: "Please insert email" });
  }
  if (!password) {
    return res.json({ text: "Please insert password" });
  }
  ParentDetails.findOne({ email: email }, (err, parent) => {
    if (err) res.json({ text: "parent not found", err });
    else {
      if (parent === null) {
        return res.status(400).json({
          success: false,
          error: "Invalid parentname or password"
        });
      }
      bcrypt.compare(password, parent.password, function(err, result) {
        if (result == true) {
          const payload = {
            email: parent.email,
            name: parent.name,
            phone: parent.phone
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
            error: "Invalid parentname or password"
          });
        }
      });
    }
  });
};
