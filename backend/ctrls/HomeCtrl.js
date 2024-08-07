const Category = require("../models/CategoryModel");
const Post = require("../models/PostModel");
const Service = require("../models/ServiceModel");

const init = async (req, res) => {
  const featuredCategories = await Category.find({ isFeature: true });
  const featuredPosts = await Post.find({
    category: {
      $in: featuredCategories.map((category) => category._id),
    },
  })
    .sort({ updatedAt: -1 })
    .limit(10)
    .populate("category");

  const tabCategories = await Category.find({ isTab: true });
  const services = await Service.find();
  const publishedCategories = await Category.find({ isPublish: true });
  const publishedPosts = await Post.find({
    category: {
      $in: publishedCategories.map((category) => category._id),
    },
  })
    .sort({ updatedAt: -1 })
    .limit(10)
    .populate("category");
  const advertisementCategories = await Category.find({
    isAdvertisement: true,
  });
  const advertisementPosts = await Post.find({
    category: {
      $in: advertisementCategories.map((category) => category._id),
    },
  });

  return res.json({
    featuredPosts,
    tabCategories,
    services,
    publishedPosts,
    advertisementPosts,
  });
};

const fetchCategories = async (req, res) => {
  const categories = await Category.find({ isTab: true });
  return res.json(categories);
}

const fetchPostsByCategoryId = async (req, res) => {
  const { category } = req.query;
  const posts = await Post.find({ category })
    .sort({ updatedAt: -1 })
    .limit(10)
    .populate("category");

  return res.json(posts);
};

module.exports = {
  init,
  fetchCategories,
  fetchPostsByCategoryId,
};
