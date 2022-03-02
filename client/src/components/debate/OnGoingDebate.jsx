import axios from "axios";
// import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { StrawBtn } from "../btn/BigBtn";
import { Politics, Society, Economics, Science, IT, Environment, Education, History, Sports, Philosophy, Culture, JustForFun } from "./CategoryBackground";

export default function OnGoingDebate(debate) {
  // const [debate, setDebate] = useState();
  const navigate = useNavigate();
  const { debateId } = useParams();
  const userInfo = useSelector((state) => state.user.data);
  const handleParticipate = () => {
    console.log("axios 하기 전입니다", userInfo);
    if (debate.debateInfo.host_id === debate.debateInfo.pros_id) {
      axios.patch(`${process.env.REACT_APP_API_URL}/debate/${debateId}`, { participant_id: userInfo.id, cons_id: userInfo.id }).then(() => navigate(`/debate/${debateId}`));
    } else if (debate.debateInfo.host_id === debate.debateInfo.cons_id) {
      axios.patch(`${process.env.REACT_APP_API_URL}/debate/${debateId}`, { participant_id: userInfo.id, pros_id: userInfo.id });
    } else {
      console.log("Errorrrrrrrr");
    }
  };

  const handleEnter = () => {
    navigate(`/forum/debateroom/${debateId}`);
  };
  console.log(userInfo);

  const Background = (debate) => {
    switch (debate.debateInfo.category) {
      case "Politics":
        return <Politics {...debate} />;
      case "Society":
        return <Society {...debate} />;
      case "Economics":
        return <Economics {...debate} />;
      case "Science":
        return <Science {...debate} />;
      case "IT":
        return <IT {...debate} />;
      case "Environment":
        return <Environment {...debate} />;
      case "Education":
        return <Education {...debate} />;
      case "History":
        return <History {...debate} />;
      case "Sports":
        return <Sports {...debate} />;
      case "Philosophy":
        return <Philosophy {...debate} />;
      case "Culture":
        return <Culture {...debate} />;
      case "Just For Fun":
        return <JustForFun {...debate} />;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Background {...debate} />
      {!debate.debateInfo.participant_id ? (
        debate.debateInfo.host_id === debate.debateInfo.pros_id ? (
          <div className="w-410 flex justify-between items-center my-60 z-30">
            <div>
              <img src={debate.prosProfile} className="w-140 h-140 object-cover rounded-full mb-20 border-4 border-solid border-ducks-orange-ff9425" />
              <div className="text-center text-ducks-orange-ff9425 font-poppins font-bold">
                <div>pros</div>
                <div>{debate.prosName}</div>
              </div>
            </div>
            <div className="text-24 font-poppins font-bold">VS</div>
            <div>
              <div className="bg-grayduck w-140 h-140 bg-cover rounded-full mb-20"></div>
              <div className="text-center text-ducks-gray-ccc font-poppins">
                <div className="font-bold">cons</div>
                <div>not in</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-410 flex justify-between items-center my-60 z-30">
            <div>
              <div className="bg-grayduck w-140 h-140 bg-cover rounded-full mb-20"></div>
              <div className="text-center text-ducks-gray-ccc font-poppins">
                <div className="font-bold">pros</div>
                <div>not in</div>
              </div>
            </div>
            <div className="text-24 font-poppins font-bold">VS</div>
            <div>
              <img src={debate.consProfile} className="w-140 h-140 object-cover rounded-full mb-20 border-4 border-solid border-ducks-blue-6667ab" />
              <div className="text-center text-ducks-blue-6667ab font-poppins font-bold">
                <div>cons</div>
                <div>{debate.consName}</div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="w-410 flex justify-between items-center my-60 z-30">
          <div>
            <img src={debate.prosProfile} className="w-140 h-140 object-cover rounded-full mb-20 border-4 border-solid border-ducks-orange-ff9425" />
            <div className="text-center text-ducks-orange-ff9425 font-poppins font-bold">
              <div>pros</div>
              <div>{debate.prosName}</div>
            </div>
          </div>
          <div className="text-24 font-poppins font-bold">VS</div>
          <div>
            <img src={debate.consProfile} className="w-140 h-140 object-cover rounded-full mb-20 border-4 border-solid border-ducks-blue-6667ab" />
            <div className="text-center text-ducks-blue-6667ab font-poppins font-bold">
              <div>cons</div>
              <div>{debate.consName}</div>
            </div>
          </div>
        </div>
      )}
      <div className="w-960 h-0 border-solid border-b border-ducks-gray-eee"></div>
      <div className="my-60 text-center">
        <h1 className="font-bold text-24 mb-40">Topic</h1>
        <div className="w-960 text-justify">{debate.debateInfo.topic}</div>
      </div>
      {!debate.debateInfo.participant_id ? <StrawBtn text="participate" callback={handleParticipate} /> : <StrawBtn text="enter debate room" callback={handleEnter} />}
      <div className="w-960 h-0 border-solid border-b border-ducks-gray-eee my-60"></div>
    </div>
  );
}
