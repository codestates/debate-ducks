import PropTypes from "prop-types";
import { OrangeBtn, BlueBtn } from "../btn/BaseBtn";

export default function ConfirmModal({ content, confirmCallback, cancelCallback }) {
  function handleCancel() {
    cancelCallback();
  }

  function handleConfirm() {
    confirmCallback();
  }

  return (
    <div className="w-max max-w-xs m-3 p-20 text-center rounded-12 border border-solid border-ducks-orange-ff9425 font-poppins">
      <h1 className="mb-20 font-bold text-ducks-orange-ff9425">{content.title}</h1>
      <p className="mb-20 text-ducks-gray-666 text-14">{content.text}</p>
      <div className="flex justify-center items-center">
        <div className="w-max flex justify-between">
          <OrangeBtn callback={handleCancel}>{content.left}</OrangeBtn>
          <BlueBtn callback={handleConfirm}>{content.right}</BlueBtn>
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = { content: PropTypes.object, confirmCallback: PropTypes.func, cancelCallback: PropTypes.func };