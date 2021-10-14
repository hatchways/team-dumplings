const { check, validationResult } = require("express-validator");

exports.validateCreateUpdateRequest = [
  check("sitterId", "Please choose a sitter").not().isEmpty(),
  check("dogId", "Please select a dog").not().isEmpty(),
  check("start", "Please select a start date").not().isEmpty().isDate(),
  check("end", "Please select an end date").not().isEmpty().isDate(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
