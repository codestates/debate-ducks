require("dotenv").config();
const axios = require("axios");
axios.defaults.withCredentials = true;
const models = require("../models");
const { generateAccessToken, sendAccessToken } = require("./tokenFunctions");

module.exports = {
  login: async (req, res, next) => {
    try {
      const authorizationCode = req.query.code;
      const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
      const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
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

          const accessToken = generateAccessToken(
            JSON.stringify({
              newUserInfo,
            }),
          );

          console.log("accessToken : ", accessToken);

          sendAccessToken(
            res,
            {
              id: newUserInfo.dataValues.id,
              name: newUserInfo.dataValues.name,
              profile: newUserInfo.dataValues.profile,
              sign_method: newUserInfo.dataValues.sign_method,
            },
            accessToken,
          );
        }

        const accessToken = generateAccessToken(
          JSON.stringify({
            userInfo,
          }),
        );

        console.log("accessToken : ", accessToken);

        sendAccessToken(
          res,
          {
            id: userInfo.dataValues.id,
            name: userInfo.dataValues.name,
            profile: userInfo.dataValues.profile,
            sign_method: userInfo.dataValues.sign_method,
          },
          accessToken,
        );
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error!" });
      next(err);
    }
  },
};
