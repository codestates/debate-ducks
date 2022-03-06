import PropTypes from "prop-types";
import { OrangeBtn, BlueBtn } from "../btn/BaseBtn";

export default function ConfirmModal({ content, cancelCallback, confirmCallback }) {
  function handleCancel() {
    cancelCallback();
  }

  function handleConfirm() {
    confirmCallback();
  }

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-ducks-gray-666 bg-opacity-50 overflow-y-auto h-screen w-screen">
      <div className="w-max max-w-xs p-20 text-center rounded-12 border border-solid border-ducks-orange-ff9425 font-poppins bg-white">
        <h1 className="mb-20 font-bold text-ducks-orange-ff9425">{content.title}</h1>
        <p className="mb-20 text-ducks-gray-666 text-14">{content.text}</p>
        <div className="flex justify-center items-center">
          <div className="w-max flex justify-between">
            <BlueBtn text={content.left} callback={handleCancel} />
            <OrangeBtn text={content.right} callback={handleConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = { content: PropTypes.object, cancelCallback: PropTypes.func, confirmCallback: PropTypes.func };
