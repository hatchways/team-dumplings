const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { chargeCustomer } = require("../controllers/stripe");

router.route("/:id/pay").post(protect, chargeCustomer);
module.exports = router;
