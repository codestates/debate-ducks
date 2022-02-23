import PropTypes from "prop-types";

const style = "box-border h-32 pl-24 pr-48 py-0 rounded-full text-14 font-poppins capitalize appearance-none border";

function OrangeSelect({ attribute, options }) {
  return (
    <select {...attribute} className={`${style} border-ducks-orange-ff9425 text-ducks-orange-ff9425`}>
      {options.map((option, index) => {
        return <option key={index}>{option}</option>;
      })}
    </select>
  );
}

function GraySelect({ attribute, options }) {
  return (
    <select {...attribute} className={`${style} border-ducks-gray-666 text-ducks-gray-666`}>
      {options.map((option, index) => {
        return <option key={index}>{option}</option>;
      })}
    </select>
  );
}

OrangeSelect.propTypes = { attribute: PropTypes.object, options: PropTypes.array };
GraySelect.propTypes = { attribute: PropTypes.object, options: PropTypes.array };

export { OrangeSelect, GraySelect };
