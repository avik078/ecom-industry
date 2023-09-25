const mongoose = require("mongoose");

const adminRegSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, ""],
    },
    password: {
      type: String,
      required: [true, ""],
    },
    phoneNo: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const adminRegistration = mongoose.model("admin_1", adminRegSchema);
// 'admin_1' will be created inside mongo db collection
module.exports = adminRegistration;
