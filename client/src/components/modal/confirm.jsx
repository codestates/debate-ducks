import PropsTypes from "prop-types";
import { OrangeBtn } from "../btn/base";

export default function ConfirmModal({ content }) {
  return (
    <div className="w-max m-3 p-18 text-center rounded-12 border border-solid border-ducks-orange-ff9425">
      <h1 className="mb-3">{content.title}</h1>
      <p className="mb-3">{content.text}</p>
      <div className="w-max flex justify-between m-auto">
        <OrangeBtn className="mr-3">{content.left}</OrangeBtn>
        <OrangeBtn>{content.right}</OrangeBtn>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = { content: PropsTypes.object };
