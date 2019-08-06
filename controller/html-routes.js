const express = require("express");
const path = require("path");
const html_routes = express.Router();

// Import the model (note.js) to use its database functions.
var note = require("../models/note.js");

// Create all our routes and set up logic within those routes where required.

html_routes.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

html_routes.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Export routes for server.js to use.
module.exports = html_routes;
