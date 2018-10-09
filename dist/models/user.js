"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  email: { type: String, required: true },
  dob: { type: Number, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model("UserDetails", UserSchema);