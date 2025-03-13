const express = require("express");
const db = require("./data/db");
const app = express();
const routes = require("./routes");

const port = process.env.PORT || 3000;

// Use the routes
app.use("/", routes);

// Initialize the database and start the server
db.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is connected and server running on port ${port}`);
    });
  }
});