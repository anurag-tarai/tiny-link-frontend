export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-card shadow-lg border-b border-white/5">
      <div className=" ml-12 mr-5 mx-auto px-6 py-4 flex items-center justify-between">
        {/* App Name on the left */}
        <div className="flex items-center gap-3">
          <div className="font-bold text-2xl text-violet-900">TinyLink</div>
          <div className="text-sm text-subtle">Shorten. Share. Track.</div>
        </div>

        {/* Dashboard title */}
        <h1 className="font-bold">Dashboard</h1>

        {/* Backend info on the right */}
        <div className="text-sm text-subtle">
          Backend: {import.meta.env.VITE_API_BASE || "default"}
        </div>
      </div>
    </header>
  );
}
