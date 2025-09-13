const express = require("express");
const { signup, login, getProfile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Signup route
router.post("/signup", signup);

router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
