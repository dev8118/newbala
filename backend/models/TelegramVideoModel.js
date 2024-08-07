const mongoose = require("mongoose");

const TelegramVideoSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

const TelegramVideo = mongoose.model("TelegramVideo", TelegramVideoSchema);

module.exports = TelegramVideo;
