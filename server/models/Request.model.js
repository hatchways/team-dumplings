const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.ObjectId, required: true, ref: "user" },
    sitter: { type: mongoose.ObjectId, required: true, ref: "user" },
    dog: { type: mongoose.ObjectId, required: true, ref: "dog" },
    start: { type: Date, required: true, trim: true },
    end: { type: Date, required: true, trim: true },
    accepted: { type: Boolean },
    declined: { type: Boolean },
    paid: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = request = mongoose.model("request", requestSchema);
