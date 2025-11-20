import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <header className={`sticky top-0 z-50 bg-card shadow-lg border-b border-gray-700`}>
      <div className="mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* App Name on the left */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="TinyLink Logo" className="h-8 w-auto " />
          <div className={`text-sm text-subtle hidden sm:block`}>Shorten. Share. Track.</div>
        </div>

        {/* Dashboard title */}
        <h1 className={`font-bold text-2xl text-accent`}>
          <Link to="/">Dashboard</Link>
        </h1>

        {/* Backend info on the right */}
        <div className={`text-sm text-subtle hidden md:block`}>
          Backend: <a href="https://github.com/anurag-tarai/tiny-link-backend" target="_blank" rel="noopener noreferrer">
            https://github.com/anurag-tarai/tiny-link-backend
          </a>
        </div>
      </div>
    </header>
  );
}
