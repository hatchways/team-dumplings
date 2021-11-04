const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const isNotificationsValidInputs = require("../validators/isNotificationValidInputs");
const {
  createNotification,
  updateNotification,
  getNotification,
  getAllNotifications,
} = require("../controllers/notification");

router.route("/").post(protect, isNotificationsValidInputs, createNotification);

router.route("/:id").patch(protect, isNotificationsValidInputs, updateNotification);

router.route("/:id").get(protect, getNotification);

router.route("/").get(protect, getAllNotifications);


module.exports = router;
