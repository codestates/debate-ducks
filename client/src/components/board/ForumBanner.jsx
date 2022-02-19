import useGetAsync from "../../hooks/useGetAsync";
import { getDebateRankings } from "../../redux/modules/debateRankings";

import PropTypes from "prop-types";
ForumBanner.propTypes = { userId: PropTypes.number };

export default function ForumBanner({ userId }) {
  const banner = useGetAsync("debateRankings", getDebateRankings, { userId });

  return (
    <div>
      <h1>-Banner-</h1>
      <div>
        {banner.data["mostExpected"].map((el) => (
          <div key={el.columnId}>
            <div>---</div>
            <div>{el.userName}</div>
            <div>{el.title}</div>
            <div>{el.likey}</div>
            <div>{el.likeyCnt}</div>
          </div>
        ))}
      </div>
      {banner.data?.mostLiked?.map((mostLiked) => (
        <div key={mostLiked.columnId}>
          <div>---</div>
          <div>{mostLiked.userName}</div>
          <div>{mostLiked.title}</div>
          <div>{mostLiked.likey}</div>
          <div>{mostLiked.likeyCnt}</div>
        </div>
      ))}
      {banner.data?.mostVoted?.map((mostVoted) => (
        <div key={mostVoted.columnId}>
          <div>---</div>
          <div>{mostVoted.userName}</div>
          <div>{mostVoted.title}</div>
          <div>{mostVoted.likey}</div>
          <div>{mostVoted.likeyCnt}</div>
        </div>
      ))}
    </div>
  );
}
