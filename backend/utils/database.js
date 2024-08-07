const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const FormSetting = require("../models/FormSettingModel");

const seed = async () => {
  const users = await User.countDocuments();
  if (users === 0) {
    const salt = bcrypt.genSaltSync(10);
    await User.create({
      firstName: "Ali",
      lastName: "Baghdad",
      email: "admin@iwejfi83181.com",
      phone: "447380520373",
      address: "96 Springfield Road, GALASHIELS, TD74 1ZC",
      password: bcrypt.hashSync("2k0u5>2<Knf&", salt),
      role: "admin",
      status: true,
    });
  }
  const formSettingCount = await FormSetting.countDocuments();

  if (formSettingCount === 0) {
      const formSetting = new FormSetting({ 
        title: 'تواصل مع المحافظ مباشرة',
        subtitle: 'أختر نوع الطلب',
        image: '',
        requestTypes: [],
        judiciaries: [],
        academicTypes: [],
        regions: [],
      });
      await formSetting.save();
      console.log('New formSetting created:', formSetting);
  } else {
      console.log('new formSetting already exists.');
  }
};

const connect = () => {
  mongoose.connect("mongodb://0.0.0.0:27017", {
    serverSelectionTimeoutMS: 5000,
    dbName: "news",
  });

  mongoose.connection.on("connected", () => {
    console.log(
      `---------Database is connected--------: mongodb://0.0.0.0:27017`
    );
    seed();
  });
};

module.exports = {
  connect,
};
