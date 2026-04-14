const ParkingSession = require("../models/ParkingSession");
const User = require("../models/User");
const generateReceipt = require("../utils/generateReceipt");
const { calculateBill } = require("../utils/billing");

// ================= ENTRY =================
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

    const userId = req.user?.id || null;

    const session = await ParkingSession.create({
      user: userId,
      vehicleNumber,
      entryTime: new Date(),
      paymentStatus: "PENDING"
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


// ================= EXIT =================
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

    // 🔴 Prevent double payment
    if (session.paymentStatus === "PAID") {
      return res.json({
        message: "Already paid",
        gate: "OPEN"
      });
    }

    // 🔴 No parking case (important)
    if (!session.slot) {
      session.status = "CANCELLED";
      await session.save();

      return res.json({
        message: "No parking detected. Session cancelled.",
        gate: "OPEN"
      });
    }

    const user = session.user ? await User.findById(session.user) : null;

    // Calculate bill
    session.exitTime = new Date();
    const billAmount = calculateBill(session.entryTime, session.exitTime);
    session.billAmount = billAmount;

    // ✅ Wallet payment
    if (user && user.walletBalance >= billAmount) {

      user.walletBalance -= billAmount;

      session.paymentStatus = "PAID";
      session.paymentMethod = "WALLET";
      session.status = "COMPLETED";

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
      // ❗ Guest or insufficient balance
      session.paymentStatus = "PENDING";

      await session.save();

      return res.json({
        message: "Payment pending",
        billAmount,
        walletBalance: user ? user.walletBalance : null,
        paymentStatus: "PENDING",
        gate: "BLOCKED"
      });
    }

  } catch (error) {
    console.error("Exit error:", error);
    res.status(500).json({ error: "Failed to process exit" });
  }
};


// ================= GET ACTIVE SESSION =================
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


// ================= GET LAST COMPLETED =================
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


// ================= GET HISTORY =================
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


// ================= SUMMARY =================
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


// ================= DOWNLOAD RECEIPT =================
exports.downloadReceipt = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await ParkingSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (session.user?.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized access to receipt" });
    }

    if (session.status !== "COMPLETED" || session.paymentStatus !== "PAID") {
      return res.status(400).json({
        error: "Receipt available only for completed and paid sessions"
      });
    }

    const user = await User.findById(req.user.id);

    generateReceipt(res, session, user);

  } catch (error) {
    console.error("Download Receipt error:", error);
    res.status(500).json({ error: "Failed to download receipt" });
  }
};


// ================= ADD FUNDS =================
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

// ================= ADMIN MARK PAID =================
exports.adminMarkPaid = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await ParkingSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (session.paymentStatus === "PAID") {
      return res.json({ message: "Already paid" });
    }

    // Fix: generate exitTime and compute bill amount if missing
    if (!session.exitTime) {
      session.exitTime = new Date();
      session.billAmount = calculateBill(session.entryTime, session.exitTime);
    }

    session.paymentStatus = "PAID";
    session.paymentMethod = "CASH";
    session.status = "COMPLETED";

    await session.save();

    res.json({
      message: "Marked as paid",
      sessionId,
      paymentStatus: "PAID",
      billAmount: session.billAmount
    });

  } catch (err) {
    console.error("Admin Mark Paid error:", err);
    res.status(500).json({ error: "Failed to mark as paid" });
  }
};