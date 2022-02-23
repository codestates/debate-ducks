import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { onOffModal } from "../redux/modules/exceedModal";
import JustConfirmModal from "../components/modal/JustConfirmModal";
import { OrangeBtn } from "../components/btn/BaseBtn";

export default function Debate() {
  const { debateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isExceedModalOpen = useSelector((state) => state.exceedModal.isOpen);
  const closeModal = () => {
    dispatch(onOffModal(false));
  };

  return (
    <div>
      {isExceedModalOpen ? <JustConfirmModal content={{ title: "퇴장", text: "인원이 다 찼습니다.", btn: "확인" }} callback={closeModal} /> : null}
      <h1>Debate</h1>
      <OrangeBtn
        text="Enter"
        callback={() => {
          navigate(`/forum/debateroom/${debateId}`);
        }}
      />
    </div>
  );
}
