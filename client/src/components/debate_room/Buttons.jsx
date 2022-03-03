import PropTypes from "prop-types";
import { BsMicMuteFill } from "react-icons/bs";
import { BsMicFill } from "react-icons/bs";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { MdScreenShare } from "react-icons/md";

Buttons.propTypes = { isAudioMuted: PropTypes.bool, toggleMuteAudio: PropTypes.func, isVideoMuted: PropTypes.bool, toggleMuteVideo: PropTypes.func, shareScreen: PropTypes.func };

export default function Buttons({ isAudioMuted, toggleMuteAudio, isVideoMuted, toggleMuteVideo, shareScreen }) {
  // Styles
  const btnCSS = "border  rounded-full max-w-max min-w-max p-1 text-2xl text-ducks-blue-6667ab bg-ducks-yellow-fedd00 cursor-pointer hover:text-white hover:bg-ducks-blue-6667ab duration-200";

  return (
    <div className="flex justify-center gap-8 mt-2 mb-2">
      <div className={btnCSS}>{isAudioMuted ? <BsMicMuteFill onClick={() => toggleMuteAudio(false)} /> : <BsMicFill onClick={() => toggleMuteAudio(true)} />}</div>
      <div className={btnCSS}>{isVideoMuted ? <BsFillCameraVideoOffFill onClick={() => toggleMuteVideo(false)} /> : <BsFillCameraVideoFill onClick={() => toggleMuteVideo(true)} />}</div>
      <div className={btnCSS}>
        <MdScreenShare onClick={shareScreen} />
      </div>
    </div>
  );
}
