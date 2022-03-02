const models = require("../models");

module.exports = {
  likey_column: async (req, res) => {
    const { user_id, column_id } = req.params;

    if (!user_id || !column_id) {
      return res.status(400).json({ data: null, message: "유저아이디 혹은 칼럼아이디가 넘어오지 않았습니다." });
    }

    await models.likey
      .create({
        user_id: user_id,
        column_id: column_id,
      })
      .then((result) => {
        console.log("result : ", result);
        res.status(201).json({ data: result, message: "좋아요 생성 성공" });
      })
      .catch((error) => {
        console.log("error : ", error);
        res.status(500).json({ data: null, message: "칼럼 좋아요 생성 중 에러 발생" });
      });
  },

  likey_debate: async (req, res) => {
    const { user_id, debate_id } = req.params;

    if (!user_id || !debate_id) {
      return res.status(400).json({ data: null, message: "유저아이디 혹은 토론아이디가 넘어오지 않았습니다." });
    }

    await models.likey
      .create({
        user_id: user_id,
        debate_id: debate_id,
      })
      .then((result) => {
        console.log("result : ", result);
        res.status(201).json({ data: result, message: "좋아요 생성 성공" });
      })
      .catch((error) => {
        console.log("error : ", error);
        res.status(500).json({ data: null, message: "토론 좋아요 생성 중 에러 발생" });
      });
  },

  delete_likey: async (req, res) => {
    const likeyId = req.params.likey_id;

    if (!likeyId) {
      return res.status(400).json({ data: null, message: "해당 좋아요 아이디가 넘어오지 않았습니다." });
    }

    await models.likey
      .destroy({
        where: {
          id: likeyId,
        },
      })
      .then((result) => {
        console.log("result : ", result);
        res.status(204).json({ data: null, message: "좋아요 해제 완료" });
      })
      .catch((error) => {
        console.log("error : ", error);
        res.status(500).json({ data: null, message: "좋아요 해제(삭제) 작업 중 에러 발생" });
      });
  },
};
