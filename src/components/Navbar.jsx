import { Link } from "react-router-dom";

export default function Navbar() {
  

  return (
    // Use bg-card (the darker #1f1f1f) for the header and a border that matches the subtle color
    <header className={`sticky top-0 z-50 bg-card shadow-lg border-b border-gray-700`}>
      <div className=" ml-14 mr-5 mx-auto px-6 py-4 flex items-center justify-between">
        {/* App Name on the left */}
        <div className="flex items-center gap-3">
          <div className={`font-bold text-2xl text-accent`}>TinyLink</div>
          <div className={`text-sm text-subtle`}>Shorten. Share. Track.</div>
        </div>

        {/* Dashboard title */}
        <h1 className={`font-bold text-2xl text-accent`} >
          <Link
            to="/"
          >
            Dashboard
          </Link>
        </h1>

        {/* Backend info on the right */}
        <div className={`text-sm text-subtle`}>
          Backend: {import.meta.env.VITE_API_BASE || "default"}
        </div>
      </div>
    </header>
  );
}