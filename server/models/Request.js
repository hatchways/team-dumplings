const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.ObjectId, required: true, ref: "User" },
    sitterId: { type: mongoose.ObjectId, required: true, ref: "User" },
    dogId: { type: mongoose.ObjectId, required: true, ref: "Dog" },
    //if we update this to number, we should update; the booking :'( view
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
