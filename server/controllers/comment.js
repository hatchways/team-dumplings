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

// @route list /comment/:id
// @desc list 5 comments max for logged in user
// @access Private
exports.listComments = asyncHandler(async (req, res, next) => {
    const blodId = req.params.id;
    const page = req.query.page;
    const commentsPerPage = 5;
    const commentsToSkip = (page - 1) * commentsPerPage;

    const comments = await Comment.find({ blogId: ObjectId(blodId) })
                        .sort({ createdAt: -1 }).skip(commentsToSkip).limit(commentsPerPage);
    
    const commentsCount = await Comment.find({ blogId: ObjectId(blodId) }).count();

    const numberOfPages = Math.ceil(commentsCount / commentsPerPage);

    if (comments) {
        res.status(201).json({
            success: {
                comments,
                numberOfPages
            }
        })
    } else {
        res.status(500);
        throw new Error("Internal Server Error");
    }
});