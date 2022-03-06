import PropTypes from "prop-types";
DebateBoxBackground.propTypes = { category: PropTypes.string };

export default function DebateBoxBackground({ category }) {
  console.log(category);
  switch (category) {
    case "Politics":
      return <div className="w-full bg-cover bg-center bg-politics h-140 rounded-t-12"></div>;
    case "Society":
      return <div className="w-full bg-cover bg-center bg-society h-140 rounded-t-12"></div>;
    case "Economics":
      return <div className="w-full bg-cover bg-center bg-economics h-140 rounded-t-12"></div>;
    case "Science":
      return <div className="w-full bg-cover bg-center bg-science h-140 rounded-t-12"></div>;
    case "IT":
      return <div className="w-full bg-cover bg-center bg-it h-140 rounded-t-12"></div>;
    case "Environment":
      return <div className="w-full bg-cover bg-center bg-environment h-140 rounded-t-12"></div>;
    case "Education":
      return <div className="w-full bg-cover bg-center bg-education h-140 rounded-t-12"></div>;
    case "History":
      return <div className="w-full bg-cover bg-center bg-history h-140 rounded-t-12"></div>;
    case "Sports":
      return <div className="w-full bg-cover bg-center bg-sports h-140 rounded-t-12"></div>;
    case "Philosophy":
      return <div className="w-full bg-cover bg-center bg-philosophy h-140 rounded-t-12"></div>;
    case "Culture":
      return <div className="w-full bg-cover bg-center bg-culture h-140 rounded-t-12"></div>;
    case "Just For Fun":
      return <div className="w-full bg-cover bg-center bg-forfun h-140 rounded-t-12"></div>;
    default:
      return <div className="w-full bg-cover bg-center bg-ducks-blue-6667ab h-140 rounded-t-12"></div>;
  }
}
