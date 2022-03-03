import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSelect from "../hooks/useSelect";
import Sort from "../components/board/Sort";
import ConfirmModal from "../components/modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { OrangeBtn } from "../components/btn/BaseBtn";
//import { setUserInfo } from "../redux/modules/user";

export default function CreateDebate() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);
  //const dispatch = useDispatch();
  //console.log("이거다유저인포", userInfo.data);

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [isPros, setIsPros] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Sort
  const options = ["Politics", "Society", "Business", "Science", "IT", "Environment", "Education", "History", "Sports", "Philosophy", "Just For Fun"];
  const sort = useSelect(options[0]);

  const titleInput = (e) => {
    setTitle(e.target.value);
  };

  const topicInput = (e) => {
    setTopic(e.target.value);
  };

  const clickPros = () => {
    setIsPros(true);
  };

  const clickCons = () => {
    setIsPros(false);
  };

  const openModalHandler = () => {
    setIsOpen(true);
  };

  const Host = () => {
    //console.log("isPros상태", isPros);

    if (isPros) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/debate/${userInfo.data.id}`, {
          category: sort.attribute.value,
          pros_id: userInfo.data.id,
          cons_id: null,
          title: title,
          topic: topic,
        })
        .then((res) => {
          console.log(res.data.data.id);
          navigate(`/forum/debate/${res.data.data.id}`);
          //dispatch(setUserInfo(res.data.data));
          //console.log("바뀐유저인포", userInfo);
        })
        .catch((err) => err);
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/debate/${userInfo.data.id}`, {
          category: sort.attribute.value,
          pros_id: null,
          cons_id: userInfo.data.id,
          title: title,
          topic: topic,
        })
        .then((res) => {
          console.log(res.data.data.id);
          navigate(`/forum/debate/${res.data.data.id}`);
          //console.log("바뀐유저인포", userInfo);
        })
        .catch((err) => err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-ducks-orange-ff9425 font-bold text-24 text-left">Create Your Debate</h1>
      <h2 className="text-ducks-gray-ccc">What you would like to debate about? Create a debate, and wait until someone chooses to debate with you!</h2>

      <div className="flex flex-col">
        Title : <textarea className="flex flex-row w-304 h-32" placeholder="Type..." onChange={titleInput}></textarea>
        <div className="">Author : {userInfo?.data.name}</div>
        <Sort sort={sort} options={options}></Sort>
        <div className="flex flex-col">Topic : </div>
        <div className="flex flex-col">
          <div>
            <input type="radio" onClick={clickPros} name="position" value="pros"></input>
            <span>Pros</span>
            <input type="radio" onClick={clickCons} name="position" value="cons"></input>
            <span>Cons</span>
          </div>
          <textarea className="w-304 h-304" placeholder="Type..." onChange={topicInput}></textarea>
        </div>{" "}
      </div>
      <OrangeBtn callback={openModalHandler} text="Save"></OrangeBtn>
      {isOpen ? (
        <ConfirmModal
          content={{ title: "Confirm", text: "Do you want to post this debate?", left: "NO", right: "YES" }}
          cancelCallback={() => {
            setIsOpen(false);
          }}
          confirmCallback={Host}
        />
      ) : null}
    </div>
  );
}
