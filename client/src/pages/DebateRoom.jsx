import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RealtimeDebate from "../components/debate_room/RealtimeDebate";

export default function DebateRoom() {
  const { debateId } = useParams();

  const [socket, setSocket] = useState({});
  useEffect(() => {
    setSocket(io(`${process.env.REACT_APP_API_URL}`));
  }, []);

  return (
    <div>
      <h1>-DebateRoom-</h1>
      {Object.keys(socket).length === 0 ? <div>Loading</div> : <RealtimeDebate socket={socket} debateId={debateId} />}
    </div>
  );
}
