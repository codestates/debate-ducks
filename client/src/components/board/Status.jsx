import PropTypes from "prop-types";
Status.propTypes = { status: PropTypes.array, setStatus: PropTypes.func };
// import { OrangeBtn } from "../btn/BaseBtn";

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
    <div className="w-960 mx-auto flex justify-center">
      {listOfStatus.map((status, idx) => (
        <button key={idx} onClick={clickStatus} className="text-white text-14 h-32 border border-solid border-white px-24 rounded-full mx-12">
          {status}
        </button>
      ))}
    </div>
  );
}
