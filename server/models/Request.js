const mongoose = require("mongoose");
// update the validation function in request (start>=end) Model & addressing code review comments
const requestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.ObjectId, required: true, ref: "User" },
    sitterId: { type: mongoose.ObjectId, required: true, ref: "User" },
    dogId: { type: mongoose.ObjectId, required: true, ref: "Dog" },
    start: { type: Date, required: true, trim: true },
    end: { type: Date, required: true, trim: true },
    status: {
      type: String,
      trim: true,
      lowercase: true,
      default: "pending",
      enum: ["pending", "declined", "accepted", "paid", "progress", "done"],
    },
  },
  {
    timestamps: true,
  }
);

requestSchema.pre("validate", function (next) {
  if (this.start > this.end) {
    this.invalidate(
      "start",
      "Start date must be less than end date !",
      this.start
    );
  }
  next();
});

module.exports = request = mongoose.model("Request", requestSchema);
