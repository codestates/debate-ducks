import { RiKakaoTalkFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
//import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/modal/ConfirmModal";
//import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import getByteLength from "../utils/getByteLength";
import axios from "axios";
// import { getUserInfo, postUserInfo } from "../redux/modules/user";
// import useGetAsync from "../hooks/useGetAsync";

export default function MyPage() {
  const navigate = useNavigate();
  //const userInfo = useSelector((state) => state.user);
  //console.log(userInfo);
  // const userInfo = useGetAsync("user", getUserInfo);
  // console.log(userInfo);
  // const changedInfo = useGetAsync("user", postUserInfo);
  // console.log(changedInfo);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setUserInfo(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [isEditUsername, setIsEditUsername] = useState(false);
  const [inputUsername, setInputUsername] = useState(userInfo.name);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(userInfo.profile);

  const changeUsernameInput = (e) => {
    setInputUsername(e.target.value);
  };

  const onEditUsername = () => {
    setIsEditUsername(true);
  };

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const saveUsername = () => {
    const nameByte = getByteLength(inputUsername);
    if (nameByte < 1 || nameByte > 36 || /\s{2,}|^\s|\s$|[^\w가-힣\x20\s]/g.test(inputUsername)) {
      setIsUsernameValid(false);
      return;
    }
    axios
      .patch(`${process.env.REACT_APP_SERVER_API_URL}/user/${userInfo.id}`, {
        name: inputUsername,
      })
      .then(() => {
        alert("saved");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const confirm = () => {
    if (!isConfirmOpen) {
      setIsConfirmOpen(true);
    } else {
      setIsConfirmOpen(false);
    }
  };
  // Get Kakao Profile automatically from server when logged in (this is re-rendered at userInfo.profile change)
  // ! 쿠키로 userInfo 들어오면 get 안에 바꿔야함
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`)
      .then(() => {
        alert("profile successfully fetched");
      })
      .catch((err) => {
        alert(err);
      });
  }, [profilePic]);

  const fileChangeHandler = (e) => {
    setProfilePic(e.target.file);
  };
  // When 'Change Profile Picture' button is clicked, and file is uploaded from user, client shows image on screen
  const onSubmitHandler = (e) => {
    e.preventDefault();
    //file uploaded from user
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("img", formData);

    axios.post(`${process.env.REACT_APP_API_URL}/profile`, formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        alert("saved");
      } else {
        alert("Failed to save profile.");
      }
    });
    setProfilePic(formData);
  };

  const signoutHandler = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/signout`, {}, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center m-112">
      {/* 사진왼쪽 정보오른쪽 구분 */}
      <div className="flex flex-row">
        <div className="flex flex-col w-274 h-410 rounded-20 mr-20">
          {/* 여기서 삼항연산자 ---> {profilePic ? "양식 안에 profilePic 들어가게" : "기본 오리 사진" }*/}
          <div className="bg-strawduck bg-cover w-274 h-274 mb-12 rounded-full border-solid border-ducks-orange-ff9425 border-4">{profilePic}</div>
          <form onSubmit={onSubmitHandler}>Change profile : </form>
          <input type="file" onChange={fileChangeHandler} />{" "}
        </div>

        {/* BIG Right 정보오른쪽 container */}
        <div className="flex flex-col h-410 rounded-12 ml-20">
          {/* BIG Right 의 flex-row Username, 수정삭제, email정보*/}
          <div className="flex flex-col">
            <div className="flex flex-row">
              {!isEditUsername ? <div className="text-24 font-poppins">{userInfo.name}</div> : <input className="ml-12" onChange={changeUsernameInput} value={inputUsername} />}
              {!isEditUsername ? <FiEdit className="m-12" onClick={onEditUsername} /> : <AiOutlineCheck className="m-12" onClick={saveUsername} />}
              {isUsernameValid ? <div className="mb-10" /> : <div className="text-xs text-center mb-10">Username must be longer than ?? words and must not contain ????</div>}
            </div>
            <div className="flex flex-row mt-12">
              <RiKakaoTalkFill className="text-24 mr-12 mb-20 text-black-00000" />
              <div className="flex text-18 font-poppins">{userInfo.email}</div>
            </div>
          </div>
          {/* BIG Right 의 첫번째 orange box*/}
          <div className="flex flex-row border border-solid border-ducks-orange-ff9425 rounded-12 p-18 mt-12 mb-18">
            {/* 그 안의 왼쪽 ranking,debates,votes */}
            <div className="flex flex-col">
              <div className="flex flex-row">
                <span className="flex text-ducks-orange-ff9425 w-140 m-12">Ranking</span>
                <span className="flex font-bold w-140 m-12">{userInfo.ranking}</span>
              </div>
              <div className="flex flex-row">
                <span className="flex text-ducks-orange-ff9425 w-140 m-12">Debates</span>
                <span className="flex font-bold w-140 m-12">{userInfo.debates}</span>
              </div>
              <div className="flex flex-row">
                <span className="flex text-ducks-orange-ff9425 w-140 m-12">Votes</span>
                <span className="flex font-bold w-140 m-12">{userInfo.votes}</span>
              </div>
            </div>
            {/* 그 안의 오른쪽 points, winrate, interestedin */}
            <div className="flex flex-col">
              <div className="flex flex-row">
                <span className="flex text-ducks-orange-ff9425 w-140 m-12">Points</span>
                <span className="flex font-bold w-140 m-12">{userInfo.points}</span>
              </div>
              <div className="flex flex-row">
                <span className="flex text-ducks-orange-ff9425 w-140 m-12">Win Rate</span>
                <span className="flex font-bold w-140 m-12">{userInfo.winRate}%</span>
              </div>
              <div className="flex flex-row">
                <span className="flex text-ducks-orange-ff9425 w-140 m-12">Interested In</span>
                <span className="flex w-140 m-12">{userInfo.interestedIn}</span>
              </div>
            </div>
          </div>

          {/* BIG Right의 두번째 orange box */}
          <div className="flex flex-row border border-solid border-ducks-orange-ff9425 rounded-12 p-18 mt-12 mb-18">
            {/* 그 안의 왼쪽 columns */}
            <div className="flex flex-row">
              <span className="flex text-ducks-orange-ff9425 w-140 m-12">Columns</span>
              <span className="flex font-bold w-140 m-12">{userInfo.columns}</span>
            </div>
            {/* 그 안의 오른쪽 opinions */}
            <div className="flex flex-row">
              <span className="flex text-ducks-orange-ff9425 w-140 m-12">Opinions</span>
              <span className="flex font-bold w-140 m-12">{userInfo.opinions}</span>
            </div>
          </div>
          {/* BIG Right의 show activities, delete account */}
          <div className="flex flex-col mt-24 mb-30">
            <button className="flex text-ducks-gray-666 underline" onClick={() => navigate(`/activities/:username`)}>
              My Activities
            </button>
            <button className="flex text-ducks-gray-666 underline" onClick={confirm}>
              Delete Account
            </button>
            {isConfirmOpen ? <ConfirmModal /> : null}
          </div>
        </div>
      </div>
      <button onClick={signoutHandler}>Signout</button>
    </div>
  );
}
