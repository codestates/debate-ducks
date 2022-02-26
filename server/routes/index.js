const express = require("express");
const router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");
const kakaoController = require("../controllers/kakao");
require("dotenv").config();

router.get("/", (req, res) => {
  res.send("Hello Debate Ducks!");
});

router.get("/test", (req, res) => {
  res.send("Test Router!");
});

router.post("/oauth/kakao", kakaoController.login);

module.exports = router;
