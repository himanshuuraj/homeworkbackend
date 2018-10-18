var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Number, required: false },
  phone: { type: String, required: false },
  password: { type: String, required: true },
  children: { type: Array, required: true },
  address: { type: String, required: true },
  id: { type: String, required: true },
  deleted: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model("UserDetails", UserSchema);
