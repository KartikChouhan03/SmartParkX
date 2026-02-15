const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotNumber: {
    type: String,
    unique: true,
    required: true
  },

  isOccupied: {
    type: Boolean,
    default: false
  },

  isOutOfOrder: {
    type: Boolean,
    default: false
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Slot", slotSchema);
