const express = require("express");
const { loadComments, createComment } = require("../controllers/rating");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateCreateComment } = require("../validators/rating");

router.route("/").post(protect, validateCreateComment, createComment);
router.route("/:id").get(protect, loadComments);

module.exports = router;
