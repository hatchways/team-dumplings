const mongoose = require("mongoose");
const Profile = require("./Profile");

const conversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
  },
  {
    timestamps: true,
  }
);

module.exports = Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);
