
const express = require("express");
const router = express.Router();
const parking = require("../controllers/parkingController");

router.post("/entry", parking.entry);
router.post("/exit", parking.exit);
router.get("/active", parking.getActiveSessions);


module.exports = router;
