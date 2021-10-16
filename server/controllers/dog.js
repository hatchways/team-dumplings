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
  } else res.sendStatus(404);
});

// @route GET /dogs
// @desc Get dogs for logged in user (dog owner)
// @access Private
exports.listDogs = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const dogs = await Dog.find({ ownerId: ObjectId(user._id) });
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
  const newDog = ({
    name,
    breed,
    size,
    gender,
    yearOfBirth,
    neutered,
    chipped,
    vaccinated,
    houseTrained,
    friendlyWithDogs,
    friendlyWithCats,
    friendlyWithKids,
    friendlyWithAdults,
    description,
  } = req.body);

  const dog = await Dog.create({
    ownerId: ObjectId(req.user.id),
    ...newDog,
  });

  if (dog) {
    res.status(201).json({
      success: {
        dog,
      },
    });
  } else {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

// @route DELETE /dogs/:id
// @desc Del dog for logged in user (dog owner)
// @access Private
exports.deleteDog = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const authenticatedOwnerId = req.user.id;

  const removedDog = await Dog.findOneAndDelete({
    _id: id,
    ownerId: authenticatedOwnerId,
  });

  if (removedDog) {
    res.status(200).send({
      success: {
        dog: removedDog,
      },
    });
  } else res.sendStatus(404);
});

// @route BATCH /dogs/:id
// @desc update dog for logged in user (dog owner)
// @access Private
exports.updateDog = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const authenticatedOwnerId = req.user.id;

  const newDogData = ({
    ownerId,
    name,
    breed,
    size,
    gender,
    yearOfBirth,
    neutered,
    chipped,
    vaccinated,
    houseTrained,
    friendlyWithDogs,
    friendlyWithCats,
    friendlyWithKids,
    friendlyWithAdults,
    description,
  } = req.body);

  if (!(authenticatedOwnerId === ownerId)) {
    res.status(403);
    throw new Error("You don’t have permission to access this resource.");
  }

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
  } else res.sendStatus(404);
});
