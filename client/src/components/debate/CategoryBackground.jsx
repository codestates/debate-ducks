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

Society.propTypes = {
  debate: PropTypes.object,
  isModalOn: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  isConfirmOpen: PropTypes.bool,
  setIsConfirmOpen: PropTypes.func,
  openModalHandler: PropTypes.func,
};
Science.propTypes = {
  debate: PropTypes.object,
  isModalOn: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  isConfirmOpen: PropTypes.bool,
  setIsConfirmOpen: PropTypes.func,
  openModalHandler: PropTypes.func,
};
History.propTypes = {
  debate: PropTypes.object,
  isModalOn: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  isConfirmOpen: PropTypes.bool,
  setIsConfirmOpen: PropTypes.func,
  openModalHandler: PropTypes.func,
};
IT.propTypes = {
  debate: PropTypes.object,
  isModalOn: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  isConfirmOpen: PropTypes.bool,
  setIsConfirmOpen: PropTypes.func,
  openModalHandler: PropTypes.func,
};
Education.propTypes = {
  debate: PropTypes.object,
  isModalOn: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  isConfirmOpen: PropTypes.bool,
  setIsConfirmOpen: PropTypes.func,
  openModalHandler: PropTypes.func,
};
Economics.propTypes = {
  debate: PropTypes.object,
  isModalOn: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  isConfirmOpen: PropTypes.bool,
  setIsConfirmOpen: PropTypes.func,
  openModalHandler: PropTypes.func,
};
Sports.propTypes = {
  debate: PropTypes.object,
  isModalOn: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  isConfirmOpen: PropTypes.bool,
  setIsConfirmOpen: PropTypes.func,
  openModalHandler: PropTypes.func,
};
Environment.propTypes = {
  debate: PropTypes.object,
  isModalOn: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  isConfirmOpen: PropTypes.bool,
  setIsConfirmOpen: PropTypes.func,
  openModalHandler: PropTypes.func,
};
Philosophy.propTypes = {
  debate: PropTypes.object,
  isModalOn: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  isConfirmOpen: PropTypes.bool,
  setIsConfirmOpen: PropTypes.func,
  openModalHandler: PropTypes.func,
};
Culture.propTypes = {
  debate: PropTypes.object,
  isModalOn: PropTypes.bool,
  toggleModal: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  isConfirmOpen: PropTypes.bool,
  setIsConfirmOpen: PropTypes.func,
  openModalHandler: PropTypes.func,
};
JustForFun.propTypes = {
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
function Society({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-society bg-cover bg-center relative">
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
function Economics({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-economics bg-cover bg-center relative">
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
function Science({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-science bg-cover bg-center relative">
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
function IT({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-it bg-cover bg-center relative">
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
function Environment({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-environment bg-cover bg-center relative">
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
function Education({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-education bg-cover bg-center relative">
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
function History({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-history bg-cover bg-center relative">
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
function Sports({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-sports bg-cover bg-center relative">
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
function Philosophy({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-philosophy bg-cover bg-center relative">
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
function Culture({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-culture bg-cover bg-center relative">
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
function JustForFun({ debate, isModalOn, toggleModal, handleEdit, handleDelete, isConfirmOpen, setIsConfirmOpen, openModalHandler }) {
  return (
    <div className="flex justify-center items-center w-full h-410 bg-forfun bg-cover bg-center relative">
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

export { Politics, Society, Economics, Science, IT, Environment, Education, History, Sports, Philosophy, Culture, JustForFun };
