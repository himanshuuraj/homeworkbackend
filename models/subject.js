var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SubjectSchema = new Schema({
  subjectId: { type: String, required: true },
  subjectName: { type: String, required: true },
  teacherId: { type: String, required: true },
  teacherName: { type: String, required: true },
  classAndSectionId: { type: String, required: true },
  classAndSectionName: { type: String, required: true },
  timings: { type: Array, required: false },  // day and timing
  deleted: { type: String, required: false }
});

// Export the model
module.exports = mongoose.model("SubjectDetails", SubjectSchema);
