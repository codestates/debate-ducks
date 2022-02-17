import PropTypes from "prop-types";

export default function AlarmModal({ alarms }) {
  return (
    <div className="m-3">
      <div className="w-max p-20 border border-solid border-ducks-orange-ff9425 rounded-12 font-poppins">
        <h1 className="text-ducks-orange-ff9425 mb-20">{alarms.title}</h1>
        {alarms.alarms.map((alarm, index) => {
          return (
            <div className="w-370 mb-20 text-12" key={index}>
              <span className="text-ducks-orange-ff9425 underline">{alarm.title}</span>
              {alarm.type === "start" ? (
                <span className="text-ducks-gray-666"> Debate has begun.</span>
              ) : (
                <>
                  <span className="text-ducks-blue-6667ab"> {alarm.author} </span>
                  <span className="text-ducks-gray-666">has left a message.</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

AlarmModal.propTypes = { alarms: PropTypes.object };
