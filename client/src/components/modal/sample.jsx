import AlarmModal from "./alarm";
import ConfirmModal from "./confirm";
import EditOrDeleteModal from "./editOrDelete";

export default function Sample() {
  const content = {
    title: "Alarms",
    data: [
      { type: "start", title: "Do Aliens Exist?", author: "user1234" },
      { type: "messsage", title: "Which Universe id Better?", author: "user5678" },
    ],
  };

  const none = {
    title: "Alarms",
    data: [],
  };

  const confirmContent = {
    title: "Delete Account",
    text: "Are you sure to delete your account? Are you sure to delete your account?",
    left: "yes",
    right: "no",
  };

  function confirmCallback() {
    alert("confirm");
  }

  function cancelCallback() {
    alert("cancel");
  }

  return (
    <>
      <AlarmModal content={content} />
      <AlarmModal content={none} />
      <ConfirmModal content={confirmContent} confirmCallback={confirmCallback} cancelCallback={cancelCallback}></ConfirmModal>
      <EditOrDeleteModal />
    </>
  );
}
