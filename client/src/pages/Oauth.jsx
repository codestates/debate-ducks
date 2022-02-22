import React from "react";
import axios from "axios";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUserInfo } from "../redux/modules/user";

function Oauth() {
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  axios
    .post(`http://localhost:8080/oauth/kakao/callback?code=${code}`)
    .then((data) => {
      dispatch(setUserInfo(data.data));
      const userLocalInfo = JSON.stringify(data.data);
      localStorage.setItem("userLocalInfo", userLocalInfo);
      navigate("/");
    })
    .catch((err) => console.log(err));

  //   const getuserInfo = (code) => {
  //   const userInfo = axios.post(`http://localhost:8080/oauth/kakao/callback?code=${code}`);
  //   };

  return (
    <>
      {userInfo.id ? (
        <Navigate to="/" />
      ) : (
        <div className="flex justify-center items-center text-ducks-gray-666 font-poppins text-18 animate-spin m-90 h-18 w-18" viewBox="0 0 24 24">
          Logging In...
        </div>
      )}
    </>
  );
}

export default Oauth;

// // App.js 에
// // <Route path='/oauth/kakao'>
// //  <Route path='kakao' element={<KakaoLoading />} /> 추가하기

// // ERROR -> Line 29:10:  'isLogin' is assigned a value but never used  no-unused-vars

// //import SignIn from "./SignIn";
// // import { actionCreators as userActions } from "../redux/modules/user";

// // export default function KakaoLoading() {
// //   const dispatch = useDispatch();

// //   let code = new URL(window.location.href).searchParams.get("code");

// //   React.useEffect(async () => {
// //     await dispatch(userActions.getAccessToken(code));
// //   }, []);

// //   return <Spinner />;
// // }

// export default function Oauth() {
//   //const [isLogin, setIsLogin] = useState[{ isLogin: false, userInfo: "" }];

//   const code = new URL(window.location.href).searchParams.get("code");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const loginState = useSelector((state) => state.userReducer);

//   const getuserInfo = (code) => {
//     const userInfo = axios.get(`http://localhost:8080/oauth/kakao/callback?code=${code}`, { authorizationCode: code });
//     // 유저정보 요청

//     setIsLogin({ isLogin: true, userInfo: userInfo });
//     //유저정보가 나에게 있으면 isLogin이 true로 바뀐다.
//   };

//   useEffect(async () => {
//     if (code) {
//       await getuserInfo(code);
//     }
//   }, []);

//   return <>{isLogin.isLogin ? <Navigate to="/" /> : <div>카카오톡으로 로그인 중...</div>}</>;
// }
