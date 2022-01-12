const { check, validationResult } = require("express-validator");

exports.validateCreateComment = [
  check("text", "Please type a valid comment !").not().isEmpty(),
  check("rating", "Rating should not be null ").not().isEmpty(),
  check("profile", "Profile should not be null").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
