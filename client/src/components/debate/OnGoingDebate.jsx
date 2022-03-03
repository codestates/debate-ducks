// import axios from "axios";
import { StrawBtn } from "../btn/BaseBtn";
import EditOrDeleteModal from "../modal/EditOrDeleteModal";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import ConfirmModal from "../modal/ConfirmModal";

export default function OnGoingDebate(debate) {
  const [isModalOn, setIsModalOn] = useState(false);
  const navigate = useNavigate();
  //console.log(debate.debateInfo);

  function toggleModal() {
    setIsModalOn(!isModalOn);
  }

  //confirm모달 오픈
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const openModalHandler = () => {
    setIsConfirmOpen(true);
  };

  function deleteDebate() {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/debate/${debate.debateInfo.id}`)
      .then((res) => {
        console.log(res);
        alert("delete success!");
        navigate("/forum");
      })
      .catch((err) => err);
  }

  return (
    <>
      <div className="bg-politics w-full h-410 bg-cover bg-center flex justify-center items-center">
        <h1 className="text-white text-48 font-poppins font-bold">{debate.debateInfo.title}</h1>
      </div>
      {!debate.debateInfo.participant_id ? (
        debate.debateInfo.host_id === debate.debateInfo.pros_id ? (
          <div>
            <HiOutlineDotsVertical onClick={toggleModal} />

            {isModalOn ? (
              <EditOrDeleteModal
                editCallback={() => {
                  navigate(`/forum/edit/${debate.debateInfo.id}`);
                }}
                deleteCallback={openModalHandler}
              />
            ) : null}
            {isConfirmOpen ? (
              <ConfirmModal
                content={{ title: "Confirm", text: "Do you want to delete this debate?", left: "NO", right: "YES" }}
                cancelCallback={() => {
                  setIsConfirmOpen(false);
                }}
                confirmCallback={deleteDebate}
              />
            ) : null}
            <div>
              <div>pros</div>
              <img src={debate.prosProfile} className="w-140 h-140 object-cover rounded-full" />
            </div>
            <div>
              <div>cons</div>
              <div className="bg-grayduck w-140 h-140 bg-cover rounded-full"></div>
            </div>
          </div>
        ) : (
          <div>
            <HiOutlineDotsVertical onClick={toggleModal} />
            {isModalOn ? (
              <EditOrDeleteModal
                editCallback={() => {
                  navigate(`/forum/edit/${debate.debateInfo.id}`);
                }}
                deleteCallback={openModalHandler}
              />
            ) : null}
            {isConfirmOpen ? (
              <ConfirmModal
                content={{ title: "Confirm", text: "Do you want to delete this debate?", left: "NO", right: "YES" }}
                cancelCallback={() => {
                  setIsConfirmOpen(false);
                }}
                confirmCallback={deleteDebate}
              />
            ) : null}

            <div>
              <div>pros</div>
              <div className="bg-grayduck w-140 h-140 bg-cover rounded-full"></div>
            </div>
            <div>
              <div>cons</div>
              <img src={debate.consProfile} className="w-140 h-140 object-cover rounded-full" />
            </div>
          </div>
        )
      ) : (
        <div>
          <div>
            <div>pros</div>
            <img src={debate.debateInfo.host_id === debate.debateInfo.pros_id ? debate.prosProfile : debate.consProfile} className="w-140 h-140 object-cover rounded-full" />
          </div>
          <div>
            <div>cons</div>
            <img src={debate.debateInfo.host_id === debate.debateInfo.cons_id ? debate.consProfile : debate.prosProfile} className="w-140 h-140 object-cover rounded-full" />
          </div>
        </div>
      )}
      <div>{debate.debateInfo.topic}</div>
      {!debate.debateInfo.participant_id ? <StrawBtn text="participate" /> : null}
    </>
  );
}
