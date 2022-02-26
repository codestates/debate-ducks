import { useLocation, useNavigate } from "react-router-dom";
import { OrangeBtn as SignInBtn } from "./btn/BaseBtn";
import UserInfoModal from "./modal/UserInfoModal";
import { HiBell } from "react-icons/hi";

export default function Header() {
  const location = useLocation();

  const listItemStyle = "mx-20 px-12 py-12 cursor-pointer";
  const navigate = useNavigate();
  let isLogin = false;
  const userInfo = {
    username: "user1234",
    ranking: "123",
    points: "123,000",
    debates: "123",
    winrate: "12%",
    votes: "123",
  };

  return /^\/forum\/debateroom\/\d/i.test(location.pathname) ? null : (
    <div className="flex justify-between items-center h-60 px-20 border-b border-solid border-ducks-gray-eee">
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <div className="bg-logo bg-cover w-46 h-40 mr-12"></div>
        <div className="uppercase font-poppins font-bold text-36">debate ducks</div>
      </div>
      <div className="flex items-center font-poppins">
        <ul className="flex items-center capitalize text-14">
          <li className={listItemStyle} onClick={() => navigate("/ranking")}>
            ranking
          </li>
          <li className={listItemStyle} onClick={() => navigate("/forum")}>
            forum
          </li>
          <li className={listItemStyle} onClick={() => navigate("/community")}>
            community
          </li>
          <li className={listItemStyle} onClick={() => navigate("/support")}>
            support
          </li>
        </ul>
        {isLogin ? (
          <div className="flex items-center">
            <HiBell className="text-24 mr-20 text-ducks-orange-ff9425" />
            <div className="rounded-full w-32 h-32 bg-ducks-orange-ff9425 relative">
              <UserInfoModal content={userInfo}></UserInfoModal>
            </div>
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
