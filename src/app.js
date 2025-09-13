const express = require("express");
const { swaggerUi, specs } = require("./config/swagger");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("Blog platform api running");
});

module.exports = app;
