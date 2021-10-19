const mongoose = require("mongoose");
const currentYear = new Date().getFullYear();

const dogSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true, trim: true, maxlength: 50 },
    breed: { type: String, required: true, trim: true, maxlength: 50 },
    size: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["xs", "s", "m", "l", "g"],
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["male", "female", "other"],
    },
    yearOfBirth: {
      type: Number,
      required: true,
      min: currentYear - 120,
      max: currentYear,
    },
    neutered: { type: Boolean, default: false },
    chipped: { type: Boolean, default: false },
    vaccinated: { type: Boolean, default: false },
    houseTrained: { type: Boolean, default: false },
    friendlyWithDogs: { type: Boolean, default: false },
    friendlyWithCats: { type: Boolean, default: false },
    friendlyWithKids: { type: Boolean, default: false },
    friendlyWithAdults: { type: Boolean, default: false },
    description: { type: String, trim: true, maxlength: 1024 },
  },
  {
    timestamps: true,
  }
);

module.exports = dog = mongoose.model("Dog", dogSchema);
