const express = require("express");
const router = express.Router();

const parkingController = require("../controllers/parkingController");

// ANPR entry
router.post("/entry", parkingController.entry);
// ANPR exit
router.post("/exit", parkingController.exit);


module.exports = router;
