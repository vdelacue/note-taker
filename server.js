// // Dependencies
// // =============================================================
// const express = require("express");

// const mysql = require("mysql");
// require("dotenv").config();
// const connection = require("./connection")

// // Sets up the Express App
// // =============================================================
// const app = express();
// const PORT = process.env.PORT || 8080;

// // Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// using .env to hide keys
require("dotenv").config();
// Values
const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const connection = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root",
   password: process.env.mysqlPass,
   database: "notetaker_db"
});

connection.connect(function(err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId);
   afterConnection();
});

function afterConnection() {
   connection.query("SELECT * FROM notes", function(err, res) {
       if (err) throw err;
       console.log(res);
   });
}

// set up routes
app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, './index.html'));
  });
  
  app.get('/notes', function(req, res) {
    // send tables.html when user hits "/notes"
    res.sendFile(path.join(__dirname, './notes.html'));
  });
  
  // Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
   // Log (server-side) when our server has started
   console.log("Server listening on: http://localhost:" + PORT);
});

