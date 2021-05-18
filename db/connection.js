// load the environmental variables
require("dotenv").config();

// import dependencies
const mongoose = require("mongoose");

// pull out environmental variable from process.env obj
const MONGODB_URI = process.env.MONGODB_URI;

// remove mongo deprecation warnings
const config = { useUnifiedTopology: true, useNewUrlParser: true };

// establish connection to database
mongoose.connect(MONGODB_URI, config);

// create database connection message for open, close, error
mongoose.connection
  .on("open", () => console.log("MONGO CONNECTION IS OPEN"))
  .on("close", () => console.log("MONGO CONNECTION IS CLOSED"))
  .on("error", (error) =>
    console.log("MONGO CONNECTION ERROR \n***************\n", error)
  );

// export connection to use in server.js
module.exports = mongoose;
