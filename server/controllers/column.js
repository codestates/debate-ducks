require("dotenv").config();
const models = require("../models");
const { Op } = require("@sequelize/core");
const { sequelize } = require("../models");

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
            id: columnId,
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
            id: columnId,
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
            id: columnId,
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
    const { user_id, category, likey, page, search } = req.query;

    let categoryArray = [];

    if (category) {
      categoryArray = category.split(",");
    }

    let pageNum = page || 1;
    let offset = 0;
    let limit = 10;

    if (pageNum > 1) {
      offset = limit * (pageNum - 1);
    }

    if (search) {
      await models.column
        .findAll({
          offset: offset,
          limit: limit,
          where: {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
        })
        .then((result) => {
          console.log("result : ", result);
          return res.status(200).json({ data: result, message: "조회 성공" });
        })
        .catch((error) => {
          console.log("error : ", error);
          return res.status(500).json({ data: null, message: "조회 실패 에러 발생" });
        });
    } else {
      if (user_id) {
        if (likey) {
          const userLikeyList = await models.likey.findAll({
            attributes: ["column_id"],
            where: {
              [Op.and]: [
                { user_id: user_id },
                {
                  debate_id: {
                    [Op.is]: null,
                  },
                },
              ],
            },
          });

          const likeyArray = userLikeyList.map((data) => {
            return data.column_id;
          });

          if (categoryArray.length > 0) {
            // 유저 ID ON, Likey On Category On
            await models.column
              .findAll({
                offset: offset,
                limit: limit,
                where: {
                  [Op.or]: [
                    {
                      id: {
                        [Op.in]: likeyArray,
                      },
                    },
                    {
                      category: {
                        [Op.in]: categoryArray,
                      },
                    },
                  ],
                },
              })
              .then((result) => {
                console.log("result : ", result);
                return res.status(200).json({ data: result, message: "조회 성공" });
              })
              .catch((error) => {
                console.log("error : ", error);
                return res.status(500).json({ data: null, message: "조회 실패 에러 발생" });
              });
          } else {
            // 유저 예스 라이키 예스 카테고리 노
            await models.column
              .findAll({
                offset: offset,
                limit: limit,
                where: {
                  id: {
                    [Op.in]: likeyArray,
                  },
                },
              })
              .then((result) => {
                console.log("result : ", result);
                return res.status(200).json({ data: result, message: "조회 성공" });
              })
              .catch((error) => {
                console.log("error : ", error);
                return res.status(500).json({ data: null, message: "조회 실패 에러 발생" });
              });
          }
        } else {
          //유저 예스 라이키 노 카테고리 예스
          if (categoryArray.length > 0) {
            await models.column
              .findAll({
                offset: offset,
                limit: limit,
                where: {
                  category: {
                    [Op.in]: categoryArray,
                  },
                },
              })
              .then((result) => {
                console.log("result : ", result);
                return res.status(200).json({ data: result, message: "조회 성공" });
              })
              .catch((error) => {
                console.log("error : ", error);
                return res.status(500).json({ data: null, message: "조회 실패 에러 발생" });
              });
          }
        }
      } else {
        if (categoryArray.length > 0) {
          // 유저 노 => (라이키 엑스) 카테고리 예스
          await models.column
            .findAll({
              offset: offset,
              limit: limit,
              where: {
                category: {
                  [Op.in]: categoryArray,
                },
              },
            })
            .then((result) => {
              console.log("result : ", result);
              return res.status(200).json({ data: result, message: "조회 성공" });
            })
            .catch((error) => {
              console.log("error : ", error);
              return res.status(500).json({ data: null, message: "조회 실패 에러 발생" });
            });
        } else {
          await models.column
            .findAll({
              offset: offset,
              limit: limit,
            })
            .then((result) => {
              console.log("result : ", result);
              return res.status(200).json({ data: result, message: "조회 성공" });
            })
            .catch((error) => {
              console.log("error : ", error);
              return res.status(500).json({ data: null, message: "조회 실패 에러 발생" });
            });
        }
      }
    }

    // res.status(200).json({ data: columnList, message: "아직 미구현입니다." });
  },
};
