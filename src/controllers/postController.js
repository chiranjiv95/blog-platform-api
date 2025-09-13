const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body || {};
    const author = req.user.id;

    // Input validation
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const post = new Post({
      title,
      content,
      author,
    });

    const createdPost = await post.save();

    res.status(201).json({
      message: `Post with id ${createdPost._id} created successfully`,
      post: createdPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate("author", "name email");

    res.status(200).json({ posts: allPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate("author", "name email");

    if (!post) {
      return res
        .status(404)
        .json({ message: `Post with id ${postId} not found` });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    // ✅ Handle invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Post ID format" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user.id;

    // Find the post first to check ownership
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if the logged-in user is the author
    if (post.author.toString() !== authorId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this post",
      });
    }

    // Delete the post
    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting post",
      error: error.message,
    });
  }
};

// exports.deletePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const authorId = req.user.id;

//     // Find and delete in one operation, only if author matches
//     const deletedPost = await Post.findOneAndDelete({
//       _id: id,
//       author: authorId,
//     });

//     if (!deletedPost) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found or not authorized to delete",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Post deleted successfully",
//       data: deletedPost,
//     });
//   } catch (error) {
//     if (error.name === "CastError") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid post ID format",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Error deleting post",
//       error: error.message,
//     });
//   }
// };
