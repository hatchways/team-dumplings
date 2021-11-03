const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Profile = require("../models/Profile");

// @route POST /messages
// @desc send new message in existing conversation between authenticated user (sender), and other user (recipient)
// @access private
exports.createMessage = asyncHandler(async (req, res, next) => {
  const { conversationId, text, recipientId } = req.body;
  const userId = req.user.id;

  const profile = await Profile.findOne({ user: userId });

  const conversation = await Conversation.findOne({
    _id: conversationId,
    members: { $all: [profile._id, recipientId] },
  });

  if (!conversation) {
    res.status(404).json({ error: "Conversation not found!" });
  }

  let message = await Message.create({
    conversationId,
    sender: profile._id,
    text,
  });

  conversation.latestMessage = message._id;
  await conversation.save();

  message = await Message.populate(message, {
    path: "sender",
    select: { firstName: 1, lastName: 1 },
  });

  if (message) {
    res.status(201).json({
      message,
    });
  } else {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

// @route PATCH /messages/:id
// @desc update message `read` to true, when message is read
// @access private
exports.updateMessageStatus = asyncHandler(async (req, res, next) => {
  const { conversationId, recipientId } = req.body;
  const messageId = req.params.id;
  const userId = req.user.id;

  const profile = await Profile.findOne({ user: userId });
  const conversation = await Conversation.findOne({
    _id: conversationId,
    members: { $all: [profile._id, recipientId] },
  });

  if (!conversation) {
    return res.status(404).json({ error: "Conversation not found!" });
  }

  const updatedMessage = await Message.findOneAndUpdate(
    {
      _id: messageId,
    },
    {
      read: true,
    },
    {
      runValidators: true,
      new: true,
    }
  ).populate("sender", "firstName lastName");

  if (updatedMessage) {
    res.status(200).json({
      message: updatedMessage,
    });
  } else {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});
