const asyncHandler = require("express-async-handler");
const Request = require("../models/Request");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const moment = require("moment");
const User = require("../models/User");

const getRequestPrice = asyncHandler(async (requestId, res) => {
  const request = await Request.findById(requestId);
  if (request) {
    const { start, end, sitterId } = request;
    const sittingHours = moment(end).diff(moment(start), "hours");
    const sitter = await User.findById(sitterId).populate({
      path: "profile",
      select: { rate: 1 },
    });

    if (sitter && sitter.profile) {
      return sittingHours * sitter.profile.rate * 100;
    } else {
      return res.sendStatus(404);
    }
  } else {
    return res.sendStatus(404);
  }
});

// @route POST /payments/:id/pay
// @desc Pay pet sitter for a request (after service completed)
// @access Private
exports.createPaymentIntent = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const amount = await getRequestPrice(id, res);
  stripe.paymentIntents.create(
    {
      amount,
      currency: "cad",
      payment_method_types: ["card"],
    },
    (stripeError, stripeResponse) => {
      if (stripeError) {
        res.status(500).json(stripeError);
      } else {
        res.status(200).json({
          success: { clientSecret: stripeResponse.client_secret },
        });
      }
    }
  );
});
