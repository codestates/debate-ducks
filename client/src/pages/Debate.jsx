import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import OnGoingDebate from "../components/debate/OnGoingDebate";
import Voting from "../components/debate/Voting";
import Completed from "../components/debate/Completed";
import Loading from "../components/Loading";
import { HiOutlineDotsVertical } from "react-icons/hi";
// import { divideColor } from "tailwindcss/defaultTheme";

export default function Debate() {
  const [debate, setDebate] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [deadline, setDeadline] = useState(0);

  let { debateId } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/debate/single/${debateId}`, { withCredentials: true }).then((data) => {
      // const dayOfDeadline = data.data.data.debateInfo.ended_at;
      // if (dayOfDeadline) {
      //   const today = new Date();
      //   const gap = new Date(dayOfDeadline).getTime() - today.getTime();
      //   setDeadline(Math.floor(gap / (1000 * 60 * 60 * 24)) * -1);
      // }
      // console.log(data.data.data);
      setDebate(data.data.data);
      setIsLoading(false);
    });
  }, [debate?.prosProfile, debate?.consProfile]);

  console.log(debate.debateInfo?.video);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex flex-col items-center">
            <div className="w-screen h-410 relative">
              <HiOutlineDotsVertical className="w-60 h-80 p-3 absolute top-0 right-0 text-white text-32 cursor-pointer z-20" />
              <h1 className="font-poppins font-bold text-48 text-white z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">{debate.debateInfo.title}</h1>
              <div className="w-full h-410 absolute bg-ducks-blue-6667ab z-10 mix-blend-exclusion"></div>
              <img className="object-cover object-center w-screen h-410" src={`/images/${debate.debateInfo.category.toLowerCase()}.jpg`} alt={debate.debateInfo.category} />
            </div>
          </div>
          <div className="flex flex-col items-center">
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
            {debate.debateInfo.status === "ongoing" ? (
              <OnGoingDebate debate={debate} isLoading={isLoading} setDebate={setDebate} />
            ) : debate.debateInfo.status === "voting" ? (
              <Voting debate={debate} />
            ) : debate.debateInfo.status === "completed" ? (
              <Completed />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
