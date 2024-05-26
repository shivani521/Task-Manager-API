const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Setting up a route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Get the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
