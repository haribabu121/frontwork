import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { clearToken, getToken } from "./adminAuth";
import { API_URLS } from "../lib/api";

const linkClass = ({ isActive }) =>
  `block rounded-lg px-4 py-3 text-sm font-medium transition-colors md:py-2.5 ${
    isActive ? "bg-amber-500/20 text-amber-200" : "text-slate-300 hover:bg-white/5 hover:text-white"
  }`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    clearToken();
    navigate("/admin/login", { replace: true });
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = getToken();
      if (!token) return;
      try {
        const res = await fetch(API_URLS.ADMIN_ME, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok && !cancelled) {
          clearToken();
          navigate("/admin/login", { replace: true });
        }
      } catch {
        if (!cancelled) {
          clearToken();
          navigate("/admin/login", { replace: true });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-slate-950 text-slate-100">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          aria-label="Close menu"
          onClick={closeSidebar}
        />
      )}

      <div className="flex min-h-screen min-h-[100dvh] flex-col md:flex-row">
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[min(100%,17.5rem)] flex-col border-r border-white/10 bg-slate-900/95 shadow-xl backdrop-blur-md transition-transform duration-200 ease-out md:static md:z-auto md:w-56 md:shrink-0 md:translate-x-0 md:bg-slate-900/80 md:shadow-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 p-4 md:block">
            <div>
              <div className="font-bold text-amber-400">AK Events</div>
              <div className="text-xs text-slate-500">Admin</div>
            </div>
            <button
              type="button"
              className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Close sidebar"
              onClick={closeSidebar}
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
            <NavLink to="/admin/dashboard" className={linkClass} end onClick={closeSidebar}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/products" className={linkClass} onClick={closeSidebar}>
              Premium products
            </NavLink>
            <NavLink to="/admin/gallery" className={linkClass} onClick={closeSidebar}>
              Event gallery
            </NavLink>
            <NavLink to="/admin/banner" className={linkClass} onClick={closeSidebar}>
              Banner scroll
            </NavLink>
          </nav>
          <div className="border-t border-white/10 p-3">
            <button
              type="button"
              onClick={logout}
              className="w-full rounded-lg px-4 py-3 text-left text-sm text-slate-400 hover:bg-white/5 hover:text-white md:py-2"
            >
              Log out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur-md md:hidden">
            <span className="truncate text-sm font-semibold text-amber-400">Admin panel</span>
            <button
              type="button"
              className="shrink-0 rounded-lg border border-white/15 p-2 text-white hover:bg-white/10"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars className="text-lg" />
            </button>
          </header>

          <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
