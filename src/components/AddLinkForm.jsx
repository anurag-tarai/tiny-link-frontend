import { useState } from "react";

export default function AddLinkForm({ onCreate }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function validateUrl(u) {
    try {
      new URL(u);
      return true;
    } catch {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!url.trim()) return setErr("URL is required");
    if (!validateUrl(url.trim())) return setErr("Please enter a valid URL (include https://)");

    setLoading(true);
    try {
      await onCreate({ url: url.trim(), code: code.trim() || undefined });
      setUrl("");
      setCode("");
    } catch (error) {
      // assume error.response.data.error format
      const message = error?.response?.data?.error || error?.message || "Failed";
      setErr(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-2 text-accent">Create Short Link</h3>

      <label className="block mb-2 text-sm text-slate-600">Long URL</label>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/long/path"
        className="w-full p-2 border rounded mb-3"
        disabled={loading}
      />

      <label className="block mb-2 text-sm text-slate-600">Custom code (optional, 6-8 alphanumeric)</label>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="customCode"
        className="w-full p-2 border rounded mb-3"
        disabled={loading}
      />

      {err && <div className="text-sm text-red-600 mb-2">{err}</div>}

      <button
        type="submit"
        disabled={loading}
        className="bg-violet-900 text-white px-4 py-2 rounded disabled:opacity-60 hover:bg-violet-900 cursor-pointer"
      >
        {loading ? "Creating..." : "Create Short Link"}
      </button>
    </form>
  );
}
