import { useNavigate, useParams } from "react-router-dom";
import { OrangeBtn } from "../components/btn/BaseBtn";

export default function Debate() {
  const navigate = useNavigate();

  const { debateId } = useParams();

  return (
    <div>
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
