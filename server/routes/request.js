const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  listRequests,
  loadRequest,
  createRequest,
  deleteRequest,
  updateRequest,
} = require("../controllers/request");
const { validateCreateUpdateRequest } = require("../validators/request");

router.route("/").get(protect, listRequests);

router.route("/:id").get(protect, loadRequest);

router.route("/").post(protect, validateCreateUpdateRequest, createRequest);

router.route("/:id").delete(protect, deleteRequest);

router.route("/:id").patch(protect, validateCreateUpdateRequest, updateRequest);

module.exports = router;