// import axios from "axios";

// import axios from "axios";

export default function OnGoingDebate(debate) {
  console.log(debate);
  // console.log(user);
  // debate = {
  //   debateInfo: {
  //     id: 5,
  //     category: "history",
  //     host_id: 1,
  //     participant_id: null,
  //     pros_id: null,
  //     cons_id: 1,
  //     title: "",
  //     topic: "",
  //     video: "",
  //     ended_at: "",
  //   },
  //   consName: "김수빈",
  //   consProfile: "",
  //   prosName: "",
  //   prosProfile: "",
  // };
  return (
    <>
      <div className="bg-politics w-full h-410 bg-cover bg-center flex justify-center items-center">
        <h1 className="text-white text-48 font-poppins font-bold">{debate.debateInfo.title}</h1>
      </div>
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
    </>
  );
}
