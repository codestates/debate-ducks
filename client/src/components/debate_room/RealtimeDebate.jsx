import PropTypes from "prop-types";
import Peer from "simple-peer";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePrevent from "../../hooks/usePrevent";
import JustConfirmModal from "../modal/JustConfirmModal";
import ConfirmModal from "../modal/ConfirmModal";

RealtimeDebate.propTypes = { socket: PropTypes.object, debateId: PropTypes.string };

export default function RealtimeDebate({ socket, debateId }) {
  const navigate = useNavigate();

  const [notice, setNotice] = useState("");
  const [stream, setStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [isExceedModalOn, setIsExceedModalOn] = useState(false);
  const [isErrorModalOn, setIsErrorModalOn] = useState(false);
  const [isPeerLeaveModalOn, setIsPeerLeaveModalOn] = useState(false);
  const [isLeaveModalOn, setIsLeaveModalOn] = useState(false);

  const myVideoRef = useRef(null);
  const peerVideoRef = useRef(null);
  const myPeer = useRef();

  //! 임시 변수
  const userName = "Yuchan";
  const isStarted = false;

  usePrevent();

  useEffect(() => {
    // console.log("join"); //*console
    socket.emit("join", { debateId, userName }, () => {
      setIsExceedModalOn(true);
    });

    // 두 번째 사람 입장 시 첫 번째 사람에게 발생하는 이벤트
    socket.on("guest_join", (data) => {
      // console.log("host/guest_join"); //*console
      setNotice(`${data.userName} join the room.`);

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          setIsConnected(true);

          if (myVideoRef.current) {
            myVideoRef.current.srcObject = stream;
          }

          const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {
              iceServers: [
                { url: "stun:stun.l.google.com:19302" },
                { url: "stun:stun1.l.google.com:19302" },
                { url: "stun:stun2.l.google.com:19302" },
                { url: "stun:stun3.l.google.com:19302" },
                { url: "stun:stun4.l.google.com:19302" },
                { url: "stun:stun.nextcloud.com:443" },
              ],
            },
            stream,
          });

          myPeer.current = peer;

          peer.on("signal", (signal) => {
            socket.emit("host_signal", { debateId, signal });
          });

          peer.on("stream", (stream) => {
            if (peerVideoRef.current) {
              peerVideoRef.current.srcObject = stream;
            }
          });

          peer.on("error", () => {
            setIsConnected(false);
            setIsErrorModalOn(true);
          });

          socket.on("guest_signal", (data) => {
            // console.log("host/guest_signal"); //*console
            peer.signal(data.signal);
          });

          socket.on("peer_disconnect", () => {
            setIsConnected(false);
            setIsPeerLeaveModalOn(true);
          });
        })
        .catch(() => {
          setIsConnected(false);
          setIsErrorModalOn(true);
        });
    });

    // 두 번째 사람 입장 시 두 번째 사람에게 발생하는 이벤트
    socket.on("host_signal", (data) => {
      // console.log("guest/host_signal"); //*console
      setNotice(`You join the room.`);

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          setIsConnected(true);

          if (myVideoRef.current) {
            myVideoRef.current.srcObject = stream;
          }

          const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
          });

          myPeer.current = peer;

          peer.on("signal", (signal) => {
            socket.emit("guest_signal", { debateId, signal });
          });

          peer.on("stream", (stream) => {
            if (peerVideoRef.current) {
              peerVideoRef.current.srcObject = stream;
            }
          });

          peer.on("error", () => {
            setIsConnected(false);
            setIsErrorModalOn(true);
          });

          peer.signal(data.signal);

          socket.on("peer_disconnect", () => {
            setIsConnected(false);
            setIsPeerLeaveModalOn(true);
          });
        })
        .catch(() => {
          setIsConnected(false);
          setIsErrorModalOn(true);
        });
    });
  }, []);

  // 음소거 및 카메라 끄기
  function toggleMuteAudio() {
    if (stream) {
      setAudioMuted(!audioMuted);
      stream.getAudioTracks()[0].enabled = audioMuted;
    }
  }

  function toggleMuteVideo() {
    if (stream) {
      setVideoMuted(!videoMuted);
      stream.getVideoTracks()[0].enabled = videoMuted;
    }
  }

  useEffect(() => {
    if (stream) {
      setVideoMuted(true);
      stream.getVideoTracks()[0].enabled = false;
    }
  }, [isConnected]);

  // 화면 공유
  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((screenStream) => {
      myPeer.current.replaceTrack(stream.getVideoTracks()[0], screenStream.getVideoTracks()[0], stream);
      myVideoRef.current.srcObject = screenStream;
      screenStream.getTracks()[0].onended = () => {
        myPeer.current.replaceTrack(screenStream.getVideoTracks()[0], stream.getVideoTracks()[0], stream);
        myVideoRef.current.srcObject = stream;
      };
    });
  }

  // 방 나가기
  function goToDebate() {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    if (myPeer.current) {
      myPeer.current.destroy();
    }
    socket.emit("leave", { debateId });
    socket.disconnect();
    navigate(`/forum/debate/${debateId}`);
  }

  const modalClass = "w-screen h-screen flex justify-center items-center absolute bg-black bg-opacity-20 z-50";

  return (
    <div>
      {isExceedModalOn ? (
        <div className={modalClass}>
          <JustConfirmModal
            content={{ title: "Sorry!", text: "Entry is not allowed. The room is currently full.", btn: "OK" }}
            callback={() => {
              socket.disconnect();
              navigate(`/forum/debate/${debateId}`);
            }}
          />
        </div>
      ) : null}
      {isErrorModalOn ? (
        <div className={modalClass}>
          <JustConfirmModal content={{ title: "Sorry!", text: "There's an unexpected error. Try joining again.", btn: "OK" }} callback={goToDebate} />
        </div>
      ) : null}
      {isPeerLeaveModalOn ? (
        <div className={modalClass}>
          <JustConfirmModal content={{ title: "Finished!", text: "Your partner has ended the debate. You will be redirected to the debate page. ", btn: "OK" }} callback={goToDebate} />
        </div>
      ) : null}
      {isLeaveModalOn ? (
        <div className={modalClass}>
          <ConfirmModal
            content={{ title: "Finished!", text: "Are you sure you want to end the call?", left: "NO", right: "YES" }}
            cancelCallback={() => {
              setIsLeaveModalOn(false);
            }}
            confirmCallback={goToDebate}
          />
        </div>
      ) : null}
      {!isConnected ? null : (
        <div>
          <div>{notice}</div>
          {!isStarted ? (
            <div>
              <div>토론전</div>
              <video className="reverse" ref={myVideoRef} muted autoPlay playsInline width="400" height="400"></video>
              <video className="reverse" ref={peerVideoRef} autoPlay playsInline width="400" height="400"></video>
              <button>Start</button>
            </div>
          ) : (
            <div>토론중</div>
          )}
          <div>
            <button onClick={toggleMuteAudio}>{audioMuted ? "Unmute" : "Mute"}</button>
            <button onClick={toggleMuteVideo}>{videoMuted ? "On" : "Off"}</button>
            <button onClick={shareScreen}>ShareScreen</button>
            <button
              onClick={() => {
                setIsLeaveModalOn(true);
              }}
            >
              Leave
            </button>
            {!isConnected ? <button>토론 시작</button> : null}
          </div>
        </div>
      )}
    </div>
  );
}
