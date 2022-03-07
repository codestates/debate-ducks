export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <div className="bg-biglogo bg-cover bg-center w-112 h-98 animate-bounce -m-24"></div>
        <div className="text-24 text-center font-poppins mt-36 font-medium animate-colorBounce">Loading...</div>
      </div>
    </div>
  );
}
