const Setting = require("../../models/SettingModel");

const fetch = async (req, res) => {
  const setting = await Setting.findOne();
  return res.json(setting);
};

const update = async (req, res) => {
  try {
    const data = req.body;
    await Setting.findByIdAndUpdate(null, data, {
      upsert: true,
    });

    return res.json({
      status: true,
      msg: "تم التحديث بنجاح",
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
  update,
};
