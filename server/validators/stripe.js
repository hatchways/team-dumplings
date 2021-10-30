const { check, validationResult } = require("express-validator");

exports.validateStripeRequest = (req, res, next) => {
  if (!req.body.customer) return res.status(400).send("Stripe Bad Request");
  next();
};

exports.validateListPaymentMethods = (req, res, next) => {
  if (!req.params.id) return res.status(400).send("Stripe Bad Request");
  next();
};

exports.validateCreateCustomer = [
  check("email", "Please enter a valid email address").isEmail(),
  check("name", "Name is required").not().isEmpty(),
  check("phone", "Phone is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateUpdateCustomer = [
  check("customerId", "CustomerId is required").not().isEmpty(),
  check("cardId", "CardId is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateCreatePaymentMethod = [
  check("customerId", "CustomerId is required").not().isEmpty(),
  check("creditCardNumber", "CreditCardNumber is required").not().isEmpty(),
  check("cvcField", "CvcField is required").not().isEmpty(),
  check("expDate", "ExpDate is required").not().isEmpty(),
  check("name", "Name is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
