import PropTypes from "prop-types";
Status.propTypes = { status: PropTypes.array, setStatus: PropTypes.func };
import { OrangeBtn } from "../btn/BaseBtn";

export default function Status({ status, setStatus }) {
  const listOfStatus = ["On-going", "Voting", "Completed"];
  const clickStatus = (e) => {
    if (status.includes(e.target.innerText)) {
      setStatus(status.filter((status) => status !== e.target.innerText));
    } else {
      setStatus([...status, e.target.innerText]);
    }
  };

  return (
    <div>
      {listOfStatus.map((status, idx) => (
        <OrangeBtn key={idx} onClick={clickStatus} text={status}>
          {/* {status} */}
        </OrangeBtn>
      ))}
    </div>
  );
}
