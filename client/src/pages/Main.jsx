import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { YellowBtn } from "../components/btn/BigBtn";
import { StrawBtn } from "../components/btn/BigBtn";
import AOS from "aos";
import "aos/dist/aos.css";
import { BsArrowUpCircle } from "react-icons/bs";

export default function Main() {
  const common = "w-screen h-screen flex justify-center items-center";
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="font-poppins">
      <div className={`${common} flex-col bg-main bg-cover bg-center bg-fixed text-white`}>
        <h1 data-aos="fade-up" data-aos-delay="200" className="title-anchor capitalize text-48 font-bold mb-36">
          a real-time debate platform
        </h1>
        <p data-aos="fade-up" data-aos-delay="250" className="w-410 text-center">
          Debate Ducks cuts through the noise typically associated with social and online media, making it easy to engage in focused discussion.
        </p>
      </div>
      <div className={`${common}`}>
        <div className="w-960 flex justify-between items-center">
          <div className="w-274">
            <h1 data-aos="fade-up" data-aos-delay="200" className="text-36 font-bold capitalize mb-24">
              lorem ipsum dolor sit amet
            </h1>
            <div data-aos="fade-up" data-aos-delay="250">
              <p className="mb-48">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio numquam nostrum molestiae modi at odit accusamus.</p>
              <YellowBtn text="Go" />
            </div>
          </div>
          <div data-aos="fade-left" className="w-560 h-368 shadow-xl rounded-20 overflow-hidden">
            <img src="https://picsum.photos/800/600" alt="pics" />
          </div>
        </div>
      </div>
      <div className={`${common} text-right`}>
        <div className="w-960 flex justify-between items-center">
          <div data-aos="fade-right" className="w-560 h-368 shadow-xl rounded-20 overflow-hidden">
            <img src="https://picsum.photos/800/600" alt="pics" />
          </div>
          <div className="w-274">
            <h1 data-aos="fade-up" data-aos-delay="200" className="text-36 font-bold capitalize mb-24">
              lorem ipsum dolor sit amet
            </h1>
            <div data-aos="fade-up" data-aos-delay="250">
              <p className="mb-48">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio numquam nostrum molestiae modi at odit accusamus.</p>
              <YellowBtn text="Go" />
            </div>
          </div>
        </div>
      </div>
      <div className={`${common}`}>
        <div className="w-960 flex justify-between items-center">
          <div className="w-274">
            <h1 data-aos="fade-up" data-aos-delay="200" className="text-36 font-bold capitalize mb-24">
              lorem ipsum dolor sit amet
            </h1>
            <div data-aos="fade-up" data-aos-delay="250">
              <p className="mb-48">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio numquam nostrum molestiae modi at odit accusamus.</p>
              <YellowBtn text="Go" />
            </div>
          </div>
          <div data-aos="fade-left" className="w-560 h-368 shadow-xl rounded-20 overflow-hidden">
            <img src="https://picsum.photos/800/600" alt="pics" />
          </div>
        </div>
      </div>
      <div data-aos="fade-down" data-aos-delay="700" className={`${common} flex-col relative`}>
        <h1 id="last" className="text-36 font-bold mb-36 w-560 text-center text-ducks-blue-6667ab">
          Are you ready to share your perspective?
        </h1>
        <p className="w-410 text-center mb-36">With Debate Ducks, you can take on issues big or small, build consensus on a topic, and explore every aspect of a debate.</p>
        <StrawBtn text="make room for debate" callback={() => navigate("/forum/create")}></StrawBtn>
        <div data-aos="fade-up" data-aos-delay="1000" data-aos-anchor="#last" className="text-ducks-blue-6667ab text-36 absolute bottom-40 right-40 cursor-pointer">
          <BsArrowUpCircle onClick={() => window.scroll({ top: 0, behavior: "smooth" })} />
        </div>
      </div>
    </div>
  );
}
