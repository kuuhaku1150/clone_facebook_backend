const mongoose = require("mongoose");

const postFacebookSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    ownerPost: {
      type: String,
    },
    img: {
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

    likes: [
      {
        userLike: {
          like: {
            type: Boolean,
            default: false,
          },
          idUserLike: {
            type: String,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("postFacebook", postFacebookSchema);
