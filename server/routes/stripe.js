const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateId } = require("../validators/common");
const {
  validateStripeRequest,
  validateListPaymentMethods,
  validateCreateCustomer,
  validateUpdateCustomer,
  validateCreatePaymentMethod,
} = require("../validators/stripe");
const {
  createPaymentIntent,
  createCustomer,
  updateCustomer,
  createPaymentMethod,
  listPaymentMethods,
} = require("../controllers/stripe");

router
  .route("/:id/pay")
  .post([protect, validateId, validateStripeRequest], createPaymentIntent);

router
  .route("/method/:id")
  .get(protect, validateListPaymentMethods, listPaymentMethods);

router
  .route("/method")
  .post(protect, validateCreatePaymentMethod, createPaymentMethod);

router.route("/customer").post(protect, validateCreateCustomer, createCustomer);

router
  .route("/customer")
  .patch(protect, validateUpdateCustomer, updateCustomer);

module.exports = router;
