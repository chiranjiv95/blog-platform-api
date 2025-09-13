const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { createPost } = require("../controllers/postController");

router.post("/", authMiddleware, createPost);

module.exports = router;
