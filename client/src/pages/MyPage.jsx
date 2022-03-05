import { RiKakaoTalkFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/modal/ConfirmModal";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import getByteLength from "../utils/getByteLength";
import axios from "axios";
import { setUserInfo } from "../redux/modules/user";
import { OrangeBtn } from "../components/btn/BaseBtn";
import { FiUpload } from "react-icons/fi";

export default function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditUsername, setIsEditUsername] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // 리덕스 리렌더링을 위한 작업
  const userInfo = useSelector((state) => state.user.data);
  const userName = useSelector((state) => state.user.data.name);
  const userProfile = useSelector((state) => state.user.data.profile);

  const changeUsernameInput = (e) => {
    setInputUsername(e.target.value);
  };

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
      .patch(`${process.env.REACT_APP_API_URL}/user/${userInfo?.id}`, {
        name: inputUsername,
      })
      .then((res) => {
        dispatch(setUserInfo(res.data.data));
      })
      .catch((err) => {
        alert(err);
      });
    setIsEditUsername(false);
  };

  const confirm = () => {
    if (!isConfirmOpen) {
      setIsConfirmOpen(true);
    } else {
      setIsConfirmOpen(false);
    }
  };

  const [image, setImage] = useState({});

  const fileChangeHandler = (e) => {
    //console.log(e.target.files["0"]);
    setImage(e.target.files["0"]);
  };

  const onSubmitHandler = () => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.set("img", image);

    if (image) {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/user/${userInfo?.id}/img`, formData, config)
        .then((res) => {
          dispatch(setUserInfo(res.data.data));
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
    //signoutHandler();
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/user/${userInfo?.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(setUserInfo({}));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center m-112">
      <div className="flex flex-row">
        <div className="flex flex-col w-274 h-410 rounded-20 mr-20">
          <img src={userProfile} className="rounded-full w-274 h-274 object-cover object-center" />

          <form type="file" name="img" encType="multipart/form-data" className="flex flex-col items-center">
            {" "}
            <label
              htmlFor="file-upload-button"
              className="flex flex-col border border-solid w-140 h-60 mt-18 mb-18 p-2 rounded-16 items-center text-ducks-blue-6667ab bg-white hover:bg-ducks-blue-6667ab hover:text-white cursor-pointer"
            >
              <FiUpload className="flex flex-col" />
              Change Profile
              <input type="file" name="img" id="file-upload-button" onChange={fileChangeHandler} style={{ display: "none" }} />
            </label>
          </form>
          <div className="w-92 h-92 ml-90">
            <OrangeBtn callback={onSubmitHandler} text="Save"></OrangeBtn>
          </div>
        </div>

        <div className="flex flex-col h-410 rounded-12 ml-20">
          <div className="flex flex-col">
            <div className="flex flex-row mt-24">
              {!isEditUsername ? (
                <div className="text-24 font-poppins">{userName}</div>
              ) : (
                <input type="text" className="ml-12" onChange={changeUsernameInput} placeholder={userName} defaultValue={userName} value={inputUsername} onKeyPress={onCheckEnter} />
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
              <div className="flex text-18 font-poppins">{userInfo?.email}</div>
            </div>
          </div>
          <div className="flex flex-col mt-24 mb-30">
            <button className="flex text-ducks-gray-666 underline" onClick={() => navigate(`/activities/:username`)}>
              My Activities
            </button>
            <button className="flex text-ducks-gray-666 underline" onClick={confirm}>
              Delete Account
            </button>
            {isConfirmOpen ? (
              <ConfirmModal
                content={{ title: "Alert!", text: "Are you sure you want to delete your account?", left: "NO", right: "YES" }}
                cancelCallback={() => {
                  setIsConfirmOpen(false);
                }}
                confirmCallback={deleteAccount}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
