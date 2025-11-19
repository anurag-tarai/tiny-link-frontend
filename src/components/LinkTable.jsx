import { useState } from "react";

function formatDate(ts) {
  if (!ts) return "-";
  const d = new Date(ts);
  return d.toLocaleString();
}

export default function LinksTable({ links, onDelete }) {
  const [filter, setFilter] = useState("");

  const filtered = links.filter(l =>
    l.code.toLowerCase().includes(filter.toLowerCase()) ||
    (l.url || "").toLowerCase().includes(filter.toLowerCase())
  );

  async function handleCopy(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  }

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-3">
        <input
          placeholder="Search by code or URL..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="p-2 border rounded w-72"
        />
        <div className="text-sm text-slate-600">{filtered.length} result(s)</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-600">
            <tr>
              <th className="text-left py-2">Code</th>
              <th className="text-left py-2">Target URL</th>
              <th className="text-left py-2">Clicks</th>
              <th className="text-left py-2">Last Clicked</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(link => (
              <tr key={link.code} className="border-t">
                <td className="py-3 font-medium">{link.code}</td>
                <td className="py-3 max-w-[40ch] truncate">{link.url}</td>
                <td className="py-3">{link.clicks ?? 0}</td>
                <td className="py-3">{formatDate(link.last_clicked)}</td>
                <td className="py-3 flex gap-2">
                  <a
                    href={`/code/${link.code}`}
                    className="px-3 py-1 rounded bg-slate-700 text-white text-xs"
                  >
                    Stats
                  </a>
                  <a
                    href={link.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded bg-sky-600 text-white text-xs"
                  >
                    Open
                  </a>
                  <button
                    onClick={() => handleCopy(link.shortUrl)}
                    className="px-3 py-1 rounded bg-slate-200 text-slate-800 text-xs"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete ${link.code}? This cannot be undone.`)) {
                        onDelete(link.code);
                      }
                    }}
                    className="px-3 py-1 rounded bg-red-600 text-white text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="5" className="py-6 text-center text-slate-500">No links found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
