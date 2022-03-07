import PropTypes from "prop-types";
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
Page.propTypes = { page: PropTypes.object, lastPage: PropTypes.number };

export default function Page({ page, lastPage }) {
  const movePage = (num) => {
    if (num !== page.state && num >= 1 && num <= lastPage) {
      page.setInput(num);
      page.setState(num);
    }
  };

  const handleFirst = () => {
    movePage(1);
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const handlePrev = () => {
    movePage(page.state - 1);
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const handleNext = () => {
    movePage(page.state + 1);
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const handleLast = () => {
    movePage(lastPage);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-410 flex justify-between items-center my-60 mx-auto">
      <BsChevronDoubleLeft onClick={handleFirst} className="font-bold text-18 cursor-pointer" />
      <button onClick={handlePrev} className="flex items-center">
        <BsChevronLeft className="font-bold text-18 mr-2" />
        prev
      </button>
      <div className="bg-ducks-straw-e5e366 h-32 rounded-full px-3 flex justify-center items-center">
        <input {...page.attribute} placeholder={page.state} className="flex content-center w-40 mr-1 text-right bg-ducks-straw-e5e366 pr-14" />
      </div>
      <button onClick={handleNext} className="flex items-center">
        next
        <BsChevronRight className="font-bold text-18 ml-2" />
      </button>
      <BsChevronDoubleRight onClick={handleLast} className="font-bold text-18 cursor-pointer" />
    </div>
  );
}
