import PropTypes from "prop-types";
import Peer from "simple-peer";
import { useState, useRef, useEffect } from "react";

Video.propTypes = { socket: PropTypes.object, debateId: PropTypes.string };

export default function Video({ socket, debateId }) {
  const [stream, setStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  const hostVideoRef = useRef(null);
  const guestVideoRef = useRef(null);
  const myPeer = useRef();

  useEffect(() => {
    console.log("0. join"); //*console
    socket.emit("join", { debateId });

    socket.on("guest_join", () => {
      console.log("1. guest_join"); //*console

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          if (hostVideoRef.current) {
            hostVideoRef.current.srcObject = stream;
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
            if (guestVideoRef.current) {
              guestVideoRef.current.srcObject = stream;
            }
          });

          // peer.on("error", (err) => {
          //   console.log(err)
          //   endCall();
          // });

          socket.on("guest_signal", (signal) => {
            console.log("3. guest_signal"); //*console
            setIsConnected(true);
            peer.signal(signal);
          });

          // socket.current.on("close", () => {
          //   window.location.reload();
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    });

    socket.on("host_signal", (signal) => {
      console.log("2. host_signal"); //*console

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          if (hostVideoRef.current) {
            hostVideoRef.current.srcObject = stream;
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
            if (guestVideoRef.current) {
              guestVideoRef.current.srcObject = stream;
            }
          });

          // peer.on("error", (err) => {
          //   console.log(err)
          //   endCall();
          // });

          setIsConnected(true);
          peer.signal(signal);

          // socket.current.on("close", () => {
          //   window.location.reload();
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

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

  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((screenStream) => {
      myPeer.current.replaceTrack(stream.getVideoTracks()[0], screenStream.getVideoTracks()[0], stream);
      hostVideoRef.current.srcObject = screenStream;
      screenStream.getTracks()[0].onended = () => {
        myPeer.current.replaceTrack(screenStream.getVideoTracks()[0], stream.getVideoTracks()[0], stream);
        hostVideoRef.current.srcObject = stream;
      };
    });
  }

  return (
    <div>
      <h1>Host Video</h1>
      {stream !== null ? <video className="reverse" ref={hostVideoRef} muted autoPlay playsInline width="400" height="400"></video> : <div>비디오 없음</div>}
      <h1>Guest Video</h1>
      {isConnected ? <video className="reverse" ref={guestVideoRef} autoPlay playsInline width="400" height="400"></video> : <div>비디오 없음</div>}
      <button onClick={toggleMuteAudio}>{audioMuted ? "Unmute" : "Mute"}</button>
      <button onClick={toggleMuteVideo}>{videoMuted ? "On" : "Off"}</button>
      <button onClick={shareScreen}>shareScreen</button>
    </div>
  );
}
