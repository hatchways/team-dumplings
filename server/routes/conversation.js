const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  validateCreateConversation,
  validateUserProfile,
  validateConversationMemebers,
} = require("../validators/conversation");
const {
  getAllConversations,
  getOneConversation,
  createConversation,
} = require("../controllers/conversation");
const { validateId } = require("../validators/common");

router.route("/").get(protect, validateUserProfile, getAllConversations);

router
  .route("/:id")
  .get([protect, validateId, validateUserProfile], getOneConversation);

router
  .route("/")
  .post(
    [protect, validateCreateConversation, validateConversationMemebers],
    createConversation
  );

module.exports = router;
