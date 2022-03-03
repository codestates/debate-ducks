import PropTypes from "prop-types";
import Peer from "simple-peer";
import { useState, useRef, useEffect } from "react";
import usePrevent from "../../hooks/usePrevent";
import { YellowBtn } from "../btn/BaseBtn";
import Modals from "./Modals";
import Buttons from "./Buttons";
import useQuery from "../../hooks/useQuery"; //! 테스트용

RealtimeDebate.propTypes = { socket: PropTypes.object, debateId: PropTypes.string };

export default function RealtimeDebate({ socket, debateId }) {
  //! 테스트용
  const query = useQuery();
  const isPros = query.get("pros");
  //! 임시 변수;
  const [isStarted] = useState(false);
  const prosName = "Yuchan";
  const consName = "Chesley";
  const debateInfo = { title: "Does Alien Exist?" };

  // Variable: Modals
  const [isExceedModalOn, setIsExceedModalOn] = useState(false);
  const [isErrorModalOn, setIsErrorModalOn] = useState(false);
  const [isPeerLeaveModalOn, setIsPeerLeaveModalOn] = useState(false);
  const [isLeaveModalOn, setIsLeaveModalOn] = useState(false);

  // Variable: Buttons
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  // Variable: Socket, WebRTC
  const [stream, setStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const myPeer = useRef();
  const myVideoRef = useRef(null);
  const peerVideoRef = useRef(null);

  // Variable: Canvas
  const canvasRef = useRef(null);
  const [notice, setNotice] = useState({ turn: "pre", text: "" });

  // Hook: 뒤로가기 방지
  usePrevent();

  // Hook: 입장
  useEffect(() => {
    // console.log("join"); //*console
    socket.emit("join", { debateId }, () => {
      setIsExceedModalOn(true);
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
    });

    setNotice({ ...notice, ...{ turn: "pre", text: "Waiting for another debater to join." } });

    // Event: 두 번째 사람 입장 시 첫 번째 사람에게 발생
    socket.on("guest_join", () => {
      // console.log("host/guest_join"); //*console
      setNotice({ ...notice, ...{ turn: "pros", text: "To start the debate, press the start button in the upper right corner." } });

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

          socket.on("peer_disconnecting", () => {
            setIsConnected(false);
            setIsPeerLeaveModalOn(true);
          });
        })
        .catch(() => {
          setIsConnected(false);
          setIsErrorModalOn(true);
        });
    });

    // Event: 두 번째 사람 입장 시 두 번째 사람에게 발생
    socket.on("host_signal", (data) => {
      // console.log("guest/host_signal"); //*console
      setNotice({ ...notice, ...{ turn: "cons", text: "To start the debate, press the start button in the upper right corner." } });

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

          socket.on("peer_disconnecting", () => {
            setIsConnected(false);
            setIsPeerLeaveModalOn(true);
          });
        })
        .catch(() => {
          setIsConnected(false);
          setIsErrorModalOn(true);
        });
    });

    // Event: Canvas
    function drawImage() {
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
        prosTextCtx.fillText(`${prosName}`, 320, 620);
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
        consTextCtx.fillText(`${consName}`, 960, 620);
      }

      // Draw
      if (isPros === "true") {
        canvasRef?.current?.getContext("2d").drawImage(myVideoRef?.current, 20, 100, 600, 450);
        canvasRef?.current?.getContext("2d").drawImage(peerVideoRef?.current, 660, 100, 600, 450);
      } else if (isPros === "false") {
        canvasRef?.current?.getContext("2d").drawImage(peerVideoRef?.current, 20, 100, 600, 450);
        canvasRef?.current?.getContext("2d").drawImage(myVideoRef?.current, 660, 100, 600, 450);
      }
      //! 자기턴 화면공유일 때는 전체 보여주는 로직 짜야함 따로 빼서 짜야 할 듯
    }

    window.setInterval(() => {
      drawImage();
    }, 1000 / 60);
  }, []);

  // Hook: 연결 시 화면 꺼진 상태가 기본값
  useEffect(() => {
    if (isConnected) {
      toggleMuteVideo(true);
    }
  }, [isConnected]);

  // Hook: Notice
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

    noticeCtx.fillText(`${notice.text}`, canvasRef?.current?.width / 2, 25);
  }, [notice.text]);

  // Buttons
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
      }
      console.log("공유"); //* console
      screenStream.getTracks()[0].onended = () => {
        myPeer?.current?.replaceTrack(screenStream?.getVideoTracks()[0], stream?.getVideoTracks()[0], stream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
        console.log("종료"); //* console
      };
    });
  }

  return (
    <div>
      <Modals
        socket={socket}
        debateId={debateId}
        stream={stream}
        myPeer={myPeer}
        isExceedModalOn={isExceedModalOn}
        isErrorModalOn={isErrorModalOn}
        isPeerLeaveModalOn={isPeerLeaveModalOn}
        isLeaveModalOn={isLeaveModalOn}
        setIsLeaveModalOn={setIsLeaveModalOn}
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
            {isStarted ? <YellowBtn text="Start" callback={() => {}} /> : null}
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
        <Buttons isAudioMuted={isAudioMuted} toggleMuteAudio={toggleMuteAudio} isVideoMuted={isVideoMuted} toggleMuteVideo={toggleMuteVideo} shareScreen={shareScreen} />
      </div>
    </div>
  );
}
