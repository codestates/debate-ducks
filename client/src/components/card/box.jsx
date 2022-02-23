import PropTypes from "prop-types";
import { RankItem, LikedItem, VotedItem } from "./Item.jsx";

RankBox.propTypes = { title: PropTypes.string, content: PropTypes.array, type: PropTypes.string };
LikedBox.propTypes = { title: PropTypes.string, content: PropTypes.array };
VotedBox.propTypes = { title: PropTypes.string, content: PropTypes.array };

export function RankBox({ title, content, type }) {
  return (
    <div className="w-max p-20 border border-solid border-ducks-gray-eee rounded-12">
      <h1 className="mb-12 text-center text-14 font-bold font-poppins capitalize text-ducks-orange-ff9425">{title}</h1>
      {content.map((item, index) => {
        return <RankItem key={index} number={index} item={item} type={type} />;
      })}
    </div>
  );
}

export function LikedBox({ title, content }) {
  return (
    <div className="w-max p-20 border border-solid border-ducks-gray-eee rounded-12">
      <h1 className="mb-12 text-center text-14 font-bold font-poppins capitalize text-ducks-orange-ff9425">{title}</h1>
      {content.map((item, index) => {
        return <LikedItem key={index} item={item} />;
      })}
    </div>
  );
}

export function VotedBox({ title, content }) {
  return (
    <div className="w-max p-20 border border-solid border-ducks-gray-eee rounded-12">
      <h1 className="mb-12 text-center text-14 font-bold font-poppins capitalize text-ducks-orange-ff9425">{title}</h1>
      {content.map((item, index) => {
        return <VotedItem key={index} item={item} />;
      })}
    </div>
  );
}
