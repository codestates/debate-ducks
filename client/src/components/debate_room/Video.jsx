import Peer from "simple-peer";
import { useRef, useEffect } from "react";

import PropTypes from "prop-types";
Video.propTypes = { socket: PropTypes.object, debateId: PropTypes.string };

export default function Video({ socket, debateId }) {
  const myVideoRef = useRef(null);
  const peerVideoRef = useRef(null);
  const camerasRef = useRef(null);
  const micsRef = useRef(null);
  let hostPeer;
  let guestPeer;
  let selectors;
  useEffect(() => {
    selectors = [micsRef.current, camerasRef.current];
  }, [micsRef.current, camerasRef.current]);

  function gotDevices(deviceInfos) {
    const values = selectors.map((select) => select.value);

    selectors.forEach((select) => {
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
    });

    for (let i = 0; i < deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      const option = document.createElement("option");
      option.value = deviceInfo.deviceId;
      switch (deviceInfo.kind) {
        case "audioinput":
          option.text = deviceInfo.label || `microphone ${micsRef.current.length + 1}`;
          micsRef.current.appendChild(option);
          break;
        case "videoinput":
          option.text = deviceInfo.label || `camera ${camerasRef.current.length + 1}`;
          camerasRef.current.appendChild(option);
          break;
      }
    }

    selectors.forEach((select, selectorIndex) => {
      if (Array.prototype.slice.call(select.childNodes).some((n) => n.value === values[selectorIndex])) {
        select.value = values[selectorIndex];
      }
    });
  }

  function gotStream(stream) {
    if (myVideoRef.current !== null) {
      myVideoRef.current.srcObject = stream;
    }
    return navigator.mediaDevices.enumerateDevices();
  }

  async function getStream() {
    let audioSource;
    let videoSource;
    if (micsRef.current !== null) audioSource = micsRef.current.value;
    if (camerasRef.current !== null) videoSource = camerasRef.current.value;
    const constraints = {
      audio: { deviceId: audioSource ? { exact: audioSource } : true },
      video: { deviceId: videoSource ? { exact: videoSource } : { facingMode: "user" } },
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    await addStream(stream);
    const deviceInfos = await gotStream(stream);
    await gotDevices(deviceInfos);
    return stream;
  }

  function addStream(stream) {
    if (hostPeer) hostPeer.addStream(stream);
    if (guestPeer) guestPeer.addStream(stream);
  }

  useEffect(async () => {
    console.log("join");

    socket.emit("join", debateId);

    const stream = await getStream();
    gotStream(stream);

    socket.on("someone_join", async () => {
      console.log("host: someone_join");

      const stream = await getStream();
      hostPeer = new Peer({ initiator: true, stream });

      hostPeer.on("signal", (signal) => {
        socket.emit("sent_host_signal", signal, debateId);
      });
    });

    socket.on("received_host_signal", async (signal) => {
      console.log("guest: received_host_signal");

      const stream = await getStream();
      guestPeer = new Peer({ initiator: false, stream });

      guestPeer.on("signal", (signal) => {
        socket.emit("sent_guest_signal", signal, debateId);
      });

      guestPeer.signal(signal);
    });

    socket.on("received_guest_signal", (signal) => {
      console.log("host: received_guest_signal");

      hostPeer.signal(signal);
    });

    guestPeer.on("stream", (stream) => {
      console.log("guest: host_stream");
      if (peerVideoRef.current !== null) {
        peerVideoRef.current.srcObject = stream;
      }
    });

    hostPeer.on("stream", (stream) => {
      console.log("host: guest_stream");
      if (peerVideoRef.current !== null) {
        peerVideoRef.current.srcObject = stream;
      }
    });
  }, []);

  return (
    <div>
      <h1>Video</h1>
      <h1>My Video</h1>
      <video ref={myVideoRef} autoPlay playsInline width="400" height="400"></video>
      <select ref={camerasRef} onChange={getStream}></select>
      <select ref={micsRef} onChange={getStream}></select>
      <h1>Peer Video</h1>
      <video ref={peerVideoRef} autoPlay playsInline width="400" height="400"></video>
    </div>
  );
}
