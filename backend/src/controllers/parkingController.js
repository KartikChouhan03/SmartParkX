const ParkingSession = require("../models/ParkingSession");
const generateReceipt = require("../utils/generateReceipt");

exports.entry = async (req, res) => {
  try {
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

    // Extract user ID from authenticated request
    // Ensure the route is protected by auth middleware
    const userId = req.user.id;

    const session = await ParkingSession.create({
      user: userId,
      vehicleNumber,
      entryTime: new Date()
    });

    res.json({
      message: "Entry registered",
      sessionId: session._id
    });
  } catch (error) {
    console.error("Entry error:", error);
    res.status(500).json({ error: "Failed to register entry" });
  }
};

exports.exit = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Exit error:", error);
    res.status(500).json({ error: "Failed to process exit" });
  }
};


exports.getMyActiveSession = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await ParkingSession.findOne({
      user: userId,
      status: "ACTIVE"
    }).sort({ entryTime: -1 });

    res.json(sessions); // Returns object or null
  } catch (error) {
    console.error("Get Active Session error:", error);
    res.status(500).json({ error: "Failed to fetch active session" });
  }
};

exports.getMyLastCompleted = async (req, res) => {
  try {
    const userId = req.user.id;

    const session = await ParkingSession.findOne({
      user: userId,
      status: "COMPLETED"
    }).sort({ exitTime: -1 });

    res.json(session); // can be null, that's OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch last session" });
  }
};


exports.getMyHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await ParkingSession.find({
      user: userId,
      status: "COMPLETED"
    }).sort({ exitTime: -1 });

    res.json(sessions);
  } catch (err) {
    console.error("History error:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};


exports.downloadReceipt = async (req, res) => {
  try {
    const session = await ParkingSession.findOne({
      _id: req.params.sessionId,
      user: req.user._id,
      status: "COMPLETED"
    });

    if (!session) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    generateReceipt(res, session, req.user);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate receipt" });
  }
};

exports.getMySummary = async (req, res) => {
  const sessions = await ParkingSession.find({
    user: req.user._id
  });

  const activeSession = sessions.find(s => s.status === "ACTIVE");

  const completed = sessions.filter(s => s.status === "COMPLETED");

  const totalParkings = completed.length;
  const totalBillPaid = completed.reduce(
    (sum, s) => sum + (s.billAmount || 0),
    0
  );

  res.json({
    currentSlot: activeSession?.slot || null,
    entryTime: activeSession?.entryTime || null,
    totalParkings,
    totalBillPaid
  });
};
