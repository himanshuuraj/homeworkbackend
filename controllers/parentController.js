var ParentDetails = require("../models/parent");
var bcrypt = require("bcryptjs");
import { key } from "./../config/config";
import { timeToExpireToken } from "./../config/config";
import { uuid, responseObj } from "./../global/utils";
const jwt = require("jsonwebtoken");

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
        .then(parent => {
          delete parent.password;
          delete parent._id;
          responseObj.success = true;
          responseObj.body = parent;
          responseObj.param = req.body;
          responseObj.message = "Parent Created Successfully";
          return res.json(responseObj);
        })
        .catch(err => {
          responseObj.success = false;
          responseObj.error = err;
          responseObj.param = req.body;
          responseObj.message = "Error in creating parent";
          return res.json(responseObj);
        });
    })
  );
};

exports.parentGet = function(req, res) {
  ParentDetails.findById(req.params.id, function(err, parent) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in getting parent";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = parent;
      responseObj.param = req.params;
      responseObj.message = "Parent Data";
      return res.json(responseObj);
    }
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
          if (err) {
            responseObj.success = false;
            responseObj.error = err;
            responseObj.param = req.params;
            responseObj.message = "Error in updating parent";
            return res.json(responseObj);
          } else {
            responseObj.success = true;
            responseObj.body = parent;
            responseObj.param = req.params;
            responseObj.message = "Parent updated successfully";
            return res.json(responseObj);
          }
        });
      })
    );
  } else {
    ParentDetails.findByIdAndUpdate(req.params.id, { $set: obj }, function(
      err,
      parent
    ) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.param = req.params;
        responseObj.message = "Error in updating parent";
        return res.json(responseObj);
      } else {
        responseObj.success = true;
        responseObj.body = parent;
        responseObj.param = req.params;
        responseObj.message = "Parent updated successfully";
        return res.json(responseObj);
      }
    });
  }
};

exports.parentDelete = function(req, res) {
  ParentDetails.findByIdAndRemove(req.params.id, function(err, parent) {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.params;
      responseObj.message = "Error in deleting class and section";
      return res.json(responseObj);
    } else {
      responseObj.success = true;
      responseObj.body = parent;
      responseObj.param = req.params;
      responseObj.message = "Class And Section deleted successfully";
      return res.json(responseObj);
    }
  });
};

export let parentLogin = (req, res) => {
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
  ParentDetails.findOne({ email: email }, (err, parent) => {
    if (err) {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.body;
      responseObj.message = "Error in getting parentDetail";
      return res.json(responseObj);
    } else {
      if (parent === null) {
        responseObj.success = false;
        responseObj.body = parent;
        responseObj.param = req.body;
        responseObj.message = "Invalid username or password";
        return res.json(responseObj);
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
