const mongoose = require("mongoose");
const users = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Female", "Male"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("users", users);
