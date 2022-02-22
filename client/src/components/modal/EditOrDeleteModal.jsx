import PropTypes from "prop-types";

export default function EditOrDeleteModal({ editCallback, deleteCallback }) {
  function handleEdit() {
    editCallback();
  }
  function handleDelete() {
    deleteCallback();
  }
  const style = "text-ducks-gray-ccc hover:text-ducks-gray-666 py-1 px-3 duration-200 ease-linear hover:cursor-pointer text-14";
  return (
    <div className="w-max border border-solid border-ducks-gray-ccc text-center m-3 font-poppins rounded-12">
      <div className={`${style} border-b border-solid border-ducks-gray-ccc`} onClick={handleEdit}>
        Edit
      </div>
      <div className={`${style}`} onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
}

EditOrDeleteModal.propTypes = { editCallback: PropTypes.func, deleteCallback: PropTypes.func };
