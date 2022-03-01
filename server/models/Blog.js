const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogOwner: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likes: { type: Number, default: 0 },
    comments: [
        {
            type: mongoose.ObjectId,
            ref: "Profile",
        }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = Blog = mongoose.model("Blog", blogSchema);
