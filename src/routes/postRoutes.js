const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { createPost, getAllPosts } = require("../controllers/postController");

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);

module.exports = router;
