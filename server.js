const app = require("./src/app");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Wait for MongoDB connection first
    await connectDB();

    // Start the server only after DB is ready
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err.message);
    process.exit(1); // Exit process with failure
  }
};

startServer();
