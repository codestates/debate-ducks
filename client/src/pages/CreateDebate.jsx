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
  const options = ["Politics", "Society", "Economics", "Science", "IT", "Environment", "Education", "History", "Sports", "Philosophy", "Just For Fun"];
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
          window.scroll({ top: 0, behavior: "smooth" });
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
          window.scroll({ top: 0, behavior: "smooth" });
          //console.log("바뀐유저인포", userInfo);
        })
        .catch((err) => err);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-ducks-orange-ff9425 font-bold text-36 mt-24 ml-70 mb-12">Create Your Debate</h1>
      <h2 className="text-ducks-gray-ccc -mt-1 ml-70">What you would like to debate about? Create a debate, and wait until someone chooses to debate with you!</h2>
      <div className="w-960 h-0 ml-24 mt-18 border-solid border-b border-ducks-gray-eee"></div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col my-60">
          <h1 className="font-bold text-24 mb-12">Title</h1>
          <div className="w-960 h-0 -ml-2 mt-12 border-solid border-b border-ducks-gray-eee"></div>
          <div className="flex flex-row right-align font-light text-18 mt-12 mb-12">
            Author <div className="ml-12 mb-12 font-light"> {userInfo?.data.name}</div>
          </div>
          <textarea className="w-960 h-48 text-justify rounded-md border-ducks-gray-ccc shadow-sm" placeholder="Type..." onChange={titleInput}></textarea>
          <h1 className="font-bold text-24 mb-12 mt-60">Topic</h1>
          <div className="w-960 h-0 -ml-2 mt-12 border-solid border-b border-ducks-gray-eee"></div>
          <div className="m-20">
            <div className="flex flex-row">
              <div className="flex right-align font-light text-18 mt-12 mb-12 -ml-18 mr-32">Category</div>
              <div className="flex mt-12">
                <Sort sort={sort} options={options}></Sort>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex font-light text-18 mt-12 mb-12 -ml-18 mr-32">Position</div>
              <input type="radio" onClick={clickPros} name="position" value="pros" className="m-18"></input>
              <span className="mt-12">Pros</span>
              <input type="radio" onClick={clickCons} name="position" value="cons" className="m-18"></input>
              <span className="mt-12">Cons</span>
            </div>
          </div>
          <textarea className="w-960 h-370 text-justify rounded-md border-ducks-gray-ccc shadow-sm" placeholder="Type..." onChange={topicInput}></textarea>
          <div className="flex justify-center items-center mt-18">
            <OrangeBtn callback={openModalHandler} text="Save"></OrangeBtn>
          </div>

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
      </div>
    </div>
  );
}
