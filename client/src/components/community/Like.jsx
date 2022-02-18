import PropTypes from "prop-types";
Like.propTypes = { isLiked: PropTypes.bool, setIsLiked: PropTypes.func };

export default function Like({ isLiked, setIsLiked }) {
  const clickLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <h1>-Like-</h1>
      <button onClick={clickLike}>Like</button>
    </div>
  );
}
