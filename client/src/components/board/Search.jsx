import PropTypes from "prop-types";
Search.propTypes = { search: PropTypes.object };

export default function Search({ search }) {
  return (
    <div>
      <h1>-Search-</h1>
      <input {...search.attribute} placeholder="Search" />
    </div>
  );
}
