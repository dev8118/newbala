const FormSetting = require("../models/FormSettingModel");
const Request = require("../models/RequestModel");

const createRequest = async (req, res) => {
  console.log("i am here here");
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
      data.files = galleries;
    }
    const orderNumber = Date.now();
    const status = "pending";
    const result = await Request.create({
      ...data,
      orderNumber,
      status,
    });
    if (result) {
      return res.json({
        status: true,
        orderNumber,
        msg: "تم إنشاؤه بنجاح.",
      });
    } else {
      return res.json({
        status: false,
      });
    }
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const getFormSetting = async (req, res) => {
  try {
    const formSetting = await FormSetting.findOne();
    return res.json({
      status: true,
      formSetting,
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
};

const getRequest = async (req, res) => {
  try {
    const orderNumber = req.params.id;
    const request = await Request.findOne({ orderNumber });
    if (request) {
      res.json({
        status: true,
        request,
      });
    } else {
      res.json({
        status: false,
        msg: "can't find order",
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
  createRequest,
  getFormSetting,
  getRequest,
};
