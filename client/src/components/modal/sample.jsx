import AlarmModal from "./alarm";
import ConfirmModal from "./confirm";

export default function Sample() {
  const alarms = {
    title: "Alarms",
    alarms: [
      { type: "start", title: "Do Aliens Exist?", author: "user1234" },
      { type: "debate", title: "Which Universe id Better?", author: "user5678" },
    ],
  };

  const noalarms = {
    title: "Alarms",
    alarms: [],
  };

  const content = { title: "Delete Account", text: "Are you sure to delete your account?", left: "yes", right: "no" };

  return (
    <>
      <AlarmModal alarms={alarms} />
      <AlarmModal alarms={noalarms} />
      <ConfirmModal content={content}></ConfirmModal>
    </>
  );
}
