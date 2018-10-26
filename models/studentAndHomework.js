var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StudentAndHomeworkSchema = new Schema({
  subjectId: { type: String, required: true },
  subjectName: { type: String, required: true },
  homeworkId: { type: Number, required: false },
  submittedAt: { type: String, required: false },
  homeworkId: { type: String, required: true },
  deleted: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model(
  "StudentAndHomeworkDetails",
  StudentAndHomeworkSchema
);
