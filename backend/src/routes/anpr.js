const express = require("express");
const router = express.Router();
const multer = require("multer");
const { handleUpload, handleEsp32Upload } = require("../controllers/anprController");

const fs = require("fs");
const path = require("path");

const uploadDir = path.join("uploads", "anpr");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
  const ext = path.extname(file.originalname) ||    ".jpg";
    cb(null, Date.now() + ext);
}
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), handleUpload);

router.post("/esp32", handleEsp32Upload);


module.exports = router;
