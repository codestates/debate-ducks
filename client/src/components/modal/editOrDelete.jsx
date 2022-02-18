export default function EditOrDeleteModal() {
  const style = "text-ducks-gray-ccc hover:text-ducks-gray-666 py-1 px-3 duration-200 ease-linear hover:cursor-pointer text-14";
  return (
    <div className="w-max border border-solid border-ducks-gray-ccc text-center m-3 font-poppins rounded-12">
      <div className={`${style} border-b border-solid border-ducks-gray-ccc`}>Edit</div>
      <div className={`${style}`}>Delete</div>
    </div>
  );
}
