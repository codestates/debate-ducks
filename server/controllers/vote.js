const models = require("../models");

module.exports = {
  create_vote: async (req, res) => {
    const { user_id, debate_id } = req.params;

    console.log("body.pros : ", req.body.pros);
    console.log("typeof body.pros", typeof req.body.pros);

    const pros = req.body.pros;

    console.log("user_id : ", user_id);
    console.log("debate_id : ", debate_id);

    if (!user_id || !debate_id) {
      res.status(400).json({ data: null, message: "투표를 하기 위한 유저id 혹은 토론id가 존재하지 않습니다." });
    }

    if (pros === true) {
      await models.vote
        .create({
          user_id: user_id,
          debate_id: debate_id,
          pros: true,
        })
        .then((result) => {
          console.log("result : ", result);
          res.status(201).json({ message: "투표 정보 생성 완료" });
        })
        .catch((error) => {
          console.log("error : ", error);
          res.status(500).json({ data: null, message: "투표 생성 과정 중 에러 발생" });
        });
    } else {
      await models.vote
        .create({
          user_id: user_id,
          debate_id: debate_id,
          pros: false,
        })
        .then((result) => {
          console.log("result : ", result);
          res.status(201).json({ message: "투표 정보 생성 완료" });
        })
        .catch((error) => {
          console.log("error : ", error);
          res.status(500).json({ data: null, message: "투표 생성 과정 중 에러 발생" });
        });
    }
  },

  delete_vote: async (req, res) => {
    const voteId = req.params.vote_id;

    if (!voteId) {
      return res.status(400).json({ data: null, message: "투표 id가 전달되지 않았습니다." });
    }

    const voteInfo = await models.vote.findOne({
      where: {
        id: voteId,
      },
    });

    if (!voteInfo) {
      return res.status(404).json({ data: null, message: "해당하는 투표 정보가 데이터베이스에 존재하지 않습니다." });
    }

    await models.vote
      .destroy({
        where: {
          id: voteId,
        },
      })
      .then((result) => {
        console.log(`DB의 vote_id : ${voteId} 토론 삭제 완료`);
        res.status(204).json({ data: null, message: "투표 삭제 완료" });
      })
      .catch((error) => {
        console.log("삭제중 err 발생, err : ", error);
        res.status(500).json({ data: null, message: "삭제 실패, 내부 에러 발생했습니다." });
      });
  },
};
