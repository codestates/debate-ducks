const express = require("express");
const router = express.Router();
const voteController = require("../controllers/vote");

router.post("/:user_id/:debate_id", voteController.create_vote); // 투표 생성
router.delete("/:user_id/:debate_id", voteController.delete_vote); // 투표 삭제
router.get("/:user_id/:debate_id", voteController.get_vote); // 투표 조회
router.patch("/:user_id/:debate_id", voteController.update_vote); // 투표 조회

module.exports = router;
