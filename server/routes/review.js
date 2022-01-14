const express = require("express");
const {
  loadComments,
  createComment,
  likeComment,
  isLikedComment,
} = require("../controllers/review");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateCreateComment } = require("../validators/review");

router.route("/").post(protect, validateCreateComment, createComment);
router.route("/like/:id").get(protect, isLikedComment);
router.route("/like").post(protect, likeComment);
router.route("/:id").post(protect, loadComments);

module.exports = router;
