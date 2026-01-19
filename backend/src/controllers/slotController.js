const Slot = require("../models/Slot");
const ParkingSession = require("../models/ParkingSession");

exports.updateSlot = async (req, res) => {
  const { slotNumber, isOccupied } = req.body;

  if (!slotNumber || isOccupied === undefined) {
    return res.status(400).json({ error: "Invalid data" });
  }

  // Update slot state
  const slot = await Slot.findOneAndUpdate(
    { slotNumber },
    { isOccupied },
    { new: true }
  );

  if (!slot) {
    return res.status(404).json({ error: "Slot not found" });
  }

  // 🔑 AUTO-LINK LOGIC
  if (isOccupied) {
    const activeSession = await ParkingSession.findOne({
      status: "ACTIVE",
      slot: null
    }).sort({ entryTime: -1 });

    if (activeSession) {
      activeSession.slot = slotNumber;
      await activeSession.save();
    }
  }

  res.json({ message: "Slot updated", slot });
};


exports.getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find().sort({ slotNumber: 1 });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch slots" });
  }
};