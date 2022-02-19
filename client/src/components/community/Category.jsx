import PropTypes from "prop-types";
Category.propTypes = { categories: PropTypes.array, setCategories: PropTypes.func };

export default function Category({ categories, setCategories }) {
  const listOfCategory = ["General", "Notice", "Discussion", "Essay"];
  const clickCategory = (e) => {
    if (categories.includes(e.target.innerText)) {
      setCategories(categories.filter((category) => category !== e.target.innerText));
    } else {
      setCategories([...categories, e.target.innerText]);
    }
  };

  return (
    <div>
      <h1>-Category-</h1>
      {listOfCategory.map((category, idx) => (
        <button key={idx} onClick={clickCategory}>
          {category}
        </button>
      ))}
    </div>
  );
}
