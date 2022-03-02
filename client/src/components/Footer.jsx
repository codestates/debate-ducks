import { useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

export default function Footer() {
  const location = useLocation();

  return /^\/forum\/debateroom\/\d/i.test(location.pathname) ? null : (
    <div className="w-full h-336 bg-ducks-blue-6667ab flex justify-center">
      <div className="w-1200 py-60 flex justify-between">
        <div>
          <h1 className="mb-46 font-bold font-poppins uppercase text-white">debate ducks</h1>
          <div className="bg-logoWhite w-92 h-80 bg-cover bg-center"></div>
        </div>
        <div className="text-white text-right">
          <h1 className="mb-46">SuSang-YuHee</h1>
          <ul className="leading-36">
            <li className="flex items-center justify-end">
              <span>Subin</span>
              <a className="mx-3" href="https://github.com/strawberryoolongtea" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FiSend />
              </a>
            </li>
            <li className="flex items-center justify-end">
              <span>Sangbong</span>
              <a className="mx-3" href="https://github.com/ParkSangBong" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FiSend />
              </a>
            </li>
            <li className="flex items-center justify-end">
              <span>Yuchan</span>
              <a className="mx-3" href="https://github.com/YuchanJeong" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FiSend />
              </a>
            </li>
            <li className="flex items-center justify-end">
              <span>Heena</span>
              <a className="mx-3" href="https://github.com/jenjenhub" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FiSend />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
