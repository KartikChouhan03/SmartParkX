const Slot = require("../models/Slot");
const ParkingSession = require("../models/ParkingSession");

// CREATE SLOT (setup/admin)
const createSlot = async (req, res) => {
  try {
    const { slotNumber } = req.body;

    if (!slotNumber) {
      return res.status(400).json({ message: "slotNumber is required" });
    }

    const slot = await Slot.create({ slotNumber });

    res.status(201).json(slot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL SLOTS (dashboard)
const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SENSOR UPDATE (automation)
const updateSlotStatus = async (req, res) => {
  try {
    const { slotNumber, isOccupied } = req.body;

    const slot = await Slot.findOne({ slotNumber });

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // Occupied → bind latest active session
    if (isOccupied && !slot.isOccupied) {
      const activeSession = await ParkingSession.findOne({
        isActive: true
      }).sort({ entryTime: -1 });

      if (activeSession) {
        slot.activeSessionId = activeSession._id;
      }
    }

    // Empty → free slot
    if (!isOccupied) {
      slot.activeSessionId = null;
    }

    slot.isOccupied = isOccupied;
    slot.updatedAt = Date.now();

    await slot.save();

    res.json({
      message: "Slot updated",
      slot
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ EXPORTS (CRITICAL)
module.exports = {
  createSlot,
  getAllSlots,
  updateSlotStatus
};
