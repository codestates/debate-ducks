import { useNavigate } from "react-router-dom";
import { YellowBtn } from "../components/btn/BigBtn";
import { StrawBtn } from "../components/btn/BigBtn";
export default function Main() {
  const common = "w-screen h-screen flex justify-center items-center";
  const navigate = useNavigate();
  return (
    <div className="font-poppins">
      <div className={`${common} flex-col bg-main bg-cover bg-center bg-fixed text-white`}>
        <h1 className="capitalize text-48 font-bold mb-36">a real-time debate platform</h1>
        <p className="w-410 text-center">Debate Ducks cuts through the noise typically associated with social and online media, making it easy to engage in focused discussion.</p>
      </div>
      <div className={`${common}`}>
        <div className="w-960 flex justify-between items-center">
          <div className="w-274">
            <h1 className="text-36 font-bold capitalize mb-24">lorem ipsum dolor sit amet</h1>
            <p className="mb-48">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio numquam nostrum molestiae modi at odit accusamus.</p>
            <YellowBtn text="Go" />
          </div>
          <div className="w-560 h-368 shadow-xl rounded-20 bg-ducks-straw-e5e366 overflow-hidden">
            <img src="https://picsum.photos/800/600" alt="pics" />
          </div>
        </div>
      </div>
      <div className={`${common} text-right`}>
        <div className="w-960 flex justify-between items-center">
          <div className="w-560 h-368 shadow-xl rounded-20 bg-ducks-straw-e5e366 overflow-hidden">
            <img src="https://picsum.photos/800/600" alt="pics" />
          </div>
          <div className="w-274">
            <h1 className="text-36 font-bold capitalize mb-24">lorem ipsum dolor sit amet</h1>
            <p className="mb-48">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio numquam nostrum molestiae modi at odit accusamus.</p>
            <YellowBtn text="Go" />
          </div>
        </div>
      </div>
      <div className={`${common}`}>
        <div className="w-960 flex justify-between items-center">
          <div className="w-274">
            <h1 className="text-36 font-bold capitalize mb-24">lorem ipsum dolor sit amet</h1>
            <p className="mb-48">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio numquam nostrum molestiae modi at odit accusamus.</p>
            <YellowBtn text="Go" />
          </div>
          <div className="w-560 h-368 shadow-xl rounded-20 bg-ducks-straw-e5e366 overflow-hidden">
            <img src="https://picsum.photos/800/600" alt="pics" />
          </div>
        </div>
      </div>
      <div className={`${common} flex-col`}>
        <h1 className="text-36 font-bold mb-36 w-560 text-center text-ducks-blue-6667ab">Are you ready to share your perspective?</h1>
        <p className="w-410 text-center mb-36">With Debate Ducks, you can take on issues big or small, build consensus on a topic, and explore every aspect of a debate.</p>
        <StrawBtn text="make room for debate" callback={() => navigate("/forum/create")}></StrawBtn>
      </div>
    </div>
  );
}
