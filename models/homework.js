var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HomeworkSchema = new Schema({
  classAndSectionId: { type: String, required: true },
  classAndSectionName: { type: String, required: true },
  header: { type: Number, required: false },
  body: { type: String, required: false },
  homeworkId: { type: String, required: true },
  deleted: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model("UserDetails", UserSchema);
