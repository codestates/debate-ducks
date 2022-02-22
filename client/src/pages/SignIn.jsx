import React from "react";
//import { Navigate } from "react-router-dom";

export default function SignIn() {
  const REST_API_KEY = "e07aeb7f2bd3491e8207dc88b62ebc7f";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const socialLoginHandler = () => {
    window.location.assign(KAKAO_LOGIN_URL);
    // const code = new URL(window.location.href).searchParams.get("code");
    // console.log(code); // 이게 잘 실행되면 콘솔에 code라도 떠야하는데 암것도 안뜨고 Oauth페이지만 뜸
    // const getuserInfo = (code) => {
    //   const userInfo = axios.get(`http://localhost:8080/oauth/kakao/callback?code=${code}`, { authorizationCode: code });
    // };
    // 이걸 Oauth에서 사용하려 한다.
  };

  return (
    // userInfo.pending / userInfo / ??
    // 서버에서 주는 userInfo가 없으면 / 있으면 main으로
    <>
      {/* {code ? (
        <Navigate to="/oauth" />
      ) : ( */}
      <div className="flex flex-col justify-center items-center">
        <div className="flex text-36 font-poppins font-black text-ducks-orange-ff9425">Log In</div>
        <div className="flex font-poppins text-12 text-ducks-gray-666">Join Debate Ducks to start debating!</div>
        <div>
          <button onClick={socialLoginHandler} className="flex rounded-full items-center justify-evenly bg-ducks-yellow-fedd00 w-274 h-48 font-poppins text-16 hover:text-white">
            Login with Kakao
          </button>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

// {socialLoginHandler} 가 {requestkakaologin} 이리고 되어있음. 근데 이걸 어디서도 갖다쓰지 않음.;wtf -> green
