const express = require("express");
const router = express.Router();
const factcheckController = require("../controllers/factcheck");

router.post("/:user_id/:debate_id", factcheckController.create_factcheck); // 팩트체크 생성
router.get("/list/:debate_id", factcheckController.get_factcheck); // 팩트체크 조회
router.patch("/:factcheck_id", factcheckController.update_factcheck); // 팩트체크 수정
router.delete("/:factcheck_id", factcheckController.delete_factcheck); // 팩트체크 삭제

module.exports = router;
