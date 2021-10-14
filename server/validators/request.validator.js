const { check, validationResult } = require("express-validator");

exports.validateCreateUpdateRequest = [
  check("sitter", "Please choose a sitter").not().isEmpty(),
  check("dog", "Please select a dog").not().isEmpty(),
  check("start", "Please select a start date").not().isEmpty().isDate(),
  check("end", "Please select an end date").not().isEmpty().isDate(),
  check("accepted", "Accepted is a boolean").isBoolean(),
  check("declined", "declined is a boolean !").isBoolean(),
  check("paid", "paid is a boolean !").isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
