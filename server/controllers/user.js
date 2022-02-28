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

  get_user: async (req, res) => {
    if (isAuthorized(req)) {
      const accessTokenData = isAuthorized(req).data;
      const { id } = accessTokenData;
      await models.user
        .findOne({
          where: { id },
        })
        .then((userInfo) => {
          if (!userInfo) {
            res.json({ data: null, message: "해당 토큰 정보에 들어있는 유저의 id 값에 일치하는 정보가 존재하지 않습니다." });
          } else {
            res.json({ data: userInfo, message: "유저 정보 조회 성공" });
          }
        });
    } else {
      return res.json({ data: null, message: "토큰 정보가 없거나 유효하지 않은 토큰입니다. 다시 로그인 해주세요" });
    }
  },

  update_user: async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "업데이트할 유저의 디비 id 값이 잘못되었거나 존재하지 않습니다." });
    }

    const { name, profile } = req.body;

    if (name) {
      models.user.update(
        {
          name: name,
        },
        {
          where: {
            id: userId,
          },
        },
      );
    }

    if (profile) {
      models.user.update(
        {
          profile: profile,
        },
        {
          where: {
            id: userId,
          },
        },
      );
    }

    const userInfo = await models.user.findOne({
      where: {
        id: userId,
      },
    });

    res.status(200).json({
      data: userInfo,
      message: "유저 정보 업데이트 완료, 제공되는 것은 업데이트 된 유저정보입니다.",
    });
  },

  delete_user: async (req, res) => {
    if (isAuthorized(req)) {
      const userId = req.params.userId;

      if (!userId) {
        res.status(404).json({ data: null, message: "삭제할 아이디가 존재하지 않습니다." });
      } else {
        models.user
          .destroy({
            where: {
              id: userId,
            },
          })
          .then((result) => {
            console.log(`${userId} 레코드 삭제 완료`);
            res.status(204).json({ data: null, message: "유저 삭제 완료" });
          });
      }
    }
  },

  // get_userInfoPage: async(req,res) => {
  //   const userId = req.params.userId

  //   if (!userId) {
  //     res.status(400).json({ data: null, message: "올바르지 않은 userId 혹은 데이터베이스 내부에 없는 ID 입니다."})
  //   } else {
  //     const userInfo = await models.user.findOne({
  //       where: {
  //         id: userId }
  //     })

  //     const voteCount = await models.vote.findAll({
  //       where: {

  //       }
  //     })

  //   }
  // }
};
