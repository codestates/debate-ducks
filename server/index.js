const express = require("express");
const app = express();
const port = 80;
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const videoBoxRouter = require("./routes/videoBox");

fs.readdir("uploads", (error) => {
  if (error) {
    console.error("uploads 폴더가 존재하지 않습니다. 생성합니다.");
    fs.mkdirSync("uploads");
  }
});
app.use(express.static("uploads"));
app.use(helmet());
app.use(express.json());
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
app.use("/user", userRouter);
app.use("/videoBox", videoBoxRouter);

//! Local
// const options = {
//   key: fs.readFileSync(__dirname + "/key.pem", "utf-8"),
//   cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
// };
// const https = require("https");
// const server = https.createServer(options, app);
// const { Server } = require("socket.io");
// const io = new Server(server, { cors: { origin: "*" } });

//! Deploy;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join", (data, done) => {
    const userCount = io.sockets.adapter.rooms.get(data.debateId)?.size;
    if (userCount >= 2) {
      done();
    } else {
      socket.join(data.debateId);
      socket.to(data.debateId).emit("guest_join");
    }
  });

  socket.on("host_signal", (data) => {
    socket.to(data.debateId).emit("host_signal", { signal: data.signal });
  });

  socket.on("guest_signal", (data) => {
    socket.to(data.debateId).emit("guest_signal", { signal: data.signal });
  });

  socket.on("leave", (data) => {
    socket.to(data.debateId).emit("peer_disconnecting");
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("peer_disconnecting");
    });
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
