const { check, validationResult } = require("express-validator");

exports.validateUpdateRequest = [
  check("sitterId", "Please choose a sitter").not().isEmpty(),
  check("dogId", "Please select a dog").not().isEmpty(),
  check("start", "Please select a start date").not().isEmpty(),
  check("end", "Please select an end date").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateCreateRequest = [
  check("sitterId", "Please choose a sitter").not().isEmpty(),
  check("start", "Please select a start date").not().isEmpty(),
  check("end", "Please select an end date").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

