import React, { useCallback, useEffect, useState } from "react";
import { fetchAdmin } from "../lib/api";

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setError("");
    try {
      const data = await fetchAdmin("/api/admin/gallery");
      setItems(data.gallery || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateRow = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addRow = () => {
    const nid = items.length ? Math.max(...items.map((x) => Number(x.id) || 0)) + 1 : 1;
    setItems((prev) => [...prev, { id: nid, image: "", title: "", description: "", event: "Event" }]);
  };

  const removeRow = (index) => {
    const next = items.filter((_, i) => i !== index);
    setItems(next);
    saveAll(next);
  };

  const saveAll = async (nextItems = items) => {
    setSaving(true);
    setError("");
    try {
      await fetchAdmin("/api/admin/gallery", {
        method: "PUT",
        body: JSON.stringify({ gallery: nextItems }),
      });
      setItems(nextItems);
      await load();
      window.dispatchEvent(new Event("cmsDataUpdated"));
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Event gallery</h1>
      <p className="text-slate-400 text-sm mb-6">
        Photo URLs appear in the home page gallery carousel. Save to publish.
      </p>
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      {loading && <p className="text-slate-400">Loading…</p>}

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={addRow}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold"
        >
          Add photo
        </button>
        <button
          type="button"
          onClick={saveAll}
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save gallery"}
        </button>
      </div>

      <div className="space-y-4">
        {items.map((row, index) => (
          <div key={`${row.id}-${index}`} className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 min-w-0">
            <div className="space-y-2">
              <label className="text-xs text-slate-500">Image URL</label>
              <input
                className="w-full rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-white text-sm"
                value={row.image}
                onChange={(e) => updateRow(index, "image", e.target.value)}
                placeholder="https://..."
              />
              {row.image && (
                <img src={row.image} alt="" className="w-full h-40 object-cover rounded-lg bg-black/40 mt-2" />
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-500">Title</label>
              <input
                className="w-full rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-white text-sm"
                value={row.title}
                onChange={(e) => updateRow(index, "title", e.target.value)}
              />
              <label className="text-xs text-slate-500">Description</label>
              <input
                className="w-full rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-white text-sm"
                value={row.description}
                onChange={(e) => updateRow(index, "description", e.target.value)}
              />
              <label className="text-xs text-slate-500">Event label</label>
              <input
                className="w-full rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-white text-sm"
                value={row.event}
                onChange={(e) => updateRow(index, "event", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="text-red-400 text-sm hover:text-red-300 mt-2"
              >
                Remove slide
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
