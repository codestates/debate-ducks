import PropTypes from "prop-types";
import { OrangeSelect } from "../input/Select";
Sort.propTypes = { sort: PropTypes.object, options: PropTypes.array };

export default function Sort({ sort, options }) {
  return (
    <div>
      <h1>-Sort-</h1>
      <OrangeSelect attributes={sort.attributes} options={options} />
    </div>
  );
}
