import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrangeBtn as SignInBtn } from "./btn/BaseBtn";
// import { HiBell } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserInfo } from "../redux/modules/user";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isUserModalOn, setIsUserModalOn] = useState(false);

  const userId = useSelector((state) => state.user.data.id);
  const userProfile = useSelector((state) => state.user.data.profile);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true }).then((res) => {
      dispatch(setUserInfo(res.data.data));
    });
  }, []);

  function toggleUserInfoModal() {
    setIsUserModalOn(!isUserModalOn);
  }

  const listItemStyle = "mx-20 px-12 py-12 cursor-pointer";

  const handleSignout = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/signout`, {}, { withCredentials: true }).then(() => {
      dispatch(setUserInfo({}));
      navigate("/");
    });
  };

  return /^\/forum\/debateroom\/\d/i.test(location.pathname) ? null : (
    <div className="flex justify-between items-center h-60 px-20 border-b border-solid border-ducks-gray-eee">
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <div className="bg-logo bg-cover w-46 h-40 mr-12"></div>
        <div className="uppercase font-poppins font-bold text-36">debate ducks</div>
      </div>
      <div className="flex items-center font-poppins">
        <ul className="flex items-center capitalize text-14">
          {/* <li className={listItemStyle} onClick={() => navigate("/ranking")}>
            ranking
          </li> */}
          <li className={listItemStyle} onClick={() => navigate("/forum")}>
            forum
          </li>
          <li className={listItemStyle} onClick={() => navigate("/community")}>
            community
          </li>
          {/* <li className={listItemStyle} onClick={() => navigate("/support")}>
            support
          </li> */}
        </ul>
        {userId ? (
          <div className="flex items-center">
            {/* <HiBell className="text-24 mr-20 text-ducks-orange-ff9425" /> */}
            <img src={userProfile} className="rounded-full w-32 h-32 bg-ducks-orange-ff9425 relative" onClick={toggleUserInfoModal}></img>
            {isUserModalOn ? (
              <div className="z-50 absolute top-48 right-20 bg-white rounded-12 border border-solid border-ducks-orange-ff9425 text-14 text-ducks-orange-ff9425 overflow-hidden cursor-pointer">
                <div
                  onClick={() => {
                    setIsUserModalOn(!isUserModalOn);
                    navigate("/mypage");
                  }}
                  className="p-3 border-b border-solid border-ducks-orange-ff9425 hover:text-white hover:bg-ducks-orange-ff9425"
                >
                  My Page
                </div>
                <div onClick={handleSignout} className="p-3 hover:text-white hover:bg-ducks-orange-ff9425">
                  Sign Out
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <SignInBtn
            text="sign in"
            callback={() => {
              navigate("/signin");
            }}
          />
        )}
      </div>
    </div>
  );
}
