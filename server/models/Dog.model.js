const mongoose = require("mongoose");
const currentYear = new Date().getFullYear();

const dogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    name: { type: String, required: true, trim: true, maxlength: 50 },
    breed: { type: String, required: true, trim: true, maxlength: 50 },
    size: {
      // [extra small | small | meduim | large | giant]
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
    yearofbirth: {
      type: Number,
      required: true,
      min: currentYear - 40,
      max: currentYear,
    },
    neutered: { type: Boolean, default: false },
    chipped: { type: Boolean, default: false },
    vaccinated: { type: Boolean, default: false },
    House_trained: { type: Boolean, default: false },
    friendly_with_dogs: { type: Boolean, default: false },
    friendly_with_cats: { type: Boolean, default: false },
    friendly_with_kids: { type: Boolean, default: false },
    friendly_with_adults: { type: Boolean, default: false },
    description: { type: String, trim: true, maxlength: 1024 },
  },
  {
    timestamps: true,
  }
);

module.exports = Dog = mongoose.model("dog", dogSchema);
