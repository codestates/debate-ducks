import PropTypes from "prop-types";
import { Likey, Voted } from "./likeyOrVoted";

DebateBox.propTypes = { content: PropTypes.object };

export default function DebateBox({ content }) {
  const today = new Date();
  return (
    <div className="w-max border border-solid border-ducks-gray-eee rounded-12">
      <div className="w-full bg-ducks-green-cce8cc h-140 rounded-t-12"></div>
      <div className="px-24 flex items-center justify-between relative -translate-y-10">
        <div className="">
          <div className="bg-strawduck bg-cover w-90 h-90 mb-12 rounded-full border-solid border-ducks-orange-ff9425 border-4"></div>
          <div className="text-14 font-bold text-ducks-orange-ff9425">{content.host}</div>
        </div>
        <div className="font-bold">VS</div>
        <div className="">
          <div className="bg-greenduck bg-cover w-90 h-90 mb-12 rounded-full border-solid border-ducks-blue-6667ab border-4"></div>
          <div className="text-14 font-bold text-ducks-blue-6667ab">{content.participant}</div>
        </div>
      </div>
      <div className="px-20">
        <div className="w-320 mb-12 text-18 font-bold capitalize relative -translate-y-5">{content.title}</div>
        <div className="flex items-center justify-between mb-20">
          <Likey likey={content.likey} likeyCnt={content.likeyCnt} />
          <Voted voted={content.voted} votedCnt={content.votedCnt} />
          <div className="text-14 text-ducks-gray-ccc">{`${today.toDateString()}`}</div>
        </div>
      </div>
    </div>
  );
}
