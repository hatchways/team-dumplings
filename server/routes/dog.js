const express = require("express");
const router = express.Router();
const { validateCreateUpdateDog } = require("../validators/dog");
const protect = require("../middleware/auth");
const {
  loadDog,
  listDogs,
  createDog,
  deleteDog,
  updateDog,
} = require("../controllers/dog");

router.route("/").get(protect, listDogs);

router.route("/:id").get(protect, loadDog);

router.route("/").post(protect, validateCreateUpdateDog, createDog);

router.route("/:id").delete(protect, deleteDog);

router.route("/:id").patch(protect, validateCreateUpdateDog, updateDog);

module.exports = router;
