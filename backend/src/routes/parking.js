
const express = require("express");
const router = express.Router();
const parking = require("../controllers/parkingController");
const auth = require("../middleware/auth");


router.post("/entry", parking.entry);
router.post("/exit", parking.exit);
router.get("/my/active", auth, parking.getMyActiveSession);


module.exports = router;
