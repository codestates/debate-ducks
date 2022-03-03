import PropTypes from "prop-types";
import { BsMicMuteFill } from "react-icons/bs";
import { BsMicFill } from "react-icons/bs";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { MdScreenShare } from "react-icons/md";

Buttons.propTypes = {
  isAudioMuted: PropTypes.bool,
  toggleMuteAudio: PropTypes.func,
  isVideoMuted: PropTypes.bool,
  toggleMuteVideo: PropTypes.func,
  shareScreen: PropTypes.func,
  isConnected: PropTypes.bool,
};

export default function Buttons({ isAudioMuted, toggleMuteAudio, isVideoMuted, toggleMuteVideo, shareScreen, isConnected }) {
  const btnOnCSS =
    "border  rounded-full max-w-max min-w-max p-1 text-2xl text-ducks-blue-6667ab bg-ducks-yellow-fedd00 cursor-pointer hover:text-ducks-yellow-fedd00 hover:bg-ducks-blue-6667ab duration-200";
  const btnOffCSS =
    "border  rounded-full max-w-max min-w-max p-1 text-2xl text-ducks-yellow-fedd00 bg-ducks-blue-6667ab cursor-pointer hover:text-ducks-blue-6667ab hover:bg-ducks-yellow-fedd00 duration-200";

  return (
    <div className="flex justify-center gap-8 mt-2 mb-2">
      {isAudioMuted ? (
        <div className={btnOffCSS}>
          <BsMicMuteFill onClick={() => toggleMuteAudio(false)} />
        </div>
      ) : (
        <div className={btnOnCSS}>
          <BsMicFill onClick={() => toggleMuteAudio(true)} />
        </div>
      )}
      {isVideoMuted ? (
        <div className={btnOffCSS}>
          <BsFillCameraVideoOffFill onClick={() => toggleMuteVideo(false)} />
        </div>
      ) : (
        <div className={btnOnCSS}>
          <BsFillCameraVideoFill onClick={() => toggleMuteVideo(true)} />
        </div>
      )}
      {isConnected ? (
        <div className={btnOnCSS}>
          <MdScreenShare onClick={shareScreen} />
        </div>
      ) : null}
    </div>
  );
}
