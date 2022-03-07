import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import DebateBoxBackground from "./DebateBoxBackground";
// import { Likey, Voted } from "./LikeyOrVoted";

DebateBox.propTypes = { content: PropTypes.object };

export default function DebateBox({ content }) {
  // const today = new Date();
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(content.id);
    navigate(`/forum/debate/${content.id}`);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  console.log(content);

  return (
    <div className="w-max border border-solid border-ducks-gray-eee rounded-12 cursor-pointer my-18 mx-18 shadow-md hover:shadow-2xl" onClick={handleClick}>
      <DebateBoxBackground category={content.category} />
      <div className="px-48 flex items-center justify-between relative -translate-y-10">
        <div className="flex flex-col justify-center items-center">
          {content.prosProfile ? (
            <img src={content.prosProfile} className="w-90 h-90 mb-12 rounded-full border-solid border-ducks-orange-ff9425 border-4" />
          ) : (
            <div className="bg-greenduck bg-cover w-90 h-90 mb-12 rounded-full border-solid border-ducks-orange-ff9425 border-4"></div>
          )}
          <div className="text-14 text-center font-bold text-ducks-orange-ff9425">{content.prosName ? content.prosName : "Anonymous"}</div>
        </div>
        <div className="font-bold">VS</div>
        <div className="">
          {content.consProfile ? (
            <img src={content.consProfile} className="w-90 h-90 mb-12 rounded-full border-solid border-ducks-blue-6667ab border-4" />
          ) : (
            <div className="bg-greenduck bg-cover w-90 h-90 mb-12 rounded-full border-solid border-ducks-blue-6667ab border-4"></div>
          )}
          <div className="text-14 text-center font-bold text-ducks-blue-6667ab">{content.consName ? content.consName : "Anonymous"}</div>
        </div>
      </div>
      <div className="px-20">
        <div className="w-320 mb-18 p-24 pt-36 text-18 text-ducks-gray-666 items-center capitalize relative -translate-y-5">{content.title}</div>
        <div className="flex items-center justify-between mb-20">
          {/* <Likey likey={content.likey} likeyCnt={content.likeyCnt} /> */}
          {/* <Voted voted={content.voted} votedCnt={content.votedCnt} /> */}
          <div className="text-14 text-ducks-gray-ccc">{content.updated_at}</div>
        </div>
      </div>
    </div>
  );
}
