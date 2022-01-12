const express = require("express");
const { loadComments, createComment } = require("../controllers/review");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateCreateComment } = require("../validators/review");

router.route("/").post(protect, validateCreateComment, createComment);
router.route("/:id").post(protect, loadComments);

module.exports = router;
