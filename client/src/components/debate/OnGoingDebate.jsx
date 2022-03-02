// import axios from "axios";

import { StrawBtn } from "../btn/BaseBtn";

// import axios from "axios";

export default function OnGoingDebate(debate) {
  return (
    <>
      <h1>{debate.debateInfo.title}</h1>
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
            <img src={debate.debateInfo.host_id === debate.debateInfo.pros_id ? debate.prosProfile : debate.consProfile} className="w-140 h-140 object-cover rounded-full" />
          </div>
          <div>
            <div>cons</div>
            <img src={debate.debateInfo.host_id === debate.debateInfo.cons_id ? debate.consProfile : debate.prosProfile} className="w-140 h-140 object-cover rounded-full" />
          </div>
        </div>
      )}
      <div>{debate.debateInfo.topic}</div>
      {!debate.debateInfo.participant_id ? <StrawBtn text="participate" /> : null}
    </>
  );
}
