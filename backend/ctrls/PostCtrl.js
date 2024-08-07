const Post = require("../models/PostModel");

const fetchById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("category");
  return res.json(post);
};

module.exports = {
  fetchById,
};
