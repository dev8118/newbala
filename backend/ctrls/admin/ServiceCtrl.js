const Service = require("../../models/ServiceModel");

const fetch = async (req, res) => {
  const { search } = req.query;
  const query = [
    {
      title: new RegExp(search, "i"),
    },
    {
      description: new RegExp(search, "i"),
    },
  ];

  const services = await Service.find({
    $or: query,
  });

  return res.json(services);
};

const fetchById = async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);

  return res.json(service);
};

const create = async (req, res) => {
  try {
    const data = req.body;
    await Service.create(data);
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
    await Service.findByIdAndUpdate(id, data);
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
    await Service.findByIdAndDelete(id);
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
