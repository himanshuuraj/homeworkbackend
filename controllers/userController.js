var UserDetails = require("../models/user");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.user_create = function(req, res) {
  var user = new UserDetails({
    name: req.body.name,
    email: req.body.email,
    dob: req.body.dob,
    phone: req.body.phone,
    password: req.body.password
  });
  user.save(function(err) {
    if (err) {
      res.send(err);
    } else res.send("User Created successfully");
  });
};

exports.get_user = function(req, res) {
  UserDetails.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    res.send(user);
  });
};

exports.user_update = function(req, res) {
  // console.log(req.params.id);
  UserDetails.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    user
  ) {
    if (err) res.send(err); //return next(err);
    res.send("User udpated.");
  });
  // res.send("Hello");
};

exports.user_delete = function(req, res) {
  UserDetails.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};
