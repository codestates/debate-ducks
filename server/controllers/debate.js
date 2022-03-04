require("dotenv").config();
const models = require("../models");
const { Op } = require("@sequelize/core");

module.exports = {
  create_debate: async (req, res) => {
    const hostId = req.params.host_id;
    const { category, title, topic, pros_id, cons_id } = req.body;
    if (!hostId) {
      return res.status(400).json({ data: null, message: "host id가 존재하지 않습니다." });
    }
    try {
      if (!pros_id) {
        const debateInfo = await models.debate.create({
          host_id: hostId,
          category: category,
          title: title,
          topic: topic,
          cons_id: cons_id,
        });

        res.status(201).json({ data: debateInfo, message: "debate 생성 성공" });
      } else {
        const debateInfo = await models.debate.create({
          host_id: hostId,
          category: category,
          title: title,
          topic: topic,
          pros_id: pros_id,
        });

        res.status(201).json({ data: debateInfo, message: "debate 생성 성공" });
      }
    } catch {
      res.status(500).json({ data: null, message: "서버 내부 에러" });
    }
  },

  get_debate: async (req, res) => {
    const debateId = req.params.debate_id;
    let prosProfile = "";
    let prosName = "";
    let consProfile = "";
    let consName = "";

    if (!debateId) {
      console.log("DI : ", debateId);
      return res.status(400).json({ data: null, message: "해당하는 토론 id가 없습니다." });
    }

    console.log("DI 2 : ", debateId);

    const debateInfo = await models.debate.findOne({
      where: {
        id: debateId,
      },
    });

    console.log("debateInfo : ", debateInfo);

    if (!debateInfo) {
      return res.status(404).json({ data: null, message: "해당하는 정보가 없습니다." });
    }

    const { pros_id, cons_id } = debateInfo;

    if (pros_id) {
      const prosUserInfo = await models.user.findOne({
        where: {
          id: pros_id,
        },
      });
      prosProfile = prosUserInfo.profile;
      prosName = prosUserInfo.name;
    }

    if (cons_id) {
      const consUserInfo = await models.user.findOne({
        where: {
          id: cons_id,
        },
      });
      consProfile = consUserInfo.profile;
      consName = consUserInfo.name;
    }

    if (!debateInfo) {
      res.status(400).json({ data: null, message: "debate_id에 해당하는 정보를 찾지 못했습니다." });
    } else {
      res.status(200).json({
        data: {
          debateInfo,
          prosName: prosName,
          prosProfile: prosProfile,
          consName: consName,
          consProfile: consProfile,
        },
        message: "debate 조회 성공",
      });
    }
  },

  update_debate: async (req, res) => {
    const debateId = req.params.debate_id;
    const { category, title, topic, participant_id, pros_id, cons_id } = req.body;

    console.log("title, topic : ", title, topic);

    if (!debateId) {
      return res.status(400).json({ message: "debateId가 들어오지 않았습니다." });
    }

    if (category) {
      await models.debate.update(
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
      await models.debate.update(
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

    if (topic) {
      await models.debate.update(
        {
          topic: topic,
        },
        {
          where: {
            id: debateId,
          },
        },
      );
    }

    if (participant_id) {
      await models.debate.update(
        {
          participant_id: participant_id,
        },
        {
          where: {
            id: debateId,
          },
        },
      );
    }

    if (pros_id) {
      await models.debate.update(
        {
          pros_id: pros_id,
        },
        {
          where: {
            id: debateId,
          },
        },
      );
    }

    if (cons_id) {
      await models.debate.update(
        {
          cons_id: cons_id,
        },
        {
          where: {
            id: debateId,
          },
        },
      );
    }

    const debateInfo = await models.debate.findOne({
      where: {
        id: debateId,
      },
    });

    res.status(200).json({
      data: debateInfo,
      message: "토론 정보 업데이트 완료, 제공하는 것은 업데이트 된 토론정보입니다.",
    });
  },

  update_video: async (req, res) => {
    // const debateId = req.params.debate_id;

    // if (!debateId) {
    //   return res.status(400).json({ message: "debateId가 들어오지 않았습니다." });
    // }

    res.status(200).json({ data: null, message: "토론 비디오를 업로드하는 호출입니다. 아직 미구현입니다." });
  },

  delete_debate: async (req, res) => {
    const debateId = req.params.debate_id;

    if (!debateId) {
      return res.status(400).json({ message: "debateId가 들어오지 않았습니다." });
    }

    await models.debate
      .destroy({
        where: {
          id: debateId,
        },
      })
      .then((result) => {
        console.log(`DB의 debate_id : ${debateId} 토론 삭제 완료`);
        res.status(204).json({
          data: null,
          message: "토론 삭제 완료",
        });
      })
      .catch((err) => {
        console.log("삭제중 err 발생, err : ", err);
        res.status(500).json({ data: null, message: "삭제 실패, 내부 에러 발생했습니다." });
      });
  },

  get_debates: async (req, res) => {
    const { user_id, category, status, likey, page, search } = req.query;

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
      const debateList = await models.debate.findAll({
        offset: offset,
        limit: limit,
        where: {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
      });

      if (debateList.length > 0) {
        console.log("debateList : ", debateList);
        return res.status(200).json({
          data: debateList,
          message: "검색어를 통한 토론 리스트 조회 성공",
        });
      } else if (debateList.length === 0) {
        console.log("debateList의 항목이 비어있는 상태, ", debateList);
        return res.status(200).json({
          data: debateList,
          message: "검색어를 통한 토론 리스트 조회 성공, 하지만 조회 된 레코드가 없음.",
        });
      } else {
        console.log("Else, debateList : ", debateList);
        return res.status(500).json({
          data: null,
          message: "debateList의 조회가 성공적으로 되지 않았습니다. (서버 내부 에러)",
        });
      }
    } else {
      if (user_id) {
        //user_id O

        if (likey) {
          //user_id O likey O

          const userLikeyList = await models.likey.findAll({
            attributes: ["debate_id"],
            where: {
              [Op.and]: [
                { user_id: user_id },
                {
                  column_id: {
                    [Op.is]: null,
                  },
                },
              ],
            },
          });

          const likeyArray = userLikeyList.map((data) => {
            return data.debate_id;
          });

          if (categoryArray.length > 0) {
            // user_id O likey O category O

            if (status) {
              // user_id O likey O category O status O

              await models.debate
                .findAll({
                  offset: offset,
                  limit: limit,
                  where: {
                    [Op.or]: [
                      {
                        [Op.and]: [
                          {
                            id: {
                              [Op.in]: likeyArray,
                            },
                          },
                          {
                            status: status,
                          },
                        ],
                      },
                      {
                        [Op.and]: [
                          {
                            category: {
                              [Op.in]: categoryArray,
                            },
                          },
                          {
                            status: status,
                          },
                        ],
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
                  return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
                });
            } else {
              // user_id O likey O category O status X

              await models.debate
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
                  return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
                });
            }
          } else {
            // user_id O likey O category X

            if (status) {
              // user_id O likey O category X status O

              await models.debate
                .findAll({
                  offset: offset,
                  limit: limit,
                  where: {
                    [Op.and]: [
                      {
                        id: {
                          [Op.in]: likeyArray,
                        },
                      },
                      {
                        status: status,
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
                  return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
                });
            } else {
              // user_id O likey O category X status X

              await models.debate
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
                  return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
                });
            }
          }
        } else {
          // user_id O likey X

          if (categoryArray.length > 0) {
            // user_id O likey X category O

            if (status) {
              // user_id O likey X category O status O

              await models.debate
                .findAll({
                  offset: offset,
                  limit: limit,
                  where: {
                    [Op.and]: [
                      {
                        category: {
                          [Op.in]: categoryArray,
                        },
                      },
                      {
                        status: status,
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
                  return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
                });
            } else {
              // user_id O likey X category O status X

              await models.debate
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
                  return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
                });
            }
          } else {
            // user_id O likey X category X

            if (status) {
              // user_id O likey X category X status O

              await models.debate
                .findAll({
                  offset: offset,
                  limit: limit,
                  where: {
                    status: status,
                  },
                })
                .then((result) => {
                  console.log("result : ", result);
                  return res.status(200).json({ data: result, message: "조회 성공" });
                })
                .catch((error) => {
                  console.log("error : ", error);
                  return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
                });
            } else {
              // user_id O likey X category X status X
              await models.debate
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
                  return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
                });
            }
          }
        }
      } else {
        //user_id X

        if (categoryArray.length > 0) {
          // user_id X category O

          if (status) {
            // user_id X category O status O

            await models.debate
              .findAll({
                offset: offset,
                limit: limit,
                where: {
                  [Op.and]: [
                    {
                      category: {
                        [Op.in]: categoryArray,
                      },
                    },
                    {
                      status: status,
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
                return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
              });
          } else {
            // user_id X cateogry O status X

            await models.debate
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
                return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
              });
          }
        } else {
          // user_id X category X

          if (status) {
            // user_id X category X status O
            await models.debate
              .findAll({
                offset: offset,
                limit: limit,
                where: {
                  status: status,
                },
              })
              .then((result) => {
                console.log("result : ", result);
                return res.status(200).json({ data: result, message: "조회 성공" });
              })
              .catch((error) => {
                console.log("error : ", error);
                return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
              });
          } else {
            // user_id X category X status X
            await models.debate
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
                return res.status(500).json({ data: null, message: "토론 조회 실패 에러 발생" });
              });
          }
        }
      }
    }
  },
};
