const express = require("express");
const router = express.Router();
const axios = require("axios");
const models = require("../models");
const jwt = require("jsonwebtoken");

router.post("/kakao", async (req, res) => {
  try {
    const authorizationCode = req.query.code;
    const KAKAO_CLIENT_ID = process.env.KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
    // const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
    const grantType = "authorization_code";

    if (authorizationCode) {
      const response = await axios({
        method: "POST",
        url: `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&grant_type=${grantType}`,
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token } = response.data;

      const kakaoUserInfo = await axios({
        method: "GET",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-type": "application/x-www-form-urlencoded",
        },
      });

      const { email, profile } = kakaoUserInfo.data.kakao_account;
      const userInfo = await models.user.findOne({ where: { email } });

      if (!userInfo) {
        const newUserInfo = await models.user.create({
          email: email,
          name: profile.nickname,
          profile: profile.profile_image_url,
          sign_method: "kakao",
        });

        const accessToken = jwt.sign(newUserInfo.dataValues, process.env.ACCESS_SECRET, { expiresIn: "12h" });
        // res.cookie("accessToken", accessToken, {
        //   maxAge: 1000 * 60 * 60 * 24 * 7,
        //   httpOnly: true,
        // });

        return res
          .cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
          })
          .status(201)
          .json({ data: { userInfo: newUserInfo }, token: accessToken, message: "Success Login!" });
      }

      const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET, { expiresIn: "12h" });
      // res.cookie("accessToken", accessToken, {
      //   maxAge: 1000 * 60 * 60 * 24 * 7,
      //   httpOnly: true,
      // });
      res
        .cookie("accessToken", accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .status(200)
        .json({ data: { userInfo: userInfo }, token: accessToken, message: "Success Login" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
