require("dotenv").config();
const models = require("../models");

module.exports = {
  create_column: async (req, res) => {
    const authorId = req.params.user_id;
    const { category, title, contents } = req.body;

    if (!authorId) {
      return res.status(400).json({ data: null, message: "author id가 존재하지 않습니다." });
    }
    try {
      const columnInfo = await models.column.create({
        author_id: authorId,
        category: category,
        title: title,
        contents: contents,
      });

      res.status(201).json({ data: columnInfo, message: "column 생성 성공" });
    } catch {
      res.status(500).json({ data: null, message: "서버 내부 에러" });
    }
  },

  get_column: async (req, res) => {
    const columnId = req.params.column_id;

    if (!columnId) {
      return res.status(400).json({ data: null, message: "column id가 존재하지 않습니다." });
    }

    const columnInfo = await models.column.findOne({
      where: {
        id: columnId,
      },
    });

    console.log(columnInfo);

    if (!columnInfo) {
      return res.status(404).json({ data: null, message: "해당하는 칼럼이 없습니다." });
    } else {
      res.status(200).json({
        data: columnInfo,
        message: "column 조회 성공",
      });
    }
  },

  update_column: async (req, res) => {
    const columnId = req.params.column_id;
    const { category, title, contents } = req.body;

    if (!columnId) {
      return res.status(400).json({ data: null, message: "column id가 존재하지 않습니다." });
    }

    if (category) {
      await models.column.update(
        {
          category: category,
        },
        {
          where: {
            id: debateId,
          },
        },
      );
    }

    if (title) {
      await models.column.update(
        {
          title: title,
        },
        {
          where: {
            id: debateId,
          },
        },
      );
    }

    if (contents) {
      await models.column.update(
        {
          contents: contents,
        },
        {
          where: {
            id: debateId,
          },
        },
      );
    }

    const columnInfo = await models.column.findOne({
      where: {
        id: columnId,
      },
    });

    res.status(200).json({
      data: columnInfo,
      message: "칼럼 정보 업데이트 완료, 제공하는 것은 업데이트 된 칼럼 정보입니다.",
    });
  },

  delete_column: async (req, res) => {
    const columnId = req.params.column_id;

    if (!columnId) {
      return res.status(400).json({ data: null, message: "column id가 존재하지 않습니다." });
    }

    await models.column
      .destroy({
        where: {
          id: columnId,
        },
      })
      .then((result) => {
        console.log(`DB의 column_id : ${columnId} 칼럼 삭제 완료`);
        res.status(204).json({
          data: null,
          message: "칼럼 삭제 완료",
        });
      })
      .catch((err) => {
        console.log("삭제중 에러 발생, err : ", err);
        res.status(500).json({ data: null, message: "칼럼 삭제 실패, 내부 에러가 발생하였습니다." });
      });
  },

  get_columns: async (req, res) => {
    const columnList = await models.column.findAll({});

    res.status(200).json({ data: columnList, message: "아직 미구현입니다." });
  },
};
