var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StudentAndHomeworkSchema = new Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  subjectId: { type: String, required: true },
  subjectName: { type: String, required: true },
  classAndSectionId: { type: String, required: true },
  classAndSectionName: { type: String, required: true },
  homeworkId: { type: Number, required: false },
  submittedAt: { type: String, required: false },
  studentAndHomeworkId: { type: String, required: true },
  deleted: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model(
  "StudentAndHomeworkDetails",
  StudentAndHomeworkSchema
);
