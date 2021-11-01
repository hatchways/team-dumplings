const { check, validationResult } = require("express-validator");
const Profile = require("../models/Profile");
const validator = require("validator");

exports.validateCreateConversation = [
  check("members", "members field is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateConversationMemebers = async (req, res, next) => {
  const { members } = req.body;

  await members.forEach(async (member) => {
    if (!validator.isMongoId(member)) {
      return res.status(400).json({ error: "Invalid memeber id" });
    }
    const profile = await Profile.findById(member);

    if (!profile) {
      return res
        .status(404)
        .json({ error: "The specified user does not have a valid profile" });
    }
  });
  next();
};

exports.validateUserProfile = async (req, res, next) => {
  const userId = req.user.id;
  const profile = await Profile.findOne({ user: userId });

  if (!profile) {
    return res
      .status(404)
      .json({ error: "The specified user does not have a valid profile" });
  }
  next();
};
