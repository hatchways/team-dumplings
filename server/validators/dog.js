const { check, validationResult } = require("express-validator");

exports.validateCreateUpdateDog = [
  check("name", "Please enter a name").not().isEmpty(),
  check("breed", "Please enter a breed").not().isEmpty(),
  check("size", "Please select a size").not().isEmpty(),
  check("gender", "Please select a gender").not().isEmpty(),
  check("yearOfBirth", "Please select a year of birth").not().isEmpty(),
  check("neutered", "neutered is a boolean !")
    .isBoolean()
    .optional({ nullable: true }),
  check("chipped", "chipped is a boolean !")
    .isBoolean()
    .optional({ nullable: true }),
  check("vaccinated", "vaccinated is a boolean !")
    .isBoolean()
    .optional({ nullable: true }),
  check("houseTrained", "houseTrained is a boolean !")
    .isBoolean()
    .optional({ nullable: true }),
  check("friendlyWithDogs", "friendlyWithDogs is a boolean !")
    .isBoolean()
    .optional({ nullable: true }),
  check("friendlyWithCats", "friendlyWithCats is a boolean !")
    .isBoolean()
    .optional({ nullable: true }),
  check("friendlyWithKids", "friendlyWithKids is a boolean !")
    .isBoolean()
    .optional({ nullable: true }),
  check("friendlyWithAdults", "friendlyWithAdults is a boolean !")
    .isBoolean()
    .optional({ nullable: true }),
  check(
    "description",
    "Please enter a description with 1024 or less characters"
  )
    .isLength({
      max: 1024,
    })
    .optional({ nullable: true }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
