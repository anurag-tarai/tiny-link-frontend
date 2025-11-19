import { useState } from "react";
import { useToast } from "../components/ToastContext";
import ConfirmationModal from "./ConfirmationModal";
import { Link } from "react-router-dom";

function formatDate(ts) {
  if (!ts) return "-";
  const d = new Date(ts);
  return d.toLocaleString();
}

export default function LinksTable({ links, onDelete }) {
  const [filter, setFilter] = useState("");
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);

  const filtered = links.filter(
    (l) =>
      l.code.toLowerCase().includes(filter.toLowerCase()) ||
      (l.url || "").toLowerCase().includes(filter.toLowerCase())
  );

  async function handleCopy(text) {
    try {
      await navigator.clipboard.writeText(text);
      addToast("Copied to clipboard!", "success");
    } catch {
      addToast("Copy failed!", "error");
    }
  }

  const handleDeleteRequest = (link) => {
    setLinkToDelete(link);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!linkToDelete) return;

    setIsModalOpen(false);
    // Call Dashboard's handleDelete via onDelete
    // The Dashboard component will show a toast and reload the links.
    await onDelete(linkToDelete.code); 
    setLinkToDelete(null);
  };

  return (
    <div className="mt-10">
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setLinkToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the link for "${linkToDelete?.code}"? This action cannot be undone.`}
      />

      {/* Search & Count */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
        <input
          placeholder="Search by code or URL..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 border border-gray-700 rounded-lg w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        <div className="text-sm text-gray-300">{filtered.length} result(s)</div>
      </div>

      {/* Table Card */}
      <div className="overflow-x-auto bg-card p-6 rounded-2xl shadow-lg border border-white/10">
        <table className="w-full text-sm table-auto border-collapse">
          <thead className="text-gray-300 uppercase text-left">
            <tr>
              <th className="py-3 px-2">Code</th>
              <th className="py-3 px-2">Target URL</th>
              <th className="py-3 px-2">Clicks</th>
              <th className="py-3 px-2">Last Clicked</th>
              <th className="py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((link) => (
              <tr key={link.code}>
                <td className="py-3 px-2 font-medium text-violet-700">{link.code}</td>
                <td className="py-3 px-2 max-w-[50ch] wrap-break-word text-gray-300">{link.url}</td>
                <td className="py-3 px-2 text-gray-300">{link.clicks ?? 0}</td>
                <td className="py-3 px-2 text-gray-300">{formatDate(link.last_clicked)}</td>
                <td className="py-3 px-2 flex flex-wrap gap-2">
                  <Link
                    to={`/code/${link.code}`}
                    className="px-3 py-1 rounded-xl bg-violet-900 hover:bg-violet-700 text-white text-xs transition"
                  >
                    Stats
                  </Link>
                  <a
                    href={link.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-xl  bg-violet-900 hover:bg-violet-700  text-white text-xs transition"
                  >
                    Open 🔗
                  </a>
                  <button
                    onClick={() => handleCopy(link.shortUrl)}
                    className="px-3 py-1 rounded-xl bg-gray-600 text-white hover:bg-gray-500 text-gray-800 text-xs transition cursor-pointer"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(link)}
                    className="px-3 py-1 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs transition cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-300 italic">
                  No links found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
