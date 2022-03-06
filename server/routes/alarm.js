const express = require("express");
const router = express.Router();
const alarmController = require("../controllers/alarm");

// 우선순위 : 낮음

// router.post("/:user_id", alarmController.create_alarm); // 알람 생성
// router.get("/list/:column_id", alarmController.get_alarm); // 알람 조회
// router.patch("/:alarm_id", alarmController.update_alarm); // 알람 수정
// router.delete("/:alarm_id", alarmController.delete_alarm); // 알람 삭제

module.exports = router;
