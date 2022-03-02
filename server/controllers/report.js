const models = require("../models");

module.exports = {
  report_column: async (req, res) => {
    const { user_id, column_id } = req.params;
    const description = req.body.description;

    if (!user_id || !column_id) {
      return res.status(400).json({ data: null, message: "유저아이디 혹은 칼럼아이디가 전달되지 않았습니다." });
    }

    await models.report
      .create({
        repoter_id: user_id,
        column_id: column_id,
        description: description,
      })
      .then((result) => {
        console.log("result : ", result);
        res.status(201).json({ data: result, message: "칼럼 신고 정보 생성 완료" });
      })
      .catch((error) => {
        console.log("error : ", error);
        res.status(500).json({ data: null, message: "칼럼 신고 생성 과정 중 에러 발생" });
      });
  },

  report_debate: async (req, res) => {
    const { user_id, debate_id } = req.params;
    const description = req.body.description;

    if (!user_id || !debate_id) {
      return res.status(400).json({ data: null, message: "유저아이디 혹은 토론아이디가 전달되지 않았습니다." });
    }

    await models.report
      .create({
        repoter_id: user_id,
        debate_id: debate_id,
        description: description,
      })
      .then((result) => {
        console.log("result : ", result);
        res.status(201).json({ data: result, message: "토론 신고 정보 생성 완료" });
      })
      .catch((error) => {
        console.log("error : ", error);
        res.status(500).json({ data: null, message: "토론 신고 생성 과정 중 에러 발생" });
      });
  },
};
