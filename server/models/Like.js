const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.ObjectId,
      ref: "Blog",
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    }
  }
);

module.exports = Like = mongoose.model("Like", likeSchema);