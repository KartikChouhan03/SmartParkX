const ParkingSession = require("../../models/ParkingSession");

// Helper
const startOfDay = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

exports.getBillingKpis = async (req, res) => {
    try {
        const todayStart = startOfDay(new Date());

        const revenueToday = await ParkingSession.aggregate([
            {
                $match: {
                    status: "COMPLETED",
                    paymentStatus: "PAID",
                    exitTime: { $gte: todayStart }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$billAmount" }
                }
            }
        ]);

        const activeVehicles = await ParkingSession.countDocuments({
            status: "ACTIVE"
        });

        const pendingPayments = await ParkingSession.countDocuments({
            status: "COMPLETED",
            paymentStatus: "PENDING"
        });

        const avgDurationAgg = await ParkingSession.aggregate([
            {
                $match: {
                    status: "COMPLETED",
                    exitTime: { $gte: todayStart }
                }
            },
            {
                $project: {
                    duration: { $subtract: ["$exitTime", "$entryTime"] }
                }
            },
            {
                $group: {
                    _id: null,
                    avgDuration: { $avg: "$duration" }
                }
            }
        ]);

        const avgDurationMs = avgDurationAgg[0]?.avgDuration || 0;
        const avgMinutes = Math.floor(avgDurationMs / 60000);
        const hours = Math.floor(avgMinutes / 60);
        const minutes = avgMinutes % 60;

        res.json({
            revenueToday: revenueToday[0]?.total || 0,
            activeVehicles,
            pendingPayments,
            avgDuration: `${hours}h ${minutes}m`
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch billing KPIs" });
    }
};

exports.getBillingRecords = async (req, res) => {
    try {
        const records = await ParkingSession.find({
            status: "COMPLETED"
        }).sort({ exitTime: -1 });

        res.json(records);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch billing records" });
    }
};

exports.getPendingPayments = async (req, res) => {
    try {
        const pending = await ParkingSession.find({
            status: "COMPLETED",
            paymentStatus: "PENDING"
        }).sort({ exitTime: -1 });

        res.json(pending);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch pending payments" });
    }
};

exports.markAsPaid = async (req, res) => {
    try {
        const { id } = req.params;

        const session = await ParkingSession.findById(id);
        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }

        session.paymentStatus = "PAID";
        await session.save();

        res.json({ message: "Marked as PAID" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to mark as paid" });
    }
};

exports.getRevenueChart = async (req, res) => {
    try {
        const today = startOfDay(new Date());

        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

        const revenueData = await ParkingSession.aggregate([
            {
                $match: {
                    status: "COMPLETED",
                    paymentStatus: "PAID",
                    exitTime: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$exitTime" }
                    },
                    total: { $sum: "$billAmount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(revenueData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch revenue chart" });
    }
};
