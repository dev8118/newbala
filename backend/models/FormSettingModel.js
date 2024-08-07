const mongoose = require("mongoose");

const FormSettingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    image: {
      type: String,
    },
    requestTypes: {
      type: Array
    },
    judiciaries: {
      type: Array
    },
    academicTypes: {
      type: Array
    },
    regions: {
      type: Array
    }
  },
  {
    timestamps: true,
  }
);

const FormSetting = mongoose.model("FormSetting", FormSettingSchema);

module.exports = FormSetting;
