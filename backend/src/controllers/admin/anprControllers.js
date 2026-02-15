const ParkingSession = require("../../models/ParkingSession");

exports.getAnprLogs = async (req, res) => {
  try {
    const sessions = await ParkingSession.find()
      .sort({ entryTime: -1 })
      .limit(50);

    const logs = sessions.map(session => ({
      _id: session._id,
      vehicleNumber: session.vehicleNumber,
      entryTime: session.entryTime,
      exitTime: session.exitTime,
      status: session.status,
      paymentStatus: session.paymentStatus
    }));

    res.json(logs);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch ANPR logs" });
  }
};
