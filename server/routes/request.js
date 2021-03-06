const express = require("express");
const router = express.Router();
const { validateCreateUpdateRequest } = require("../validators/request");
const { validateId } = require("../validators/common");
const protect = require("../middleware/auth");
const {
  loadRequest,
  listRequests,
  createRequest,
  deleteRequest,
  updateRequest,
} = require("../controllers/request");

router.route("/").get(protect, listRequests);

router.route("/:id").get(validateId, protect, loadRequest);

router.route("/").post(protect, validateCreateUpdateRequest, createRequest);

router.route("/:id").delete(validateId, protect, deleteRequest);

router
  .route("/:id")
  .patch(validateId, protect, validateCreateUpdateRequest, updateRequest);

module.exports = router;
