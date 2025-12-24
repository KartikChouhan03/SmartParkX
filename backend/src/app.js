const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// test endpoint
app.get("/", (req, res) => {
  res.json({ message: "SmartParkX Backend Running..." });
});

module.exports = app;
