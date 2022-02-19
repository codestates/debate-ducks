import PropTypes from "prop-types";
Category.propTypes = { categories: PropTypes.array, setCategories: PropTypes.func, list: PropTypes.array };

export default function Category({ categories, setCategories, list }) {
  const clickCategory = (e) => {
    if (categories.includes(e.target.innerText)) {
      setCategories(categories.filter((category) => category !== e.target.innerText));
    } else {
      setCategories([...categories, e.target.innerText]);
    }
  };

  return (
    <div>
      {list.map((category, idx) => (
        <button key={idx} onClick={clickCategory}>
          {category}
        </button>
      ))}
    </div>
  );
}
