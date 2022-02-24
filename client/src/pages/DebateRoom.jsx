import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/debate_room/Chat";
import Video from "../components/debate_room/Video";

export default function DebateRoom() {
  const { debateId } = useParams();

  const [socket, setSocket] = useState({});
  useEffect(() => {
    setSocket(io(`${process.env.REACT_APP_API_URL}`));
  }, []);

  //! 임시 변수
  const isDebating = false;

  return (
    <div>
      <h1>-DebateRoom-</h1>
      {Object.keys(socket).length === 0 ? <div>Loading</div> : isDebating ? <Chat socket={socket} debateId={debateId} /> : <Video socket={socket} debateId={debateId} />}
    </div>
  );
}
