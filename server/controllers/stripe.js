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
    const { rate } = sitter.profile;

    const subtotal = sittingHours * rate;
    const fee = subtotal * 0.03;
    const total = subtotal + fee;

    if (sitter && sitter.profile) {
      return total * 100;
    } else {
      return res.sendStatus(404);
    }
  } else {
    return res.sendStatus(404);
  }
});

// @route POST /payments/:id/pay
// @desc create payement intent to payout pet sitter for a request (after service completed)
// @access Private
exports.createPaymentIntent = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { customer } = req.body;
  const amount = await getRequestPrice(id, res);
  stripe.paymentIntents.create(
    {
      customer,
      amount,
      currency: "cad",
      payment_method_types: ["card"],
    },
    (stripeError, stripeResponse) => {
      if (stripeError) {
        res.status(500).json({ error: stripeError });
      } else {
        res.status(200).json({
          clientSecret: stripeResponse.client_secret,
        });
      }
    }
  );
});

// @route POST /payments/customer
// @desc create a stripe customer
// @access Private
exports.createCustomer = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  stripe.customers.create(
    {
      name,
      email,
      phone,
      description: "LovingSitter.",
    },
    (stripeError, stripeResponse) => {
      if (stripeError) {
        res.status(500).json({ error: stripeError });
      } else if (stripeResponse) {
        res.status(200).json({
          customerId: stripeResponse.id,
        });
      } else {
        res.status(500);
        throw new Error("Internal Server Error");
      }
    }
  );
});

// @route PATCH /payments/customer
// @desc update a stripe customer default paymentMethod (default source)
// @access Private
exports.updateCustomer = asyncHandler(async (req, res, next) => {
  const { cardId, customerId } = req.body;
  stripe.customers.update(
    customerId,
    {
      default_source: cardId,
    },
    (stripeError, stripeResponse) => {
      if (stripeError) {
        res.status(500).json({ error: stripeError });
      } else {
        res.status(200).json({
          stripeResponse,
        });
      }
    }
  );
});

// @route POST /payments/method/
// @desc create stripe paymentMethod `token` and bind the token to the current customer
// @access Private
exports.createPaymentMethod = asyncHandler(async (req, res, next) => {
  const { creditCardNumber, cvcField, expDate, name, customerId } = req.body;
  const number = creditCardNumber.trim();
  const exp_month = parseInt(expDate.split("/")[0]);
  const exp_year = parseInt(expDate.split("/")[1]);
  const cvc = cvcField;

  stripe.tokens.create(
    {
      card: {
        name,
        number,
        exp_month,
        exp_year,
        cvc,
      },
    },
    (stripeError, stripeResponse) => {
      if (stripeError) {
        res.status(500).json({ error: stripeError });
      } else {
        stripe.customers.createSource(
          customerId,
          { source: stripeResponse.id },
          (stripeError, stripeResponse) => {
            if (stripeError) {
              res.status(500).json({ error: stripeError });
            } else {
              res.status(200).json({
                stripeResponse,
              });
            }
          }
        );
      }
    }
  );
});

// @route GET payments/method/:id
// @desc list payment methods for a given stripe customer
// @access Private
// @author @fetahokey
exports.listPaymentMethods = asyncHandler(async (req, res, next) => {
  const customerId = req.params.id;
  const paymentProfiles = [];

  stripe.customers.retrieve(customerId, (stripeError, customer) => {
    if (customer) {
      const default_source = customer.default_source;

      stripe.customers.listPaymentMethods(
        customerId,
        { type: "card" },
        (stripeError, paymentMethods) => {
          if (paymentMethods) {
            paymentMethods.data.map((item, index) => {
              const { exp_month, exp_year, last4, brand } = item.card;
              const { name } = item.billing_details;
              paymentProfiles[index] = {
                id: item.id,
                default: item.id == default_source,
                name,
                brand,
                expMonth: exp_month,
                expYear: exp_year,
                last4,
              };
            });
            res.status(200).json({ paymentProfiles });
          } else if (stripeError) {
            res.status(500).json({ error: stripeError });
          } else {
            res.status(500);
            throw new Error("Internal Server Error");
          }
        }
      );
    } else if (stripeError) {
      res.status(500).json({ error: stripeError });
    } else {
      res.status(500);
      throw new Error("Internal Server Error");
    }
  });
});

// @route POST /payments/:id/confirmed
// @desc change the request status when payments succeeded, to `paid`
// @access Private
exports.confirmPayment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const updatedRequest = await Request.findOneAndUpdate(
    {
      _id: id,
    },
    { status: "paid" },
    {
      runValidators: true,
      new: true,
    }
  );

  if (updatedRequest) {
    res.status(200).send({
      request: updatedRequest,
    });
  } else res.sendStatus(404);
});
