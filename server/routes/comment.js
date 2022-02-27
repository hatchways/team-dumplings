const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { postComment, listComments } = require("../controllers/comment");

router.route("/").post(protect, postComment);

router.route("/:id").get(protect, listComments);

module.exports = router;