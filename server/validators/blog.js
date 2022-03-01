const { check, validationResult } = require("express-validator");
const Profile = require("../models/Profile");
const validator = require("validator");

exports.validatePostLike = [
  check("userId", "userId field is required").not().isEmpty(),
  check("blogId", "blogId field is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];


exports.validatePostComment = [
  check("title", "title field is required").not().isEmpty(),
  check("text", "text field is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
