const express = require("express");
const router = express.Router();
const slots = require("../controllers/slotController");



router.get("/", slots.getAllSlots); 
router.patch("/update", slots.updateSlot);

module.exports = router;
