const User = require("../models/User");
const Dog = require("../models/Dog");
const asyncHandler = require("express-async-handler");
const ObjectId = require("mongoose").Types.ObjectId;

// @route GET /dogs/:id:
// @desc Get dog for logged in user by :id
// @access Private
exports.loadDog = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const dog = await Dog.findById(id);

  if (dog) {
    res.status(200).send({
      success: {
        dog,
      },
    });
  } else res.status(400).json({ errors: "Bad request !" });
});

// @route GET /dogs
// @desc Get dogs for logged in user
// @access Private
exports.listDogs = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const dogs = await Dog.find({ userId: ObjectId(user._id) });
  res.status(200).json({
    success: {
      dogs,
    },
  });
});

// @route POST /dogs
// @desc create new dog for logged in user (dog owner)
// @access Private
exports.createDog = asyncHandler(async (req, res, next) => {
  const dog = await Dog.create({
    userId: ObjectId(req.user.id),
    ...req.body,
  });

  if (dog) {
    res.status(201).json({
      success: {
        dog,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid dog data");
  }
});

// @route DELETE /dogs/:id
// @desc Del dog for logged in user (dog owner)
// @access Private
exports.deleteDog = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  const removedDog = await Dog.findByIdAndRemove(id);

  if (removedDog) {
    res.status(200).send({
      success: {
        dog: removedDog,
      },
    });
  } else res.status(400).json({ errors: "Bad request, Dog does not exist !" });
});

// @route BATCH /dogs/:id
// @desc update dog for logged in user (dog owner)
// @access Private
exports.updateDog = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const newDogData = req.body;

  const updatedDog = await Dog.findByIdAndUpdate(id, newDogData, {
    runValidators: true,
    new: true,
  });
  if (updatedDog) {
    res.status(200).send({
      success: {
        dog: updatedDog,
      },
    });
  } else res.status(400).json({ errors: "Bad request, Dog does not exist !" });
});
