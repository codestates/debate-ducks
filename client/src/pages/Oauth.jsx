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

  return <>{userInfo?.id ? <Navigate to="/" /> : <Loading />}</>;
}

export default Oauth;
