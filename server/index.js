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

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH"],
  }),
);

app.use("/", indexRouter);

// Socket local
// const fs = require("fs");
// const options = {
//   key: fs.readFileSync(__dirname + "/key.pem", "utf-8"),
//   cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
// };
// const https = require("https");
// const server = https.createServer(options, app);
// const { Server } = require("socket.io");
// const io = new Server(server, { cors: { origin: "*" } });

// deploy;
const fs = require("fs");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  // // Common
  // socket.on("join", (debateId, userName, done) => {
  //   const userCount = io.sockets.adapter.rooms.get(debateId)?.size;
  //   if (userCount >= 2) {
  //     done("exceed");
  //   } else {
  //     socket.join(debateId);
  //     socket.to(debateId).emit("welcome", userName);
  //     done("join");
  //   }
  // });
  // socket.on("disconnecting", () => {
  //   socket.rooms.forEach((room) => {
  //     socket.to(room).emit("leave");
  //   });
  // });
  // // Chat
  // socket.on("chat", (debateId, chat, authorName) => {
  //   socket.to(debateId).emit("chat", chat, authorName);
  // });
  // // Video
  // socket.on("offer", (debateId, webRTCOffer) => {
  //   socket.to(debateId).emit("offer", webRTCOffer);
  // });
  // socket.on("answer", (debateId, webRTCAnswer) => {
  //   socket.to(debateId).emit("answer", webRTCAnswer);
  // });
  // socket.on("ice-candidate", (debateId, iceCandidate) => {
  //   socket.to(debateId).emit("ice-candidate", iceCandidate);
  // });

  // //
  // socket.on("join", (debateId) => {
  //   socket.join(debateId);
  //   socket.to(debateId).emit("someone_join");
  // });
  // socket.on("sent_host_signal", (signal, debateId) => {
  //   socket.to(debateId).emit("received_host_signal", signal);
  // });
  // socket.on("sent_guest_signal", (signal, debateId) => {
  //   socket.to(debateId).emit("received_guest_signal", signal);
  // });

  // //
  // socket.on("join", (debateId) => {
  //   socket.join(debateId);
  //   socket.to(debateId).emit("get_host_signal");
  // });
  // socket.on("guest_signal", (signal, hostPeerStr, debateId) => {
  //   socket.to(debateId).emit("guest_signal", signal, hostPeerStr);
  // });
  // socket.on("set_host_signal", (signal, hostPeerStr, debateId) => {
  //   socket.to(debateId).emit("set_host_signal", signal, hostPeerStr);
  // });

  // --- //

  socket.on("join", (data) => {
    socket.join(data.debateId);
    socket.to(data.debateId).emit("guest_join");
  });

  socket.on("host_signal", (data) => {
    socket.to(data.debateId).emit("host_signal", data.signal);
  });

  socket.on("guest_signal", (data) => {
    socket.to(data.debateId).emit("guest_signal", data.signal);
  });
});

app.use((req, res, next) => {
  res.status(404).send("Sorry cant find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

server.listen(port, () => console.log(`${port}포트에서 서버 가동 중`));
