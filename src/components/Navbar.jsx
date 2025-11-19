export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-bold text-2xl text-slate-800">TinyLink</div>
          <div className="text-sm text-slate-500">Shorten. Share. Track.</div>
        </div>
        <div className="text-sm text-slate-500">Backend: {import.meta.env.VITE_API_BASE || "default"}</div>
      </div>
    </header>
  );
}
