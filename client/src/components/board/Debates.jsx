// import { DMYorHM } from "../../utils/formatStrDate";
import DebateBox from "../card/DebateBox";

import PropTypes from "prop-types";
Debates.propTypes = { debates: PropTypes.object };

export default function Debates({ debates }) {
  console.log(debates);
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-wrap w-1200 justify-start">
        {debates.data?.map((debate) => (
          <DebateBox key={debate.id} content={debate} />
        ))}
      </div>
    </div>
  );
}
