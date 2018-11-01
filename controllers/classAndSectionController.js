var ClassAndSectionDetails = require("../models/classAndSection");
var bcrypt = require("bcryptjs");
import { key } from "../config/config";
import { timeToExpireToken } from "../config/config";
const jwt = require("jsonwebtoken");
import { uuid } from "../global/utils";

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  //res.send("Greetings from the Test controller!");
  res.status(404).json({ text: "Not found" });
};

exports.classAndSectionCreate = function(req, res) {
  let obj = req.body;
  obj.deleted = false;
  obj.classAndSectionId = "CS" + uuid();
  let classAndSection = new ClassAndSectionDetails(obj);
  classAndSection
    .save()
    .then(classAndSection => res.json(classAndSection))
    .catch(err => console.log(err));
};

exports.classAndSectionGet = function(req, res) {
  ClassAndSectionDetails.findById(req.params.classAndSectionId, function(
    err,
    classAndSection
  ) {
    if (err) return next(err); //res.json(err);
    return res.send(classAndSection);
  });
};

exports.classAndSectionUpdate = function(req, res) {
  ClassAndSectionDetails.findByIdAndUpdate(
    req.params.classAndSectionId,
    { $set: obj },
    function(err, classAndSection) {
      if (err) res.send(err);
      return res.send("Class And Section udpated.");
    }
  );
};

exports.classAndSectionDelete = function(req, res) {
  UserDetails.findByIdAndRemove(req.params.classAndSectionId, function(err) {
    if (err) return next(err);
    return res.send("Deleted successfully!");
  });
};
