var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
	name: { type: String, required: true, max: 100 },
	parentId: { type: String, required: true, max: 100 },
	parentName: { type: String, required: true, max: 100 },
	email: { type: String, required: true },
	class: { type: String, required: true },
	section: { type: String, required: true },
	dob: { type: Number, required: false },
	phone: { type: String, required: false },
	password: { type: String, required: false },
	bloodGroup: { type: String, required: false },
	gender: { type: String, required: false },
	deleted: { type: String, required: false }
});

// Export the model
module.exports = mongoose.model("StudentDetails", StudentSchema);