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
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Stats for <span className="font-mono">{code}</span></h2>
            <RouterLink to="/" className="text-sm text-sky-600">Back</RouterLink>
          </div>

          {loading ? (
            <div>Loading…</div>
          ) : err ? (
            <div className="text-red-600">{err}</div>
          ) : link ? (
            <>
              <div className="mb-2"><strong>Target URL:</strong> <a href={link.url} target="_blank" rel="noreferrer" className="text-sky-600">{link.url}</a></div>
              <div className="mb-2"><strong>Short URL:</strong> <a href={link.shortUrl} target="_blank" rel="noreferrer" className="text-sky-600">{link.shortUrl}</a></div>
              <div className="mb-2"><strong>Total Clicks:</strong> {link.clicks ?? 0}</div>
              <div className="mb-2"><strong>Last Clicked:</strong> {link.last_clicked || '-'}</div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}
