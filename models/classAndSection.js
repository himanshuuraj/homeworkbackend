var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClassAndSectionSchema = new Schema({
  classAndSectionName: { type: String, required: true },
  subjects: { type: Array, required: false }, // subjectId and subjectName
  deleted: { type: String, required: false }
});

// Export the model
module.exports = mongoose.model(
  "ClassAndSectionDetails",
  ClassAndSectionSchema
);
