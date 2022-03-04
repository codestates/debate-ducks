const models = require("../models");

// attributes => debate_id, user_id, pros, contents

module.exports = {
  create_factcheck: async (req, res) => {
    const { user_id, debate_id } = req.params;
    const { pros, desc, url } = req.body;

    if (!user_id || !debate_id) {
      return res.status(400).json({ data: null, message: "팩트체크 생성에 필요한 user id와 debate id가 전달되지 않았습니다." });
    }

    if (!(typeof pros === "boolean")) {
      return res.status(400).json({ data: null, message: "찬성 반대 정보가 넘어오지 않았습니다." });
    }

    if (pros === true) {
      await models.factcheck
        .create({
          debate_id: debate_id,
          user_id: user_id,
          pros: true,
          desc: desc,
          url: url,
        })
        .then((result) => {
          console.log("result : ", result);
          res.status(201).json({ data: result, message: "팩트체크 정보 생성 완료" });
        })
        .catch((error) => {
          console.log("error : ", error);
          res.status(500).json({ data: null, message: "팩트체크 생성 과정 중 에러 발생" });
        });
    } else {
      await models.factcheck
        .create({
          debate_id: debate_id,
          user_id: user_id,
          pros: false,
          desc: desc,
          url: url,
        })
        .then((result) => {
          console.log("result : ", result);
          res.status(201).json({ data: result, message: "팩트체크 정보 생성 완료" });
        })
        .catch((error) => {
          console.log("error : ", error);
          res.status(500).json({ data: null, message: "팩트체크 생성 과정 중 에러 발생" });
        });
    }
  },
  get_factcheck: async (req, res) => {
    const debateId = req.params.debate_id;

    if (!debateId) {
      return res.status(400).json({ data: null, message: "debate id가 전달되지 않았습니다." });
    }

    const factcheckList = await models.factcheck.findAll({
      where: {
        debate_id: debateId,
      },
    });

    if (!factcheckList) {
      return res.status(404).json({ data: null, message: "해당토론에 아무도 팩트체크를 기록하지 않았습니다. (데이터베이스에 해당 토론에 대한 팩트체크 내용이 존재하지 않습니다)" });
    }

    res.status(200).json({
      data: factcheckList,
      message: "팩트체크 리스트 조회 성공",
    });
  },
  update_factcheck: async (req, res) => {
    const factcheckId = req.params.factcheck_id;
    const { desc, url } = req.body;

    if (!factcheckId) {
      return res.status(400).json({ data: null, message: "factcheck id가 존재하지 않습니다." });
    }

    if (desc) {
      await models.column
        .update(
          {
            desc: desc,
          },
          {
            where: {
              id: factcheckId,
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
    }

    if (url) {
      await models.column
        .update(
          {
            url: url,
          },
          {
            where: {
              id: factcheckId,
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
    }

    await models.factcheck
      .findOne({
        where: {
          id: factcheckId,
        },
      })
      .then((result) => {
        console.log("result : ", result);
        res.status(200).json({
          data: result,
          message: "팩트체크 업데이트 완료, 제공된 정보 확인 요망",
        });
      })
      .catch((error) => {
        console.log("error : ", error);
        res.status(500).json({
          data: null,
          message: "팩트체크 업데이트 후 해당 수정사항이 담긴 레코드를 조회 중 에러 발생",
        });
      });
  },
  delete_factcheck: async (req, res) => {
    const factcheckId = req.params.factcheck_id;

    if (!factcheckId) {
      return res.status(400).json({ data: null, message: "factcheck id가 존재하지 않습니다." });
    }

    await models.factcheck
      .destroy({
        where: {
          id: factcheckId,
        },
      })
      .then((result) => {
        console.log(`DB의 factcheck_id : ${factcheckId} 팩트체크 삭제 완료`);
        res.status(204).json({
          data: null,
          message: "팩트체크 삭제 완료",
        });
      })
      .catch((err) => {
        console.log("삭제중 에러 발생, err : ", err);
        res.status(500).json({ data: null, message: "팩트체크 삭제 실패, 내부 에러가 발생하였습니다." });
      });
  },
};
