var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var note = require("../models/note.js/index.js");

// Create all our routes and set up logic within those routes where required.

router.get("/", function(req, res) {
    res.render(path.join(__dirname, '../public/index.html'));
  });

router.post("/api/notes", function(req, res) {
  cat.create(["name", "sleepy"], [req.body.name, req.body.sleepy], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  cat.update(
    {
      sleepy: req.body.sleepy
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

// Export routes for server.js to use.
module.exports = router;

// set up routes
app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  
  app.get('/notes', function(req, res) {
    // send tables.html when user hits "/notes"
    res.sendFile(path.join(__dirname, '../public//notes.html'));
  });

  app.post('/notes', function(req, res) {
    // send tables.html when user hits "/notes"
    res.sendFile(path.join(__dirname, '../public//notes.html'));
  });
  
  // Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
   // Log (server-side) when our server has started
   console.log("Server listening on: http://localhost:" + PORT);
});

