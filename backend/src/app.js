const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const slotRoutes = require("./routes/slots");
const parkingRoutes = require("./routes/parking");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// test endpoint
app.get("/", (req, res) => {
  res.json({ message: "SmartParkX Backend Running..." });
});

// routes
app.use("/api/slots", slotRoutes);
app.use("/api/parking", parkingRoutes);

module.exports = app;
