import PropTypes from "prop-types";

const style = "w-370 h-40 rounded-20 capitalize text-14 font-poppins font-black duration-200 ease-linear";

function BlueBtn({ text }) {
  return <button className={`${style} border border-ducks-blue-6667ab text-ducks-blue-6667ab hover:bg-ducks-blue-6667ab hover:text-white`}>{text}</button>;
}

function GreenBtn({ text }) {
  return <button className={`${style} bg-ducks-green-cce8cc text-ducks-blue-6667ab hover:bg-ducks-blue-6667ab hover:text-white`}>{text}</button>;
}

function StrawBtn({ text }) {
  return <button className={`${style} bg-ducks-straw-e5e366 text-ducks-blue-6667ab hover:bg-ducks-blue-6667ab hover:text-white`}>{text}</button>;
}

function YellowBtn({ text }) {
  return <button className={`${style} bg-ducks-yellow-fedd00 text-ducks-blue-6667ab hover:bg-ducks-blue-6667ab hover:text-white`}>{text}</button>;
}

function OrangeBtn({ text }) {
  return <button className={`${style} border border-ducks-orange-ff9425 text-ducks-orange-ff9425 hover:bg-ducks-orange-ff9425 hover:text-white`}>{text}</button>;
}

BlueBtn.propTypes = { text: PropTypes.string };
GreenBtn.propTypes = { text: PropTypes.string };
StrawBtn.propTypes = { text: PropTypes.string };
YellowBtn.propTypes = { text: PropTypes.string };
OrangeBtn.propTypes = { text: PropTypes.string };

export { BlueBtn, GreenBtn, StrawBtn, YellowBtn, OrangeBtn };
