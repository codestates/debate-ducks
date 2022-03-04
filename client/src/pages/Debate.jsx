import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import OnGoingDebate from "../components/debate/OnGoingDebate";
import Voting from "../components/debate/Voting";
import Completed from "../components/debate/Completed";
import Loading from "../components/Loading";

export default function Debate() {
  const [debate, setDebate] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [deadline, setDeadline] = useState(0);

  let { debateId } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/debate/single/${debateId}`, { withCredentials: true }).then((data) => {
      const dayOfDeadline = data.data.data.debateInfo.ended_at;
      if (dayOfDeadline) {
        const today = new Date();
        const gap = new Date(dayOfDeadline).getTime() - today.getTime();
        setDeadline(Math.floor(gap / (1000 * 60 * 60 * 24)) * -1);
      }
      console.log(data.data.data);
      setDebate(data.data.data);
      setIsLoading(false);
    });
  }, []);

  console.log(deadline);
  return <div>{isLoading ? <Loading /> : !debate?.debateInfo.video ? <OnGoingDebate {...debate} /> : deadline > 0 ? <Voting {...debate} /> : <Completed {...debate} />}</div>;
}
