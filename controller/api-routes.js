const express = require("express");
const path = require("path");
const api_routes = express.Router();
const connection = require("../config/connection.js");

// Import the model notes.js to use its database functions.
const note = require("../models/note.js");


//get all notes data
api_routes.get("/api/notes", function (req, res) {
  connection.query("SELECT * FROM notes", function (err, data) {
    if (err) {
      return res.status(500).end();
    }
    return res.json(data);
  })
});

//get single note data according to id given in url
api_routes.get("/api/notes/:id", function (req, res) {
  let id = req.params.id;
  let chosenNote = [];
  connection.query("SELECT * FROM notes", function (err, data) {
    if (err) {
      return res.status(500).end();
    }
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        chosenNote.push(data[i]);
      }
    }
    return res.json(chosenNote);
  })
});

//save a new Note to the database
api_routes.post("/api/notes", function (req, res) {
  connection.query(
    "INSERT INTO notes (title, body) VALUES (?, ?)", 
    [req.body.title, req.body.body], 
    function (err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    // Send back the ID of the new note
    res.json({
      id: result.insertId
    });
  });
})

api_routes.delete("/api/notes/:id", function (req, res) {
  connection.query(`DELETE FROM notes WHERE id = ${req.params.id}`, function (err, data) {
    if (err) {
      return res.status(500).end();
    }
    return res.json(data);
  })
});


// Export routes for server.js to use.
module.exports = api_routes;