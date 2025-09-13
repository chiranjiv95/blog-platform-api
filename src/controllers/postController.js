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
    res.status(500).json({ message: "Server Error" });
  }
};
