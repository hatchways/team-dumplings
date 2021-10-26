const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateStripeRequest } = require("..//validators/common");
const { chargeCustomer } = require("../controllers/stripe");

router.route("/:id/pay").post(protect, validateStripeRequest, chargeCustomer);
module.exports = router;
