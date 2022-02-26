const User = require("../models/User");
const Blog = require("../models/Blog");
const comment = require("../models/Comment");
const asyncHandler = require("express-async-handler");
const ObjectId = require("mongoose").Types.ObjectId;

// @route POST /blogs
// @desc post a blog for logged in user
// @access Private
exports.createBlog = asyncHandler(async (req, res, next) => {
    const newBlog = { title, image, description } = req.body;
    const blogOwnerId = req.user.id;

    const blog = await Blog.create({
        blogOwner: ObjectId(blogOwnerId),
        ...newBlog
    });

    if (blog) {
        res.status(201).json({
            success: {
                blog
            }
        })
    } else {
        res.status(500);
        throw new Error("Internal Server Error");
    }
});

// @route Get /blogs/:id
// @desc get a certin blog
// @access Private
exports.getBlog = asyncHandler(async (req, res, next) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (blog) {
        res.status(200).json({
            success: {
                blog
            }
        })
    } else {
        res.status(500);
        throw new Error("Internal Server Error");
    }
});

// @route Get /blogs
// @desc get all blogs
// @access Private
exports.listBlogs = asyncHandler(async (req, res, next) => {
    const page = req.query.page;
    const blogsPerPage = 9;

    //To start from page 0
    const blogsToSkip = (page - 1) * blogsPerPage;

    const blogs = await Blog.find().sort().skip(blogsToSkip).limit(blogsPerPage);

    const blogsCount = await Blog.find().count();

    numberOfPages = Math.ceil(blogsCount / blogsPerPage);

    if (blogs) {
        res.status(200).json({
            success: {
                blogs,
                numberOfPages
            }
        })
    } else {
        res.status(500);
        throw new Error("Internal Server Error");
    }
});

