require("dotenv").config();
const axios = require("axios");
axios.defaults.withCredentials = true;
const models = require("../models");
const { generateAccessToken, sendAccessToken, isAuthorized } = require("./tokenFunctions");

module.exports = {
  logout: async (req, res) => {
    if (isAuthorized(req)) {
      res.clearCookie("accessToken", {
        domain: process.env.SERVER_DOMAIN,
        path: "/",
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });
      res.status(200).send({ message: "logout success!" });
    } else {
      res.status(400).send({ message: "로그인이 되어 있지 않습니다. (쿠키에 토큰 정보가 없습니다.)" });
    }
  },
};
