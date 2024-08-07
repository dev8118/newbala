const Category = require("../../models/CategoryModel");

const fetch = async (req, res) => {
  const { search } = req.query;
  const query = [
    {
      name: new RegExp(search, "i"),
    },
    {
      description: new RegExp(search, "i"),
    },
  ];

  const categories = await Category.find({
    $or: query,
  });

  return res.json(categories);
};

const fetchById = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  return res.json(category);
};

const create = async (req, res) => {
  try {
    const data = req.body;
    await Category.create(data);

    return res.json({
      status: true,
      msg: "تم الإنشاء بنجاح.",
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
    await Category.findByIdAndUpdate(id, data);

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
    await Category.findByIdAndDelete(id);

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
