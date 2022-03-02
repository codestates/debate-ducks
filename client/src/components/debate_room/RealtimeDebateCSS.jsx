import { useRef, useEffect, useState } from "react";
import { YellowBtn } from "../btn/BaseBtn";
import { BsMicMuteFill } from "react-icons/bs";
import { BsMicFill } from "react-icons/bs";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { MdScreenShare } from "react-icons/md";
import useTimer from "../../hooks/useTimer";

export default function RealtimeDebateCSS() {
  const myVideoRef = useRef(null);
  const canvasRef = useRef(null);

  const color = "black" || "#ff9425" || "#6667ab";

  const btnCSS = "border  rounded-full max-w-max min-w-max p-1 text-2xl text-ducks-blue-6667ab bg-ducks-yellow-fedd00 cursor-pointer hover:text-white hover:bg-ducks-blue-6667ab duration-200";

  const [min, sec] = useTimer(1, () => {
    console.log("done");
  });

  //! 임시 변수
  const debateInfo = { title: "Does Alien Exist?" };
  const isAudioMute = true;
  const isVideoMute = true;
  const isStarted = true;

  const [notice] = useState("Now time to last speech!");

  useEffect(() => {
    const backgroundCtx = canvasRef?.current?.getContext("2d");
    const noticeCtx = canvasRef?.current?.getContext("2d");

    backgroundCtx.fillStyle = color;
    backgroundCtx.fillRect(0, 0, canvasRef.current.width, 40);

    noticeCtx.font = "18px poppins";
    noticeCtx.fillStyle = "White";
    noticeCtx.textAlign = "center";
    noticeCtx.fillText(`${notice}   ${min}:${sec}`, canvasRef.current.width / 2, 25);
  }, [notice, min, sec]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
    });

    function drawImage() {
      //! 임시 변수
      const a = true;
      const b = true;

      if (a) {
        // Pros
        const prosCtx = canvasRef?.current?.getContext("2d");
        prosCtx.fillStyle = "#ff9425";
        prosCtx.fillRect(10, 90, 620, 470);

        const prosBgCtx = canvasRef?.current?.getContext("2d");
        prosBgCtx.fillStyle = "White";
        prosBgCtx.fillRect(20, 580, 600, 60);

        const prosTextCtx = canvasRef?.current?.getContext("2d");
        prosTextCtx.font = "32px poppins";
        prosTextCtx.fillStyle = "#ff9425";
        prosTextCtx.textAlign = "center";
        prosTextCtx.fillText("Pros", 320, 620);

        canvasRef.current.getContext("2d").drawImage(myVideoRef.current, 20, 100, 600, 450);

        // Cons
        const consCtx = canvasRef?.current?.getContext("2d");
        consCtx.fillStyle = "#6667ab";
        consCtx.fillRect(650, 90, 620, 470);

        const consBgCtx = canvasRef?.current?.getContext("2d");
        consBgCtx.fillStyle = "White";
        consBgCtx.fillRect(660, 580, 600, 60);

        const consTextCtx = canvasRef?.current?.getContext("2d");
        consTextCtx.font = "32px poppins";
        consTextCtx.fillStyle = "#6667ab";
        consTextCtx.textAlign = "center";
        consTextCtx.fillText("Cons", 960, 620);

        canvasRef.current.getContext("2d").drawImage(myVideoRef.current, 660, 100, 600, 450);
      } else if (b) {
        canvasRef.current.getContext("2d").drawImage(myVideoRef.current, 100, 100, 320, 240);
        canvasRef.current.getContext("2d").drawImage(myVideoRef.current, 300, 300, 320, 240);
      }
    }

    // let canvasInterval = window.setInterval(() => {
    //   drawImage(myVideoRef.current);
    // }, 1000 / 30);

    // myVideoRef.current.onpause = function () {
    //   clearInterval(canvasInterval);
    // };

    // myVideoRef.current.onended = function () {
    //   clearInterval(canvasInterval);
    // };

    window.setInterval(() => {
      drawImage(myVideoRef.current);
    }, 1000 / 60);
  }, []);

  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center fixed">
        <video ref={myVideoRef} muted autoPlay playsInline width="0" height="0"></video>
      </div>
      <div className="max-w-7xl min-w-max m-auto relative mt-1 mb-1">
        <div className="flex justify-between items-center">
          <div className="w-14 flex justify-start">
            <div className="bg-logo bg-cover w-46 h-40 mb-2"></div>
          </div>
          <div className="font-poppins font-bold text-24">{debateInfo.title}</div>
          <div className="w-14 flex justify-end">
            {isStarted ? <YellowBtn text="Start" callback={() => {}} /> : null}
            <YellowBtn text="Exit" callback={() => {}} />
          </div>
        </div>
        <div className="">
          <canvas ref={canvasRef} width="1280px" height="660px"></canvas>
        </div>
        <div className="flex justify-center gap-8 mt-2 mb-2">
          {isAudioMute ? (
            <div className={btnCSS}>
              <BsMicMuteFill />
            </div>
          ) : (
            <div className={btnCSS}>
              <BsMicFill />
            </div>
          )}
          {isVideoMute ? (
            <div className={btnCSS}>
              <BsFillCameraVideoOffFill />
            </div>
          ) : (
            <div className={btnCSS}>
              <BsFillCameraVideoFill />
            </div>
          )}
          <div className={btnCSS}>
            <MdScreenShare />
          </div>
        </div>
      </div>
    </div>
  );
}
