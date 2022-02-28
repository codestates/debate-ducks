import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import OnGoingDebate from "../components/debate/OnGoingDebate";

export default function Debate() {
  // const debateId = 1;
  // const debateData = axios.get(`${process.env.REACT_APP_API_URL}/debate/${debateId}`);
  const [debate, setDebate] = useState({});

  useEffect(async () => {
    const debateData = await axios.get(`${process.env.REACT_APP_API_URL}/test`, { withCredentials: true }).then((data) => {
      return data.data.data;
    });
    setDebate(debateData);
  }, []);

  console.log(debate.video);
  return <div>{typeof debate.video === "undefined" ? <OnGoingDebate {...debate} /> : debate.ended_at > Date.now() ? <div>Voting</div> : <div>Completed</div>}</div>;
}
