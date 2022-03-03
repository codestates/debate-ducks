import PropTypes from "prop-types";
import Peer from "simple-peer";
import { useState, useRef, useEffect } from "react";
import usePrevent from "../../hooks/usePrevent";
import { YellowBtn } from "../btn/BaseBtn";
import Modals from "./Modals";
import Buttons from "./Buttons";
import useSetInterval from "../../hooks/useSetInterval";
import useQuery from "../../hooks/useQuery"; //! 테스트용

RealtimeDebate.propTypes = { socket: PropTypes.object, debateId: PropTypes.string };

export default function RealtimeDebate({ socket, debateId }) {
  //! 테스트용
  const query = useQuery();
  const isPros = query.get("pros");
  //! 임시 변수;
  const debateInfo = { title: "Does Alien Exist?", prosName: "Yuchan", consName: "Chesley" };
  const [notice, setNotice] = useState({ turn: "pre", text: "" });

  // ---Modals 변수
  const [isExceedModalOn, setIsExceedModalOn] = useState(false);
  const [isErrorModalOn, setIsErrorModalOn] = useState(false);
  const [isPeerLeaveModalOn, setIsPeerLeaveModalOn] = useState(false);
  const [isLeaveModalOn, setIsLeaveModalOn] = useState(false);
  const [isStartModalOn, setIsStartModalOn] = useState(false);
  const [isRejectModalOn, setIsRejectModalOn] = useState(false);
  const [isStartBtnOn, setIsStartBtnOn] = useState(true);

  // ---Buttons 변수
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isProsScreenOn, setIsProsScreenOn] = useState(false);
  const [isConsScreenOn, setIsConsScreenOn] = useState(false);

  // ---Socket, WebRTC 변수
  const [stream, setStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isProsTurn] = useState(true);
  const myPeer = useRef();
  const myVideoRef = useRef(null);
  const peerVideoRef = useRef(null);

  // ---Canvas 변수
  const canvasRef = useRef(null);

  // ---뒤로가기 방지
  usePrevent();

  // ---Socket, WebRTC
  useEffect(() => {
    socket.emit("join", { debateId }, (status) => {
      switch (status) {
        case "rejected":
          setIsExceedModalOn(true);
          setNotice({ ...notice, ...{ turn: "pre", text: "Entry is not allowed. The room is currently full." } });
          break;
        case "success":
          navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);

            if (myVideoRef.current) {
              myVideoRef.current.srcObject = stream;
            }
          });
          setNotice({ ...notice, ...{ turn: "pre", text: "Waiting for another debater to join." } });
          break;
      }
    });

    // Event: 두 번째 사람 입장 시 첫 번째 사람에게 발생
    socket.on("guest_join", () => {
      setNotice({ ...notice, ...{ turn: "pre", text: "To start the debate, press the start button in the upper right corner." } });

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
            peer.signal(data.signal);
          });
        })
        .catch(() => {
          setIsConnected(false);
          setIsErrorModalOn(true);
        });
    });

    // Event: 두 번째 사람 입장 시 두 번째 사람에게 발생
    socket.on("host_signal", (data) => {
      setNotice({ ...notice, ...{ turn: "pre", text: "To start the debate, press the start button in the upper right corner." } });

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
        })
        .catch(() => {
          setIsConnected(false);
          setIsErrorModalOn(true);
        });
    });

    // Disconnecting
    socket.on("peer_disconnecting", () => {
      disconnect();
      setIsConnected(false);
      setIsPeerLeaveModalOn(true);
    });

    // Screen Share
    socket.on("screen_on", (data) => {
      if (data.isPros === "true") {
        setIsProsScreenOn(true);
      } else if (data.isPros === "false") {
        setIsConsScreenOn(true);
      }
    });

    socket.on("screen_off", (data) => {
      if (data.isPros === "true") {
        setIsProsScreenOn(false);
      } else if (data.isPros === "false") {
        setIsConsScreenOn(false);
      }
    });

    // Start
    socket.on("start_debate_offer", () => {
      setIsStartModalOn(true);
    });

    socket.on("start_debate_reject", () => {
      setIsStartBtnOn(true);
      setIsRejectModalOn(true);
    });

    socket.on("start_debate_consent", () => {
      setIsStartBtnOn(true);
      setIsStarted(true);
    });
  }, []);

  // ---Canvas
  const [drawVideoStart, drawVideoStop] = useSetInterval(drawVideo, 1000 / 60);
  const [drawScreenStart, drawScreenStop] = useSetInterval(drawScreen, 1000 / 60);

  useEffect(() => {
    drawVideoStart();
    if ((isProsScreenOn && isProsTurn) || (isConsScreenOn && !isProsTurn)) {
      drawVideoStop();
      drawScreenStart();
    } else {
      drawScreenStop();
    }
  }, [isProsScreenOn, isConsScreenOn]);

  function drawVideo() {
    // Eraser
    const EraserCtx = canvasRef?.current?.getContext("2d");
    if (EraserCtx) {
      EraserCtx.fillStyle = "White";
      EraserCtx.fillRect(0, 40, 1280, 620);
    }

    // Pros
    const prosCtx = canvasRef?.current?.getContext("2d");
    if (prosCtx) {
      prosCtx.fillStyle = "#ff9425";
      prosCtx.fillRect(10, 90, 620, 470);
    }

    const prosBgCtx = canvasRef?.current?.getContext("2d");
    if (prosBgCtx) {
      prosBgCtx.fillStyle = "White";
      prosBgCtx.fillRect(20, 580, 600, 60);
    }

    const prosTextCtx = canvasRef?.current?.getContext("2d");
    if (prosTextCtx) {
      prosTextCtx.font = "32px poppins";
      prosTextCtx.fillStyle = "#ff9425";
      prosTextCtx.textAlign = "center";
      prosTextCtx.fillText(`${debateInfo.prosName}`, 320, 620);
    }

    // Cons
    const consCtx = canvasRef?.current?.getContext("2d");
    if (consCtx) {
      consCtx.fillStyle = "#6667ab";
      consCtx.fillRect(650, 90, 620, 470);
    }

    const consBgCtx = canvasRef?.current?.getContext("2d");
    if (consBgCtx) {
      consBgCtx.fillStyle = "White";
      consBgCtx.fillRect(660, 580, 600, 60);
    }

    const consTextCtx = canvasRef?.current?.getContext("2d");
    if (consTextCtx) {
      consTextCtx.font = "32px poppins";
      consTextCtx.fillStyle = "#6667ab";
      consTextCtx.textAlign = "center";
      consTextCtx.fillText(`${debateInfo.consName}`, 960, 620);
    }

    // Draw
    if (isPros === "true") {
      canvasRef?.current?.getContext("2d").drawImage(myVideoRef?.current, 20, 100, 600, 450);
      canvasRef?.current?.getContext("2d").drawImage(peerVideoRef?.current, 660, 100, 600, 450);
    } else if (isPros === "false") {
      canvasRef?.current?.getContext("2d").drawImage(peerVideoRef?.current, 20, 100, 600, 450);
      canvasRef?.current?.getContext("2d").drawImage(myVideoRef?.current, 660, 100, 600, 450);
    }
  }

  function drawScreen() {
    // Eraser
    const EraserCtx = canvasRef?.current?.getContext("2d");
    if (EraserCtx) {
      EraserCtx.fillStyle = "White";
      EraserCtx.fillRect(0, 40, 1280, 620);
    }

    // Resize
    function resize(video) {
      let width = 0;
      let height = 0;

      if (video.videoWidth >= video.videoHeight) {
        width = 1280;
        height = (1280 * video.videoHeight) / video.videoWidth;

        if (height > 620) {
          width = (1280 * 620) / height;
          height = 620;
        }
      } else if (video.videoWidth < video.videoHeight) {
        width = (620 * video.videoWidth) / video.videoHeight;
        height = 620;
      }

      return [width, height];
    }

    // Draw
    if ((isPros === "true" && isProsTurn) || (isPros === "false" && !isProsTurn)) {
      const [width, height] = resize(myVideoRef?.current);
      canvasRef?.current?.getContext("2d").drawImage(myVideoRef?.current, 640 - width / 2, 350 - height / 2, width, height);
    } else if ((isPros === "true" && !isProsTurn) || (isPros === "false" && isProsTurn)) {
      const [width, height] = resize(peerVideoRef?.current);
      canvasRef?.current?.getContext("2d").drawImage(peerVideoRef?.current, 640 - width / 2, 350 - height / 2, width, height);
    }
  }

  // ---Disconnect
  function disconnect() {
    myVideoRef?.current?.srcObject.getTracks().forEach((track) => {
      track.stop();
    });

    peerVideoRef?.current?.srcObject?.getTracks().forEach((track) => {
      track.stop();
    });

    myPeer?.current?.destroy();

    socket.emit("leave", { debateId });
    socket.disconnect();
  }

  // ---Buttons
  function toggleMuteAudio(boolean) {
    if (stream) {
      setIsAudioMuted(boolean);
      stream.getAudioTracks()[0].enabled = !boolean;
    }
  }

  function toggleMuteVideo(boolean) {
    if (stream) {
      setIsVideoMuted(boolean);
      stream.getVideoTracks()[0].enabled = !boolean;
    }
  }

  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((screenStream) => {
      myPeer?.current?.replaceTrack(stream?.getVideoTracks()[0], screenStream?.getVideoTracks()[0], stream);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = screenStream;
        if (isPros === "true") {
          setIsProsScreenOn(true);
        } else if (isPros === "false") {
          setIsConsScreenOn(true);
        }
        socket.emit("screen_on", { debateId, isPros });
      }
      screenStream.getTracks()[0].onended = () => {
        myPeer?.current?.replaceTrack(screenStream?.getVideoTracks()[0], stream?.getVideoTracks()[0], stream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
        if (isPros === "true") {
          setIsProsScreenOn(false);
        } else if (isPros === "false") {
          setIsConsScreenOn(false);
        }
        socket.emit("screen_off", { debateId, isPros });
      };
    });
  }

  // ---Muted(default)
  useEffect(() => {
    if (isConnected) {
      toggleMuteAudio(true);
      toggleMuteVideo(true);
    }
  }, [isConnected]);

  // ---Start
  function startDebate() {
    setIsStartBtnOn(false);
    socket.emit("start_debate_offer", { debateId });
  }

  // ---Notice
  useEffect(() => {
    let color;
    switch (notice?.turn) {
      case "pre":
        color = "black";
        break;
      case "pros":
        color = "#ff9425";
        break;
      case "cons":
        color = "#6667ab";
        break;
    }

    const backgroundCtx = canvasRef?.current?.getContext("2d");
    if (backgroundCtx) {
      backgroundCtx.fillStyle = color;
      backgroundCtx.fillRect(0, 0, canvasRef?.current?.width, 40);
    }

    const noticeCtx = canvasRef?.current?.getContext("2d");
    if (noticeCtx) {
      noticeCtx.font = "18px poppins";
      noticeCtx.fillStyle = "White";
      noticeCtx.textAlign = "center";
    }

    //! 타이머 추가해서 수정 필요
    noticeCtx.fillText(`${notice.text}`, canvasRef?.current?.width / 2, 25);
  }, [notice.text, notice.time]);

  return (
    <div>
      <Modals
        socket={socket}
        debateId={debateId}
        isExceedModalOn={isExceedModalOn}
        isErrorModalOn={isErrorModalOn}
        isPeerLeaveModalOn={isPeerLeaveModalOn}
        isLeaveModalOn={isLeaveModalOn}
        setIsLeaveModalOn={setIsLeaveModalOn}
        disconnect={disconnect}
        isStartModalOn={isStartModalOn}
        setIsStartModalOn={setIsStartModalOn}
        setIsStarted={setIsStarted}
        isRejectModalOn={isRejectModalOn}
        setIsRejectModalOn={setIsRejectModalOn}
      />
      <div className="w-screen h-screen flex justify-center items-center fixed">
        <video ref={myVideoRef} muted autoPlay playsInline width="0" height="0"></video>
        <video ref={peerVideoRef} autoPlay playsInline width="0" height="0"></video>
      </div>
      <div className="max-w-7xl min-w-max m-auto relative pt-1 pb-1">
        <div className="flex justify-between items-center">
          <div className="w-14 flex justify-start">
            <div className="bg-logo bg-cover w-46 h-40 mb-2"></div>
          </div>
          <div className="font-poppins font-bold text-24">{debateInfo.title}</div>
          <div className="w-14 flex justify-end">
            {isStarted ? null : isStartBtnOn ? (
              <YellowBtn text="Start" callback={startDebate} />
            ) : (
              <div className="mt-2 mr-4 capitalize text-14 font-poppins font-medium text-ducks-blue-6667ab">Waiting...</div>
            )}
            <YellowBtn
              text="Exit"
              callback={() => {
                setIsLeaveModalOn(true);
              }}
            />
          </div>
        </div>
        <div>
          <canvas ref={canvasRef} width="1280px" height="660px"></canvas>
        </div>
        <Buttons isAudioMuted={isAudioMuted} toggleMuteAudio={toggleMuteAudio} isVideoMuted={isVideoMuted} toggleMuteVideo={toggleMuteVideo} shareScreen={shareScreen} isStarted={isStarted} />
      </div>
    </div>
  );
}
