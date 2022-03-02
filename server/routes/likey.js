const express = require("express");
const router = express.Router();
const likeyController = require("../controllers/likey");

router.post("/:user_id/coulumn/:column_id", likeyController.likey_column); // 좋아요 생성
router.post("/:user_id/debate/:debate_id", likeyController.likey_debate); // 좋아요 생성
router.delete("/:likey_id", likeyController.delete_likey); // 좋아요 삭제

module.exports = router;
