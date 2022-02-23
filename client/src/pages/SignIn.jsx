import React from "react";

export default function SignIn() {
  // const KAKAO_CLIENT_ID =
  // const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/kakao";
  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  const socialLoginHandler = () => {
    window.location.assign(KAKAO_LOGIN_URL);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center m-140">
        <div className="flex text-36 font-poppins font-black text-ducks-orange-ff9425">Log In</div>
        <div className="flex font-poppins text-12 text-ducks-gray-666">Join Debate Ducks to start debating!</div>
        <div>
          <button onClick={socialLoginHandler} className="flex rounded-full items-center justify-evenly bg-ducks-yellow-fedd00 m-46 w-274 h-48 font-poppins text-16 hover:text-white">
            Login with Kakao
          </button>
        </div>
      </div>
    </>
  );
}
