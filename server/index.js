const express = require("express");
const app = express();
const port = 80;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// Socket
//! 임시로 구성한 서버라서 백에서 https 구현할 때 수정
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnecting", () => {
    console.log("A user disconnected");
  });

  socket.emit("welcome", "Welcome");

  socket.on("nice_to_meet_yot", (msg) => {
    console.log(msg);
  });
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
