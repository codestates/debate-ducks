import PropTypes from "prop-types";
Status.propTypes = { status: PropTypes.array, setStatus: PropTypes.func };

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
      <h1>-Status-</h1>
      {listOfStatus.map((status, idx) => (
        <button key={idx} onClick={clickStatus}>
          {status}
        </button>
      ))}
    </div>
  );
}
