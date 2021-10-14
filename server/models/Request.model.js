const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.ObjectId, required: true, ref: "user" },
    sitter: { type: mongoose.ObjectId, required: true, ref: "user" },
    dog: { type: mongoose.ObjectId, required: true, ref: "dog" },
    start: { type: Date, required: true, trim: true },
    end: {
      type: Date,
      required: true,
      trim: true,
      validate: [dateValidator, "Start Date must be less than End Date"],
    },
    status: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["pending", "declined", "accepted", "paid", "progress", "done"],
    },
  },
  {
    timestamps: true,
  }
);

const dateValidator = (end) => {
  return this.start <= end;
};

module.exports = request = mongoose.model("request", requestSchema);
