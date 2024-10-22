const express = require("express");
const { purchaseTicket } = require("../controllers/ticketController");
const router = express.Router();
const validateToken = require("../middleware/validateJWT");

router.post("/purchase/:id", validateToken, purchaseTicket);

module.exports = router;
