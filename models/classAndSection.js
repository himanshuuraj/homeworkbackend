var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClassAndSectionSchema = new Schema({
  name: { type: String, required: true },
  classAndSectionId: { type: String, required: true },
  classAndSectionName: { type: String, required: true },
  deleted: { type: String, required: false },
  subjects: { type: Array, required: false }
});

// Export the model
module.exports = mongoose.model(
  "ClassAndSectionDetails",
  ClassAndSectionSchema
);
