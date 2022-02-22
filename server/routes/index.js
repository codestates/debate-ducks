const express = require("express");
const router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
