const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Blog platform api running");
});

module.exports = app;
