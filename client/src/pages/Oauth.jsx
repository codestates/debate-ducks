import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUserInfo } from "../redux/modules/user";
import Loading from "../components/Loading";

function Oauth() {
  const code = new URL(window.location.href).searchParams.get("code");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  useEffect(async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/oauth/kakao?code=${code}`, {}, { withCredentials: true })
      .then((data) => {
        dispatch(setUserInfo(data.data.data));
        navigate("/");
      })
      .catch((err) => console.log("Oauth err", err));
  }, []);

  return (
    <>
      {userInfo?.id ? (
        <Navigate to="/" />
      ) : (
        // <div className="flex justify-center items-center text-ducks-gray-666 font-poppins text-18 m-90 h-18 w-18" viewBox="0 0 24 24">
        //   Logging In...
        // </div>
        <Loading />
      )}
    </>
  );
}

export default Oauth;
