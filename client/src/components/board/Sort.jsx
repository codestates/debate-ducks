import PropTypes from "prop-types";
Sort.propTypes = { sort: PropTypes.object, options: PropTypes.array };

export default function Sort({ sort, options }) {
  return (
    <div>
      <h1>-Sort-</h1>
      <select {...sort.attribute}>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
