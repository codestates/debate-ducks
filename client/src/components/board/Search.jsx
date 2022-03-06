import PropTypes from "prop-types";
Search.propTypes = { search: PropTypes.object };

export default function Search({ search }) {
  return (
    <div>
      <input {...search.attribute} placeholder="Search" className="px-24 w-274 h-32 rounded-full border border-solid border-ducks-orange-ff9425" />
    </div>
  );
}
