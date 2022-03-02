import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return /^\/forum\/debateroom\/\d/i.test(location.pathname) ? null : (
    <div className="w-full h-336 bg-ducks-blue-6667ab flex justify-center">
      <div className="w-1200 py-60 flex justify-between">
        <div>
          <h1 className="mb-46 font-bold font-poppins uppercase text-white">debate ducks</h1>
          <div className="bg-logoWhite w-92 h-80 bg-cover bg-center"></div>
        </div>
        <div className="text-white">
          <h1 className="mb-46">SuSang-YuHee</h1>
          <ul className="leading-36">
            <li>Subin</li>
            <li>Sangbong</li>
            <li>Yuchan</li>
            <li>Heena</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
