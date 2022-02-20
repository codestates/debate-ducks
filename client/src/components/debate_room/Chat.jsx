import PropTypes from "prop-types";
Chat.propTypes = { socket: PropTypes.object };

export default function Chat({ socket }) {
  socket.on("connect", () => {
    console.log("Connected a server");
  });

  socket.on("welcome", (msg) => {
    console.log(msg);
  });

  socket.emit("nice_to_meet_yot", "Nice to meet you");

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
}
