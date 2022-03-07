//import { BlueBtn } from "../btn/BaseBtn";
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
    <div className="w-960 mx-auto mb-60 flex flex-wrap justify-center">
      {list.map((category, idx) => {
        //const selected = categories.find((item) => item === category);
        const selected = categories.includes(category);
        return (
          <button
            key={idx}
            onClick={clickCategory}
            className={
              selected
                ? "bg-ducks-blue-6667ab m-1 box-border rounded-16 h-32 px-24 capitalize text-14 font-poppins font-medium duration-200 ease-linear border border-ducks-blue-6667ab text-white hover:bg-ducks-blue-6667ab hover:text-white"
                : "m-1 box-border rounded-16 h-32 px-24 capitalize text-14 font-poppins font-medium duration-200 ease-linear border border-ducks-blue-6667ab text-ducks-blue-6667ab hover:bg-ducks-blue-6667ab hover:text-white"
            }
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
