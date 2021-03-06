import PropTypes from "prop-types";
import Peer from "simple-peer";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import usePrevent from "../../hooks/usePrevent";
import { YellowBtn } from "../btn/BaseBtn";
import Modals from "./Modals";
import Buttons from "./Buttons";
import useSetInterval from "../../hooks/useSetInterval";
import saveVideo from "../../utils/aws";

RealtimeDebate.propTypes = { socket: PropTypes.object, debateId: PropTypes.string, debateInfo: PropTypes.object, isPro: PropTypes.bool };

export default function RealtimeDebate({ socket, debateId, debateInfo, isPro }) {
  // ---Modals 변수
  const [isExceedModalOn, setIsExceedModalOn] = useState(false);
  const [isErrorModalOn, setIsErrorModalOn] = useState(false);
  const [isPeerLeaveModalOn, setIsPeerLeaveModalOn] = useState(false);
  const [isLeaveModalOn, setIsLeaveModalOn] = useState(false);
  const [isStartModalOn, setIsStartModalOn] = useState(false);
  const [isRejectModalOn, setIsRejectModalOn] = useState(false);
  const [isFinishedModalOn, setIsFinishedModalOn] = useState(false);

  // ---Buttons 변수
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isStartBtnOn, setIsStartBtnOn] = useState(true);
  const [isProScreenOn, setIsProScreenOn] = useState(false);
  const [isConScreenOn, setIsConScreenOn] = useState(false);

  // ---Socket, WebRTC 변수
  const [stream, setStream] = useState(null);
  const [peerStream, setPeerStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isProTurn, setIsProTurn] = useState(null);
  const myPeer = useRef();
  const myVideoRef = useRef(null);
  const peerVideoRef = useRef(null);

  // ---Canvas 변수
  const canvasRef = useRef(null);
  const [notice, setNotice] = useState({ turn: "pre", text: "" });

  // ---Record 변수
  const mergedAudioTracks = useRef({});
  const canvasStream = useRef({});
  const mergedStream = useRef({});
  const mergedRecorder = useRef({});
  const mergedBlobs = useRef([]);
  const mergedBlob = useRef({});
  const mergedUrl = useRef("");
  const aRef = useRef(null);

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
            setPeerStream(stream);

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
            setPeerStream(stream);

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

    // Screen Share
    socket.on("screen_on", (data) => {
      if (data.isPro) {
        setIsProScreenOn(true);
      } else if (!data.isPro) {
        setIsConScreenOn(true);
      }
    });

    socket.on("screen_off", (data) => {
      if (data.isPro) {
        setIsProScreenOn(false);
      } else if (!data.isPro) {
        setIsConScreenOn(false);
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

    // <Debate>
    // Opening
    socket.on("debate_start", () => {
      // Create Canvas Stream
      canvasStream.current = canvasRef?.current?.captureStream();

      // Merge Tracks
      const mergeTracks = [...canvasStream.current.getVideoTracks(), ...mergedAudioTracks.current];

      mergedStream.current = new MediaStream(mergeTracks);

      mergedRecorder.current = new MediaRecorder(mergedStream?.current, { mimeType: "video/webm" });

      mergedRecorder.current.ondataavailable = (ev) => {
        mergedBlobs.current = [...mergedBlobs.current, ev.data];
      };

      mergedRecorder.current.onstop = async () => {
        mergedBlob.current = new Blob(mergedBlobs?.current, { type: "video/webm" });

        mergedUrl.current = window.URL.createObjectURL(mergedBlob?.current);

        aRef.current.href = mergedUrl?.current;

        const videoUrl = await saveVideo(mergedBlob?.current, `${debateInfo.title}_${debateId}`);

        axios.patch(`${process.env.REACT_APP_API_URL}/debate/debate_room/${debateId}/video`, { videoUrl }, { withCredentials: true });
      };

      // Record Start
      mergedRecorder?.current?.start(1000 / 60);

      setNotice({ ...notice, ...{ turn: "pre", text: `Topic : ${debateInfo.title}` } });

      setTimeout(() => {
        setIsProTurn(true);
        setNotice({ ...notice, ...{ turn: "pre", text: "The debate will begin soon with the opening remarks of the pro. ( 60 sec )" } });
      }, 3000);

      setTimeout(() => {
        socket.emit("debate_opening_pro", { debateId });
      }, 6000);
    });

    socket.on("debate_opening_pro", (data) => {
      setNotice({ ...notice, ...{ turn: "pro", text: "The opening remarks of the pro", time: data.time } });
    });

    socket.on("debate_opening_con_pre", () => {
      setIsProTurn(false);

      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the opening remarks of the con. ( 60 sec )" } });

      setTimeout(() => {
        socket.emit("debate_opening_con", { debateId });
      }, 3000);
    });

    socket.on("debate_opening_con", (data) => {
      setNotice({ ...notice, ...{ turn: "con", text: "The opening remarks of the con", time: data.time } });
    });

    // 1st phase
    socket.on("debate_contention1_pro_pre", () => {
      setIsProTurn(true);

      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the contention of the pro on the 1st phase. ( 180 sec )" } });

      setTimeout(() => {
        socket.emit("debate_contention1_pro", { debateId });
      }, 3000);
    });

    socket.on("debate_contention1_pro", (data) => {
      setNotice({ ...notice, ...{ turn: "pro", text: "The contention of the pro on the 1st phase", time: data.time } });
    });

    socket.on("debate_cross1_con_pre", () => {
      setIsProTurn(false);

      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the cross-examination of the con on the 1st phase. ( 120 sec )" } });

      setTimeout(() => {
        socket.emit("debate_cross1_con", { debateId });
      }, 3000);
    });

    socket.on("debate_cross1_con", (data) => {
      setNotice({ ...notice, ...{ turn: "con", text: "The cross-examination of the con on the 1st phase", time: data.time } });
    });

    socket.on("debate_contention1_con_pre", () => {
      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the contention of the con on the 1st phase. ( 180 sec )" } });

      setTimeout(() => {
        socket.emit("debate_contention1_con", { debateId });
      }, 3000);
    });

    socket.on("debate_contention1_con", (data) => {
      setNotice({ ...notice, ...{ turn: "con", text: "The contention of the con on the 1st phase", time: data.time } });
    });

    socket.on("debate_cross1_pro_pre", () => {
      setIsProTurn(true);

      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the cross-examination of the pro  on the 1st phase. ( 120 sec )" } });

      setTimeout(() => {
        socket.emit("debate_cross1_pro", { debateId });
      }, 3000);
    });

    socket.on("debate_cross1_pro", (data) => {
      setNotice({ ...notice, ...{ turn: "pro", text: "The cross-examination of the pro on the 1st phase", time: data.time } });
    });

    // 2nd phase
    socket.on("debate_contention2_con_pre", () => {
      setIsProTurn(false);

      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the contention of the con on the 2nd phase. ( 180 sec )" } });

      setTimeout(() => {
        socket.emit("debate_contention2_con", { debateId });
      }, 3000);
    });

    socket.on("debate_contention2_con", (data) => {
      setNotice({ ...notice, ...{ turn: "con", text: "The contention of the con on the 2nd phase", time: data.time } });
    });

    socket.on("debate_cross2_pro_pre", () => {
      setIsProTurn(true);

      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the cross-examination of the pro on the 2nd phase. ( 120 sec )" } });

      setTimeout(() => {
        socket.emit("debate_cross2_pro", { debateId });
      }, 3000);
    });

    socket.on("debate_cross2_pro", (data) => {
      setNotice({ ...notice, ...{ turn: "pro", text: "The cross-examination of the pro on the 2nd phase", time: data.time } });
    });

    socket.on("debate_contention2_pro_pre", () => {
      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the contention of the pro on the 2nd phase. ( 180 sec )" } });

      setTimeout(() => {
        socket.emit("debate_contention2_pro", { debateId });
      }, 3000);
    });

    socket.on("debate_contention2_pro", (data) => {
      setNotice({ ...notice, ...{ turn: "pro", text: "The contention of the pro on the 2nd phase", time: data.time } });
    });

    socket.on("debate_cross2_con_pre", () => {
      setIsProTurn(false);

      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the cross-examination of the con on the 2nd phase. ( 120 sec )" } });

      setTimeout(() => {
        socket.emit("debate_cross2_con", { debateId });
      }, 3000);
    });

    socket.on("debate_cross2_con", (data) => {
      setNotice({ ...notice, ...{ turn: "con", text: "The cross-examination of the con on the 2nd phase", time: data.time } });
    });

    // Closing
    socket.on("debate_closing_pro_pre", () => {
      setIsProTurn(true);

      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the closing remarks of the pro. ( 60 sec )" } });

      setTimeout(() => {
        socket.emit("debate_closing_pro", { debateId });
      }, 3000);
    });

    socket.on("debate_closing_pro", (data) => {
      setNotice({ ...notice, ...{ turn: "pro", text: "The closing remarks of the pro", time: data.time } });
    });

    socket.on("debate_closing_con_pre", () => {
      setIsProTurn(false);

      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the closing remarks of the con. ( 60 sec )" } });

      setTimeout(() => {
        socket.emit("debate_closing_con", { debateId });
      }, 3000);
    });

    socket.on("debate_closing_con", (data) => {
      setNotice({ ...notice, ...{ turn: "con", text: "The closing remarks of the con", time: data.time } });
    });

    socket.on("debate_finish_pre", () => {
      setTimeout(() => {
        socket.emit("debate_finish", { debateId });
      }, 500);
    });

    // Finish
    socket.on("debate_finish", () => {
      setIsStarted(false);
      setNotice({ ...notice, ...{ turn: "pre", text: "The debate has ended." } });

      setTimeout(() => {
        mergedRecorder?.current?.stop();
        setIsFinishedModalOn(true);
        disconnect();
        setIsConnected(false);
      }, 1000);
    });
  }, []);

  // ---Disconnecting
  useEffect(() => {
    socket.on("peer_disconnecting", () => {
      if (!isStarted) {
        setIsPeerLeaveModalOn(true);
        disconnect();
        setIsConnected(false);
      } else {
        mergedRecorder?.current?.stop();
        setIsFinishedModalOn(true);
        disconnect();
        setIsConnected(false);
      }
    });
  }, [isStarted]);

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

  // ---Canvas
  const [drawVideoStart, drawVideoStop] = useSetInterval(drawVideo, 1000 / 60);
  const [drawProScreenStart, drawProScreenStop] = useSetInterval(drawProScreen, 1000 / 60);
  const [drawConScreenStart, drawConScreenStop] = useSetInterval(drawConScreen, 1000 / 60);

  useEffect(() => {
    if (isProScreenOn && isProTurn && isProTurn !== null && isStarted) {
      drawVideoStop();
      drawConScreenStop();
      drawProScreenStart();
    } else if (isConScreenOn && !isProTurn && isProTurn !== null && isStarted) {
      drawVideoStop();
      drawProScreenStop();
      drawConScreenStart();
    } else {
      drawProScreenStop();
      drawConScreenStop();
      drawVideoStart();
    }
  }, [isProScreenOn, isConScreenOn, isProTurn, isStarted]);

  function drawVideo() {
    // Eraser
    const EraserCtx = canvasRef?.current?.getContext("2d");
    if (EraserCtx) {
      EraserCtx.fillStyle = "White";
      EraserCtx.fillRect(0, 40, 1280, 620);
    }

    // Pro
    const proCtx = canvasRef?.current?.getContext("2d");
    if (proCtx) {
      proCtx.fillStyle = "#ff9425";
      proCtx.fillRect(10, 90, 620, 470);
    }

    const proBgCtx = canvasRef?.current?.getContext("2d");
    if (proBgCtx) {
      proBgCtx.fillStyle = "White";
      proBgCtx.fillRect(20, 580, 600, 60);
    }

    const proTextCtx = canvasRef?.current?.getContext("2d");
    if (proTextCtx) {
      proTextCtx.font = "32px poppins";
      proTextCtx.fillStyle = "#ff9425";
      proTextCtx.textAlign = "center";
      proTextCtx.fillText(`${debateInfo.proName}`, 320, 620);
    }

    // Con
    const conCtx = canvasRef?.current?.getContext("2d");
    if (conCtx) {
      conCtx.fillStyle = "#6667ab";
      conCtx.fillRect(650, 90, 620, 470);
    }

    const conBgCtx = canvasRef?.current?.getContext("2d");
    if (conBgCtx) {
      conBgCtx.fillStyle = "White";
      conBgCtx.fillRect(660, 580, 600, 60);
    }

    const conTextCtx = canvasRef?.current?.getContext("2d");
    if (conTextCtx) {
      conTextCtx.font = "32px poppins";
      conTextCtx.fillStyle = "#6667ab";
      conTextCtx.textAlign = "center";
      conTextCtx.fillText(`${debateInfo.conName}`, 960, 620);
    }

    // Draw
    if (isPro) {
      canvasRef?.current?.getContext("2d").drawImage(myVideoRef?.current, 20, 100, 600, 450);
      canvasRef?.current?.getContext("2d").drawImage(peerVideoRef?.current, 660, 100, 600, 450);
    } else if (!isPro) {
      canvasRef?.current?.getContext("2d").drawImage(peerVideoRef?.current, 20, 100, 600, 450);
      canvasRef?.current?.getContext("2d").drawImage(myVideoRef?.current, 660, 100, 600, 450);
    }
  }

  function drawProScreen() {
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
    if (isPro) {
      const [width, height] = resize(myVideoRef?.current);
      canvasRef?.current?.getContext("2d").drawImage(myVideoRef?.current, 640 - width / 2, 350 - height / 2, width, height);
    } else if (!isPro) {
      const [width, height] = resize(peerVideoRef?.current);
      canvasRef?.current?.getContext("2d").drawImage(peerVideoRef?.current, 640 - width / 2, 350 - height / 2, width, height);
    }
  }

  function drawConScreen() {
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
    if (!isPro) {
      const [width, height] = resize(myVideoRef?.current);
      canvasRef?.current?.getContext("2d").drawImage(myVideoRef?.current, 640 - width / 2, 350 - height / 2, width, height);
    } else if (isPro) {
      const [width, height] = resize(peerVideoRef?.current);
      canvasRef?.current?.getContext("2d").drawImage(peerVideoRef?.current, 640 - width / 2, 350 - height / 2, width, height);
    }
  }

  // ---Mute Toggle
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

  // ---Muted(default)
  useEffect(() => {
    if (isConnected) {
      toggleMuteVideo(true);
    }
  }, [isConnected]);

  // ---Screen Share
  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((screenStream) => {
      myPeer?.current?.replaceTrack(stream?.getVideoTracks()[0], screenStream?.getVideoTracks()[0], stream);

      if (myVideoRef?.current) {
        myVideoRef.current.srcObject = screenStream;

        if (isPro) {
          setIsProScreenOn(true);
        } else if (!isPro) {
          setIsConScreenOn(true);
        }

        socket.emit("screen_on", { debateId, isPro });
      }

      screenStream.getTracks()[0].onended = () => {
        myPeer?.current?.replaceTrack(screenStream?.getVideoTracks()[0], stream?.getVideoTracks()[0], stream);

        if (myVideoRef?.current) {
          myVideoRef.current.srcObject = stream;

          if (isPro) {
            setIsProScreenOn(false);
          } else if (!isPro) {
            setIsConScreenOn(false);
          }

          socket.emit("screen_off", { debateId, isPro });
        }
      };
    });
  }

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
      case "pro":
        color = "#ff9425";
        break;
      case "con":
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

      if (notice?.turn === "pre") {
        noticeCtx.fillText(`${notice?.text}`, canvasRef?.current?.width / 2, 25);
      } else if (notice?.turn === "pro" || notice?.turn === "con") {
        noticeCtx.fillText(`${notice?.text} ( ${notice?.time} sec )`, canvasRef?.current?.width / 2, 25);
      }
    }
  }, [notice.text, notice.time]);

  // ---Debate
  useEffect(() => {
    if (isStarted) {
      socket.emit("debate_start", { debateId });
    }
  }, [isStarted]);

  // ---Merge Audio Track
  useEffect(() => {
    function mergeAudioTracks(myStream, peerStream) {
      const context = new AudioContext();
      const destination = context.createMediaStreamDestination();

      const source1 = context.createMediaStreamSource(myStream);
      const myStreamGain = context.createGain();
      source1.connect(myStreamGain).connect(destination);

      const source2 = context.createMediaStreamSource(peerStream);
      const peerStreamGain = context.createGain();
      source2.connect(peerStreamGain).connect(destination);

      return destination.stream.getAudioTracks();
    }

    if (stream && peerStream) {
      mergedAudioTracks.current = mergeAudioTracks(stream, peerStream);
    }
  }, [stream, peerStream]);

  function download() {
    aRef?.current?.click();
  }

  return (
    <div>
      <a ref={aRef} download={`${debateInfo.title}_${debateId}`} />
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
        isFinishedModalOn={isFinishedModalOn}
        download={download}
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
            {!isConnected ? (
              <YellowBtn
                text="Exit"
                callback={() => {
                  setIsLeaveModalOn(true);
                }}
              />
            ) : !isStarted ? (
              <>
                {isStartBtnOn ? <YellowBtn text="Start" callback={startDebate} /> : <div className="mt-2 mr-4 capitalize text-14 font-poppins font-medium text-ducks-blue-6667ab">Waiting...</div>}
                <YellowBtn
                  text="Exit"
                  callback={() => {
                    setIsLeaveModalOn(true);
                  }}
                />
              </>
            ) : null}
          </div>
        </div>
        <div>
          <canvas ref={canvasRef} width="1280px" height="660px"></canvas>
        </div>
        <Buttons isAudioMuted={isAudioMuted} toggleMuteAudio={toggleMuteAudio} isVideoMuted={isVideoMuted} toggleMuteVideo={toggleMuteVideo} shareScreen={shareScreen} isConnected={isConnected} />
      </div>
    </div>
  );
}
