const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const Profile = require("../models/Profile");

// @route GET /conversations
// @desc get all conversations for the authenticated user
// @access private
exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const profile = await Profile.findOne({ user: userId });

  const conversations = await Conversation.find({
    members: { $in: [profile._id] },
  }).populate("members", "firstName lastName");

  res.status(200).json({ conversations });
});

// @route GET /conversations/:id
// @desc get a conversation (messages included) for the authenticated user
// @access private
exports.getOneConversation = asyncHandler(async (req, res, next) => {
  const conversationId = req.params.id;
  const userId = req.user.id;
  const profile = await Profile.findOne({ user: userId });

  const conversation = await Conversation.findOne({
    _id: conversationId,
    members: { $in: [profile._id] },
  });

  if (!conversation) {
    return res.status(404).json({ error: "Conversation not found !" });
  }

  const messages = await Message.find({
    conversationId,
  }).populate("sender", "firstName lastName");

  res.status(200).json({
    conversationId,
    messages,
  });
});

// @route POST /conversations
// @desc create new conversation between authennticated user (sender), and other user (recipient)
// @access private
exports.createConversation = asyncHandler(async (req, res, next) => {
  const { members } = req.body;

  let conversation = await Conversation.findOne({
    members: { $all: members },
  });

  if (conversation) {
    return res.status(409).json({ error: "Conversation already exists !" });
  }

  conversation = await Conversation.create({ members });

  conversation = await Conversation.populate(conversation, {
    path: "members",
    select: { firstName: 1, lastName: 1 },
  });

  if (conversation) {
    res.status(201).json({ conversation });
  } else {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});
