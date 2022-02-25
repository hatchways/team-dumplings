const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.ObjectId,
      ref: "Blog",
      required: true,
    },
    likeOwner: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    }
  }
);

module.exports = Like = mongoose.model("Like", likeSchema);