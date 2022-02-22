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
