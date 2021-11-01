const express = require("express");
const router = express.Router();
const { validateUpdateRequest, validateCreateRequest } = require("../validators/request");
const { validateId } = require("../validators/common");
const protect = require("../middleware/auth");
const {
  loadRequest,
  listRequests,
  createRequest,
  deleteRequest,
  updateRequest,
  createRequestSitter,
} = require("../controllers/request");

router.route("/").get(protect, listRequests);

router.route("/:id").get(validateId, protect, loadRequest);

router.route("/").post(protect, validateCreateRequest, createRequest);

router.route("/:id").delete(validateId, protect, deleteRequest);

router
  .route("/:id")
  .patch(validateId, protect, validateUpdateRequest, updateRequest);

module.exports = router;
