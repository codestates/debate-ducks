const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/user");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.params.userId + "profileImg.jpg");
  },
});

const upload = multer({ storage: fileStorageEngine });

router.get("/", userController.get_user); // 유저 정보 조회
router.patch("/:userId", userController.update_user); // 유저 정보 수정
router.patch("/:userId/img", upload.single("img"), userController.update_profile); // 유저 프로필 사진 수정
router.delete("/:userId", userController.delete_user); // 유저 정보 삭제

module.exports = router;
