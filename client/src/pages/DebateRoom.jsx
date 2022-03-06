import io from "socket.io-client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import RealtimeDebate from "../components/debate_room/RealtimeDebate";
import Loading from "../components/Loading";

export default function DebateRoom() {
  const navigate = useNavigate();
  const { debateId } = useParams();

  const userId = useSelector((state) => state.user.data.id);

  const [socket, setSocket] = useState({});
  const [debateInfo, setDebateInfo] = useState({});
  const [isPro, setIsPro] = useState(null);

  useEffect(() => {
    setSocket(io(`${process.env.REACT_APP_API_URL}`));

    axios
      .get(`${process.env.REACT_APP_API_URL}/debate/debate_room/${debateId}`, { withCredentials: true })
      .then((res) => {
        setDebateInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  }, []);

  useEffect(() => {
    if (userId === debateInfo.proId) {
      setIsPro(true);
    } else if (userId === debateInfo.conId) {
      setIsPro(false);
    }
  }, [debateInfo.title]);

  return (
    <div>
      {Object.keys(socket).length !== 0 && Object.keys(debateInfo).length !== 0 && isPro !== null ? (
        <RealtimeDebate socket={socket} debateId={debateId} debateInfo={debateInfo} isPro={isPro} />
      ) : (
        <Loading />
      )}
    </div>
  );
}
