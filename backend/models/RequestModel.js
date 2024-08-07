const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema(
  {
    orderNumber: {
        type: String,
    },
    requestType: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    judiciary: {
        type: String,
    },
    region: {
        type: String,
    },
    phone: {
        type: String,
    },
    academicType: {
        type: String,
    },
    image: {
        type: String,
    },
    files: {
        type: Array,
    },
    status: {
        type: String,
        default: 'pending',
    },
    details: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
