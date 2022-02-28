import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { onOffModal } from "../../redux/modules/exceedModal";
import ConfirmModal from "../modal/ConfirmModal";

import PropTypes from "prop-types";
Chat.propTypes = { socket: PropTypes.object, debateId: PropTypes.string };

export default function Chat({ socket, debateId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  //! 임시 변수
  const userName = "Yuchan";

  // Chat
  const chat = useInput("");

  const sendMyChat = () => {
    if (chat.input.length > 0) {
      setChats([...chats, { type: "myChat", chat: chat.input, author: userName }]);
      socket.emit("chat", debateId, chat.input, userName);
      chat.setInput("");
    }
  };

  const sendChatClick = () => {
    sendMyChat();
  };

  const sendChatEnter = (ev) => {
    if (ev.key === "Enter") sendMyChat();
  };

  socket.on("chat", (msg, authorName) => {
    setChats([...chats, { type: "peerChat", chat: msg, author: authorName }]);
  });

  // Join & Leave
  useEffect(() => {
    socket.emit("join", debateId, userName, (status) => {
      switch (status) {
        case "exceed":
          socket.disconnect();
          dispatch(onOffModal(true));
          navigate(`/forum/debate/${debateId}`);
          break;
        case "join":
          console.log("temp: join");
          setChats([...chats, { type: "notice", chat: `You joined the room.` }]);
          break;
      }
    });
  }, []);

  socket.on("welcome", (userName) => {
    setChats([...chats, { type: "notice", chat: `${userName} joined the room.` }]);
  });

  socket.on("leave", () => {
    setIsLeaveModalOpen(true);
  });

  const onStayBtn = () => {
    setIsLeaveModalOpen(false);
  };

  const onLeaveBtn = () => {
    leaveRoom();
  };

  const leaveRoom = () => {
    socket.disconnect();
    navigate(`/forum/debate/${debateId}`);
  };

  return (
    <div>
      <h1>Chat</h1>
      {isLeaveModalOpen ? (
        <ConfirmModal content={{ title: "퇴장", text: "상대방이 퇴장하였습니다. 당신도 떠나겠습니까?", left: "남는다", right: "떠난다" }} cancelCallback={onStayBtn} confirmCallback={onLeaveBtn} />
      ) : null}
      <ul>
        {chats.map((chat, idx) =>
          chat.type === "notice" ? (
            <li key={idx} className="text-center">
              {chat.chat}
            </li>
          ) : chat.type === "myChat" ? (
            <li key={idx} className="text-right">
              {chat.author}: {chat.chat}
            </li>
          ) : (
            <li key={idx} className="text-left">
              {chat.author}: {chat.chat}
            </li>
          ),
        )}
      </ul>
      <input {...chat.attribute} onKeyUp={sendChatEnter} />
      <button onClick={sendChatClick}>Send</button>
      <button onClick={leaveRoom}>Leave</button>
    </div>
  );
}