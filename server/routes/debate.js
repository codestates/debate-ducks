const express = require("express");
const router = express.Router();
const debateController = require("../controllers/debate");

router.post("/:host_id", debateController.create_debate); // 토론 생성
router.get("/single/:debate_id", debateController.get_debate); // 토론 조회
router.patch("/:debate_id", debateController.update_debate); // 토론 수정
router.patch("/:debate_id/video", debateController.update_video); // 토론 비디오 업로드
router.delete("/:debate_id", debateController.delete_debate); // 토론 삭제
router.get("/list", debateController.get_debates); // 토론 리스트 조회
router.get("/debate_room/:debate_id", debateController.get_debate_room); // 토론 방 조회
router.patch("/debate_room/:debate_id/video", debateController.update_debate_room_video); // 토론 방에서 비디오 업로드

module.exports = router;
