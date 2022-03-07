import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

Voting.propTypes = { debate: PropTypes.object };

export default function Voting({ debate }) {
  const { debateId } = useParams();

  const [vote, setVote] = useState(null);

  const userId = useSelector((state) => state.user.data.id);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/vote/${userId}/${debateId}`, { withCredentials: true }).then((data) => {
      setVote(data.data.data);
    });
  }, []);

  function voteToEmpty(boolean) {
    console.log("empty", vote);
    if (typeof vote !== "boolean") {
      axios.post(`${process.env.REACT_APP_API_URL}/vote/${userId}/${debateId}`, { pros: boolean }, { withCredentials: true }).then((data) => {
        setVote(data.data.data);
        console.log(data.data.data);
      });
    } else {
      axios.patch(`${process.env.REACT_APP_API_URL}/vote/${userId}/${debateId}`, { pros: boolean }, { withCredentials: true }).then((data) => {
        setVote(data.data.data);
        console.log(data.data.data);
      });
    }
  }

  function voteToFilled(boolean) {
    if (vote !== boolean) {
      axios.patch(`${process.env.REACT_APP_API_URL}/vote/${userId}/${debateId}`, { pros: boolean }, { withCredentials: true }).then((data) => {
        setVote(data.data.data);
        console.log(data.data.data);
      });
    } else {
      axios.delete(`${process.env.REACT_APP_API_URL}/vote/${userId}/${debateId}`, { withCredentials: true }).then(() => {
        setVote(null);
      });
    }
  }

  return (
    <>
      <div>
        <div className="w-960 h-0 border-solid border-b border-ducks-gray-eee"></div>
        <div className="my-60 text-center">
          <h1 className="font-bold text-24 mb-40">Topic</h1>
          <div className="w-960 text-center">{debate.debateInfo.topic}</div>
        </div>
      </div>
      <div>
        <div className="w-960 h-0 border-solid border-b border-ducks-gray-eee"></div>
        <div className="my-60 text-center">
          <h1 className="font-bold text-24 mb-40">Debate Video</h1>
        </div>
      </div>
      <video id="example_video_1" controls preload="auto" width="1280" height="660" className="mb-24">
        <source src={`${debate.debateInfo.video}`} type="video/webm" />
      </video>
      <div className="mt-8">
        <div className="w-960 h-0 border-solid border-b border-ducks-gray-eee"></div>
        <div className="my-60 text-center">
          <h1 className="font-bold text-24 mb-40">Vote</h1>

          <div className="flex justify-center gap-60">
            {typeof vote !== "boolean" || !vote ? (
              <div className="border-4 border-solid border-ducks-orange-ff9425 rounded-full p-24 w-max hover:brightness-90" onClick={() => voteToEmpty(true)}>
                <img src="/images/logo_pro.png" className="w-140" />
              </div>
            ) : (
              <>
                <div className="border-4 border-solid border-ducks-orange-ff9425 rounded-full p-24 w-max text-white bg-ducks-orange-ff9425 hover:brightness-90" onClick={() => voteToFilled(true)}>
                  <div className="w-140 h-140 text-center text-5xl font-bold flex items-center justify-center">Voted</div>
                </div>
              </>
            )}
            {typeof vote !== "boolean" || vote ? (
              <div className="border-4 border-solid border-ducks-blue-6667ab rounded-full p-24 w-max hover:brightness-75" onClick={() => voteToEmpty(false)}>
                <img src="/images/logo_con.png" className="w-140" />
              </div>
            ) : (
              <>
                <div className="border-4 border-solid border-ducks-blue-6667ab rounded-full p-24 w-max text-white bg-ducks-blue-6667ab hover:brightness-75" onClick={() => voteToFilled(false)}>
                  <div className="w-140 h-140 text-center text-5xl font-bold flex items-center justify-center">Voted</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
