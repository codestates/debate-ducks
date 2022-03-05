import { YellowBtn } from "../components/btn/BaseBtn";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const Home = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between mt-20 m-2 items-center relative w-460">
          <h1 className="font-bold text-ducks-blue-6667ab text-192">4</h1>
          <div className="bg-biglogo bg-cover w-192 h-168 mr-12 ml-130 animate-bounce absolute"></div>
          <h1 className="font-bold text-ducks-blue-6667ab text-192">4</h1>
        </div>
        <p className="mb-8 text-center text-ducks-gray-666 md:text-2xl">
          Oops! <br /> This page is not found.
        </p>
        <div className="flex justify-center">
          <YellowBtn callback={Home} text="Go home"></YellowBtn>
        </div>
      </div>
    </div>
  );
}
