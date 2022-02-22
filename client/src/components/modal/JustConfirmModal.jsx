import PropTypes from "prop-types";
import { OrangeBtn } from "../btn/BaseBtn";

export default function JustConfirmModal({ content, callback }) {
  function handle() {
    callback();
  }

  return (
    <div className="w-max max-w-xs m-3 p-20 text-center rounded-12 border border-solid border-ducks-orange-ff9425 font-poppins">
      <h1 className="mb-20 font-bold text-ducks-orange-ff9425">{content.title}</h1>
      <p className="mb-20 text-ducks-gray-666 text-14">{content.text}</p>
      <div className="flex justify-center items-center">
        <div className="w-max flex justify-between">
          <OrangeBtn callback={handle}>{content.btn}</OrangeBtn>
        </div>
      </div>
    </div>
  );
}

JustConfirmModal.propTypes = { content: PropTypes.object, callback: PropTypes.func };
