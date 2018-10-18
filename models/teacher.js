var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeacherSchema = new Schema({
  name: { type: String, required: true },
  teacherId: { type: String, required: true },
  classAndSectionId: { type: String, required: true },
  classAndSectionName: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Number, required: false },
  phone: { type: String, required: false },
  gender: { type: String, required: false },
  password: { type: String, required: true },
  deleted: { type: String, required: false }
});

// Export the model
module.exports = mongoose.model("TeacherDetails", TeacherSchema);
