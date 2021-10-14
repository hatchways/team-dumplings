const { check, validationResult } = require("express-validator");

exports.validateCreateUpdateDog = [
  check("name", "Please enter a name").not().isEmpty(),
  check("breed", "Please enter a breed").not().isEmpty(),
  check("size", "Please select a size").not().isEmpty(),
  check("gender", "Please select a gender").not().isEmpty(),
  check("yearofbirth", "Please select a year of birth").not().isEmpty(),
  check("neutered", "neutered is a boolean !").not().isBoolean(),
  check("chipped", "chipped is a boolean !").not().isBoolean(),
  check("vaccinated", "vaccinated is a boolean !").not().isBoolean(),
  check("House_trained", "House_trained is a boolean !").not().isBoolean(),
  check("friendly_with_dogs", "friendly_with_dogs is a boolean !")
    .not()
    .isBoolean(),
  check("friendly_with_cats", "friendly_with_cats is a boolean !")
    .not()
    .isBoolean(),
  check("friendly_with_kids", "friendly_with_kids is a boolean !")
    .not()
    .isBoolean(),
  check("friendly_with_adults", "friendly_with_adults is a boolean !")
    .not()
    .isBoolean(),
  check(
    "description",
    "Please enter a description with 1024 or less characters"
  ).isLength({
    max: 1024,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
