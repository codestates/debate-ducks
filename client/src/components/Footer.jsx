export default function Footer() {
  if (/^\/forum\/debateroom\/\d$/i.test(window.location.pathname)) return null;

  return (
    <div className="w-full h-336 bg-ducks-blue-6667ab">
      <h1>Footer</h1>
    </div>
  );
}
