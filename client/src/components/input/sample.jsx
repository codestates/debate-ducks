import { GraySelect, OrangeSelect } from "./select";

export default function Sample() {
  const status = ["voted", "liked"];
  const position = ["pros", "cons", "Neutral"];
  return (
    <>
      <div className="my-3">
        <OrangeSelect options={status}></OrangeSelect>
      </div>
      <div className="my-3">
        <GraySelect options={position}></GraySelect>
      </div>
    </>
  );
}
