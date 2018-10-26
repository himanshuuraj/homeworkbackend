var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SubjectSchema = new Schema({
  subjectId: { type: String, required: true },
  subjectName: { type: String, required: true },
  deleted: { type: String, required: false },
  subjects: { type: Array, required: false }
});

// Export the model
module.exports = mongoose.model("SubjectDetails", SubjectSchema);
