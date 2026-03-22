import React, { useCallback, useEffect, useState } from "react";
import { fetchAdmin } from "../lib/api";

const emptyForm = {
  name: "",
  price: "",
  rating: "4.7",
  description: "",
  image: "",
  featuresText: "",
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setError("");
    try {
      const data = await fetchAdmin("/api/admin/products");
      setProducts(data.products || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => {
    setEditProduct(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setShowForm(true);
    setForm({
      name: p.name,
      price: String(p.price),
      rating: String(p.rating ?? 4.7),
      description: p.description || "",
      image: p.image || "",
      featuresText: Array.isArray(p.features) ? p.features.join("\n") : "",
    });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const features = form.featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const body = {
      name: form.name,
      price: form.price,
      rating: Number(form.rating),
      description: form.description,
      image: form.image,
      features,
      active: editProduct ? editProduct.active !== false : true,
    };
    try {
      if (editProduct) {
        await fetchAdmin(`/api/admin/products/${editProduct.id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        await fetchAdmin("/api/admin/products", {
          method: "POST",
          body: JSON.stringify(body),
        });
      }
      setEditProduct(null);
      setForm(emptyForm);
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const setActive = async (p, active) => {
    setError("");
    try {
      await fetchAdmin(`/api/admin/products/${p.id}/active`, {
        method: "PATCH",
        body: JSON.stringify({ active }),
      });
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-white sm:text-2xl">Premium products</h1>
          <p className="text-slate-400 text-xs sm:text-sm">View, edit, activate or deactivate items on the main site.</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="w-full shrink-0 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-amber-400 sm:w-auto"
        >
          Add product
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      {loading && <p className="text-slate-400">Loading…</p>}

      {showForm && (
        <form
          onSubmit={saveProduct}
          className="mb-8 max-w-full space-y-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:max-w-2xl sm:p-6"
        >
          <h2 className="text-lg font-semibold text-white">{editProduct ? "Update product" : "New product"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Name</label>
              <input
                className="w-full mt-1 rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-white text-sm"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Price (₹)</label>
              <input
                className="w-full mt-1 rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-white text-sm"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Rating</label>
              <input
                type="number"
                step="0.1"
                className="w-full mt-1 rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-white text-sm"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Image URL</label>
              <input
                className="w-full mt-1 rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-white text-sm"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400">Description</label>
            <textarea
              className="w-full mt-1 rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-white text-sm min-h-[80px]"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-400">Features (one per line)</label>
            <textarea
              className="w-full mt-1 rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-white text-sm min-h-[80px]"
              value={form.featuresText}
              onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditProduct(null);
                setForm(emptyForm);
                setShowForm(false);
              }}
              className="px-4 py-2 rounded-lg border border-white/20 text-slate-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:p-4 min-w-0"
          >
            <img src={p.image} alt="" className="h-16 w-16 shrink-0 self-start rounded-lg bg-black/40 object-cover sm:self-center" />
            <div className="min-w-0 flex-1">
              <div className="font-medium text-white">{p.name}</div>
              <div className="text-xs text-slate-500">
                ₹{p.price} · {p.active === false ? <span className="text-amber-400">Hidden on site</span> : <span className="text-emerald-400">Live</span>}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => setViewProduct(p)}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-sm text-white hover:bg-white/15"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => openEdit(p)}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-sm text-white hover:bg-white/15"
              >
                Update
              </button>
              {p.active === false ? (
                <button
                  type="button"
                  onClick={() => setActive(p, true)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/80 text-sm text-white"
                >
                  Activate
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActive(p, false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-600 text-sm text-white"
                >
                  Deactivate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {viewProduct && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-black/70 p-0 sm:items-center sm:p-4" onClick={() => setViewProduct(null)}>
          <div
            className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-white/20 bg-slate-900 p-4 sm:rounded-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-2">{viewProduct.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{viewProduct.description}</p>
            <img src={viewProduct.image} alt="" className="w-full rounded-lg mb-4" />
            <p className="text-amber-400 font-semibold">₹{viewProduct.price}</p>
            <p className="text-slate-500 text-sm mt-2">Rating: {viewProduct.rating}</p>
            {viewProduct.features?.length > 0 && (
              <ul className="mt-4 list-disc list-inside text-slate-300 text-sm">
                {viewProduct.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
            <button
              type="button"
              className="mt-6 w-full py-2 rounded-lg bg-white/10 text-white"
              onClick={() => setViewProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
