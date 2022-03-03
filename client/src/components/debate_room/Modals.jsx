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
  isStartModalOn: PropTypes.bool,
  setIsStartModalOn: PropTypes.func,
  setIsStarted: PropTypes.func,
  isRejectModalOn: PropTypes.bool,
  setIsRejectModalOn: PropTypes.func,
};

export default function Modals({
  socket,
  debateId,
  isExceedModalOn,
  isErrorModalOn,
  isPeerLeaveModalOn,
  isLeaveModalOn,
  setIsLeaveModalOn,
  disconnect,
  isStartModalOn,
  setIsStartModalOn,
  setIsStarted,
  isRejectModalOn,
  setIsRejectModalOn,
}) {
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
          <JustConfirmModal content={{ title: "Finished!", text: "Your opponent has ended the debate. You will be redirected to the debate post.", btn: "OK" }} callback={goToDebate} />
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
      {!isStartModalOn ? null : (
        <div className={modalCSS}>
          <ConfirmModal
            content={{ title: "Start!", text: "Are you ready to start the debate?", left: "NO", right: "YES" }}
            cancelCallback={() => {
              setIsStartModalOn(false);
              socket.emit("start_debate_reject", { debateId });
            }}
            confirmCallback={() => {
              setIsStartModalOn(false);
              setIsStarted(true);
              socket.emit("start_debate_consent", { debateId });
            }}
          />
        </div>
      )}
      {!isRejectModalOn ? null : (
        <div className={modalCSS}>
          <JustConfirmModal
            content={{ title: "Rejected!", text: "Your opponent has rejected your request to start the debate. Please ask your opponent again.", btn: "OK" }}
            callback={() => {
              setIsRejectModalOn(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
