const mongoose = require("mongoose");

const parkingSessionSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true
    },

    entryTime: {
      type: Date,
      required: true,
      default: Date.now
    },

    exitTime: {
      type: Date,
      default: null
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true
    },

    billAmount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ParkingSession", parkingSessionSchema);
