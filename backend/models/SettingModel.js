const mongoose = require("mongoose");

const SettingSchema = mongoose.Schema(
  {
    EMAIL: {
      type: String,
      required: true,
    },
    PHONE: {
      type: String,
      required: true,
    },
    FACEBOOK_URL: {
      type: String,
      required: true,
    },
    INSTAGRAM_URL: {
      type: String,
      required: true,
    },
    TELEGRAM_URL: {
      type: String,
      required: true,
    },
    SENDGRID_API_KEY: {
      type: String,
      required: true,
    },
    SENDGRID_USER: {
      type: String,
      required: true,
    },
    TWILIO_API_KEY: {
      type: String,
      required: true,
    },
    TWILIO_SECRET_KEY: {
      type: String,
      required: true,
    },
    TWILIO_PHONE: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model("Setting", SettingSchema);

module.exports = Setting;