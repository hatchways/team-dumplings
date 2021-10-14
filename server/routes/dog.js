const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  listDogs,
  createDog,
  deleteDog,
  updateDog,
  loadDog,
} = require("../controllers/dog");
const { validateCreateUpdateDog } = require("../validators/dog");

router.route("/").get(protect, listDogs);

router.route("/:id").get(protect, loadDog);

router.route("/").post(protect, validateCreateUpdateDog, createDog);

router.route("/:id").delete(protect, deleteDog);

router.route("/:id").patch(protect, validateCreateUpdateDog, updateDog);

module.exports = router;
