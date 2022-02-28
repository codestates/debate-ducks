// import axios from "axios";

// import axios from "axios";

export default function OnGoingDebate(debate) {
  console.log(debate.participantProfile);
  // console.log(user);
  return (
    <>
      <h1>{debate.title}</h1>
      {!debate.participant_id ? (
        debate.host_id === debate.pros_id ? (
          <div>
            <div>
              <div>pros</div>
              <img src={debate.hostProfile} className="w-140 h-140 object-cover rounded-full" />
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
              <img src={debate.hostProfile} className="w-140 h-140 object-cover rounded-full" />
            </div>
          </div>
        )
      ) : (
        <div>
          <div>
            <div>pros</div>
            <img src={debate.host_id === debate.pros_id ? debate.hostProfile : debate.participantProfile} className="w-140 h-140 object-cover rounded-full" />
          </div>
          <div>
            <div>cons</div>
            <img src={debate.host_id === debate.cons_id ? debate.hostProfile : debate.participantProfile} className="w-140 h-140 object-cover rounded-full" />
          </div>
        </div>
      )}
      <div>{debate.topic}</div>
    </>
  );
}
