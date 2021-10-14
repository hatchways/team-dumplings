const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  listRequests,
  loadRequest,
  createRequest,
  deleteRequest,
  updateRequest,
} = require("../controllers/request.controller");
const {
  validateCreateUpdateRequest,
} = require("../validators/request.validator");

router.route("/").get(protect, listRequests);

router.route("/:id").get(protect, loadRequest);

router
  .route("/create")
  .post(protect, validateCreateUpdateRequest, createRequest);

router.route("/delete/:id").delete(protect, deleteRequest);

router
  .route("/update/:id")
  .patch(protect, validateCreateUpdateRequest, updateRequest);

module.exports = router;
