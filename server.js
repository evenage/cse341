require("dotenv").config(); // Load environment variables first

const express = require("express");
const db = require("./data/db"); // Ensure this file correctly initializes MongoDB
const routes = require("./routes"); // Ensure this is a valid Express router

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON requests
app.use("/", routes); // Mount routes

// Initialize the database and start the server
db.initDb((err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1); // Exit if database connection fails
  } else {
    app.listen(port, () => {
      console.log(`Database is connected and server running on port ${port}`);
    });
  }
});
