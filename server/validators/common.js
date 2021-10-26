const mongoose = require("mongoose");

exports.validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Bad Request");
  next();
};

exports.validateStripeRequest = (req, res, next) => {
  if (!req.body.tokenId || !req.body.amount)
    return res.status(400).send("Stripe Bad Request");
  next();
};
