const mongoose = require("mongoose");

const dayAvailabilitySchema = new mongoose.Schema({
  startTime: {
    type: Number,
    min: 0,
    max: 23,
  },
  endTime: {
    type: Number,
    min: 0,
    max: 23,
  },
});

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  gender: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    enum: ["male", "female", "other"],
  },
  birthDate: Date,
  phoneNumber: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  availability: {
    0: [dayAvailabilitySchema],
    1: [dayAvailabilitySchema],
    2: [dayAvailabilitySchema],
    3: [dayAvailabilitySchema],
    4: [dayAvailabilitySchema],
    5: [dayAvailabilitySchema],
    6: [dayAvailabilitySchema],
  },
  timezone: Number,
  rate: Number,
  customerId: String,
  ratingsByValue: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
  },
  sumRating: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
