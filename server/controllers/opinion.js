const models = require("../models");

module.exports = {
  create_opinion_column: async (req, res) => {
    const { user_id, column_id } = req.params;
    const contents = req.body.contents;

    if (!user_id || !column_id) {
      return res.status(400).json({ data: null, message: "의견을 생성할 때 필요한 유저아이디와 칼럼아이디가 존재하지 않습니다." });
    }

    if (!contents) {
      return res.status(400).json({ data: null, message: "작성한 내용이 없습니다. 내용을 작성하고 요쳥해주세요" });
    }

    await models.opinion
      .create({
        author_id: user_id,
        column_id: column_id,
        contents: contents,
        updated_at: Date.now(),
      })
      .then((result) => {
        console.log("result : ", result);
        res.status(201).json({ data: result, message: "의견 생성 성공" });
      })
      .catch((error) => {
        console.log("error : ", error);
        res.status(500).json({ data: null, message: "칼럼 의견 생성 중 에러 발생" });
      });
  },
  create_opinion_debate: async (req, res) => {
    const { user_id, debate_id } = req.params;
    const { contents, pros } = req.body;

    if (!user_id || !debate_id) {
      return res.status(400).json({ data: null, message: "의견을 생성할 때 필요한 유저아이디와 칼럼아이디가 존재하지 않습니다." });
    }

    if (!contents) {
      return res.status(400).json({ data: null, message: "작성한 내용이 없습니다. 내용을 작성하고 요쳥해주세요" });
    }

    if (!(typeof pros === "boolean")) {
      return res.status(400).json({ data: null, message: "찬성 반대에 관한 내용이 없습니다." });
    }

    await models.opinion
      .create({
        author_id: user_id,
        debate_id: debate_id,
        contents: contents,
        pros: pros,
        updated_at: Date.now(),
      })
      .then((result) => {
        console.log("result : ", result);
        res.status(201).json({ data: result, message: "의견 생성 성공" });
      })
      .catch((error) => {
        console.log("error : ", error);
        res.status(500).json({ data: null, message: "토론 의견 생성 중 에러 발생" });
      });
  },
  get_opinion_column: async (req, res) => {
    const columnId = req.params.column_id;

    if (!columnId) {
      return res.status(400).json({ data: null, message: "column id가 전달되지 않았습니다." });
    }

    const opinionList = await models.opinion.findAll({
      where: {
        column_id: columnId,
      },
    });

    if (!opinionList) {
      return res.status(404).json({ data: null, message: "해당칼럼에 아무도 의견을 생성하지않았습니다. (데이터베이스에 해당 칼럼에 대한 의견이 존재하지 않습니다)" });
    }

    res.status(200).json({
      data: opinionList,
      message: "의견 리스트 조회 성공",
    });
  },
  get_opinion_debate: async (req, res) => {
    const debateId = req.params.debate_id;

    if (!debateId) {
      return res.status(400).json({ data: null, message: "debate id가 전달되지 않았습니다." });
    }

    const opinionList = await models.opinion.findAll({
      where: {
        debate_id: debateId,
      },
    });

    if (!opinionList) {
      return res.status(404).json({ data: null, message: "해당토론에 아무도 의견을 생성하지않았습니다. (데이터베이스에 해당 토론에 대한 의견이 존재하지 않습니다)" });
    }

    res.status(200).json({
      data: opinionList,
      message: "의견 리스트 조회 성공",
    });
  },
  update_opinion: async (req, res) => {
    const opinionId = req.params.opinion_id;
    const { contents, pros } = req.body;

    if (!opinionId) {
      return res.status(400).json({ data: null, message: "오피니언 id가 전달되지 않았습니다." });
    }

    if (contents) {
      await models.opinion.update(
        {
          contents: contents,
        },
        {
          where: {
            id: opinionId,
          },
        },
      );
    }

    if (typeof pros === "boolean") {
      await models.opinion.update(
        {
          pros: pros,
        },
        {
          where: {
            id: opinionId,
          },
        },
      );
    }

    await models.opinion
      .findOne({
        where: {
          id: opinionId,
        },
      })
      .then((result) => {
        console.log("result : ", result);
        res.status(200).json({
          data: result,
          message: "오피니언 업데이트 완료, 제공된 정보 확인 요망",
        });
      })
      .catch((error) => {
        console.log("error : ", error);
        res.status(500).json({
          data: null,
          message: "오피니언 업데이트 후 해당 수정사항이 담긴 레코드를 조회 중 에러 발생",
        });
      });
  },

  delete_opinion: async (req, res) => {
    const opinionId = req.params.opinion_id;

    if (!opinionId) {
      return res.status(400).json({ data: null, message: "opinion id가 존재하지 않습니다." });
    }

    await models.opinion
      .destroy({
        where: {
          id: opinionId,
        },
      })
      .then((result) => {
        console.log(`DB의 opinion_id : ${opinionId} 의견 삭제 완료`);
        res.status(204).json({
          data: null,
          message: "의견 삭제 완료",
        });
      })
      .catch((err) => {
        console.log("삭제중 에러 발생, err : ", err);
        res.status(500).json({ data: null, message: "의견 삭제 실패, 내부 에러가 발생하였습니다." });
      });
  },
};
