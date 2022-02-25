const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const {
    createBlog,
    getBlog,
    listBlogs,
  } = require("../controllers/blog");

router.route("/").post(protect, createBlog);

router.route("/:id").get(protect, getBlog);

router.route("/").get(protect, listBlogs);

module.exports = router;