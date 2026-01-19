const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotNumber: { type: String, unique: true },
  isOccupied: { type: Boolean, default: false }
});

module.exports = mongoose.model("Slot", slotSchema);
