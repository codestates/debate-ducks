const express = require("express");
const app = express();
const port = 80;
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const indexRouter = require("./routes/index");

app.use(helmet());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(cors());

app.use("/", indexRouter);

// Socket
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  // Common
  socket.on("join", (debateId, userName, done) => {
    const userCount = io.sockets.adapter.rooms.get(debateId)?.size;
    if (userCount >= 2) {
      done("exceed");
    } else {
      console.log("join", socket.rooms);
      socket.join(debateId);
      socket.userName = userName;
      socket.to(debateId).emit("welcome", userName);
      done("join");
    }
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("leave");
    });
  });

  // Chat
  socket.on("chat", (debateId, chat, authorName) => {
    socket.to(debateId).emit("chat", chat, authorName);
  });

  // Video
  socket.on("offer", (debateId, webRTCOffer) => {
    socket.to(debateId).emit("offer", webRTCOffer);
  });

  socket.on("answer", (debateId, webRTCAnswer) => {
    socket.to(debateId).emit("answer", webRTCAnswer);
  });

  socket.on("ice-candidate", (debateId, iceCandidate) => {
    socket.to(debateId).emit("ice-candidate", iceCandidate);
  });
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
