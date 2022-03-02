const express = require("express");
const router = express.Router();
const voteController = require("../controllers/vote");

router.post("/:user_id/:debate_id", voteController.create_vote); // 투표 생성
router.delete("/:vote_id", voteController.delete_vote); //

module.exports = router;
