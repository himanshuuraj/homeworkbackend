var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true },
  parentId: { type: String, required: true },
  parentName: { type: String, required: true },
  email: { type: String, required: true },
  classId: { type: String, required: true },
  className: { type: String, required: true },
  sectionId: { type: String, required: true },
  sectionName: { type: String, required: true },
  dob: { type: Number, required: false },
  phone: { type: String, required: false },
  bloodGroup: { type: String, required: false },
  gender: { type: String, required: false },
  deleted: { type: String, required: false }
});

// Export the model
module.exports = mongoose.model("StudentDetails", StudentSchema);
