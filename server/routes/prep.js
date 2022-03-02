const express = require("express");
const router = express.Router();
const prepController = require("../controllers/prep");

router.post("/:user_id/:debate_id", prepController.create_prep); // 사전 회의글 생성
router.get("/list/:debate_id", prepController.get_prep); // 댓글 조회
router.patch("/:prep_id", prepController.update_prep); // 댓글 수정
router.delete("/:prep_id", prepController.delete_prep); // 댓글 삭제

module.exports = router;
