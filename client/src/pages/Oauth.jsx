import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUserInfo } from "../redux/modules/user";

function Oauth() {
  const code = new URL(window.location.href).searchParams.get("code");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  useEffect(async () => {
    await axios
      .post(`http://localhost:80/oauth/kakao?code=${code}`)
      .then((data) => {
        console.log(data);
        console.log("서버에서 주는 유저인포", data.data.data.userInfo);
        dispatch(setUserInfo(data.data.data.userInfo));
        navigate("/");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {userInfo.id ? (
        <Navigate to="/" />
      ) : (
        <div className="flex justify-center items-center text-ducks-gray-666 font-poppins text-18 m-90 h-18 w-18" viewBox="0 0 24 24">
          Logging In...
        </div>
      )}
    </>
  );
}

export default Oauth;