const fs = require("fs");
const Post = require("../../models/PostModel");

const fetch = async (req, res) => {
  const { search } = req.query;
  const query = [
    {
      title: new RegExp(search, "i"),
    },
    {
      content: new RegExp(search, "i"),
    },
  ];

  const posts = await Post.find({
    $or: query,
  })
    .sort({ createdAt: -1 })
    .populate("category");

  return res.json(posts);
};

const fetchById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("category");

  return res.json(post);
};

const create = async (req, res) => {
  try {
    const data = req.body;
    if (req.files && req.files.image) {
      data.image = req.files.image[0].filename;
    }
    if (req.files && req.files.gallery) {
      let galleries = [];
      for (let gallery of req.files.gallery) {
        galleries.push(gallery.filename);
      }
      data.gallery = galleries;
    }

    await Post.create(data);

    return res.json({
      status: true,
      msg: "تم إنشاؤه بنجاح.",
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const post = await Post.findById(id);

    if (req.files && req.files.image) {
      if (post.image && fs.existsSync(`uploads/posts/${post.image}`)) {
        fs.unlinkSync(`uploads/posts/${post.image}`);
      }
      data.image = req.files.image[0].filename;
    }
    for (let gallery of post.gallery) {
      if (
        !data.gallery.includes(gallery) &&
        fs.existsSync(`uploads/posts/${post.image}`)
      ) {
        fs.unlinkSync(`uploads/posts/${gallery}`);
      }
    }
    if (!data.gallery) {
      data.gallery = [];
    }
    if (req.files && req.files.gallery) {
      for (let gallery of req.files.gallery) {
        data.gallery.push(gallery.filename);
      }
    }

    await Post.findByIdAndUpdate(id, data);
    return res.json({
      status: true,
      msg: "تم التحديث بنجاح.",
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post.image && fs.existsSync(`uploads/posts/${post.image}`)) {
      fs.unlinkSync(`uploads/posts/${post.image}`);
    }
    for (let gallery of post.gallery) {
      if (fs.existsSync(`uploads/posts/${gallery}`)) {
        fs.unlinkSync(`uploads/posts/${gallery}`);
      }
    }
    await Post.findByIdAndDelete(id);

    return res.json({
      status: true,
      msg: "تم الحذف بنجاح.",
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

module.exports = {
  fetch,
  fetchById,
  create,
  update,
  remove,
};
