const express = require("express");
const router = express.Router();
const axios = require("axios");

const { Video } = require("../models/debate"); // 여기에 models 필요.

// debateRoom에서 저장된 video를 -> save video to database
router.post("/saveVideo", (req, res) => {
  const video = new Video(req.body);
  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

// search database & send video to client (pages/Debate)
router.post("/getVideo", (req, res) => {
  // 클라이언트에서 원하는 videoId 에 맞춰 res 보내주기
  // populte 쓰는 이유는 video의 id, views, writer, title, description, privacy, filePath, duration, thumbnail, createdAt, updatedAt, __v 정보까지 다 가져오려고.
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, video });
    });
});
module.exports = router;
