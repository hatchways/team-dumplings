const User = require("../models/User");
const Request = require("../models/request.model");
const asyncHandler = require("express-async-handler");
const ObjectId = require("mongoose").Types.ObjectId;

// @route GET /requests/id:
// @desc Get request for logged in user (sitter) by :id
// @access Private
exports.loadRequest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await Request.findById(id)
    .then((request) => {
      if (request) {
        res.status(200).send({
          success: {
            request: {
              ...request._doc,
            },
          },
        });
      }
      res.status(400).json({ errors: "Bad request !" });
    })
    .catch((error) => {
      res.status(400).json({ errors: error });
    });
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

  const requests = await Request.find({ user_id: ObjectId(user._id) });

  res.status(200).json({
    success: {
      requests: { requests },
    },
  });
});

// @route POST /requests/create
// @desc create new request for logged in user (dog owner)
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.create({
    user: ObjectId(req.user.id),
    sitter: ObjectId(req.body.sitter),
    dog: ObjectId(req.body.dog),
    ...req.body,
  });
  // to populate the request with sitter/dog data
  // await dog.populate("user").execPopulate();
  if (request) {
    res.status(201).json({
      success: {
        dog: {
          ...request._doc,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid request data");
  }
});

// @route DELETE /requests/delete/:id
// @desc Del request for logged in user (dog owner)
// @access Private
exports.deleteRequest = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  await Request.findByIdAndRemove(id)
    .then((removedRequest) => {
      if (removedRequest) {
        res.status(200).send({
          success: {
            request: {
              ...removedRequest._doc,
            },
          },
        });
      }
      res.status(400).json({ errors: "Bad request, Request does not exist !" });
    })
    .catch((error) => {
      res.status(400).json({ errors: error });
    });
});

// @route BATCH /requests/update/:id
// @desc update request for logged in user (dog owner)
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const newRequestData = req.body;

  await Request.findByIdAndUpdate(id, newRequestData, {
    runValidators: true,
    new: true,
  })
    .then((updatedRequest) => {
      res.status(200).send({
        success: {
          request: {
            ...updatedRequest._doc,
          },
        },
      });
    })
    .catch((error) => {
      res.status(400).json({ errors: error });
    });
});
