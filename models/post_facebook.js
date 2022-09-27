const mongoose = require("mongoose");

const postFacebookSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    ownerPost: {
      type: String,
    },
    comments: [
      {
        userComment: {
          comm: {
            type: String,
          },
          userComm: {
            type: String,
          },
        },
      },
    ],
    like: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("postFacebook", postFacebookSchema);
