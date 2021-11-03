const User = require("../models/User");
const asyncHandler = require("express-async-handler");
/**
 * 
 *   const profiles = await Profile.find()
    .populate({
      path: "user",
      select: { password: 0 },
      match: {
        role: "sitter",
      },
      options: { retainNullValues: false },
      transform: (doc, id) => (doc == null ? null : doc),
    })
    .exec()
    .then((profiles) => {
      return profiles.filter((profile) => {
        if (filter) {
          if (profile.user) {
            if (
              !_.isEmpty(profile.availability[dateIn]) &&
              !_.isEmpty(profile.availability[dateOff])
            ) {
              const searchTarget = [
                profile.firstName.toLowerCase(),
                profile.lastName.toLowerCase(),
                profile.address.toLowerCase(),
              ];
              const result = searchTarget.find((searchTargetItem) =>
                searchTargetItem.includes(search.toLowerCase())
              );
              return !!result;
            }
          }
          return false;
        } else {
          return profile.user != null;
        }
      });
    });
 */
// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: "i" },
    })
      .select(" -password  ")
      .populate("profile", "firstName lastName")
      .exec()
      .then((result) => {
        return result.filter((userWithProfile) => !!userWithProfile.profile);
      });
  }
  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({ users: users });
});
