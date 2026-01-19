require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

// connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const os = require("os");

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://${getLocalIP()}:${PORT}`);
});