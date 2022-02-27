const User = require("../models/User");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const asyncHandler = require("express-async-handler");
const ObjectId = require("mongoose").Types.ObjectId;

// @route POST /comment
// @desc post a comment for logged in user
// @access Private
exports.postComment = asyncHandler(async (req, res, next) => {
    const newComment = { title, text } = req.body;
    console.log(title, text)
    const { blogId } = req.body;
    const commentOwner = req.user.id;

    const comment = await Comment.create({
        commentOwner: ObjectId(commentOwner),
        blogId: ObjectId(blogId),
        ...newComment
    });

    if (comment) {
        res.status(201).json({
            success: {
                comment
            }
        })
    } else {
        res.status(500);
        throw new Error("Internal Server Error");
    }
});