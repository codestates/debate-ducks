import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { YellowBtn } from "../components/btn/BigBtn";
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
              Choose your topic, create a debate
            </h1>
            <div data-aos="fade-up" data-aos-delay="250">
              <p className="mb-48">
                12가지의 주어진 주제 안에서
                <br />
                다양한 문제들에 대해 토론 해보세요
                <br />
                마음에 드는 주제와 찬반을 선택하고
                <br />
                토론을 시작하세요
              </p>
            </div>
          </div>
          <div data-aos="fade-left" className="w-560 h-368 shadow-xl rounded-20 overflow-hidden">
            <img src="/images/forum-1.gif" alt="forum" />
          </div>
        </div>
      </div>
      <div className={`${common} text-right`}>
        <div className="w-960 flex justify-between items-center">
          <div data-aos="fade-right" className="w-560 h-368 shadow-xl rounded-20 overflow-hidden">
            <img src="/images/main-debateroom.gif" alt="pics" />
          </div>
          <div className="w-274">
            <h1 data-aos="fade-up" data-aos-delay="200" className="text-36 font-bold capitalize mb-24">
              start debating in real-time
            </h1>
            <div data-aos="fade-up" data-aos-delay="250">
              <p className="mb-48">
                실시간 토론장에 참여하고
                <br />
                상대와 번갈아 가며 대화하세요
                <br />
                필요하다면 중요한 자료를
                <br />
                화면에 공유할 수 있어요
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${common}`}>
        <div className="w-960 flex justify-between items-center">
          <div className="w-274">
            <h1 data-aos="fade-up" data-aos-delay="200" className="text-36 font-bold capitalize mb-24">
              watch debate videos
            </h1>
            <div data-aos="fade-up" data-aos-delay="250">
              <p className="mb-48">
                토론을 종료하고
                <br />
                완성된 비디오를 확인해 보세요
              </p>
            </div>
          </div>
          <div data-aos="fade-left" className="w-560 h-368 shadow-xl rounded-20 overflow-hidden">
            <img src="/images/main-video.gif" alt="video" />
          </div>
        </div>
      </div>
      <div data-aos="fade-down" data-aos-delay="700" className={`${common} flex-col relative`}>
        <h1 id="last" className="text-36 font-bold mb-36 w-560 text-center text-ducks-blue-6667ab">
          Are you ready to share your perspective?
        </h1>
        {/* <p className="w-410 text-center mb-36">With Debate Ducks, you can take on issues big or small, build consensus on a topic, and explore every aspect of a debate.</p> */}
        <p className="w-410 text-center mb-36">토론을 시작할 준비가 되셨나요?</p>
        <StrawBtn text="join debate" callback={() => navigate("/forum")}></StrawBtn>
        <div data-aos="fade-up" data-aos-delay="1000" data-aos-anchor="#last" className="text-ducks-blue-6667ab text-36 absolute bottom-40 right-40 cursor-pointer">
          <BsArrowUpCircle onClick={() => window.scroll({ top: 0, behavior: "smooth" })} />
        </div>
      </div>
    </div>
  );
}