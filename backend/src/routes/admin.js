const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminMiddleware = require("../middleware/adminMiddleware");

// Temporary test route
router.get("/test", auth, adminMiddleware, (req, res) => {
    res.json({ message: "Admin access granted" });
});


const { getDashboardKpis } = require("../controllers/admin/dashboardController");

router.get("/dashboard/kpis", auth, adminMiddleware, getDashboardKpis);

module.exports = router;
