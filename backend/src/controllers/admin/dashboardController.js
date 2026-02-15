const ParkingSession = require("../../models/ParkingSession");
const Slot = require("../../models/Slot");

function calculateTrend(current, previous) {
    if (previous === 0) {
        if (current === 0) return { direction: "neutral", percentage: 0 };
        return { direction: "up", percentage: 100 };
    }

    const diff = current - previous;
    const percentage = Math.abs((diff / previous) * 100).toFixed(1);

    if (diff > 0) return { direction: "up", percentage };
    if (diff < 0) return { direction: "down", percentage };
    return { direction: "neutral", percentage: 0 };
}

exports.getDashboardKpis = async (req, res) => {
    try {
        const now = new Date();
        const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const prev24h = new Date(now.getTime() - 48 * 60 * 60 * 1000);

        // Slots snapshot
        const totalSlots = await Slot.countDocuments();
        const occupiedSlots = await Slot.countDocuments({ isOccupied: true });
        const availableSlots = totalSlots - occupiedSlots;

        // Sessions in last 24h
        const sessionsLast24h = await ParkingSession.countDocuments({
            entryTime: { $gte: last24h }
        });

        const sessionsPrev24h = await ParkingSession.countDocuments({
            entryTime: { $gte: prev24h, $lt: last24h }
        });

        const sessionTrend = calculateTrend(
            sessionsLast24h,
            sessionsPrev24h
        );

        // Revenue in last 24h
        const revenueLast24hSessions = await ParkingSession.find({
            status: "COMPLETED",
            paymentStatus: "PAID",
            exitTime: { $gte: last24h }
        });

        const revenuePrev24hSessions = await ParkingSession.find({
            status: "COMPLETED",
            paymentStatus: "PAID",
            exitTime: { $gte: prev24h, $lt: last24h }
        });

        const revenueLast24h = revenueLast24hSessions.reduce(
            (sum, s) => sum + (s.billAmount || 0),
            0
        );

        const revenuePrev24h = revenuePrev24hSessions.reduce(
            (sum, s) => sum + (s.billAmount || 0),
            0
        );

        const revenueTrend = calculateTrend(
            revenueLast24h,
            revenuePrev24h
        );

        res.json({
            totalSlots,
            occupiedSlots,
            availableSlots,

            revenue: {
                value: revenueLast24h,
                trend: revenueTrend
            },

            sessions: {
                value: sessionsLast24h,
                trend: sessionTrend
            },

            occupancy: {
                value: occupiedSlots,
                trend: sessionTrend
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch dashboard KPIs" });
    }
};


exports.getRecentActivity = async (req, res) => {
  try {
    const sessions = await ParkingSession.find()
      .sort({ entryTime: -1 })
      .limit(10)
      .select("vehicleNumber entryTime exitTime status paymentStatus");

    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recent activity" });
  }
};
