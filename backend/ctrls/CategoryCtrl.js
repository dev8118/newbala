const Category = require("../models/CategoryModel");
const Post = require("../models/PostModel");

const init = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  const primaryPost = await Post.findOne({ category: id }).sort({
    createdAt: -1,
  });
  const secondaryPosts = await Post.find({ category: id })
    .sort({
      createdAt: -1,
    })
    .skip(1)
    .limit(3);
  const posts = await Post.find({ category: id })
    .sort({ createdAt: -1 })

  return res.json({
    category,
    primaryPost,
    secondaryPosts,
    posts,
  });
};

module.exports = {
  init,
};
