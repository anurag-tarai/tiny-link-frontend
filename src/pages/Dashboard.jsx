import { useEffect, useState } from "react";
import { createLink, deleteLink, getAllLinks } from "../api";
import Navbar from "../components/Navbar";
import AddLinkForm from "../components/AddLinkForm";
import LinksTable from "../components/LinkTable";
import { useToast } from "../components/ToastContext"; // Import toast hook

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { addToast } = useToast(); // Toast function

  // inside your Dashboard component
  const [health, setHealth] = useState(null);

  async function checkHealth() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/healthz`);
      const data = await res.json();
      // assuming backend sends uptime in seconds (if not, we just skip it)
      setHealth({
        ok: data.ok,
        version: data.version || "unknown",
        uptime: data.uptime || 0,
      });
    } catch (e) {
      setHealth({ ok: false, version: "unknown", uptime: 0 });
    }
  }

  useEffect(() => {
    checkHealth();
    // optional: refresh every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  // Load all links
  async function load() {
    setLoading(true);
    setErr("");
    try {
      const allLinks = await getAllLinks();
      setLinks(allLinks);
    } catch (e) {
      const errorMsg = e?.response?.data?.error || "Failed to fetch links";
      setErr(errorMsg);
      addToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Create a new link
  async function handleCreate(payload) {
    try {
      await createLink(payload);
      addToast(`Link created successfully!`, "success");
      await load();
    } catch (e) {
      const errorMsg = e?.response?.data?.error || "Failed to create link";
      addToast(errorMsg, "error");
    }
  }

  // Delete a link
  async function handleDelete(code) {
    try {
      await deleteLink(code);
      addToast(`Link ${code} deleted successfully`, "success");
      await load();
    } catch (e) {
      const errorMsg = e?.response?.data?.error || "Delete failed";
      addToast(errorMsg, "error");
    }
  }

  console.log(health);
  

  return (
    <div className="min-h-screen bg-bg text-text">
      <main className="1 max-w-6xl mx-auto px-6 bg-bg">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold tracking-tight mb-8 text-accent">
          Your Links
        </h1>

        {/* 2 Column Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Link Form */}
          <div className="bg-card p-6 rounded-2xl shadow-lg border-2 border-l-violet-700">
            <AddLinkForm onCreate={handleCreate} />
          </div>

          {/* System Card */}
          <div className="bg-card p-6 rounded-2xl shadow-lg border-2 border-r-violet-700">
            <h3 className="text-lg font-medium mb-3 text-accent">
              Healthcheck
            </h3>

            {!health ? (
              <p className="text-subtle text-sm">Health: <span className="font-semibold">Checking...</span></p>
            ) : (
              <>
                <p className="text-subtle text-sm">
                  Health:{" "}
                  <span
                    className={
                      health.ok
                        ? "text-green-500 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {health.ok ? "OK" : "DOWN"}
                  </span>
                </p>

                <p className="text-subtle text-sm mt-1">
                  Version: <span className="font-semibold">{health.version}</span>
                </p>

                {health.uptime > 0 && (
                  <p className="text-subtle text-sm mt-1">
                    Uptime: <span className="font-semibold">{Math.floor(health.uptime / 60)} min</span>
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Links Table */}
        <div className="mt-10">
          {loading ? (
            <div className="bg-card p-4 rounded-xl shadow text-center text-subtle">
              Loading links...
            </div>
          ) : err ? (
            <div className="bg-red-900/40 p-4 rounded-xl shadow text-red-300">
              {err}
            </div>
          ) : (
            <LinksTable links={links} onDelete={handleDelete} />
          )}
        </div>
      </main>
    </div>
  );
}
