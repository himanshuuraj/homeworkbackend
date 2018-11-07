var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true },
  parentId: { type: String, required: true },
  parentName: { type: String, required: true },
  email: { type: String, required: true },
  classAndSectionId: { type: String, required: true },
  classAndSectionName: { type: String, required: true },
  dob: { type: Number, required: false },
  phone: { type: String, required: false },
  bloodGroup: { type: String, required: false },
  gender: { type: String, required: false },
  userType : { type: String, required: true },
  address: { type: String, required: true },
  deleted: { type: String, required: false }
});

// Export the model
module.exports = mongoose.model("StudentDetails", StudentSchema);

// student and homework are related through sectionId and subjectId
