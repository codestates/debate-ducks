// import axios from "axios";

import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StrawBtn } from "../btn/BaseBtn";
import { Politics, Society, Economics, Science, IT, Environment, Education, History, Sports, Philosophy, Culture, JustForFun } from "./CategoryBackground";

// import axios from "axios";

export default function OnGoingDebate(debate) {
  const { debateId } = useParams();
  const userInfo = useSelector((state) => state.user.data);
  const handleParticipate = () => {
    console.log("axios 하기 전입니다", userInfo);
    if (debate.debateInfo.host_id === debate.debateInfo.pros_id) {
      axios.patch(`${process.env.REACT_APP_API_URL}/debate/${debateId}`, { participant_id: userInfo.id, cons_id: userInfo.id }).then((data) => console.log(data));
    } else if (debate.debateInfo.host_id === debate.debateInfo.cons_id) {
      axios.patch(`${process.env.REACT_APP_API_URL}/debate/${debateId}`, { participant_id: userInfo.id, pros_id: userInfo.id });
    } else {
      console.log("Errorrrrrrrr");
    }
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
    <div>
      <Background {...debate} />
      {!debate.debateInfo.participant_id ? (
        debate.debateInfo.host_id === debate.debateInfo.pros_id ? (
          <div>
            <div>
              <div>pros</div>
              <img src={debate.prosProfile} className="w-140 h-140 object-cover rounded-full" />
            </div>
            <div>
              <div>const</div>
              <div className="bg-grayduck w-140 h-140 bg-cover rounded-full"></div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div>pros</div>
              <div className="bg-grayduck w-140 h-140 bg-cover rounded-full"></div>
            </div>
            <div>
              <div>cons</div>
              <img src={debate.consProfile} className="w-140 h-140 object-cover rounded-full" />
            </div>
          </div>
        )
      ) : (
        <div>
          <div>
            <div>pros</div>
            <img src={debate.prosProfile} className="w-140 h-140 object-cover rounded-full" />
          </div>
          <div>
            <div>cons</div>
            <img src={debate.consProfile} className="w-140 h-140 object-cover rounded-full" />
          </div>
        </div>
        // <div>
        //   <div>
        //     <div>pros</div>
        //     <img src={debate.debateInfo.host_id === debate.debateInfo.pros_id ? debate.prosProfile : debate.consProfile} className="w-140 h-140 object-cover rounded-full" />
        //   </div>
        //   <div>
        //     <div>cons</div>
        //     <img src={debate.debateInfo.host_id === debate.debateInfo.pros_id ? debate.consProfile : debate.prosProfile} className="w-140 h-140 object-cover rounded-full" />
        //   </div>
        // </div>
      )}
      <div>{debate.debateInfo.topic}</div>
      {!debate.debateInfo.participant_id ? <StrawBtn text="participate" callback={handleParticipate} /> : null}
    </div>
  );
}
