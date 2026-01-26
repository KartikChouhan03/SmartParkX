const mongoose = require("mongoose");

const parkingSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  vehicleNumber: { type: String, required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date },
  slot: { type: String, default: null },
  status: {
    type: String,
    enum: ["ACTIVE", "COMPLETED"],
    default: "ACTIVE"
  },
  billAmount: { type: Number }
});
module.exports = mongoose.model("ParkingSession", parkingSessionSchema);

