const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.ObjectId,
      ref: "Blog",
      required: true,
    },
    commentOwner: {
      type: mongoose.ObjectId,
      ref: "Profile",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = Comment = mongoose.model("Comment", commentSchema);
