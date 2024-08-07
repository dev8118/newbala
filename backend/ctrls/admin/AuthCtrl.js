const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/UserModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          "a1A!s2S@d3D#f4F$",
          {
            expiresIn: "24h",
          }
        );

        return res.json({
          status: true,
          user,
          token,
          msg: "تم تسجيل الدخول بنجاح",
        });
      } else {
        return res.json({
          status: false,
          msg: "كلمة المرور غير متطابقة.",
        });
      }
    } else {
      return res.json({
        status: false,
        msg: "المستخدم بالبريد الإلكتروني غير موجود.",
      });
    }
  } catch (err) {
    return res.json({
      status: false,
      msg: "",
    });
  }
};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

const me = async (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, 'a1A!s2S@d3D#f4F$', async (err, data) => {
    if (err) {
      return res.sendStatus(401);
    } else {
      const user = await User.findById(data.id);
      return res.json({ user });
    }
  });
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
  me,
};
