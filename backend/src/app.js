const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const slotRoutes = require("./routes/slots");
const parkingRoutes = require("./routes/parking");
const anprRoutes = require("./routes/anpr");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.json({ message: "SmartParkX Backend Running..." });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/slots", slotRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/anpr", anprRoutes);
app.use("/api/admin", require("./routes/admin")); // ✅ moved here from server.js

module.exports = app;