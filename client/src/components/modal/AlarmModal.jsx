import PropTypes from "prop-types";
import { HiBell } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function AlarmModal({ content }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/forum/debate/:debateId");
  }
  return (
    <div className="w-410 m-3 p-20 border border-solid border-ducks-orange-ff9425 rounded-12 font-poppins">
      <h1 className="font-bold mb-20 text-ducks-orange-ff9425">{content.title}</h1>
      {content.data.length > 0 ? (
        content.data.map((item, index) => {
          return (
            <div key={index} className="mb-12 pb-3 flex items-center border-b border-solid border-ducks-gray-eee text-14">
              <HiBell className="inline-block mr-3 text-ducks-orange-ff9425 w-18" />
              <div className="inline-block w-336">
                <span className="text-ducks-orange-ff9425 underline cursor-pointer" onClick={handleClick}>
                  {item.title}
                </span>
                {item.type === "start" ? (
                  <span className="text-ducks-gray-666"> Debate has begun.</span>
                ) : (
                  <>
                    <span className="font-bold text-ducks-gray-666"> {item.author} </span>
                    <span className="text-ducks-gray-666">has left a message.</span>
                  </>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <>
          <h2 className="w-336 text-ducks-orange-ff9425 text-14 mb-12">Alarms are displayed here.</h2>
          <div className="text-14 text-ducks-gray-666 mb-18">when your interested debate has begun or another user has left a message.</div>
        </>
      )}
    </div>
  );
}

AlarmModal.propTypes = { content: PropTypes.object };
