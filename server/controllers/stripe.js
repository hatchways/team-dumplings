const asyncHandler = require("express-async-handler");
const Request = require("../models/Request");
const stripe = require("stripe")(process.env.STRIPE_KEY);

// @route POST /request/:id/pay
// @desc Pay pet sitter for a request (after service completed)
// @access Private
exports.chargeCustomer = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "cad",
    },
    (stripeError, stripeResponse) => {
      if (stripeError) {
        res.status(500).json(stripeError);
      } else {
        Request.findOneAndUpdate(
          {
            _id: id,
            status: "done",
          },
          { $set: { status: "paid" } },
          (err) => {
            if (err) {
              return res.sendStatus(404);
            }
          }
        );

        res.status(200).json(stripeResponse);
      }
    }
  );
});
