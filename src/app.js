const express = require("express");
const { swaggerUi, specs } = require("./config/swagger");

const app = express();

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("Blog platform api running");
});

module.exports = app;
