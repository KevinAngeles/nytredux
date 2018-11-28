// Require mongoose
const mongoose = require('mongoose');
// Create a schema class
const Schema = mongoose.Schema;
// Create the Note schema
const NoteSchema = new Schema({
	// Just a string
	body: {
		type: String
	}
});
// Create the Note model with the NoteSchema
const Note = mongoose.model("Note", NoteSchema, "Note");
// Export the Note model
module.exports = Note;
