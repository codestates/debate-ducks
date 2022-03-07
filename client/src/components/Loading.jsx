export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <img src="/images/debate-ducks-symbol.png" className="animate-bounce w-130" />
        <div className="text-24 text-center font-poppins mt-24 font-medium animate-colorBounce">Loading...</div>
      </div>
    </div>
  );
}
