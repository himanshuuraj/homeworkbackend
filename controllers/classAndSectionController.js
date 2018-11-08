var ClassAndSectionDetails = require("../models/classAndSection");
import { uuid, responseObj } from "../global/utils";

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  //res.send("Greetings from the Test controller!");
  res.status(404).json({ text: "Not found" });
};

exports.classAndSectionGetAll = (req, res) => {
  ClassAndSectionDetails.find({})
    .sort("classAndSectionName")
    .exec((err, users) => {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.message = "Error in getting class and section List";
        return res.json(responseObj);
      } else {
        responseObj.success = true;
        responseObj.body = users;
        responseObj.message = "Class And Section List";
        return res.json(responseObj);
      }
    });
};

exports.classAndSectionCreate = function(req, res) {
  let obj = Object.assign({}, req.body);
  obj.deleted = false;
  obj.subjects = [];
  console.log(obj);
  let classAndSection = new ClassAndSectionDetails(obj);
  classAndSection
    .save()
    .then(classAndSection => {
      responseObj.success = true;
      responseObj.body = classAndSection;
      responseObj.param = req.body;
      responseObj.message = "Class And Section Created Successfully";
      return res.json(responseObj);
    })
    .catch(err => {
      responseObj.success = false;
      responseObj.error = err;
      responseObj.param = req.body;
      responseObj.message = "Error in creating class and section";
      return res.json(responseObj);
    });
};

exports.classAndSectionGet = async function(req, res) {
    let obj = await classAndSectionGetService(req.params.classAndSectionId, req.params);
    return res.json(obj);
};

exports.classAndSectionUpdate = async function(req, res) {
  let obj = await classAndSectionUpdateService(req.params.classAndSectionId, req.body, null);
  return res.json(obj);
};

exports.classAndSectionDelete = function(req, res) {
  console.log(req.params.classAndSectionId, "id", "id");
  ClassAndSectionDetails.findByIdAndRemove(
    req.params.classAndSectionId,
    function(err, classAndSection) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.param = req.params;
        responseObj.message = "Error in deleting class and section";
        return res.json(responseObj);
      } else {
        responseObj.success = true;
        responseObj.body = classAndSection;
        responseObj.param = req.params;
        responseObj.message =
          "Class And Section " +
          classAndSection.classAndSectionName +
          " deleted successfully";
        return res.json(responseObj);
      }
    }
  );
};

export let classAndSectionUpdateService = async function(id, obj, param) {
  return new Promise(function(resolve, reject) {
    ClassAndSectionDetails.findByIdAndUpdate(
      id,
      { $set: obj },
      function(err, classAndSection) {
        if (err) {
          responseObj.success = false;
          responseObj.error = err;
          responseObj.message = "Error in updating class and section";
        } else {
          responseObj.success = true;
          responseObj.body = classAndSection;
          responseObj.message = "Class And Section updated successfully";
        }
        responseObj.param = param;
        resolve(responseObj);
      }
    );
  });
};

export let classAndSectionGetService = function(id, param) {
  return new Promise(function(resolve, reject) {
    ClassAndSectionDetails.findById(id, function(
      err,
      classAndSection
    ) {
      if (err) {
        responseObj.success = false;
        responseObj.error = err;
        responseObj.message = "Error in getting class and section";
      } else {
        responseObj.success = true;
        responseObj.body = classAndSection;
        responseObj.message = "Class And Section Data";
      }
      responseObj.param = param;
      resolve(responseObj);
    });
  });
};
