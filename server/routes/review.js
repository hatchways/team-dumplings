const express = require("express");
const {
  loadComments,
  createComment,
  loadStats,
} = require("../controllers/review");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateCreateComment } = require("../validators/review");

router.route("/").post(protect, validateCreateComment, createComment);
router.route("/:id").post(protect, loadComments);
router.route("/:id").get(protect, loadStats);

module.exports = router;
