const User = require("../models/User");
const Dog = require("../models/dog.model");
const asyncHandler = require("express-async-handler");
const ObjectId = require("mongoose").Types.ObjectId;

// @route GET /dogs/id:
// @desc Get dog for logged in user by :id
// @access Private
exports.loadDog = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await Dog.findById(id)
    .then((dog) => {
      if (dog) {
        res.status(200).send({
          success: {
            dog: {
              ...dog._doc,
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

// @route GET /dogs
// @desc Get dogs for logged in user
// @access Private
exports.listDogs = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const dogs = await Dog.find({ user_id: ObjectId(user._id) });
  res.status(200).json({
    success: {
      dogs: { dogs },
    },
  });
});

// @route POST /dogs/create
// @desc create new dog for logged in user (dog owner)
// @access Private
exports.createDog = asyncHandler(async (req, res, next) => {
  const dog = await Dog.create({
    user: ObjectId(req.user.id),
    ...req.body,
  });
  // to populate the dog with user data
  // await dog.populate("user").execPopulate();
  if (dog) {
    res.status(201).json({
      success: {
        dog: {
          ...dog._doc,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid dog data");
  }
});

// @route DELETE /dogs/delete/:id
// @desc Del dog for logged in user (dog owner)
// @access Private
exports.deleteDog = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  await Dog.findByIdAndRemove(id)
    .then((removedDog) => {
      if (removedDog) {
        res.status(200).send({
          success: {
            dog: {
              ...removedDog._doc,
            },
          },
        });
      }
      res.status(400).json({ errors: "Bad request, Dog does not exist !" });
    })
    .catch((error) => {
      res.status(400).json({ errors: error });
    });
});

// @route BATCH /dogs/update/:id
// @desc update dog for logged in user (dog owner)
// @access Private
exports.updateDog = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const newDogData = req.body;

  await Dog.findByIdAndUpdate(id, newDogData, {
    runValidators: true,
    new: true,
  })
    .then((updatedDog) => {
      res.status(200).send({
        success: {
          dog: {
            ...updatedDog._doc,
          },
        },
      });
    })
    .catch((error) => {
      res.status(400).json({ errors: error });
    });
});
