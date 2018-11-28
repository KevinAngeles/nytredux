// Require mongoose
const mongoose = require('mongoose');
// Create Schema class
const Schema = mongoose.Schema;
// Create article schema
const ArticleSchema = new Schema({
	// title is a required string
	title: {
		type: String,
		required: true
	},
	// url is a required string
	url: {
		type: String,
		unique: true,
		required: true
	},
  date: {
		type: Date
  },
  // This saves an array of note's ObjectId, ref refers to the Note model
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});
// Create the Article model with the ArticleSchema
const Article = mongoose.model("Article", ArticleSchema,"Article");
// Export the model
module.exports = Article;
