const mongoose = require("mongoose");
const currentYear = new Date().getFullYear();
// update the validation function in request (start>=end) Model & addressing code review comments
const dogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
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
      enum: ["male", "female"],
    },
    yearOfBirth: {
      type: Number,
      required: true,
      min: currentYear - 40,
      max: currentYear,
    },
    neutered: { type: Boolean, default: false },
    chipped: { type: Boolean, default: false },
    vaccinated: { type: Boolean, default: false },
    HouseTrained: { type: Boolean, default: false },
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
