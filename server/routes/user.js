const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/user");
require("dotenv").config();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.params.userId + "profileImg.jpg");
  },
});

const upload = multer({ storage: fileStorageEngine });

router.get("/", userController.get_user);
router.patch("/:userId", userController.update_user);
router.patch("/:userId/img", upload.single("img"), userController.update_profile);
router.delete("/:userId", userController.delete_user);

module.exports = router;
