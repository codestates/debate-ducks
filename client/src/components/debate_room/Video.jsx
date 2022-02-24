import Peer from "simple-peer";
import { useRef, useEffect } from "react";

import PropTypes from "prop-types";
Video.propTypes = { socket: PropTypes.object, debateId: PropTypes.string };

export default function Video({ socket, debateId }) {
  const myVideoRef = useRef(null);
  const peerVideoRef = useRef(null);

  let hostPeer;
  let guestPeer;

  function getStream() {
    const stream = navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    return stream;
  }

  useEffect(async () => {
    // console.log("join");
    socket.emit("join", debateId);
    const stream = await getStream();
    if (myVideoRef.current !== null) {
      myVideoRef.current.srcObject = stream;
    }
  }, []);

  socket.on("someone_join", async () => {
    // console.log("host: someone_join");
    const stream = await getStream();
    hostPeer = new Peer({ initiator: true, stream });
    hostPeer.on("signal", (signal) => {
      socket.emit("sent_host_signal", signal, debateId);
    });
  });

  socket.on("received_host_signal", async (signal) => {
    // console.log("guest: received_host_signal");
    const stream = await getStream();
    guestPeer = new Peer({ initiator: false, stream });
    guestPeer.on("signal", (signal) => {
      socket.emit("sent_guest_signal", signal, debateId);
    });
    guestPeer.signal(signal);
    guestPeer.on("stream", (stream) => {
      // console.log("guest: host_stream");
      if (peerVideoRef.current !== null) {
        peerVideoRef.current.srcObject = stream;
      }
    });
  });

  socket.on("received_guest_signal", (signal) => {
    // console.log("host: received_guest_signal");
    hostPeer.signal(signal);
    hostPeer.on("stream", (stream) => {
      // console.log("host: guest_stream");
      if (peerVideoRef.current !== null) {
        peerVideoRef.current.srcObject = stream;
      }
    });
  });

  return (
    <div>
      <h1>Video</h1>
      <h1>My Video</h1>
      <video ref={myVideoRef} autoPlay playsInline width="400" height="400"></video>
      <h1>Peer Video</h1>
      <video ref={peerVideoRef} autoPlay playsInline width="400" height="400"></video>
    </div>
  );
}
