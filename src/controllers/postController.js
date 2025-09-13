const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id;

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
