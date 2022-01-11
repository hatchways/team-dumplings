const expressAsyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const Rating = require("../models/Rating");

exports.createComment = expressAsyncHandler(async (req, res, next) => {
  const { text, rating, profile } = req.body;
  const reviewer = req.user.id;

  const reviewerProfile = await Profile.findOne({ user: reviewer });

  console.log("reviewerProfile: ", reviewerProfile._id);

  const newRating = await Rating.create({
    text,
    rating,
    profile,
    reviewer: reviewerProfile._id,
  });

  if (newRating) {
    res.status(201).json({
      rating: newRating,
    });
  } else {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

exports.loadComments = expressAsyncHandler(async (req, res, next) => {
  const profile = req.params.id;
  Rating.find({ profile })
    .populate("reviewer")
    .exec()
    .then((comments) => {
      if (comments) {
        res.status(200).send({
          ratings: comments,
        });
      }
    });
});
