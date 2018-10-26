var HomeworkDetails = require("../models/homework");
import { uuid } from "../global/utils";

exports.homeworkCreate = function(req, res) {
  let obj = req.body;
  obj.homeworkId = uuid();
  let HomeworkDetails = new HomeworkDetails(obj);
  HomeworkDetails.save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
};

exports.homeworkGet = function(req, res) {
  HomeworkDetails.findById(req.params.homeworkId, function(err, user) {
    if (err) return next(err); //res.json(err);
    res.send(user);
  });
};

exports.homeworkUpdate = function(req, res) {
  let obj = req.body;
  HomeworkDetails.findByIdAndUpdate(
    req.params.homeworkId,
    { $set: obj },
    function(err, user) {
      if (err) res.send(err);
      res.send("User udpated.");
    }
  );
};

exports.homeworkDelete = function(req, res) {
  UserDetails.findByIdAndRemove(req.params.homeworkId, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};
