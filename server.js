// Dependencies
// =============================================================
const express = require("express");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const api_routes = require("./controller/api-routes.js");
const html_routes = require("./controller/html-routes")

app.use(api_routes);
app.use(html_routes);

  // Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
   // Log (server-side) when our server has started
   console.log("Server listening on: http://localhost:" + PORT);
});

module.exports = app;