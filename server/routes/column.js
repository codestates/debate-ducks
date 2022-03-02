const express = require("express");
const router = express.Router();
const columnController = require("../controllers/column");

router.post("/:user_id", columnController.create_column); // 칼럼 생성
router.get("/single/:column_id", columnController.get_column); // 칼럼 조회
router.patch("/:column_id", columnController.update_column); // 칼럼 수정
router.delete("/:column_id", columnController.delete_column); // 칼럼 삭제
router.get("/list", columnController.get_columns); // 칼럼 리스트 조회

module.exports = router;
