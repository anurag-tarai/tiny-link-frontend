import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getLinkStats } from "../api";

export default function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setErr("");
    getLinkStats(code)
      .then(setLink)
      .catch((e) => setErr(e?.response?.data?.error || "Not found"))
      .finally(() => setLoading(false));
  }, [code]);

  return (
    <div className="min-h-screen bg-bg text-text ">


      <main className="max-w-3xl mx-auto px-6 py-10 ">
        <div className="bg-card border-2 border-violet-950  p-6 rounded-2xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-violet-900">
  Stats for:{" "}
  <span className="font-mono bg-violet-900/45 border-2 border-violet-950 text-violet-100 px-2 py-1 rounded">
    {code}
  </span>
</h2>

            <RouterLink
              to="/"
              className="text-violet-500 hover:text-violet-400 text-sm font-medium"
            >
              Back
            </RouterLink>
          </div>

          {/* Loading / Error */}
          {loading ? (
            <div className="text-center text-subtle">Loading…</div>
          ) : err ? (
            <div className="bg-red-900/40 p-3 rounded text-red-300">{err}</div>
          ) : link ? (
            <div className="space-y-4">
              <div>
                <strong className="text-violet-500">Target URL:</strong>{" "}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-400 hover:underline"
                >
                  {link.url}
                </a>
              </div>
              <div>
                <strong className="text-violet-500">Short URL:</strong>{" "}
                <a
                  href={link.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-400 hover:underline"
                >
                  {link.shortUrl}
                </a>
              </div>
              <div>
                <strong className="text-violet-500">Total Clicks:</strong>{" "}
                <span className="text-text">{link.clicks ?? 0}</span>
              </div>
              <div>
                <strong className="text-violet-500">Last Clicked:</strong>{" "}
                <span className="text-text">{link.last_clicked || '-'}</span>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
