const BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

const TOKEN_STORAGE_KEY = "visionaize_access_token";
const ROLE_STORAGE_KEY = "visionaize_user_role";

let accessToken: string | null =
  typeof window !== "undefined" ? window.localStorage.getItem(TOKEN_STORAGE_KEY) : null;

let currentUserRole: User["role"] | null =
  typeof window !== "undefined"
    ? (window.localStorage.getItem(ROLE_STORAGE_KEY) as User["role"] | null)
    : null;

export function setAccessToken(t: string | null) {
  accessToken = t;
  if (typeof window === "undefined") return;
  if (t) window.localStorage.setItem(TOKEN_STORAGE_KEY, t);
  else window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function getAccessToken() {
  return accessToken;
}

export function setCurrentUserRole(role: User["role"] | null) {
  currentUserRole = role;
  if (typeof window === "undefined") return;
  if (role) window.localStorage.setItem(ROLE_STORAGE_KEY, role);
  else window.localStorage.removeItem(ROLE_STORAGE_KEY);
}

export function getCurrentUserRole() {
  return currentUserRole;
}

export function clearAccessToken() {
  setAccessToken(null);
  setCurrentUserRole(null);
}

function normalizeForPayload(value: unknown) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') {
    const normalized = value.trim().replace(/\s+/g, ' ').toLowerCase();
    return normalized || null;
  }
  return value;
}

function cleanPayload(payload: object, topLevel: Record<string, unknown>): Record<string, unknown> {
  const aliasMap: Record<string, keyof typeof topLevel> = {
    first_name: 'name',
    last_name: 'name',
    full_name: 'name',
    fullname: 'name',
    company_name: 'company',
    business_email: 'email',
    work_email: 'email',
    phone_number: 'phone',
    contact_number: 'phone',
    mobile: 'phone',
    mobile_number: 'phone',
  };

  const normalizedTop = Object.fromEntries(
    Object.entries(topLevel).map(([key, value]) => [key.toLowerCase(), normalizeForPayload(value)])
  ) as Record<string, unknown>;

  const result: Record<string, unknown> = {};
  Object.entries(payload || {}).forEach(([key, value]) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey === 'payload') return;
    if (value === undefined || value === null) return;
    if (typeof value === 'string' && !value.trim()) return;

    const normalizedValue = normalizeForPayload(value);
    const topKeyMatch = normalizedTop[lowerKey];
    if (topKeyMatch !== undefined && normalizedValue === topKeyMatch) return;

    const aliasTarget = aliasMap[lowerKey];
    if (aliasTarget && normalizedTop[aliasTarget] !== undefined && normalizedValue === normalizedTop[aliasTarget]) return;

    result[key] = value;
  });

  return result;
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  display_name?: string | null;
  created_at?: string;
  updated_at?: string;
}

function base64UrlDecode(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/") + padding;
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(base64), (ch: string) => `%${(`00${ch.charCodeAt(0).toString(16)}`).slice(-2)}`)
      .join("")
  );
}

export function decodeJwt<T = unknown>(token: string): T | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(base64UrlDecode(parts[1])) as T;
  } catch {
    return null;
  }
}

export interface SectionImage { src: string; alt: string }
export interface SectionCTA { label: string; href: string }

export interface CompanyLeadFormSubmission {
  first_name: string;
  last_name: string;
  company_name: string;
  business_email: string;
  phone_number: string;
  hear_about_us?: string;
  message?: string;
  source_page?: string;
}

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

export interface BusinessCaseSubmission {
  name: string;
  email: string;
  company: string;
  target_capacity_bpd: string;
  actual_output_bpd: string;
  location: string;
  planned_downtime_yearly: string;
  unplanned_downtime_yearly: string;
  implementation_schedule: string;
  time_spent_on_data_pct: string;
  use_cases: string[];
  other_use_cases?: string;
  source_page?: string;
}

export type RequestDemoSubmission = {
  name: string;
  email: string;
  company?: string;
  phone: string;
  message?: string;
  source_page?: string;
};

export interface SignalMinerContactSubmission {
  first_name: string;
  last_name: string;
  company: string;
  title: string;
  phone_number?: string;
  email: string;
  seeking_solutions: string[];
  comments?: string;
  source_page?: string;
}

export type CementWhitepaperSubmission = {
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  contact_me: boolean;
  source_page?: string;
};

export type TurnaroundsWhitepaperSubmission = {
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  contact_me: boolean;
  source_page?: string;
};

export type MetaverseWhitepaperSubmission = {
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  contact_me: boolean;
  source_page?: string;
};
export interface OilAndGasContactSubmission {
  company: string;
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
  business_email: string;
  phone_number: string;
  hear_about_us: string;
  message?: string;
  source_page?: string;
}
export interface VrTourRequestSubmission {
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
  business_email: string;
  phone_number?: string;
  message?: string;
  source_page?: string;
}
export type RenewableEnergyWhitepaperSubmission = {
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  contact_me: boolean;
  source_page?: string;
};

export type PharmaWhitepaperSubmission = {
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  message?: string;
  contact_me: boolean;
  source_page?: string;
};

export interface ViziCopilotDemoSubmission {
  first_name: string;
  last_name: string;
  company_name: string;
  business_email: string;
  phone_number: string;
  contact_me: boolean;
  source_page?: string;
}

export interface SocialDigitalContactSubmission {
  first_name: string;
  last_name: string;
  company_name: string;
  business_email: string;
  phone_number: string;
  hear_about_us?: string;
  message?: string;
  source_page?: string;
}


export interface StatsResponse {
  enquiriesOverTime?: { day: string; count: number }[];
  topEnquiryPages?: { source_page: string; count: number }[];
  enquiriesByType?: { form_type: string; count: number }[];
  topForms?: { provider: string; form_name: string; mapped_fields: number }[];
  providerBreakdown?: { provider: string; count: number }[];
}

export interface MappedForm {
  id: string;
  provider: string;
  formName: string;
  externalFormId: string;
  mappedFields: number;
  config: Record<string, unknown>;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnDef {
  key: string;
  label: string;
  type: "text" | "number" | "date";
  enabled: boolean;
}

export interface ContactSubmission {
  [x: string]: any;
  id: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  message: string;
  source_page?: string | null;
  payload: Record<string, unknown>;
  ip?: string | null;
  user_agent?: string | null;
  created_at: string;
  handled_at?: string | null;
}

async function refreshOnce(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { accessToken: string };
    setAccessToken(data.accessToken);
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
  login: async (email: string, password: string) => {
    const res = await apiFetch<{ accessToken: string; user: User }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setAccessToken(res.accessToken);
    setCurrentUserRole(res.user.role);
    return res;
  },
  logout: async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    clearAccessToken();
  },
  refresh: refreshOnce,

  listContent: (postType: string) =>
    apiFetch<{ items: ContentItem[] }>(`/api/public/content/${postType}`),
  getContent: (postType: string, slug: string) =>
    apiFetch<ContentItem>(`/api/public/content/${postType}/${slug}`),

  settings: () => apiFetch<Record<string, unknown>>("/api/public/settings"),

  submitContact: (data: {
    name: string; email: string; company?: string; phone?: string;
    message: string; source_page?: string;
  }) => apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify(data) }),

  submitCompanyLeadForm: (data: CompanyLeadFormSubmission) =>
    apiFetch("/api/public/contact", {
      method: "POST",
      body: JSON.stringify({
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.business_email,
        company: data.company_name,
        phone: data.phone_number,
        message: data.message || "",
        source_page: data.source_page || "/company-lead-form",
        payload: cleanPayload(data, {
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.business_email,
          company: data.company_name,
          phone: data.phone_number,
          message: data.message || "",
          source_page: data.source_page || "/company-lead-form",
        }),
      }),
    }),

    submitBusinessCase: (data: BusinessCaseSubmission) =>
    apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: null,
      message: "Business case submission received",
      source_page: data.source_page || "/business-case",
      payload: cleanPayload(data, {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: null,
        message: "Business case submission received",
        source_page: data.source_page || "/business-case",
      }),
    }) }),

    submitSignalMinerContact: (data: SignalMinerContactSubmission) =>
    apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify({
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: data.email,
      company: data.company,
      phone: data.phone_number || null,
      message: data.comments || "",
      source_page: data.source_page || "/signal-miner-contact",
      payload: cleanPayload(data, {
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.email,
        company: data.company,
        phone: data.phone_number || null,
        message: data.comments || "",
        source_page: data.source_page || "/signal-miner-contact",
      }),
    }) }),

    submitRequestDemo: (data: RequestDemoSubmission) =>
    apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      message: data.message || "Requesting a demo",
      source_page: data.source_page || "/request-demo",
      payload: cleanPayload(data, {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        message: data.message || "Requesting a demo",
        source_page: data.source_page || "/request-demo",
      }),
    }) }),

    submitCementWhitepaper: (data: CementWhitepaperSubmission) =>
    apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify({
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: data.email,
      company: data.company,
      phone: null,
      message: `Requested cement whitepaper. Contact me: ${data.contact_me}`,
      source_page: data.source_page || "/cement-whitepaper",
      payload: cleanPayload(data, {
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.email,
        company: data.company,
        phone: null,
        message: `Requested cement whitepaper. Contact me: ${data.contact_me}`,
        source_page: data.source_page || "/cement-whitepaper",
      }),
    }) }),

    submitTurnaroundsWhitepaper: (data: TurnaroundsWhitepaperSubmission) =>
    apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify({
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: data.email,
      company: data.company,
      phone: null,
      message: `Requested turnarounds whitepaper. Contact me: ${data.contact_me}`,
      source_page: data.source_page || "/turnarounds-whitepaper",
      payload: cleanPayload(data, {
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.email,
        company: data.company,
        phone: null,
        message: `Requested turnarounds whitepaper. Contact me: ${data.contact_me}`,
        source_page: data.source_page || "/turnarounds-whitepaper",
      }),
    }) }),

    submitMetaverseWhitepaper: (data: MetaverseWhitepaperSubmission) =>
    apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify({
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: data.email,
      company: data.company,
      phone: null,
      message: `Requested metaverse whitepaper. Contact me: ${data.contact_me}`,
      source_page: data.source_page || "/metaverse-whitepaper",
      payload: cleanPayload(data, {
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.email,
        company: data.company,
        phone: null,
        message: `Requested metaverse whitepaper. Contact me: ${data.contact_me}`,
        source_page: data.source_page || "/metaverse-whitepaper",
      }),
    }) }),

  submitVrTourRequest: (data: VrTourRequestSubmission) =>
    apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify({
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: data.business_email || data.email,
      company: data.company_name,
      phone: data.phone_number || null,
      message: data.message || "",
      source_page: data.source_page || "/vr-tour-request",
      payload: cleanPayload(data, {
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.business_email || data.email,
        company: data.company_name,
        phone: data.phone_number || null,
        message: data.message || "",
        source_page: data.source_page || "/vr-tour-request",
      }),
    }) }),

  submitOilAndGasContact: (data: OilAndGasContactSubmission) =>
  apiFetch("/api/public/contact", {method: "POST",  body: JSON.stringify({
    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
    email: data.business_email || data.email,
    company: data.company_name || data.company,
    phone: data.phone_number || null,
    message: data.message || "",
    source_page: data.source_page || "/oil-and-gas-contact",
    payload: cleanPayload(data, {
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: data.business_email || data.email,
      company: data.company_name || data.company,
      phone: data.phone_number || null,
      message: data.message || "",
      source_page: data.source_page || "/oil-and-gas-contact",
    }),
  }), }),

  submitRenewableEnergyWhitepaper: (data: RenewableEnergyWhitepaperSubmission) =>
    apiFetch("/api/public/contact", {  method: "POST", body: JSON.stringify({
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: data.email,
      company: data.company,
      phone: null,
      message: `Requested renewable energy whitepaper. Contact me: ${data.contact_me}`,
      source_page: data.source_page || "/renewable-energy-whitepaper",
      payload: cleanPayload(data, {
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.email,
        company: data.company,
        phone: null,
        message: `Requested renewable energy whitepaper. Contact me: ${data.contact_me}`,
        source_page: data.source_page || "/renewable-energy-whitepaper",
      }),
    }), }),

  submitViziCopilotDemo: (data: ViziCopilotDemoSubmission) =>
    apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify({
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: data.business_email,
      company: data.company_name,
      phone: data.phone_number || null,
      message: `Vizi Copilot demo request. Contact me: ${data.contact_me}`,
      source_page: data.source_page || "/vizi-copilot-demo",
      payload: cleanPayload(data, {
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.business_email,
        company: data.company_name,
        phone: data.phone_number || null,
        message: `Vizi Copilot demo request. Contact me: ${data.contact_me}`,
        source_page: data.source_page || "/vizi-copilot-demo",
      }),
    }) }),

  submitSocialDigitalContact: (data: SocialDigitalContactSubmission) =>
    apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify({
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: data.business_email,
      company: data.company_name,
      phone: data.phone_number || null,
      message: data.message || "",
      source_page: data.source_page || "/social-digital-contact",
      payload: cleanPayload(data, {
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.business_email,
        company: data.company_name,
        phone: data.phone_number || null,
        message: data.message || "",
        source_page: data.source_page || "/social-digital-contact",
      }),
    }) }),

  submitPharmaWhitepaper: (data: PharmaWhitepaperSubmission) =>
    apiFetch("/api/public/contact", { method: "POST", body: JSON.stringify({
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      email: data.email,
      company: data.company,
      phone: null,
      message: data.message || `Requested pharmaceutical manufacturing whitepaper. Contact me: ${data.contact_me}`,
      source_page: data.source_page || "/ai-in-pharmaceutical-manufacturing",
      payload: cleanPayload(data, {
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.email,
        company: data.company,
        phone: null,
        message: data.message || `Requested pharmaceutical manufacturing whitepaper. Contact me: ${data.contact_me}`,
        source_page: data.source_page || "/ai-in-pharmaceutical-manufacturing",
      }),
    }) }),

  admin: {
    // Enquiries (Admin Layout -> Enquiries page)
    contactList: (opts?: { page?: number; pageSize?: number; q?: string; handled?: string }) => {
      const params = new URLSearchParams();
      if (opts?.page) params.set("page", String(opts.page));
      if (opts?.pageSize) params.set("pageSize", String(opts.pageSize));
      if (opts?.q) params.set("q", opts.q);
      if (opts?.handled) params.set("handled", opts.handled);
      const qs = params.toString() ? `?${params.toString()}` : "";
      return apiFetch<{ items: ContactSubmission[]; total: number }>(`/api/admin/enquiries${qs}`, { auth: true });
    },
    markEnquiryHandled: (id: string, handled: boolean) =>
      apiFetch<{ item: ContactSubmission }>(`/api/admin/enquiries/${id}`, {
        method: "PUT",
        auth: true,
        body: JSON.stringify({ handled }),
      }),
    deleteEnquiry: (id: string) =>
      apiFetch(`/api/admin/enquiries/${id}`, { method: "DELETE", auth: true }),

    // Column visibility config for the Enquiries table
    columns: () => apiFetch<{ items: ColumnDef[] }>("/api/admin/columns", { auth: true }),
    saveColumns: (columns: ColumnDef[]) =>
      apiFetch("/api/admin/columns", { method: "PUT", auth: true, body: JSON.stringify({ columns }) }),

    // Analytics
    stats: () => apiFetch<StatsResponse>("/api/admin/stats", { auth: true }),

    // Users
    users: () => apiFetch<{ items: User[] }>("/api/admin/users", { auth: true }),
    createUser: (data: { email: string; password: string; role: User["role"]; displayName?: string | null }) =>
      apiFetch<{ item: User }>("/api/admin/users", { method: "POST", auth: true, body: JSON.stringify(data) }),
    updateUser: (id: string, data: { password?: string; role?: User["role"]; displayName?: string | null }) =>
      apiFetch<{ item: User }>(`/api/admin/users/${id}`, { method: "PUT", auth: true, body: JSON.stringify(data) }),
    deleteUser: (id: string) => apiFetch(`/api/admin/users/${id}`, { method: "DELETE", auth: true }),

    // Field mapping (Admin Layout -> Field Mapping page)
    mappedForms: () => apiFetch<{ items: MappedForm[] }>("/api/admin/mapped-forms", { auth: true }),
    createMappedForm: (data: Omit<MappedForm, "id" | "createdAt" | "updatedAt" | "lastUpdated">) =>
      apiFetch<{ item: MappedForm }>("/api/admin/mapped-forms", { method: "POST", auth: true, body: JSON.stringify(data) }),
    deleteMappedForm: (id: string) =>
      apiFetch(`/api/admin/mapped-forms/${id}`, { method: "DELETE", auth: true }),
  },
};