import React, { useEffect, useState } from "react";
import { fetchAdmin } from "../lib/api";

const AdminBanner = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchAdmin("/api/admin/banner");
        if (alive) setText(data.banner?.text || "");
      } catch (e) {
        if (alive) setError(e.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setOk("");
    try {
      await fetchAdmin("/api/admin/banner", {
        method: "PUT",
        body: JSON.stringify({ text }),
      });
      setOk("Banner updated. Refresh the main site to see changes.");
      window.dispatchEvent(new Event("cmsDataUpdated"));
      localStorage.setItem("cmsUpdated", Date.now());
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Banner scroll</h1>
      <p className="text-slate-400 text-sm mb-6">
        This text scrolls in the yellow bar below the top of the public website.
      </p>
      {loading && <p className="text-slate-400">Loading…</p>}
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      {ok && <p className="text-emerald-400 text-sm mb-4">{ok}</p>}
      <form onSubmit={save} className="max-w-2xl space-y-4">
        <textarea
          className="w-full min-h-[120px] rounded-xl bg-black/30 border border-white/20 px-4 py-3 text-white text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your announcement text…"
        />
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save banner"}
        </button>
      </form>
    </div>
  );
};

export default AdminBanner;
