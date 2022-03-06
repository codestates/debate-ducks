import { FaHeart, FaVoteYea } from "react-icons/fa";
import PropTypes from "prop-types";

Likey.propTypes = { likey: PropTypes.bool, likeyCnt: PropTypes.number };
Voted.propTypes = { voted: PropTypes.bool, votedCnt: PropTypes.number };

export function Likey({ likey, likeyCnt }) {
  return (
    <div className={`flex items-center text-12 ${likey ? "text-ducks-blue-6667ab" : "text-ducks-gray-ccc"}`}>
      <span className="mr-1">
        <FaHeart className="text-12" />
      </span>
      <span className="mr-1 font-bold">{likeyCnt ? likeyCnt.toLocaleString() : 0}</span>
      <span className="font-bold">Liked</span>
    </div>
  );
}

export function Voted({ voted, votedCnt }) {
  return (
    <div className={`flex items-center text-12 ${voted ? "text-ducks-blue-6667ab" : "text-ducks-gray-ccc"}`}>
      <span className="mr-1">
        <FaVoteYea className="text-12" />
      </span>
      <span className="mr-1 font-bold">{votedCnt ? votedCnt.toLocaleString() : 0}</span>
      <span className="font-bold">Voted</span>
    </div>
  );
}
