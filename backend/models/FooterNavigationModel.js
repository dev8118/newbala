const mongoose = require("mongoose");

const FooterNavigationSchema = mongoose.Schema(
  {
    label: {
      type: String,
      enum: ["الأقسام الرئيسة", "نشاطات"],
      default: "الأقسام الرئيسة",
    },
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

const FooterNavigation = mongoose.model(
  "FooterNavigation",
  FooterNavigationSchema
);

module.exports = FooterNavigation;
