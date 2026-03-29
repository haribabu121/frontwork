import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URLS } from "../lib/api";
import { setToken, getToken } from "./adminAuth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    if (getToken()) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(API_URLS.ADMIN_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Login failed");
      }
      setToken(data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl sm:p-8">
        <h1 className="text-2xl font-bold text-white mb-1">Admin</h1>
        <p className="text-slate-300 text-sm mb-6">AK Events & Fireworks — sign in</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-300 text-sm bg-red-500/20 border border-red-500/40 rounded-lg px-3 py-2">{error}</div>
          )}
          <div>
            <label className="block text-slate-300 text-sm mb-1">Email</label>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-black/30 border border-white/20 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400/60"
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-black/30 border border-white/20 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400/60"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold disabled:opacity-50 transition-colors"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
