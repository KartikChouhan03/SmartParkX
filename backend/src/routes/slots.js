const express = require("express");
const router = express.Router();

const slotController = require("../controllers/slotController");

router.post("/", slotController.createSlot);
router.get("/", slotController.getAllSlots);
router.patch("/update", slotController.updateSlotStatus);

module.exports = router;
