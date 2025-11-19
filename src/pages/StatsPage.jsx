import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLinkStats } from "../api";
import { useToast } from "../components/ToastContext"; // import the toast hook

export default function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast(); // get the addToast function

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    setLoading(true);
    setErr("");
    getLinkStats(code)
      .then(setLink)
      .catch((e) => setErr(e?.response?.data?.error || "Not found"))
      .finally(() => setLoading(false));
  }, [code]);

  // Copy text to clipboard and show toast
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast("Copied to clipboard!", "success"); // show success toast
    } catch {
      addToast("Failed to copy!", "error"); // show error toast
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-card border-2 border-violet-950 p-4 sm:p-6 rounded-2xl shadow-lg">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-violet-800">
              Stats for: {"  "}
              <span className="font-mono bg-violet-500/20 text-violet-100 px-2 py-1 rounded">
                {code}
              </span>
            </h2>

            <Link
              to="/"
              className="text-violet-500 hover:text-violet-400 text-sm font-medium"
            >
              Back
            </Link>
          </div>

          {/* Loading / Error */}
          {loading ? (
            <div className="text-center text-subtle">Loading…</div>
          ) : err ? (
            <div className="bg-red-900/40 p-3 rounded text-red-300">{err}</div>
          ) : link ? (
            <div className="space-y-4">
              {/* Target URL with copy */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <strong className="text-violet-500">Target URL:</strong>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-400 hover:underline break-words"
                >
                  {link.url}
                </a>
                <button
                  onClick={() => handleCopy(link.url)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-xs rounded cursor-pointer"
                >
                  Copy
                </button>
              </div>

              {/* Short URL with copy */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <strong className="text-violet-500">Short URL:</strong>
                <a
                  href={link.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-400 hover:underline break-words"
                >
                  {link.shortUrl}
                </a>
                <button
                  onClick={() => handleCopy(link.shortUrl)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-xs rounded cursor-pointer"
                >
                  Copy
                </button>
              </div>

              <div>
                <strong className="text-violet-500">Total Clicks:</strong>{" "}
                <span className="text-text">{link.clicks ?? 0}</span>
              </div>
              <div>
                <strong className="text-violet-500">Last Clicked:</strong>{" "}
                <span className="text-text">{link.last_clicked || "-"}</span>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
