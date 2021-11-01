const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  validateCreateMessageRequest,
  validateCreateUpdateMessage,
  validateUpateMessageStatus,
  validateUpdateMessageRequest,
} = require("../validators/message");
const {
  createMessage,
  updateMessageStatus,
} = require("../controllers/message");
const { validateId } = require("../validators/common");

router
  .route("/")
  .post(
    [protect, validateCreateMessageRequest, validateCreateUpdateMessage],
    createMessage
  );

router
  .route("/:id")
  .patch(
    [
      protect,
      validateId,
      validateUpdateMessageRequest,
      validateUpateMessageStatus,
      validateCreateUpdateMessage,
    ],
    updateMessageStatus
  );

module.exports = router;
