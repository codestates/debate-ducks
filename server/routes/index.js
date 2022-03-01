const express = require("express");
const router = express.Router();
const kakaoController = require("../controllers/kakao");
const userController = require("../controllers/user");

router.get("/", (req, res) => {
  res.send("Hello Debate Ducks!");
});

router.get("/test", (req, res) => {
  res.send("Test Router!");
});

router.post("/oauth/kakao", kakaoController.login); // 카카오 소셜 로그인

router.post("/signout", userController.logout); // 로그아웃

module.exports = router;
