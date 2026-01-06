const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotNumber: {
    type: String,
    required: true,
    unique: true
  },

  isOccupied: {
    type: Boolean,
    default: false
  },

  activeSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingSession",
    default: null
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Slot", slotSchema);
