const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validatePostComment } = require('../validators/blog');

const { postComment, listComments } = require("../controllers/comment");

router.route("/").post(protect, validatePostComment, postComment);

router.route("/:id").get(protect, listComments);

module.exports = router;