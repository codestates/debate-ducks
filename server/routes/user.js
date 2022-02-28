const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
require("dotenv").config();

router.get("/", userController.get_user);

router.patch("/:userId", userController.update_user);

router.delete("/:userId", userController.delete_user);

module.exports = router;
