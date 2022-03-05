import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
Like.propTypes = { isLiked: PropTypes.bool, setIsLiked: PropTypes.func };

export default function Like({ isLiked, setIsLiked }) {
  const clickLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="flex items-center text-ducks-blue-6667ab cursor-pointer" onClick={clickLike}>
        <span className="mr-1">
          <FaHeart />
        </span>
        <span className="font-bold">Liked</span>
      </div>
    </>
  );
}
