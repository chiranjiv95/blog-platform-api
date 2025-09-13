const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
} = require("../controllers/postController");

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
