// Include Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Create Instance of Express
const app = express();

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set the public assets
app.use(express.static("./public"));
// -------------------------------------------------

// -------------------------------------------------
// MongoDB Configuration with mongoose
let dbConnection =
  process.env.MONGODB_URI || "mongodb://localhost:27017/nytredux";
mongoose.connect(dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
let db = mongoose.connection;

// Show any mongoose errors
db.on("error", (error) => {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", () => {
  console.log("Mongoose connection successful.");
});

/* Model Controllers
 * app.use(base_route,controller_name) is a middleware that will prepend
 * the base route base_route (in this case '/') to all the routes inside controller_name
 * controller_name returns a Router object with the routes
 */
let articles_controller = require("./controllers/articles_controller");
let notes_controller = require("./controllers/notes_controller");
app.use("/", articles_controller);
app.use("/", notes_controller);

module.exports = app;
