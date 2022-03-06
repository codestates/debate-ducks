import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { StrawBtn } from "../btn/BigBtn";
import { StrawBtn as AddBtn } from "../btn/BaseBtn";
import { Politics, Society, Economics, Science, IT, Environment, Education, History, Sports, Philosophy, Culture, JustForFun } from "./CategoryBackground";
// import useInput from "../../hooks/useInput";

export default function OnGoingDebate(debate) {
  const navigate = useNavigate();
  const { debateId } = useParams();
  const userInfo = useSelector((state) => state.user.data);

  const [isModalOn, setIsModalOn] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // console.log("isModalOn : ", isModalOn);
  // console.log("isConfirmOpen : ", isConfirmOpen);

  function toggleModal() {
    setIsModalOn(!isModalOn);
  }

  function openModalHandler() {
    setIsConfirmOpen(!isConfirmOpen);
  }

  const handleParticipate = () => {
    console.log("axios 하기 전입니다", userInfo);
    if (debate.debateInfo.host_id === debate.debateInfo.pros_id) {
      axios.patch(`${process.env.REACT_APP_API_URL}/debate/${debateId}`, { participant_id: userInfo.id, cons_id: userInfo.id }).then(() => navigate(`/debate/${debateId}`));
    } else if (debate.debateInfo.host_id === debate.debateInfo.cons_id) {
      axios.patch(`${process.env.REACT_APP_API_URL}/debate/${debateId}`, { participant_id: userInfo.id, pros_id: userInfo.id });
    } else {
      console.log("Errorrrrrrrr");
    }
  };

  const handleEnter = () => {
    navigate(`/forum/debateroom/${debateId}`);
  };

  function handleEdit() {
    navigate(`/forum/edit/debate/${debateId}`);
  }

  function handleDelete() {
    axios.delete(`${process.env.REACT_APP_API_URL}/debate/${debateId}`).then(() => navigate("/forum"));
  }

  const Background = (debate) => {
    console.log(debate);
    switch (debate.debateInfo?.category) {
      case "Politics":
        return (
          <Politics
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
      case "Society":
        return (
          <Society
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
      case "Economics":
        return (
          <Economics
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
      case "Science":
        return (
          <Science
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
      case "IT":
        return (
          <IT
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
      case "Environment":
        return (
          <Environment
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
      case "Education":
        return (
          <Education
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
      case "History":
        return (
          <History
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
      case "Sports":
        return (
          <Sports
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
      case "Philosophy":
        return (
          <Philosophy
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
      case "Culture":
        return (
          <Culture
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
      case "Just For Fun":
        return (
          <JustForFun
            debate={debate}
            isModalOn={isModalOn}
            toggleModal={toggleModal}
            debateId={debateId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            openModalHandler={openModalHandler}
          />
        );
    }
  };

  useEffect(() => {});
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [factCheckList, setFactCheckList] = useState([]);

  function handleDesc(e) {
    setDesc(e.target.value);
    // e.target.reset();
  }

  function handleUrl(e) {
    setUrl(e.target.value);
  }

  function handleAdd() {
    axios.post(`${process.env.REACT_APP_API_URL}/factcheck/${userInfo.id}/${debateId}`, { pros: userInfo.id === debate.debateInfo.pros_id, contents: `${desc} ${url}` }).then((res) => {
      console.log(res.data.data);
      const reference = res.data.data.contents;
      setFactCheckList([...factCheckList, reference]);
    });
  }

  return (
    <div className="flex flex-col items-center">
      <Background {...debate} />
      {!debate.debateInfo.participant_id ? (
        debate.debateInfo.host_id === debate.debateInfo.pros_id ? (
          <div className="w-410 flex justify-between items-center my-60 z-30">
            <div>
              <img src={debate.prosProfile} className="w-140 h-140 object-cover rounded-full mb-20 border-4 border-solid border-ducks-orange-ff9425" />
              <div className="text-center text-ducks-orange-ff9425 font-poppins font-bold">
                <div>pros</div>
                <div>{debate.prosName}</div>
              </div>
            </div>
            <div className="text-24 font-poppins font-bold">VS</div>
            <div>
              <div className="bg-grayduck w-140 h-140 bg-cover rounded-full mb-20"></div>
              <div className="text-center text-ducks-gray-ccc font-poppins">
                <div className="font-bold">cons</div>
                <div>not in</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-410 flex justify-between items-center my-60 z-30">
            <div>
              <div className="bg-grayduck w-140 h-140 bg-cover rounded-full mb-20"></div>
              <div className="text-center text-ducks-gray-ccc font-poppins">
                <div className="font-bold">pros</div>
                <div>not in</div>
              </div>
            </div>
            <div className="text-24 font-poppins font-bold">VS</div>
            <div>
              <img src={debate.consProfile} className="w-140 h-140 object-cover rounded-full mb-20 border-4 border-solid border-ducks-blue-6667ab" />
              <div className="text-center text-ducks-blue-6667ab font-poppins font-bold">
                <div>cons</div>
                <div>{debate.consName}</div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="w-410 flex justify-between items-center my-60 z-30">
          <div>
            <img src={debate.prosProfile} className="w-140 h-140 object-cover rounded-full mb-20 border-4 border-solid border-ducks-orange-ff9425" />
            <div className="text-center text-ducks-orange-ff9425 font-poppins font-bold">
              <div>pros</div>
              <div>{debate.prosName}</div>
            </div>
          </div>
          <div className="text-24 font-poppins font-bold">VS</div>
          <div>
            <img src={debate.consProfile} className="w-140 h-140 object-cover rounded-full mb-20 border-4 border-solid border-ducks-blue-6667ab" />
            <div className="text-center text-ducks-blue-6667ab font-poppins font-bold">
              <div>cons</div>
              <div>{debate.consName}</div>
            </div>
          </div>
        </div>
      )}
      <div className="w-960 h-0 border-solid border-b border-ducks-gray-eee"></div>
      <div className="my-60 text-center">
        <h1 className="font-bold text-24 mb-40">Topic</h1>
        <div className="w-960 text-justify">{debate.debateInfo.topic}</div>
      </div>
      {!debate.debateInfo.participant_id ? <StrawBtn text="participate" callback={handleParticipate} /> : <StrawBtn text="enter debate room" callback={handleEnter} />}
      <div className="w-960 h-0 border-solid border-b border-ducks-gray-eee my-60"></div>

      {/* debate video */}
      <div className="my-60">
        <h1 className="text-center font-bold text-24 mb-40">Topic</h1>
        <div className="w-960 h-540 bg-ducks-gray-ccc"></div>
      </div>

      {/* fact check */}
      <div>
        <h1 className="text-center font-bold text-24 mb-40">Fact Check</h1>
        <div>
          {/* input */}
          <div className="w-960 flex justify-between">
            <input onChange={handleDesc} type="text" className="border border-ducks-gray-ccc rounded-full w-304 h-32 mr-12 text-14" placeholder="Describe your URL" />
            <input onChange={handleUrl} type="text" className="border border-ducks-gray-ccc rounded-full w-full h-32 mr-12 text-14" placeholder="Link your reference URL address" />
            <AddBtn text="add" callback={handleAdd}></AddBtn>
          </div>
          <div className="test"></div>
          {/* pros & cons */}
          <div className="w-960 flex">
            {/* pros */}
            <div className="w-full h-336 rounded-12 border border-solid border-ducks-orange-ff9425 overflow-hidden mr-4">
              <div className="text-center leading-36 text-white h-36 bg-ducks-orange-ff9425">pros</div>
              {factCheckList.map((fact) => {
                <div>{fact}</div>;
              })}
            </div>
            {/* cons */}
            <div className="w-full h-336 rounded-12 border border-solid border-ducks-blue-6667ab overflow-hidden">
              <div className="text-center leading-36 text-white h-36 bg-ducks-blue-6667ab">pros</div>
              {userInfo.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
