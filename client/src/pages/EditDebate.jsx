import axios from "axios";
import { useEffect, useState } from "react";
import { OrangeBtn } from "../components/btn/BaseBtn";
import ConfirmModal from "../components/modal/ConfirmModal";
import Sort from "../components/board/Sort";
import useSelect from "../hooks/useSelect";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function EditDebate() {
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [debateInfo, setDebateInfo] = useState("");
  const debate_id = useParams();
  const numDebateId = parseInt(debate_id.debateId);

  // 해당 debate 정보 get
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/debate/single/${numDebateId}`)
      .then((res) => {
        setDebateInfo(res.data.data.debateInfo);
      })
      .catch((err) => err);
  }, []);

  // title수정
  const [inputTitle, setInputTitle] = useState(debateInfo.title);
  const handleInputTitle = (e) => {
    setInputTitle(e.target.value);
  };

  // topic수정
  const [inputTopic, setInputTopic] = useState(debateInfo.topic);
  const handleInputTopic = (e) => {
    setInputTopic(e.target.value);
  };

  //category수정
  const options = ["Politics", "Society", "Economics", "Science", "IT", "Environment", "Education", "History", "Sports", "Philosophy", "ForFun"];
  const sort = useSelect(options[0]);
  // const index = options.indexOf(debateInfo.category);
  // const sort = useSelect(options[index]);
  // sort.state = debateInfo.category;
  // console.log("sort이다", sort.state);
  // const realIdx = options.indexOf(sort.state)
  // const newSort = useSelect(options[realIdx]);

  // category 옆 change버튼 눌렀을 때 나타나는 Modal
  const [isOpenSort, setIsOpenSort] = useState(false);
  const openSort = () => {
    setIsOpenSort(true);
  };

  //confirmModal 오픈
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(true);
  };

  // 최종 save
  const handleSubmit = () => {
    if (debateInfo.pros_id !== null) {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/debate/${numDebateId}`, {
          category: sort.attribute.value,
          pros_id: debateInfo.pros_id,
          cons_id: null,
          title: inputTitle,
          topic: inputTopic,
        })
        .then((res) => {
          navigate(`/forum/debate/${res.data.data.id}`);
          window.scroll({ top: 0, behavior: "smooth" });
        })
        .catch((err) => err);
    } else {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/debate/${numDebateId}`, {
          category: sort.attribute.value,
          pros_id: null,
          cons_id: debateInfo.cons_id,
          title: inputTitle,
          topic: inputTopic,
        })
        .then((res) => {
          navigate(`/forum/debate/${res.data.data.id}`);
          window.scroll({ top: 0, behavior: "smooth" });
        })
        .catch((err) => err);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-ducks-orange-ff9425 font-bold text-36 mt-24 ml-70 mb-12">Edit Your Debate</h1>
      <div className="w-960 h-0 ml-24 mt-12 border-solid border-b border-ducks-gray-eee"></div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col my-60">
          <h1 className="font-bold text-24 mb-12">Title</h1>
          <div className="w-960 h-0 -ml-2 mt-12 border-solid border-b border-ducks-gray-eee"></div>
          <div className="flex flex-row right-align font-light text-18 mt-12 mb-12">
            Author <div className="ml-12 mb-12 font-light"> {userInfo?.data.name}</div>
          </div>
          <textarea className="w-960 h-48 text-justify rounded-md border-ducks-gray-ccc shadow-sm" defaultValue={debateInfo.title} value={inputTitle} onChange={handleInputTitle}></textarea>
          <h1 className="font-bold text-24 mb-12 mt-60">Topic</h1>
          <div className="w-960 h-0 -ml-2 mt-12 border-solid border-b border-ducks-gray-eee"></div>
          <div className="m-20">
            <div className="flex flex-row">
              <div className="flex right-align font-light text-18 mt-12 mb-12 -ml-18 mr-32">Category</div>
              <div className="flex mt-12 mr-18">{debateInfo.category} </div>
              <div className="flex flex-col">
                <div className="mt-1">
                  <OrangeBtn callback={openSort} text="Change"></OrangeBtn>
                </div>
                {isOpenSort ? (
                  <div className="flex -ml-80 mt-18">
                    <Sort sort={sort} options={options}></Sort>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <textarea className="w-960 h-370 text-justify rounded-md border-ducks-gray-ccc shadow-sm" defaultValue={debateInfo.topic} value={inputTopic} onChange={handleInputTopic}></textarea>
          <div className="flex justify-center items-center mt-18">
            <OrangeBtn callback={openModalHandler} text="Save"></OrangeBtn>
          </div>

          {isOpen ? (
            <ConfirmModal
              content={{ title: "Confirm", text: "Do you want to save this debate?", left: "NO", right: "YES" }}
              cancelCallback={() => {
                setIsOpen(false);
              }}
              confirmCallback={handleSubmit}
            />
          ) : null}
        </div>
      </div>
    </div>
    // <div className="flex flex-col items-center">
    //   <div className="font-bold mr-20">Title</div>
    //   <textarea className="w-304 h-32" defaultValue={debateInfo.title} value={inputTitle} onChange={handleInputTitle}></textarea>
    //   <div className="text-ducks-gray-666">Author : {userInfo?.data.name}</div>
    //   <div className="font-bold mt-30">Topic </div>{" "}
    //   <div className="flex flex-row">
    //     <div className="m-12">Category: {debateInfo.category}</div>
    //     <OrangeBtn callback={openSort} text="Change"></OrangeBtn>
    //   </div>
    //   {isOpenSort ? <Sort sort={sort} options={options}></Sort> : null}
    //   <div>{debateInfo.pros_id !== null ? <div className="text-ducks-gray-666">Your Position : Pros</div> : <div className="text-ducks-gray-666">Your Position : Cons</div>}</div>
    //   <textarea className="w-304 h-304" defaultValue={debateInfo.topic} value={inputTopic} onChange={handleInputTopic}></textarea>
    //   <OrangeBtn callback={openModalHandler} text="Save"></OrangeBtn>
    //   {isOpen ? (
    //     <ConfirmModal
    //       content={{ title: "Confirm", text: "Do you want to save this debate?", left: "NO", right: "YES" }}
    //       cancelCallback={() => {
    //         setIsOpen(false);
    //       }}
    //       confirmCallback={handleSubmit}
    //     />
    //   ) : null}
    // </div>
  );
}
