import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { onOffModal } from "../redux/modules/exceedModal";
import JustConfirmModal from "../components/modal/JustConfirmModal";
import { OrangeBtn } from "../components/btn/BigBtn";
import { Likey } from "../components/card/LikeyOrVoted";
// import { useEffect, useState } from "react";

export default function Debate() {
  const { debateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isExceedModalOpen = useSelector((state) => state.exceedModal.isOpen);
  const closeModal = () => {
    dispatch(onOffModal(false));
  };

  // ! 임시 변수
  const isSignIn = true;
  // const hasVideo = false;
  // const isMatching = true;

  const users = {
    pros: {
      id: 1,
      email: "strawberrycream@kakao.com",
      name: "strawberryoolongtea",
      point: 1234560,
      profile: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      likey: true,
    },
    cons: {
      id: 2,
      email: "dozingatto@gmail.com",
      name: "dozingatto",
      point: 567890,
      profile: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      likey: false,
    },
  };

  const debate = {
    id: 1,
    hostId: users.pros.id,
    participantId: users.cons.id,
    prosUser: users.pros.name,
    consUser: users.cons.name,
    title: "Do Aliens Exist?",
    topic:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis odit laborum nobis nesciunt facilis voluptate ad magnam possimus, neque laudantium dolorem nam placeat exercitationem quos dicta sequi distinctio, beatae temporibus!",
    likeyCnt: 456780,
    prosProfile: null,
    consProfile: null,
  };

  return (
    <div>
      <div className="w-full h-370 bg-ducks-straw-e5e366">
        <h1>{debate.title}</h1>
      </div>
      <div className="flex">
        {/* pros user */}
        <div>
          {debate.prosProfile ? (
            <img src={debate.prosProfile} className="w-140 h-140 object-cover rounded-full border-4 border-solid border-ducks-orange-ff9425" />
          ) : (
            <div className="bg-grayduck w-140 h-140 rounded-full bg-cover border-4 border-solid border-ducks-orange-ff9425"></div>
          )}

          <div className="text-ducks-orange-ff9425 text-center">pros</div>
        </div>

        {/* cons user */}
        <div>
          {debate.consProfile ? (
            <img src={debate.consProfile} className="w-140 h-140 object-top object-cover rounded-full border-4 border-solid border-ducks-blue-6667ab" />
          ) : (
            <div className="bg-grayduck w-140 h-140 rounded-full bg-cover border-4 border-solid border-ducks-blue-6667ab"></div>
          )}

          <div className="text-ducks-blue-6667ab text-center">cons</div>
        </div>
      </div>
      {isSignIn ? <Likey likey={users.pros.likey} likeyCnt={debate.likeyCnt}></Likey> : null}
      <div>
        <p>{debate.topic}</p>
      </div>

      {/* debate room 입장 및 인원 체크 */}
      {isExceedModalOpen ? <JustConfirmModal content={{ title: "퇴장", text: "인원이 다 찼습니다.", btn: "확인" }} callback={closeModal} /> : null}
      <OrangeBtn
        text="Enter"
        callback={() => {
          navigate(`/forum/debateroom/${debateId}`);
        }}
      />
    </div>
  );
}
