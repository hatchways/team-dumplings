const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { postComment } = require("../controllers/comment");

router.route("/").post(protect, postComment);

module.exports = router;