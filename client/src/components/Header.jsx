import { useNavigate } from "react-router-dom";
import { OrangeBtn as SignInBtn } from "./btn/base";
export default function Header() {
  const listItemStyle = "mx-20 px-12 py-12 cursor-pointer";
  const navigate = useNavigate();
  return (
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
        <SignInBtn
          callback={() => {
            navigate("/signin");
          }}
        >
          sign in
        </SignInBtn>
      </div>
    </div>
  );
}
