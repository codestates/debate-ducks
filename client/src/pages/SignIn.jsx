import React from "react";
import kakaobubble from "../images/kakaobubble.png";

export default function SignIn() {
  // const KAKAO_CLIENT_ID =
  // const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/kakao";
  console.log("process.env : ", process.env);
  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code&prompt=login`;

  const socialLoginHandler = () => {
    window.location.assign(KAKAO_LOGIN_URL);
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col text-center items-center border border-solid border-ducks-gray-eee rounded shadow-lg bg-white p-60">
        <div className="bg-biglogo bg-cover w-60 h-52 mr-12 ml-12 animate-bounce"></div>
        <div className="flex text-48 font-poppins font-bold text-ducks-orange-ff9425">Sign In</div>
        <div className="flex font-poppins text-18 text-ducks-gray-ccc mt-18">Join Debate Ducks to start debating!</div>

        <button onClick={socialLoginHandler} className="flex flex-row rounded-12 items-center justify-center bg-ducks-kakao-fee500 m-46 w-192 h-50 text-16 hover:shadow-lg">
          <img src={kakaobubble} className="w-16 h-16 mr-10" />
          <div className="flex font-osDefault"> Login with Kakao</div>
        </button>
      </div>
    </div>
  );
}
