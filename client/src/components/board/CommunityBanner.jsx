import useGetAsync from "../../hooks/useGetAsync";
import { getColumnRankings } from "../../redux/modules/columnRankings";

import PropTypes from "prop-types";
CommunityBanner.propTypes = { userId: PropTypes.number };

export default function CommunityBanner({ userId }) {
  const banner = useGetAsync("columnRankings", getColumnRankings, { userId });

  return (
    <div>
      <h1>-Banner-</h1>
      <div>
        {banner.data?.general?.map((general) => (
          <div key={general.columnId}>
            <div>---</div>
            <div>{general.userName}</div>
            <div>{general.title}</div>
            <div>{general.likey}</div>
            <div>{general.likeyCnt}</div>
          </div>
        ))}
      </div>
      {banner.data?.discussion?.map((discussion) => (
        <div key={discussion.columnId}>
          <div>---</div>
          <div>{discussion.userName}</div>
          <div>{discussion.title}</div>
          <div>{discussion.likey}</div>
          <div>{discussion.likeyCnt}</div>
        </div>
      ))}
      {banner.data?.essay?.map((essay) => (
        <div key={essay.columnId}>
          <div>---</div>
          <div>{essay.userName}</div>
          <div>{essay.title}</div>
          <div>{essay.likey}</div>
          <div>{essay.likeyCnt}</div>
        </div>
      ))}
    </div>
  );
}
