import { DMYorHM } from "../../utils/formatStrDate";

import PropTypes from "prop-types";
Debates.propTypes = { debates: PropTypes.object };

export default function Debates({ debates }) {
  return (
    <div>
      <h1>-Debates-</h1>
      <div>
        {debates.data?.map((debate) => (
          <div key={debate.debateId}>
            <div>---</div>
            <div>{debate.status}</div>
            <div>{debate.category}</div>
            <div>{debate.prosName}</div>
            <div>{debate.consName}</div>
            <div>{debate.prosProfile}</div>
            <div>{debate.consProfile}</div>
            <div>{debate.title}</div>
            <div>{DMYorHM(debate.date)}</div>
            <div>{String(debate.likey)}</div>
            <div>{debate.likeyCnt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
