const { check, validationResult } = require("express-validator");
const validator = require("validator");
const Message = require("../models/Message");
const Profile = require("../models/Profile");

exports.validateCreateMessageRequest = [
  check("conversationId", "members field is required").not().isEmpty(),
  check("text", "text field is required").not().isEmpty(),
  check("recipientId", "recipientId field is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateUpdateMessageRequest = [
  check("conversationId", "members field is required").not().isEmpty(),
  check("recipientId", "recipientId field is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateCreateUpdateMessage = async (req, res, next) => {
  const userId = req.user.id;
  const { conversationId, recipientId } = req.body;

  let profile = await Profile.findOne({ user: userId });

  if (!profile) {
    return res.status(404).json({
      error: "The specified user does not have a valid profile",
    });
  }

  if (!validator.isMongoId(conversationId))
    return res.status(400).send("Bad Request");

  if (!validator.isMongoId(recipientId))
    return res.status(400).send("Bad Request");

  profile = await Profile.findById(recipientId);

  if (!profile) {
    return res.status(404).json({
      error: "The specified recipient (user) does not have a valid profile",
    });
  }
  next();
};

exports.validateUpateMessageStatus = async (req, res, next) => {
  const messageId = req.params.id;
  const message = await Message.findById(messageId);
  if (!message) {
    return res.status(404).json({ error: "Message not found !" });
  }
  next();
};
