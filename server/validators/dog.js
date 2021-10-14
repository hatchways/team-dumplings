const { check, validationResult } = require("express-validator");

exports.validateCreateUpdateDog = [
  check("name", "Please enter a name").not().isEmpty(),
  check("breed", "Please enter a breed").not().isEmpty(),
  check("size", "Please select a size").not().isEmpty(),
  check("gender", "Please select a gender").not().isEmpty(),
  check("yearOfBirth", "Please select a year of birth").not().isEmpty(),
  check("neutered", "neutered is a boolean !").not().isBoolean(),
  check("chipped", "chipped is a boolean !").not().isBoolean(),
  check("vaccinated", "vaccinated is a boolean !").not().isBoolean(),
  check("HouseTrained", "HouseTrained is a boolean !").not().isBoolean(),
  check("friendlyWithDogs", "friendlyWithDogs is a boolean !")
    .not()
    .isBoolean(),
  check("friendlyWithCats", "friendlyWithCats is a boolean !")
    .not()
    .isBoolean(),
  check("friendlyWithKids", "friendlyWithKids is a boolean !")
    .not()
    .isBoolean(),
  check("friendlyWithAdults", "friendlyWithAdults is a boolean !")
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

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
