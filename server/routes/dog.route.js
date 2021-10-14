const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  listDogs,
  createDog,
  deleteDog,
  updateDog,
  loadDog,
} = require("../controllers/dog.controller");
const { validateCreateUpdateDog } = require("../validators/dog.validator");

router.route("/").get(protect, listDogs);

router.route("/:id").get(protect, loadDog);

router.route("/create").post(protect, validateCreateUpdateDog, createDog);

router.route("/delete/:id").delete(protect, deleteDog);

router.route("/update/:id").patch(protect, validateCreateUpdateDog, updateDog);

module.exports = router;
