
const express = require("express");
const router = express.Router();
const parking = require("../controllers/parkingController");
const auth = require("../middleware/auth");


router.post("/entry", auth, parking.entry);
router.post("/exit", auth, parking.exit);
router.get("/my/active", auth, parking.getMyActiveSession);
router.get("/my/last", auth, parking.getMyLastCompleted);
router.get("/my/history", auth, parking.getMyHistory);
router.get("/my/receipt/:sessionId", auth, parking.downloadReceipt);
router.get("/my/summary", auth, parking.getMySummary);

module.exports = router;
