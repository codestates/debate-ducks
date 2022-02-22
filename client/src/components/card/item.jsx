import PropTypes from "prop-types";
import { Likey, Voted } from "./likeyOrVoted";
RankItem.propTypes = { number: PropTypes.number, item: PropTypes.object, type: PropTypes.string };
LikedItem.propTypes = { item: PropTypes.object };
VotedItem.propTypes = { item: PropTypes.object };

// const defaultProfile = ({ color }) => {
//   return <div className={`w-30 h-30 mx-20 bg-profile-theme-${color} bg-cover rounded-full`}></div>;
// };

export function RankItem({ number, item, type }) {
  return (
    <div className="text-12 w-320 p-12 flex items-center border-b border-solid border-ducks-gray-eee">
      <div className="w-24 text-center">{number + 1}</div>
      {item.profile.color ? (
        item.profile.color === "orange" ? (
          <div className="w-30 h-30 mx-20 bg-orangeduck bg-cover rounded-full"></div>
        ) : item.profile.color === "green" ? (
          <div className="w-30 h-30 mx-20 bg-greenduck bg-cover rounded-full"></div>
        ) : item.profile.color === "straw" ? (
          <div className="w-30 h-30 mx-20 bg-strawduck bg-cover rounded-full"></div>
        ) : (
          <div className="w-30 h-30 mx-20 bg-grayduck bg-cover rounded-full"></div>
        )
      ) : (
        <img className="w-30 h-30 mx-20 object-cover rounded-full" src={item.profile} alt={`profile of ${item.userName}`} />
      )}
      <div>
        <div className="mb-1">{item.userName}</div>
        <div>
          <span className="font-bold text-14 mr-12">{item.points.toLocaleString()}</span>
          <span className="capitalize">{type}</span>
        </div>
      </div>
    </div>
  );
}

export function LikedItem({ item }) {
  return (
    <div className="w-320 p-12 border-b border-solid border-ducks-gray-eee">
      <h1 className="text-12 font-bold text-ducks-orange-ff9425 capitalize">{item.title}</h1>
      <div className="mt-1 flex justify-between items-center">
        <Likey likey={item.likey} likeyCnt={item.likeyCnt} />
        <span className="text-12">{item.userName}</span>
      </div>
    </div>
  );
}

export function VotedItem({ item }) {
  return (
    <div className="w-320 p-12 border-b border-solid border-ducks-gray-eee">
      <h1 className="text-12 font-bold text-ducks-orange-ff9425 capitalize">{item.title}</h1>
      <div className="mt-1 flex justify-between items-center">
        <Voted voted={item.voted} votedCnt={item.votedCnt} />
        <span className="text-12">{item.userName}</span>
      </div>
    </div>
  );
}
