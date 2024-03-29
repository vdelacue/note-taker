var orm = require("../config/orm.js");

var note = {
  all: function(cb) {
    orm.all("notes", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("notes", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("notes", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("notes", condition, function(res) {
      cb(res);
    });
  }
};



// Export the database functions for the controller (catsController.js).
module.exports = note;
