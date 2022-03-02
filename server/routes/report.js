const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report");

router.post("/:user_id/column/:column_id", reportController.report_column); // 칼럼 신고
router.post("/:user_id/debate/:debate_id", reportController.report_debate); // 토론 신고

module.exports = router;
