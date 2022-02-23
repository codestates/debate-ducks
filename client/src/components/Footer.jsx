import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return /^\/forum\/debateroom\/\d$/i.test(location.pathname) ? null : (
    <div className="w-full h-336 bg-ducks-blue-6667ab">
      <h1>Footer</h1>
    </div>
  );
}
