const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codeial_development");

const db = mongoose.connection;

db.on("error", console.log.bind("Error in connecting to mongodb"));

db.once("open", function () {
  console.log("Successfully connected to the database!!");
});

module.exports = db;
