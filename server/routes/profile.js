const express = require("express");
const router = express.Router();
const axios = require("axios");
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

// 클라이언트에서 이미지를 가져온다.
router.post("/", upload.single("img"), (req, res) => {
  console.log("req.file", req.file);
  res.send("200");
});

// 클라이언트에게서 가져온 이미지를 db에 저장한다. (saveProfile)

module.exports = router;
