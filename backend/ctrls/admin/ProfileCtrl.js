const bcrypt = require("bcrypt");
const User = require("../../models/UserModel");

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await User.findByIdAndUpdate(id, data);
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

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    let { currentPassword, password } = req.body;
    const user = await User.findById(id);
    if (bcrypt.hashSync(currentPassword, user.password)) {
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
      await User.findByIdAndUpdate(id, { password });
      return res.json({
        status: true,
        msg: "تم التحديث بنجاح.",
      });
    } else {
      return res.json({
        status: false,
        msg: "كلمة المرور الحالية غير صحيحة.",
      });
    }
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

module.exports = {
  updateProfile,
  updatePassword,
};
