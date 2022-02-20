import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { OrangeBtn as UserInfo } from "../btn/base";
import { BlueBtn as SignOut } from "../btn/base";
export default function UserInfoModal({ content }) {
  // axios.get('/use/modal/:userId')

  const itemListStyle = "text-14 mb-12";
  const navigate = useNavigate();
  return (
    <div className="w-max pt-20 pb-12 px-20 m-2 border border-solid border-ducks-orange-ff9425 bg-white absolute right-0 top-30 font-poppins rounded-12">
      <h1 className="font-bold text-ducks-orange-ff9425">{content.username}</h1>
      <div className="flex">
        <ul className="my-18 mr-18 text-ducks-orange-ff9425 capitalize">
          <li className={`${itemListStyle}`}>ranking</li>
          <li className={`${itemListStyle}`}>points</li>
          <li className={`${itemListStyle}`}>debates</li>
          <li className={`${itemListStyle}`}>win rate</li>
          <li className={`${itemListStyle}`}>votes</li>
        </ul>
        <ul className="my-18 text-ducks-gray-666 font-bold text-right">
          <li className={`${itemListStyle}`}>{content.ranking}</li>
          <li className={`${itemListStyle}`}>{content.points}</li>
          <li className={`${itemListStyle}`}>{content.debates}</li>
          <li className={`${itemListStyle}`}>{content.winrate}</li>
          <li className={`${itemListStyle}`}>{content.votes}</li>
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center">
        <UserInfo callback={() => navigate("/userinfo/:userinfo")}>user info</UserInfo>
        <SignOut callback={() => alert("signed out")}>sign out</SignOut>
      </div>
    </div>
  );
}

UserInfoModal.propTypes = { content: PropTypes.object };
