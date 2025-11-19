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

  return (
    <div className="min-h-screen bg-bg text-text">
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold tracking-tight mb-8 text-violet-900">
          Your Links
        </h1>

        {/* 2 Column Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Link Form */}
          <div className="bg-card p-6 rounded-2xl shadow-lg border-2 border-l-violet-950">
            <AddLinkForm onCreate={handleCreate} />
          </div>

          {/* System Card */}
          <div className="bg-card p-6 rounded-2xl shadow-lg border-2 border-r-violet-950">
            <h3 className="text-lg font-medium mb-3 text-accent">System Status</h3>

            <p className="text-subtle text-sm">
              Health: <span className="text-text font-semibold">OK</span>
            </p>

            <p className="text-subtle text-sm mt-1">
              Backend: {import.meta.env.VITE_API_BASE || "default"}
            </p>

            <p className="text-subtle text-sm mt-6 leading-relaxed">
              Codes must be <strong>6–8 alphanumeric</strong>.  
              Duplicate custom codes return <strong>409</strong>.
            </p>
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
