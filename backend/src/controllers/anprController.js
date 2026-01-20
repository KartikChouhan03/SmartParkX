const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");
const ParkingSession = require("../models/ParkingSession");
const User = require("../models/User");


/**
 * 1️⃣ Multipart upload (Insomnia / browser)
 */
exports.handleUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: "No image uploaded" });
  }

  const imagePath = path.resolve(req.file.path);
  const scriptPath = path.resolve("anpr/run_anpr.py");

  execFile(
    "python",
    [scriptPath, imagePath],
    { timeout: 20000 },
    (error, stdout) => {
      if (error) {
        console.error("ANPR error:", error);
        return res.status(500).json({ ok: false });
      }

      const plate = stdout.trim();

      res.json({
        ok: true,
        plate: plate === "UNKNOWN" ? null : plate
      });
    }
  );
};

/**
  ESP32 raw JPEG upload (NON-BLOCKING)
 */
exports.handleEsp32Upload = async (req, res) => {
  const chunks = [];

  req.on("data", chunk => chunks.push(chunk));

  req.on("end", () => {
    const buffer = Buffer.concat(chunks);

    const filePath = path.resolve(
      "uploads",
      "anpr",
      `esp32_${Date.now()}.jpg`
    );

    fs.writeFileSync(filePath, buffer);

    //Respond immediately (ESP32 must NOT wait)
    res.json({ ok: true, received: true });

    // Run ANPR asynchronously
    const pythonScript = path.resolve("anpr/run_anpr.py");

    execFile("C:\\Users\\chouh\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", [pythonScript, filePath], async (err, stdout) => {
      if (err) {
        console.error("ANPR error:", err);
        return;
      }

      const plate = stdout.trim();
      if (!plate || plate === "UNKNOWN") return;

      // 🔍 Find user by vehicle number
      const user = await User.findOne({ vehicleNumber: plate });
      if (!user) {
        console.log("Unknown vehicle:", plate);
        return;
      }

      // 🔍 Check active session for THIS user
      const activeSession = await ParkingSession.findOne({
        user: user._id,
        status: "ACTIVE"
      });

      if (!activeSession) {
        // ✅ ENTRY
        await ParkingSession.create({
          user: user._id,
          vehicleNumber: plate,
          entryTime: new Date()
        });
        console.log("ENTRY for user:", user.email);
      } else {
        // ✅ EXIT
        activeSession.exitTime = new Date();
        activeSession.status = "COMPLETED";

        const durationMs = activeSession.exitTime - activeSession.entryTime;
        const hours = Math.ceil(durationMs / (1000 * 60 * 60));
        activeSession.billAmount = hours * 50;

        await activeSession.save();
        console.log("EXIT for user:", user.email);
      }
    });

  });
};
