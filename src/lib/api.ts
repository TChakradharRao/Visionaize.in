/**
 * Tiny fetch wrapper for the Visionaize backend.
 * Set VITE_API_BASE_URL (e.g. "https://api.visionaize.com") in .env.
 * Falls back to "" so calls go to /api/... on the same origin (nginx-proxied).
 */
const BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

let accessToken: string | null = null;
export function setAccessToken(t: string | null) { accessToken = t; }
export function getAccessToken() { return accessToken; }

export interface User {
  id: string;
  email: string;
  role: "admin" | "editor";
}

export interface SectionImage { src: string; alt: string }
export interface SectionCTA { label: string; href: string }
export interface ContentSection {
  heading: string | null;
  level: number;
  paragraphs: string[];
  bullets: string[];
  images: SectionImage[];
  ctas: SectionCTA[];
}
export interface ContentJson {
  sections?: ContentSection[];
  tags?: string[];
  all_images?: string[];
}

export interface ContentItem {
  id: string;
  post_type: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string | null;
  content_json: ContentJson | null;
  cover_image: string | null;
  category: string | null;
  order_index: number;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
  published_at: string | null;
  updated_at: string;
}

export interface MenuItem {
  id: number;
  title: string;
  url: string;
  parent: number;
  order: number;
  target?: string;
  children?: MenuItem[];
}

async function refreshOnce(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { accessToken: string };
    accessToken = data.accessToken;
    return true;
  } catch {
    return false;
  }
}

export async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const { auth, headers, ...rest } = init;
  const h = new Headers(headers);
  if (!h.has("Content-Type") && rest.body) h.set("Content-Type", "application/json");
  // Bypass ngrok's browser warning interstitial so JSON comes through.
  if (!h.has("ngrok-skip-browser-warning")) h.set("ngrok-skip-browser-warning", "true");
  if (auth && accessToken) h.set("Authorization", `Bearer ${accessToken}`);

  let res = await fetch(`${BASE}${path}`, { ...rest, headers: h, credentials: "include" });
  if (res.status === 401 && auth) {
    if (await refreshOnce()) {
      h.set("Authorization", `Bearer ${accessToken}`);
      res = await fetch(`${BASE}${path}`, { ...rest, headers: h, credentials: "include" });
    }
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  login: (email: string, password: string) =>
    apiFetch<{ accessToken: string; user: User }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  logout: () => apiFetch("/api/auth/logout", { method: "POST" }),
  refresh: refreshOnce,

  listContent: (postType: string) =>
    apiFetch<{ items: ContentItem[] }>(`/api/public/content/${postType}`),
  getContent: (postType: string, slug: string) =>
    apiFetch<ContentItem>(`/api/public/content/${postType}/${slug}`),

  settings: () => apiFetch<Record<string, unknown>>("/api/public/settings"),
  menus: () => apiFetch<{ menus: Record<string, MenuItem[]> }>("/api/public/menus"),

  submitContact: (data: {
    name: string; email: string; company?: string; phone?: string;
    message: string; source_page?: string;
  }) => apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify(data) }),
};
