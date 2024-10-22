const express = require("express");
const {
  createEvent,
  getEvents,
  searchEvents,
  getEventPopularity,
} = require("../controllers/eventController");
const adminOnly = require("../middleware/validateRole");
const validateToken = require("../middleware/validateJWT");
const router = express.Router();

router.get("/search", searchEvents);
router.post("/create/:id", validateToken, adminOnly, createEvent);
router.get("/all", getEvents);
router.get("/popularity", getEventPopularity);

module.exports = router;
