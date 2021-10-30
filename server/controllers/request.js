const User = require("../models/User");
const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const ObjectId = require("mongoose").Types.ObjectId;

// @route GET /requests/id:
// @desc Get request for logged in user (sitter) by :id
// @access Private
exports.loadRequest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const request = await Request.findById(id);

  if (request) {
    res.status(200).send({
      request,
    });
  } else res.sendStatus(404);
});

// @route GET /requests
// @desc Get requests for logged in user (sitter)
// @access Private
exports.listRequests = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  let params = {};
  if (user.role == "sitter") {
    params = { sitterId: ObjectId(user._id) };
  } else {
    params = { ownerId: ObjectId(user._id) };
  }
  const requests = await Request.find({
    ...params,
  })
    .populate({
      path: "sitterId",
      populate: {
        path: "profile",
        select: { firstName: 1, lastName: 1, rate: 1 },
      },
      select: { username: 1 },
    })
    .populate({
      path: "ownerId",
      populate: {
        path: "profile",
        select: { firstName: 1, lastName: 1 },
      },
      select: { username: 1 },
    })
    .populate("dogId");

  res.status(200).json({
    requests,
  });
});

// @route POST /requests
// @desc create new request for logged in user (dog owner)
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  const { sitterId, dogId, start, end, status } = req.body;

  const request = await Request.create({
    ownerId: ObjectId(req.user.id),
    sitterId: ObjectId(sitterId),
    dogId: ObjectId(dogId),
    start,
    end,
    status,
  });
  if (request) {
    res.status(201).json({
      request,
    });
  } else {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

// @route DELETE /requests/:id
// @desc Del request for logged in user (dog owner)
// @access Private
exports.deleteRequest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const authenticatedUserId = req.user.id;

  const removedRequest = await Request.findOneAndDelete({
    _id: id,
    ownerId: authenticatedUserId,
    status: { $in: ["pending", "declined", "done"] },
  });

  if (removedRequest) {
    res.status(200).send({
      request: removedRequest,
    });
  } else res.sendStatus(404);
});

// @route BATCH /requests/:id
// @desc update request for logged in user (dog owner)
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const newRequestData = ({ sitterId, dogId, start, end, status } = req.body);

  const updatedRequest = await Request.findOneAndUpdate(
    {
      _id: id,
      status: "pending",
    },
    newRequestData,
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
