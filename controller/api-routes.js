const express = require("express");
const path = require("path");
const api_routes = express.Router();
const connection = require("../config/connection.js");

// Import the model notes.js to use its database functions.
const note = require("../models/note.js");

api_routes.get("/api/notes", function (req, res) {
  connection.query("SELECT * FROM notes", function (err, data) {
    if (err) {
      return res.status(500).end();
    }
    return res.json(data);
  })
});





// api_routes.get("/api/notes", function (req, res) {
//   note.all("notes", function (result) {
//     res.json(result);
//   });

// });


// //reate all our routes and set up logic within those routes where required.
// api_routes.post("/api/notes", function (req, res) {
//   note.create(["title", "body"], [req.body.name, req.body.body], function (result) {
//     // Send back the ID of the new quote
//     res.json({
//       id: result.insertId
//     });
//   });
// });

// api_routes.put("/api/notes/:id", function (req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   note.update({
//       body: req.body.body
//     },
//     condition,
//     function (result) {
//       if (result.changedRows === 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       }
//       res.status(200).end();

//     }
//   );
// });

// Export routes for server.js to use.
module.exports = api_routes;