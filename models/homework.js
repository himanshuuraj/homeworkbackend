var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HomeworkSchema = new Schema({
  subjectName: { type: String, required: true },
  header: { type: String, required: false },
  content: { type: String, required: true },
  teacherId: { type: String, required: true },
  teacherName: { type: String, required: true },
  homeworkId: { type: String, required: true },
  createdAt: { type: Number, required: true },
  lastDateToSubmit: { type: Number, required: true },
  deleted: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model("HomeworkDetails", HomeworkSchema);
