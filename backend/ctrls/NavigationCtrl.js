const Setting = require("../models/SettingModel");
const HeaderNavigation = require("../models/HeaderNavigationModel");
const FooterNavigation = require("../models/FooterNavigationModel");

const fetchHeaderNavigations = async (req, res) => {
  const navigations = await HeaderNavigation.find();

  return res.json(navigations);
};

const fetchFooterNavigations = async (req, res) => {
  const navigations = await HeaderNavigation.find();
  const setting = await Setting.findOne();
  return res.json({
    email: setting && setting.EMAIL,
    phone: setting && setting.PHONE,
    facebookUrl: setting && setting.FACEBOOK_URL,
    instagramUrl: setting && setting.INSTAGRAM_URL,
    telegramUrl: setting && setting.TELEGRAM_URL,
    navigations,
  });
};

module.exports = {
  fetchHeaderNavigations,
  fetchFooterNavigations,
};
