const mongoose = require("mongoose");

const HeaderNavigationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "static",
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
    },
    url: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const HeaderNavigation = mongoose.model(
  "HeaderNavigation",
  HeaderNavigationSchema
);

module.exports = HeaderNavigation;
