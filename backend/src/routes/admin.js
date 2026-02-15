const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminMiddleware = require("../middleware/adminMiddleware");
const adminController = require("../controllers/admin/dashboardController");

// Temporary test route
router.get("/test", auth, adminMiddleware, (req, res) => {
    res.json({ message: "Admin access granted" });
});

const slotController = require("../controllers/admin/slotControllers");
const { getDashboardKpis } = require("../controllers/admin/dashboardController");

router.get("/dashboard/kpis", auth, adminMiddleware, getDashboardKpis);

router.get(
    "/dashboard/recent-activity",
    auth,
    adminMiddleware,
    adminController.getRecentActivity
);

router.get(
    "/slots",
    auth,
    adminMiddleware,
    slotController.getAllSlots
);

router.patch(
    "/slots/:id/toggle-maintenance",
    auth,
    adminMiddleware,
    slotController.toggleMaintenance
);

const anprController = require("../controllers/admin/anprControllers");

router.get(
    "/anpr/logs",
    auth,
    adminMiddleware,
    anprController.getAnprLogs
);


const billingController = require("../controllers/admin/billingController");

router.get("/billing/kpis", auth, adminMiddleware, billingController.getBillingKpis);
router.get("/billing/records", auth, adminMiddleware, billingController.getBillingRecords);
router.get("/billing/pending", auth, adminMiddleware, billingController.getPendingPayments);
router.patch("/billing/:id/mark-paid", auth, adminMiddleware, billingController.markAsPaid);
router.get("/billing/revenue-chart", auth, adminMiddleware, billingController.getRevenueChart);

module.exports = router;
