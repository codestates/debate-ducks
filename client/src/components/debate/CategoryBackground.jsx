import { HiOutlineDotsVertical } from "react-icons/hi";
import PropTypes from "prop-types";
import EditOrDeleteModal from "../modal/EditOrDeleteModal";
import ConfirmModal from "../modal/ConfirmModal";

Politics.propTypes = {
  debate: PropTypes.object,
  isModalOn: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  isConfirmOpen: PropTypes.bool,
  setIsConfirmOpen: PropTypes.func,
  openModalHandler: PropTypes.func,
};

function Politics({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-politics bg-cover bg-center relative">
      <div className="w-full h-410 absolute bg-ducks-blue-6667ab z-10 mix-blend-exclusion"></div>
      <div className="z-50 text-white absolute top-20 right-20">
        <HiOutlineDotsVertical onClick={toggleModal} />
        {isModalOn ? <EditOrDeleteModal editCallback={handleEdit} deleteCallback={openModalHandler} /> : null}
        {isConfirmOpen ? (
          <div className="w-screen h-screen flex justify-center items-center">
            <ConfirmModal
              content={{ title: "confirm", text: "Do you wnat to delete this debate?", left: "no", right: "yes" }}
              cancelCallback={() => setIsConfirmOpen(false)}
              confirmCallback={handleDelete}
            />
          </div>
        ) : null}
      </div>
      <h1 className="font-poppins font-bold text-48 text-white z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}
function Society(debate) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-cover bg-center bg-society">
      <div className="w-full h-410 absolute z-10 mix-blend-exclusion bg-ducks-blue-6667ab"></div>
      <h1 className="text-white text-48 font-poppins font-bold z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}
function Economics(debate) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-cover bg-center bg-economics">
      <div className="w-full h-410 absolute z-10 mix-blend-exclusion bg-ducks-blue-6667ab"></div>
      <h1 className="text-white text-48 font-poppins font-bold z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}
function Science(debate) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-cover bg-center bg-science">
      <div className="w-full h-410 absolute z-10 mix-blend-exclusion bg-ducks-blue-6667ab"></div>
      <h1 className="text-white text-48 font-poppins font-bold z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}
function IT(debate) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-cover bg-center bg-it">
      <div className="w-full h-410 absolute z-10 mix-blend-exclusion bg-ducks-blue-6667ab"></div>
      <h1 className="text-white text-48 font-poppins font-bold z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}
function Environment(debate) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-cover bg-center bg-environment">
      <div className="w-full h-410 absolute z-10 mix-blend-exclusion bg-ducks-blue-6667ab"></div>
      <h1 className="text-white text-48 font-poppins font-bold z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}
function Education(debate) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-cover bg-center bg-education">
      <div className="w-full h-410 absolute z-10 mix-blend-exclusion bg-ducks-blue-6667ab"></div>
      <h1 className="text-white text-48 font-poppins font-bold z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}
function History(debate) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-cover bg-center bg-history">
      <div className="w-full h-410 absolute z-10 mix-blend-exclusion bg-ducks-blue-6667ab"></div>
      <h1 className="text-white text-48 font-poppins font-bold z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}
function Sports(debate) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-cover bg-center bg-sports">
      <div className="w-full h-410 absolute z-10 mix-blend-exclusion bg-ducks-blue-6667ab"></div>
      <h1 className="text-white text-48 font-poppins font-bold z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}
function Philosophy(debate) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-cover bg-center bg-philosophy">
      <div className="w-full h-410 absolute z-10 mix-blend-exclusion bg-ducks-blue-6667ab"></div>
      <h1 className="text-white text-48 font-poppins font-bold z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}
function Culture(debate) {
  return (
    <div>
      <div className="flex justify-center items-center w-full h-410 bg-cover bg-center bg-culture"></div>
      <div className="w-full h-410 absolute z-10 mix-blend-exclusion bg-ducks-blue-6667ab"></div>
      <h1 className="text-white text-48 font-poppins font-bold z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}
function JustForFun(debate) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-cover bg-center bg-forfun">
      <div className="w-full h-410 absolute z-10 mix-blend-exclusion bg-ducks-blue-6667ab"></div>
      <h1 className="text-white text-48 font-poppins font-bold z-20">{debate.debateInfo.title}</h1>
    </div>
  );
}

export { Politics, Society, Economics, Science, IT, Environment, Education, History, Sports, Philosophy, Culture, JustForFun };
