const stripTrailingSlash = (url) => (String(url || "").replace(/\/+$|\s+/g, "").trim());

const envApiUrl = stripTrailingSlash(import.meta.env.VITE_API_URL || "");
const fallbackOrigin = typeof window !== "undefined" ? window.location.origin : "";

export const API_BASE = envApiUrl || fallbackOrigin;

if (!envApiUrl && typeof window !== "undefined") {
  console.warn("[api] VITE_API_URL not set. Falling back to window.location.origin; ensure VITE_API_URL points to backend service in production.");
}

export const API_URLS = {
  CONTACT: `${API_BASE}/api/contact`,
  CONNECT: `${API_BASE}/api/connect`,
  CMS_BANNER: `${API_BASE}/api/cms/banner`,
  CMS_PRODUCTS: `${API_BASE}/api/cms/products`,
  CMS_GALLERY: `${API_BASE}/api/cms/gallery`,
  ADMIN_LOGIN: `${API_BASE}/api/admin/login`,
  ADMIN_ME: `${API_BASE}/api/admin/me`,
  ADMIN_PRODUCTS: `${API_BASE}/api/admin/products`,
  ADMIN_GALLERY: `${API_BASE}/api/admin/gallery`,
  ADMIN_BANNER: `${API_BASE}/api/admin/banner`,
};

export function getAdminToken() {
  return localStorage.getItem("admin_token");
}

export async function fetchApi(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, { ...options, headers, credentials: "include" });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

export async function fetchAdmin(path, options = {}) {
  const token = getAdminToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers, credentials: "include" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}
