import PropTypes from "prop-types";

const style = "m-1 box-border rounded-16 h-32 px-24 capitalize text-14 font-poppins font-medium duration-200 ease-linear";

function BlueBtn({ children, callback }) {
  function handleCallback() {
    callback();
  }
  return (
    <button onClick={handleCallback} className={`${style} border border-ducks-blue-6667ab text-ducks-blue-6667ab hover:bg-ducks-blue-6667ab hover:text-white`}>
      {children}
    </button>
  );
}
function GreenBtn({ children, callback }) {
  function handleCallback() {
    callback();
  }
  return (
    <button onClick={handleCallback} className={`${style} bg-ducks-green-cce8cc text-ducks-blue-6667ab hover:bg-ducks-blue-6667ab hover:text-white`}>
      {children}
    </button>
  );
}
function StrawBtn({ children, callback }) {
  function handleCallback() {
    callback();
  }
  return (
    <button onClick={handleCallback} className={`${style} bg-ducks-straw-e5e366 text-ducks-blue-6667ab hover:bg-ducks-blue-6667ab hover:text-white`}>
      {children}
    </button>
  );
}
function YellowBtn({ children, callback }) {
  function handleCallback() {
    callback();
  }
  return (
    <button onClick={handleCallback} className={`${style} bg-ducks-yellow-fedd00 text-ducks-blue-6667ab hover:bg-ducks-blue-6667ab hover:text-white`}>
      {children}
    </button>
  );
}
function OrangeBtn({ children, callback }) {
  function handleCallback() {
    callback();
  }
  return (
    <button onClick={handleCallback} className={`${style} border border-ducks-orange-ff9425 text-ducks-orange-ff9425 hover:bg-ducks-orange-ff9425 hover:text-white`}>
      {children}
    </button>
  );
}

BlueBtn.propTypes = { children: PropTypes.string, callback: PropTypes.func };
GreenBtn.propTypes = { children: PropTypes.string, callback: PropTypes.func };
StrawBtn.propTypes = { children: PropTypes.string, callback: PropTypes.func };
YellowBtn.propTypes = { children: PropTypes.string, callback: PropTypes.func };
OrangeBtn.propTypes = { children: PropTypes.string, callback: PropTypes.func };

export { BlueBtn, GreenBtn, StrawBtn, YellowBtn, OrangeBtn };
