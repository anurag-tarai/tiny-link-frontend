import { Link } from "react-router-dom";

export default function Navbar() {
  

  return (
    // Use bg-card (the darker #1f1f1f) for the header and a border that matches the subtle color
    <header className={`sticky top-0 z-50 bg-card shadow-lg border-b border-gray-700`}>
      {/*
        Updated for responsiveness:
        1. Removed fixed margins (ml-17 mr-5) for proper centering and fluid layout.
        2. Used responsive padding (px-4 on mobile, sm:px-6 on tablet/desktop) with mx-auto.
      */}
      <div className="mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* App Name on the left */}
        <div className="flex items-center gap-3">
          <div className={`font-bold text-2xl text-accent`}>TinyLink</div>
          {/* Hide the subtitle on small mobile screens to save space */}
          <div className={`text-sm text-subtle hidden sm:block`}>Shorten. Share. Track.</div>
        </div>

        {/* Dashboard title */}
        <h1 className={`font-bold text-2xl text-accent`} >
          <Link
            to="/"
          >
            Dashboard
          </Link>
        </h1>

        {/* Backend info on the right
          The original import.meta.env call was causing a compilation warning.
          It has been replaced with a static text to ensure the code compiles correctly.
          Hidden on smaller screens (mobile) to prioritize essential navigation elements.
          Visible from medium screens (md) and up.
        */}
        <div className={`text-sm text-subtle hidden md:block`}>
          Backend: {import.meta.env.VITE_API_BASE}
        </div>
      </div>
    </header>
  );
}