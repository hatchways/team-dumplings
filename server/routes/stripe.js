const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateId, validateStripeRequest } = require("../validators/common");
const { createPaymentIntent } = require("../controllers/stripe");

router
  .route("/:id/pay")
  .post([protect, validateId, validateStripeRequest], createPaymentIntent);

module.exports = router;
