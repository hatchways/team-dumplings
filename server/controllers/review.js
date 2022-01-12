const expressAsyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const Rating = require("../models/Rating");

exports.createComment = expressAsyncHandler(async (req, res, next) => {
  const { text, rating, profile } = req.body;
  const reviewer = req.user.id;
  const reviewerProfile = await Profile.findOne({ user: reviewer });

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
  const { limit = 5, skip = 0 } = req.body;
  Rating.find({ profile })
    .populate("reviewer")
    .limit(limit)
    .skip(skip)
    .sort({
      createdAt: "desc",
    })
    .exec()
    .then((comments) => {
      if (comments) {
        res.status(200).send({
          ratings: comments,
        });
      }
    });
});

exports.loadStats = expressAsyncHandler(async (req, res, next) => {
  const profile = req.params.id;
  Rating.find({ profile })
    .exec()
    .then((comments) => {
      if (comments) {
        const sumRating = (
          comments.reduce((a, { rating }) => a + rating, 0) / comments.length
        ).toFixed(1);
        const sum1Ratings =
          (comments.filter((comment) => comment.rating == 1).length * 100) /
          comments.length;
        const sum2Ratings =
          (comments.filter((comment) => comment.rating == 2).length * 100) /
          comments.length;
        const sum3Ratings =
          (comments.filter((comment) => comment.rating == 3).length * 100) /
          comments.length;
        const sum4Ratings =
          (comments.filter((comment) => comment.rating == 4).length * 100) /
          comments.length;
        const sum5Ratings =
          (comments.filter((comment) => comment.rating == 5).length * 100) /
          comments.length;
        const total = comments.length;
        res.status(200).json({
          stats: {
            sumRating,
            sum1Ratings,
            sum2Ratings,
            sum3Ratings,
            sum4Ratings,
            sum5Ratings,
            total,
          },
        });
      } else {
        res.status(200).json({
          stats: {
            sumRating: 0,
            sum1Ratings: 0,
            sum2Ratings: 0,
            sum3Ratings: 0,
            sum4Ratings: 0,
            sum5Ratings: 0,
            total: 0,
          },
        });
      }
    });
});
