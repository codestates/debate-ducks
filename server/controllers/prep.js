const models = require("../models");

module.exports = {
  create_prep: async (req, res) => {
    const { user_id, debate_id } = req.params;
    const contents = req.body.contents;

    if (!user_id || debate_id) {
      return res.status(400).json({ data: null, message: "유저아이디 혹은 디베이트아이디가 전달되지 않았습니다." });
    }

    if (!contents) {
      return res.status(400).json({ data: null, message: "작성한 내용이 없습니다. 작성후 요청해주세요" });
    }

    await models.prep
      .create({
        author_id: user_id,
        debate_id: debate_id,
        contents: contents,
      })
      .then((result) => {
        console.log("result : ", result);
        res.status(201).json({ data: result, message: "프렙 정보 생성 완료" });
      })
      .catch((error) => {
        console.log("error : ", error);
        res.status(500).json({ data: null, message: "프렙 생성 과정 중 에러 발생" });
      });
  },
  get_prep: async (req, res) => {
    const debate_id = req.params.debate_id;

    if (!debate_id) {
      return res.status(400).json({ data: null, message: "debate id가 전달되지 않았습니다" });
    }

    const prepList = await models.prep.findAll({
      where: {
        debate_id: debate_id,
      },
    });

    if (!prepList) {
      return res.status(404).json({ data: null, message: "해당토론에 아무도 프렙을 작성하지 않았습니다. (데이터베이스에 해당 토론에 대한 프렙 내용이 존재하지 않습니다)" });
    }

    res.status(200).json({
      data: prepList,
      message: "프렙 리스트 조회 성공",
    });
  },
  update_prep: async (req, res) => {
    const prepId = req.params.prep_id;
    const contents = req.body.contents;

    if (!prepId) {
      return res.status(400).json({ data: null, message: "수정에 필요한 prep id가 전달되지 않았습니다." });
    }

    if (!contents) {
      return res.status(400).json({ data: null, message: "수정할 내용이 없습니다. 다시한번 확인해주세요" });
    }

    await models.prep
      .update(
        {
          contents: contents,
        },
        {
          where: {
            id: prepId,
          },
        },
      )
      .then((result) => {
        console.log("result : ", result);
      })
      .catch((error) => {
        console.log("팩트체크 업데이트 중 error : ", error);
        return res.status(500).json({ data: null, message: "팩트체크 업데이트 중 에러 발생" });
      });

    await models.prep
      .findOne({
        where: {
          id: prepId,
        },
      })
      .then((result) => {
        console.log("result : ", result);
        res.status(200).json({
          data: result,
          message: "프렙 업데이트 완료, 제공된 정보 확인 요망",
        });
      })
      .catch((error) => {
        console.log("error : ", error);
        res.status(500).json({
          data: null,
          message: "프렙 업데이트 후 해당 수정사항이 담긴 레코드를 조회 중 에러 발생",
        });
      });
  },
  delete_prep: async (req, res) => {
    const prepId = req.params.prep_id;

    if (!prepId) {
      return res.status(400).json({ data: null, message: "prep id가 존재하지 않습니다." });
    }

    await models.prep
      .destroy({
        where: {
          id: prepId,
        },
      })
      .then((result) => {
        console.log(`DB의 prep_id : ${prepId} 프렙 삭제 완료`);
        res.status(204).json({
          data: null,
          message: "프렙 삭제 완료",
        });
      })
      .catch((err) => {
        console.log("삭제중 에러 발생, err : ", err);
        res.status(500).json({ data: null, message: "프렙 삭제 실패, 내부 에러가 발생하였습니다." });
      });
  },
};
