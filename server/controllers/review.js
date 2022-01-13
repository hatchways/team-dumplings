const expressAsyncHandler = require("express-async-handler");
const CommentLikes = require("../models/CommentLikes");
const Profile = require("../models/Profile");
const Rating = require("../models/Rating");
const ObjectId = require("mongoose").Types.ObjectId;

exports.isLikedComment = expressAsyncHandler(async (req, res, next) => {
  const reviewer = req.user.id;
  const commentId = req.params.id;
  const reviewerProfile = await Profile.findOne({ user: reviewer });

  const isLikedComment_ = await CommentLikes.findOne({
    comment: ObjectId(commentId),
    profile: ObjectId(reviewerProfile._id),
  });

  const likedComment = await Rating.findById(commentId);

  if (isLikedComment_) {
    res.status(200).json({
      commentAndReaction: { like: true, rating: likedComment },
    });
  } else {
    res.status(200).json({
      commentAndReaction: { like: false, rating: likedComment },
    });
  }
});

exports.likeComment = expressAsyncHandler(async (req, res, next) => {
  const reviewer = req.user.id;
  const { commentId, val } = req.body;
  const reviewerProfile = await Profile.findOne({ user: reviewer });
  const updatedRating = await Rating.findOneAndUpdate(
    { _id: ObjectId(commentId) },
    {
      $inc: {
        likes: val,
      },
    }
  );
  if (updatedRating) {
    if (val > 0) {
      await CommentLikes.create({
        comment: commentId,
        profile: reviewerProfile._id,
      });
    } else {
      try {
        await CommentLikes.findOneAndDelete({
          comment: ObjectId(commentId),
          profile: ObjectId(reviewerProfile._id),
        });
      } catch (error) {
        res.status(500);
        throw new Error("Internal Server Error");
      }
    }
    res.status(200).json({ rating: updatedRating });
  } else {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

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
    const reviewedProfile = await Profile.findById(profile);
    let { ratingsByValue, total } = reviewedProfile;

    ratingsByValue[rating] = ratingsByValue[rating] + 1;
    total = total + 1;

    const updates = {
      total,
      ratingsByValue,
      sumRating: parseFloat(
        (
          (ratingsByValue[5] * 5 +
            ratingsByValue[4] * 4 +
            ratingsByValue[3] * 3 +
            ratingsByValue[2] * 2 +
            ratingsByValue[1]) /
          total
        ).toFixed(1)
      ),
    };
    await Profile.findByIdAndUpdate(profile, updates, {
      new: true,
    });

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
