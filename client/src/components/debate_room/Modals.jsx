import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import JustConfirmModal from "../modal/JustConfirmModal";
import ConfirmModal from "../modal/ConfirmModal";

Modals.propTypes = {
  socket: PropTypes.object,
  debateId: PropTypes.string,
  isExceedModalOn: PropTypes.bool,
  isErrorModalOn: PropTypes.bool,
  isPeerLeaveModalOn: PropTypes.bool,
  isLeaveModalOn: PropTypes.bool,
  setIsLeaveModalOn: PropTypes.func,
  disconnect: PropTypes.func,
};

export default function Modals({ socket, debateId, isExceedModalOn, isErrorModalOn, isPeerLeaveModalOn, isLeaveModalOn, setIsLeaveModalOn, disconnect }) {
  const navigate = useNavigate();

  function goToDebate() {
    disconnect();
    navigate(`/forum/debate/${debateId}`);
  }

  const modalCSS = "w-screen h-screen flex justify-center items-center absolute z-50";

  return (
    <div>
      {!isExceedModalOn ? null : (
        <div className={modalCSS}>
          <JustConfirmModal
            content={{ title: "Sorry!", text: "Entry is not allowed. The room is currently full.", btn: "OK" }}
            callback={() => {
              socket.disconnect();
              navigate(`/forum/debate/${debateId}`);
            }}
          />
        </div>
      )}
      {!isErrorModalOn ? null : (
        <div className={modalCSS}>
          <JustConfirmModal content={{ title: "Sorry!", text: "There's an unexpected error. Try joining again.", btn: "OK" }} callback={goToDebate} />
        </div>
      )}
      {!isPeerLeaveModalOn ? null : (
        <div className={modalCSS}>
          <div width="1280px" height="764px"></div>
          <JustConfirmModal content={{ title: "Finished!", text: "Your partner has ended the debate. You will be redirected to the debate page. ", btn: "OK" }} callback={goToDebate} />
        </div>
      )}
      {!isLeaveModalOn ? null : (
        <div className={modalCSS}>
          <ConfirmModal
            content={{ title: "Finished!", text: "Are you sure you want to leave the debate room?", left: "NO", right: "YES" }}
            cancelCallback={() => {
              setIsLeaveModalOn(false);
            }}
            confirmCallback={goToDebate}
          />
        </div>
      )}
    </div>
  );
}
