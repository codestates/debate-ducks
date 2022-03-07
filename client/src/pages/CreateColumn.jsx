import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSelect from "../hooks/useSelect";
import Sort from "../components/board/Sort";
import ConfirmModal from "../components/modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { OrangeBtn } from "../components/btn/BaseBtn";
//import { setUserInfo } from "../redux/modules/user";

export default function CreateColumn() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Politics", "Society", "Economics", "Science", "IT", "Environment", "Education", "History", "Sports", "Philosophy", "ForFun"];
  const sort = useSelect(options[0]);

  const titleInput = (e) => {
    setTitle(e.target.value);
  };

  const topicInput = (e) => {
    setContents(e.target.value);
  };

  const openModalHandler = () => {
    setIsOpen(true);
  };

  const Post = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/column/${userInfo.data.id}`, {
        category: sort.attribute.value,
        title: title,
        contents: contents,
      })
      .then((res) => {
        navigate(`/community/column/${res.data.data.id}`);
      })
      .catch((err) => err);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-ducks-orange-ff9425 font-bold text-24">Post a Column</h1>
      <h2 className="text-ducks-gray-ccc">Share your perspectives on a topic you would like to discuss about.</h2>

      <div className="flex flex-col">
        Title : <textarea className="flex flex-row w-304 h-32" placeholder="Type..." onChange={titleInput}></textarea>
        <div className="">Author : {userInfo?.data.name}</div>
        <Sort sort={sort} options={options}></Sort>
        <div className="flex flex-col">Content : </div>
        <div className="flex flex-col">
          <textarea className="w-304 h-304" placeholder="Type..." onChange={topicInput}></textarea>
        </div>{" "}
      </div>
      <OrangeBtn callback={openModalHandler} text="Save"></OrangeBtn>
      {isOpen ? (
        <ConfirmModal
          content={{ title: "Confirm", text: "Do you want to post this column?", left: "NO", right: "YES" }}
          cancelCallback={() => {
            setIsOpen(false);
          }}
          confirmCallback={Post}
        />
      ) : null}
    </div>
  );
}
