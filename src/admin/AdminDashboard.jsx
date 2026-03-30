import React, { useEffect, useState } from "react";
import { fetchAdmin } from "../lib/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    const reload = async () => {
      try {
        const [p, g] = await Promise.all([
          fetchAdmin("/api/admin/products"),
          fetchAdmin("/api/admin/gallery"),
        ]);
        if (!alive) return;
        const products = p.products || [];
        const active = products.filter((x) => x.active !== false).length;
        setStats({
          total: products.length,
          active,
          inactive: products.length - active,
          gallery: (g.gallery || []).length,
        });
      } catch (e) {
        if (alive) setErr(e.message);
      }
    };

    reload();

    const onStorage = (event) => {
      if (event.key === "cmsUpdated") reload();
    };
    const onCmsDataUpdated = () => reload();

    window.addEventListener("storage", onStorage);
    window.addEventListener("cmsDataUpdated", onCmsDataUpdated);

    return () => {
      alive = false;
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cmsDataUpdated", onCmsDataUpdated);
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-slate-400 text-sm mb-8">Overview of catalog and media managed from this panel.</p>
      {err && <p className="text-red-400 text-sm mb-4">{err}</p>}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Premium products", value: stats.total },
            { label: "Visible on site", value: stats.active },
            { label: "Hidden", value: stats.inactive },
            { label: "Gallery slides", value: stats.gallery },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-3xl font-bold text-amber-400">{c.value}</div>
              <div className="text-slate-400 text-sm mt-1">{c.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
