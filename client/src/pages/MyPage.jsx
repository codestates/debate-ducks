import { RiKakaoTalkFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/modal/ConfirmModal";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import getByteLength from "../utils/getByteLength";
import axios from "axios";
import { setUserInfo } from "../redux/modules/user";
// import { getUserInfo, postUserInfo } from "../redux/modules/user";
// import useGetAsync from "../hooks/useGetAsync";

export default function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditUsername, setIsEditUsername] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const userInfo = useSelector((state) => state.user.data);

  const [localUserInfo, setLocalUserInfo] = useState({});
  //const [preview, setPreview] = useState("");

  const changeUsernameInput = (e) => {
    setInputUsername(e.target.value);
  };

  useEffect(() => {
    setLocalUserInfo((state) => ({ ...state, ...userInfo }));
  }, [userInfo]);

  console.log("userInfo", userInfo);
  console.log("localUserInfo", localUserInfo);

  // useEffect(() => {
  //   if (profilePic) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(profilePic);
  //   } else {
  //     setPreview(null);
  //   }
  // }, [profilePic]);

  const onEditUsername = () => {
    setIsEditUsername(true);
  };

  const cancelEditUsername = () => {
    setIsEditUsername(false);
  };

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const saveUsername = () => {
    const nameByte = getByteLength(inputUsername);
    if (nameByte < 1 || nameByte > 36 || /\s{2,}|^\s|\s$|[^\w가-힣\x20\s]/g.test(inputUsername)) {
      setIsUsernameValid(false);
      return;
    }
    axios
      .patch(`${process.env.REACT_APP_API_URL}/user/${localUserInfo?.id}`, {
        name: inputUsername,
      })
      .then((res) => {
        dispatch(setUserInfo(res.data.data));
        setLocalUserInfo((state) => ({ ...state, ...res.data.data }));
        window.location.reload(); //navigate('/mypage')와의 차이점?
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

  const [image, setImage] = useState({});

  const fileChangeHandler = (e) => {
    // setProfilePic(e.target.file);
    //e.preventDefault();
    console.log(e.target.files["0"]);
    setImage(e.target.files["0"]);
    // console.log(e.target.value);
    // let reader = new FileReader();
    // reader.onloadend = () => {
    //   const file = reader.result;
    //   if (file) {
    //     setProfilePic(file.toString());
    //   }
    // };
    // if (e.target.file) {
    //   reader.readAsDataURL(e.target.file);
    // }
  };

  const onSubmitHandler = () => {
    //console.log("시작이미지", image);
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.set("img", image);
    //console.log("두번째이미지입", image);
    //console.log("폼데이터", e.target.files["0"]);

    if (image) {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/user/${localUserInfo?.id}/img`, formData, config)
        .then((res) => {
          dispatch(setUserInfo(res.data.data));
          setLocalUserInfo((state) => ({ ...state, ...res.data.data }));
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      saveUsername();
    }
  };

  const deleteAccount = async () => {
    signoutHandler();
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/user/${localUserInfo?.id}`, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const signoutHandler = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/signout`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(setUserInfo({}));
        setLocalUserInfo((state) => ({ ...state, ...{} }));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center m-112">
      {/* <div>Test: {localUserInfo?.name}</div> */}
      {/* 사진왼쪽 정보오른쪽 구분 */}
      <div className="flex flex-row">
        <div className="flex flex-col w-274 h-410 rounded-20 mr-20">
          <img src={userInfo?.profile} className="rounded-full w-274 h-274 object-cover object-center" />
          <form type="file" name="img" encType="multipart/form-data">
            Change profile :
            <input type="file" name="img" onChange={fileChangeHandler} />
          </form>
          <button onClick={onSubmitHandler}>Save</button>
        </div>

        {/* BIG Right 정보오른쪽 container */}
        <div className="flex flex-col h-410 rounded-12 ml-20">
          {/* BIG Right 의 flex-row Username, 수정삭제, email정보*/}
          <div className="flex flex-col">
            <div className="flex flex-row">
              {!isEditUsername ? (
                <div className="text-24 font-poppins">{localUserInfo?.name}</div>
              ) : (
                <input className="ml-12" onChange={changeUsernameInput} value={inputUsername} onKeyPress={onCheckEnter} />
              )}
              {!isEditUsername ? (
                <FiEdit className="m-12" onClick={onEditUsername} />
              ) : (
                <>
                  <AiOutlineCheck className="m-12" onClick={saveUsername} />
                  <MdOutlineCancel className="m-12" onClick={cancelEditUsername} />
                </>
              )}
              {isUsernameValid ? <div className="mb-10" /> : <div className="text-xs text-center mb-10">Username must be between 1 to 36 words.</div>}
            </div>
            <div className="flex flex-row mt-12">
              <RiKakaoTalkFill className="text-24 mr-12 mb-20 text-black-00000" />
              <div className="flex text-18 font-poppins">{localUserInfo?.email}</div>
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
            {isConfirmOpen ? (
              <ConfirmModal
                content={{ title: "Alert!", text: "Are you sure you want delete your account?", left: "NO", right: "YES" }}
                cancelCallback={() => {
                  setIsConfirmOpen(false);
                }}
                confirmCallback={deleteAccount}
              />
            ) : null}
          </div>
        </div>
      </div>
      <button onClick={signoutHandler}>Signout</button>
    </div>
  );
}
