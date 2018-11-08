var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeacherSchema = new Schema({
  teacherName: { type: String, required: true },
  subjects: { type: Array, required: false },
  email: { type: String, required: true },
  dob: { type: Number, required: false },
  phone: { type: String, required: false },
  gender: { type: String, required: false },
  password: { type: String, required: true },
  deleted: { type: String, required: false },
  userType: { type: String, required: true },
  address: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model("TeacherDetails", TeacherSchema);
