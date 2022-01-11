const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    profile: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    reviewer: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Rating = mongoose.model("Rating", ratingSchema);
