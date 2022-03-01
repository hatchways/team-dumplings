const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validatePostLike } = require('../validators/blog');

const {
    createBlog,
    getBlog,
    listBlogs,
    postLike,
  } = require("../controllers/blog");

router.route("/").post(protect, createBlog);

router.route("/:id").get(protect, getBlog);

router.route("/").get(protect, listBlogs);

router.route("/like/").post(protect, validatePostLike, postLike);

module.exports = router;