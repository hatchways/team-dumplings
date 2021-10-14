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
      success: {
        request,
      },
    });
  } else res.status(400).json({ errors: "Bad request !" });
});

// @route GET /requests
// @desc Get requests for logged in user (sitter)
// @access Private
exports.listRequests = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const requests = await Request.find({ userId: ObjectId(user._id) });

  res.status(200).json({
    success: {
      requests,
    },
  });
});

// @route POST /requests
// @desc create new request for logged in user (dog owner)
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.create({
    userId: ObjectId(req.user.id),
    sitterId: ObjectId(req.body.sitterId),
    dogId: ObjectId(req.body.dogId),
    ...req.body,
  });
  if (request) {
    res.status(201).json({
      success: {
        request,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid request data");
  }
});

// @route DELETE /requests/:id
// @desc Del request for logged in user (dog owner)
// @access Private
exports.deleteRequest = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  const removedRequest = await Request.findByIdAndRemove(id);

  if (removedRequest) {
    res.status(200).send({
      success: {
        request: removedRequest,
      },
    });
  } else
    res.status(400).json({ errors: "Bad request, Request does not exist !" });
});

// @route BATCH /requests/:id
// @desc update request for logged in user (dog owner)
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const newRequestData = req.body;

  const updatedRequest = await Request.findByIdAndUpdate(id, newRequestData, {
    runValidators: true,
    new: true,
  });
  if (updatedRequest) {
    res.status(200).send({
      success: {
        request: updatedRequest,
      },
    });
  } else res.status(400).json({ errors: "Bad request, Dog does not exist !" });
});
