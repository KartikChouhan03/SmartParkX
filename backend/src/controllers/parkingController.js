const ParkingSession = require("../models/ParkingSession");

exports.entry = async (req, res) => {
  const { vehicleNumber } = req.body;

  if (!vehicleNumber) {
    return res.status(400).json({ error: "Vehicle number required" });
  }

  // Prevent duplicate active sessions
  const existing = await ParkingSession.findOne({
    vehicleNumber,
    status: "ACTIVE"
  });

  if (existing) {
    return res.status(400).json({ error: "Vehicle already inside" });
  }

  const session = await ParkingSession.create({
    vehicleNumber,
    entryTime: new Date()
  });

  res.json({
    message: "Entry registered",
    sessionId: session._id
  });
};

exports.exit = async (req, res) => {
  const { vehicleNumber } = req.body;

  const session = await ParkingSession.findOne({
    vehicleNumber,
    status: "ACTIVE"
  });

  if (!session) {
    return res.status(404).json({ error: "Active session not found" });
  }

  session.exitTime = new Date();
  session.status = "COMPLETED";

  const durationMs = session.exitTime - session.entryTime;
  const hours = Math.ceil(durationMs / (1000 * 60 * 60));

  session.billAmount = hours * 50; // ₹50/hour example
  await session.save();

  res.json({
    message: "Exit completed",
    billAmount: session.billAmount
  });
};


exports.getMyActiveSession = async (req, res) => {
  const userId = req.user.id;

  const sessions = await ParkingSession.find({
    user: userId,
    status: "ACTIVE"
  }).sort({ entryTime: -1 });

  res.json(sessions);
};