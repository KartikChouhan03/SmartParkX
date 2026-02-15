const ParkingSession = require("../models/ParkingSession");
const User = require("../models/User");
const generateReceipt = require("../utils/generateReceipt");


// ENTRY
exports.entry = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;

    if (!vehicleNumber) {
      return res.status(400).json({ error: "Vehicle number required" });
    }

    const existing = await ParkingSession.findOne({
      vehicleNumber,
      status: "ACTIVE"
    });

    if (existing) {
      return res.status(400).json({ error: "Vehicle already inside" });
    }

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


// EXIT WITH WALLET LOGIC
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

    const user = await User.findById(session.user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate billing
    session.exitTime = new Date();
    session.status = "COMPLETED";

    const durationMs = session.exitTime - session.entryTime;
    const hours = Math.ceil(durationMs / (1000 * 60 * 60));

    const billAmount = hours * 50;
    session.billAmount = billAmount;

    // Wallet Check
    if (user.walletBalance >= billAmount) {

      user.walletBalance -= billAmount;
      session.paymentStatus = "PAID";

      await user.save();
      await session.save();

      return res.json({
        message: "Exit successful. Payment deducted.",
        billAmount,
        walletRemaining: user.walletBalance,
        paymentStatus: "PAID",
        gate: "OPEN"
      });

    } else {

      session.paymentStatus = "PENDING";
      await session.save();

      return res.status(200).json({
        message: "Insufficient wallet balance",
        billAmount,
        walletBalance: user.walletBalance,
        paymentStatus: "PENDING",
        gate: "BLOCKED"
      });
    }

  } catch (error) {
    console.error("Exit error:", error);
    res.status(500).json({ error: "Failed to process exit" });
  }
};


// GET ACTIVE SESSION
exports.getMyActiveSession = async (req, res) => {
  try {
    const userId = req.user.id;

    const session = await ParkingSession.findOne({
      user: userId,
      status: "ACTIVE"
    });

    res.json(session);

  } catch (error) {
    console.error("Get Active Session error:", error);
    res.status(500).json({ error: "Failed to fetch active session" });
  }
};


// GET LAST COMPLETED
exports.getMyLastCompleted = async (req, res) => {
  try {
    const userId = req.user.id;

    const session = await ParkingSession.findOne({
      user: userId,
      status: "COMPLETED"
    }).sort({ exitTime: -1 });

    res.json(session);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch last session" });
  }
};


// GET HISTORY
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


// SUMMARY (FIXED: Only count PAID sessions)
exports.getMySummary = async (req, res) => {
  try {
    const sessions = await ParkingSession.find({
      user: req.user.id
    });

    const activeSession = sessions.find(s => s.status === "ACTIVE");

    const completedPaid = sessions.filter(
      s => s.status === "COMPLETED" && s.paymentStatus === "PAID"
    );

    const totalParkings = completedPaid.length;

    const totalBillPaid = completedPaid.reduce(
      (sum, s) => sum + (s.billAmount || 0),
      0
    );

    res.json({
      currentSlot: activeSession?.slot || null,
      entryTime: activeSession?.entryTime || null,
      totalParkings,
      totalBillPaid
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};



// DOWNLOAD RECEIPT
exports.downloadReceipt = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await ParkingSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Ensure the session belongs to the requesting user
    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized access to receipt" });
    }

    // Ensure the session is completed and paid
    if (session.status !== "COMPLETED" || session.paymentStatus !== "PAID") {
      return res.status(400).json({ error: "Receipt available only for completed and paid sessions" });
    }

    const user = await User.findById(req.user.id);

    // Call the utility function to generate and pipe the PDF
    generateReceipt(res, session, user);

  } catch (error) {
    console.error("Download Receipt error:", error);
    res.status(500).json({ error: "Failed to download receipt" });
  }
};


// ADD FUNDS (DEMO PURPOSE)
exports.addFunds = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const user = await User.findById(req.user.id);

    user.walletBalance += Number(amount);
    await user.save();

    res.json({
      message: "Funds added successfully",
      walletBalance: user.walletBalance
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to add funds" });
  }
};
