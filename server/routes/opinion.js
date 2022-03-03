const express = require("express");
const router = express.Router();
const opinionController = require("../controllers/opinion");

router.post("/:user_id/column/:column_id", opinionController.create_opinion_column); // 댓글 생성
router.post("/:user_id/debate/:debate_id", opinionController.create_opinion_debate); // 댓글 생성
router.get("/list/column/:column_id", opinionController.get_opinion_column); // 댓글 조회
router.get("/list/debate/:debate_id", opinionController.get_opinion_debate);
router.patch("/:opinion_id", opinionController.update_opinion); // 댓글 수정
router.delete("/:opinion_id", opinionController.delete_opinion); // 댓글 삭제

module.exports = router;
