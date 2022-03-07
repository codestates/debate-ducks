import PropTypes from "prop-types";

Voting.propTypes = { videoUrl: PropTypes.string };

export default function Voting({ videoUrl }) {
  return (
    <>
      <div>
        <div className="w-960 h-0 border-solid border-b border-ducks-gray-eee"></div>
        <div className="my-60 text-center">
          <h1 className="font-bold text-24 mb-40">Video</h1>
        </div>
      </div>
      <video id="example_video_1" controls preload="auto" width="1600" height="900">
        <source src={`${videoUrl}`} type="video/webm" />
      </video>
    </>
  );
}
