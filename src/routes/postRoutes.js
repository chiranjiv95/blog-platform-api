const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createPost,
  getAllPosts,
  getPostById,
} = require("../controllers/postController");

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);

module.exports = router;
