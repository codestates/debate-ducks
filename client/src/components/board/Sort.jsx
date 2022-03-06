import PropTypes from "prop-types";
import { OrangeSelect } from "../input/Select";
Sort.propTypes = { sort: PropTypes.object, options: PropTypes.array };

export default function Sort({ sort, options }) {
  return (
    <div>
      <OrangeSelect attribute={sort.attribute} options={options} />
    </div>
  );
}
