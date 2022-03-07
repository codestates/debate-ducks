import axios from "axios";
// import { useState } from "react";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { StrawBtn } from "../btn/BigBtn";
import Loading from "../Loading";
// import { StrawBtn as AddBtn } from "../btn/BaseBtn";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import { Society, Economics, Science, IT, Environment, Education, History, Sports, Philosophy, Culture, JustForFun } from "./CategoryBackground";
// import useInput from "../../hooks/useInput";

import PropTypes from "prop-types";
OnGoingDebate.propTypes = { debate: PropTypes.object, isLoading: PropTypes.bool, setDebate: PropTypes.func };

export default function OnGoingDebate({ debate, isLoading, setDebate }) {
  const navigate = useNavigate();
  const { debateId } = useParams();
  const userInfo = useSelector((state) => state.user.data);

  // const [isModalOn, setIsModalOn] = useState(false);
  // const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // console.log("isModalOn : ", isModalOn);
  // console.log("isConfirmOpen : ", isConfirmOpen);

  // function toggleModal() {
  //   setIsModalOn(!isModalOn);
  // }

  // function openModalHandler() {
  //   setIsConfirmOpen(!isConfirmOpen);
  // }
  // const dispatch = useDispatch()

  const handleParticipate = () => {
    console.log("axios 하기 전입니다", userInfo);
    if (debate.debateInfo.host_id === debate.debateInfo.pros_id) {
      axios.patch(`${process.env.REACT_APP_API_URL}/debate/${debateId}`, { participant_id: userInfo.id, cons_id: userInfo.id }).then((data) => {
        setDebate((state) => ({ ...state, ...data.data.data }));
        console.log("participate 후에 data입니다", data);
        navigate(`/forum/debate/${debateId}`);
      });
    } else if (debate.debateInfo.host_id === debate.debateInfo.cons_id) {
      axios.patch(`${process.env.REACT_APP_API_URL}/debate/${debateId}`, { participant_id: userInfo.id, pros_id: userInfo.id });
    } else {
      console.log("Errorrrrrrrr");
    }
  };

  const handleEnter = () => {
    navigate(`/forum/debateroom/${debateId}`);
  };

  // function handleEdit() {
  //   navigate(`/forum/edit/debate/${debateId}`);
  // }

  // function handleDelete() {
  //   axios.delete(`${process.env.REACT_APP_API_URL}/debate/${debateId}`).then(() => navigate("/forum"));
  // }

  // useEffect(() => {});
  // const [desc, setDesc] = useState("");
  // const [url, setUrl] = useState("");
  // const [factCheckList, setFactCheckList] = useState([]);

  // function handleDesc(e) {
  //   setDesc(e.target.value);
  // e.target.reset();
  // }

  // function handleUrl(e) {
  //   setUrl(e.target.value);
  // }

  // function handleAdd() {
  //   axios.post(`${process.env.REACT_APP_API_URL}/factcheck/${userInfo.id}/${debateId}`, { pros: userInfo.id === debate.debateInfo.pros_id, contents: `${desc} ${url}` }).then((res) => {
  //     console.log(res.data.data);
  //     const reference = res.data.data.contents;
  //     setFactCheckList([...factCheckList, reference]);
  //   });
  // }

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="w-960 h-0 border-solid border-b border-ducks-gray-eee"></div>
          <div className="my-60 text-center">
            <h1 className="font-bold text-24 mb-40">Topic</h1>
            <div className="w-960 text-center">{debate.debateInfo.topic}</div>
          </div>
        </div>
      )}

      {!debate.debateInfo.participant_id ? <StrawBtn text="participate" callback={handleParticipate} /> : <StrawBtn text="enter debate room" callback={handleEnter} />}
      <div className="w-960 h-0 border-solid border-b border-ducks-gray-eee my-60"></div>
      {/* fact check */}
      {/* <div>
        <h1 className="text-center font-bold text-24 mb-40">Fact Check</h1>
        <div>
          <div className="w-960 flex justify-between">
            <input onChange={handleDesc} type="text" className="border border-ducks-gray-ccc rounded-full w-304 h-32 mr-12 text-14" placeholder="Describe your URL" />
            <input onChange={handleUrl} type="text" className="border border-ducks-gray-ccc rounded-full w-full h-32 mr-12 text-14" placeholder="Link your reference URL address" />
            <AddBtn text="add" callback={handleAdd}></AddBtn>
          </div>
          <div className="test"></div>
          <div className="w-960 flex">
            <div className="w-full h-336 rounded-12 border border-solid border-ducks-orange-ff9425 overflow-hidden mr-4">
              <div className="text-center leading-36 text-white h-36 bg-ducks-orange-ff9425">pros</div>
              {factCheckList.map((fact) => {
                <div>{fact}</div>;
              })}
            </div>
            <div className="w-full h-336 rounded-12 border border-solid border-ducks-blue-6667ab overflow-hidden">
              <div className="text-center leading-36 text-white h-36 bg-ducks-blue-6667ab">pros</div>
              {userInfo.id}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
