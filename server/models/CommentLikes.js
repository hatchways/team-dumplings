const mongoose = require("mongoose");

const commentLikesSchema = new mongoose.Schema(
  {
    comment: {
      type: mongoose.Types.ObjectId,
      ref: "Rating",
      required: true,
    },
    profile: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = CommentLikes = mongoose.model(
  "CommentLikes",
  commentLikesSchema
);
