const ParkingSession = require("../models/ParkingSession");
const { calculateBill } = require("../utils/billing");

// ENTRY (ANPR)
const entry = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;

    if (!vehicleNumber) {
      return res.status(400).json({ message: "vehicleNumber is required" });
    }

    const activeSession = await ParkingSession.findOne({
      vehicleNumber: vehicleNumber.toUpperCase(),
      isActive: true
    });

    if (activeSession) {
      return res.status(400).json({
        message: "Vehicle already inside parking"
      });
    }

    const session = await ParkingSession.create({
      vehicleNumber
    });

    res.status(201).json({
      message: "Entry recorded",
      session
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// EXIT (ANPR)
const exit = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;

    if (!vehicleNumber) {
      return res.status(400).json({ message: "vehicleNumber is required" });
    }

    const session = await ParkingSession.findOne({
      vehicleNumber: vehicleNumber.toUpperCase(),
      isActive: true
    });

    if (!session) {
      return res.status(404).json({
        message: "No active parking session found"
      });
    }

    session.exitTime = new Date();
    session.billAmount = calculateBill(
      session.entryTime,
      session.exitTime
    );
    session.isActive = false;

    await session.save();

    res.json({
      message: "Exit successful",
      bill: session.billAmount,
      session
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// XPORTS (THIS IS THE KEY)
module.exports = {
  entry,
  exit
};
