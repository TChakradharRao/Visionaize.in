import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Menu, X } from "lucide-react";
import { api, type MenuItem } from "@/lib/api";

type NavNode = { label: string; href: string; target?: string; children: NavNode[] };
type NavColumn = { heading: string; items: NavNode[] };
type NavNodeWithColumns = NavNode & { columns?: NavColumn[] };

const INSIGHT_CHILDREN: NavNode[] = [
  { label: "Digital Twin Resource Center", href: "/insights/insights-digital-twin-resource-center", target: "", children: [] },
  { label: "Visionaize Blog", href: "/blog", target: "", children: [] },
  { label: "Digital Twin FAQ", href: "/digital-twin-faq", target: "", children: [] },
  { label: "Reinventing Turnarounds in The Metaverse", href: "/re-inventing-turnarounds-in-the-metaverse", target: "", children: [] },
  { label: "The Industrial Metaverse", href: "/theindustrialmetaverse", target: "", children: [] },
  { label: "AI in Pharmaceutical Manufacturing", href: "/ai-in-pharmaceutical-manufacturing", target: "", children: [] },
];

const SOLUTIONS_BY_INDUSTRY: NavNode[] = [
  { label: "Cement Industry", href: "/industries/digital-twin-for-cement", target: "", children: [] },
  { label: "Manufacturing", href: "/industries/digital-twin-for-manufacturing", target: "", children: [] },
  { label: "Oil & Gas", href: "/industries/digital-twin-for-oil-and-gas", target: "", children: [] },
  { label: "Power & Energy", href: "/industries/digital-twin-for-power-and-energy", target: "", children: [] },
  { label: "Renewable Energy", href: "/industries/renewable-energy", target: "", children: [] },
  { label: "Sugar Industry", href: "/industries/sugar-industry", target: "", children: [] },
];

const SOLUTIONS_BY_APPLICATION: NavNode[] = [
  { label: "Remote Performance Monitoring", href: "/solutions/remote-performance-monitoring", target: "", children: [] },
  { label: "Predictive Maintenance", href: "/solutions/predictive-maintenance", target: "", children: [] },
  { label: "Process Performance Prediction", href: "/solutions/process-performance-prediction", target: "", children: [] },
  { label: "Real-Time Optimization", href: "/solutions/real-time-optimization", target: "", children: [] },
  { label: "Decarbonization", href: "/solutions/decarbonization", target: "", children: [] },
  { label: "Virtual & Augmented Reality", href: "/solutions/virtual-reality-and-augmented-reality", target: "", children: [] },
];

const COMPANY_CHILDREN: NavNode[] = [
  { label: "Certifications & Compliance", href: "/company/certifications-compliance", target: "", children: [] },
  { label: "Meet the team", href: "/company/meet-the-team", target: "", children: [] },
  { label: "Office Locations", href: "/company/office-locations", target: "", children: [] },
  { label: "Contact Us", href: "/contact", target: "", children: [] },
];

const FALLBACK_NAV: NavNodeWithColumns[] = [
  {
    label: "V-Suite Platform",
    href: "/3d-digital-twin-v-suite",
    target: "",
    children: [
      {
        label: "V-Plant",
        href: "/platform/v-plant",
        target: "",
        children: [
          { label: "V-Plant-Explorer", href: "/platform/v-plant/#v-plant-explorer", target: "", children: [] },
          { label: "V-Plant Pro", href: "/platform/v-plant/#v-plant-pro", target: "", children: [] },
          { label: "V-Plant 360", href: "/platform/v-plant/#v-plant-360", target: "", children: [] },
        ],
      },
      { label: "V-Smart DocX", href: "/platform/v-smart-docx", target: "", children: [] },
      { label: "VIZI CoPilot", href: "/platform/vizi-copilot-gen-ai", target: "", children: [] },
      { label: "Signal Miner", href: "/platform/signal-miner", target: "", children: [] },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    target: "",
    // Flat list kept for mobile menu; desktop mega-menu uses `columns` below.
    children: [...SOLUTIONS_BY_INDUSTRY, ...SOLUTIONS_BY_APPLICATION],
    columns: [
      { heading: "By Industry", items: SOLUTIONS_BY_INDUSTRY },
      { heading: "By Application", items: SOLUTIONS_BY_APPLICATION },
    ],
  },
  {
    label: "Company",
    href: "/company",
    target: "",
    children: COMPANY_CHILDREN,
  },
  {
    label: "Insights",
    href: "/blog",
    target: "",
    children: [
      ...INSIGHT_CHILDREN,
      { label: "Webinars", href: "/webinars", target: "", children: [] },
      { label: "Resources", href: "/insights", target: "", children: [] },
    ],
  },
];

// Remap WP slugs to the dedicated React routes that exist in this app.
const ROUTE_REMAP: Record<string, string> = {
  "/v-plant": "/platform/v-plant",
  "/v-smart-docx": "/platform/v-smart-docx",
  "/vizi-copilot-gen-ai": "/platform/vizi-copilot-gen-ai",
  "/signal-miner": "/platform/signal-miner",
  "/microsoft-fabric-expertise": "/platform/microsoft-fabric-expertise",
  "/digital-twin-for-oil-and-gas": "/industries/digital-twin-for-oil-and-gas",
  "/digital-twin-for-manufacturing": "/industries/digital-twin-for-manufacturing",
  "/digital-twin-for-power-and-energy": "/industries/digital-twin-for-power-and-energy",
  "/digital-twin-for-cement": "/industries/digital-twin-for-cement",
  "/renewable-energy": "/industries/renewable-energy",
  "/sugar-industry": "/industries/sugar-industry",
  "/remote-performance-monitoring": "/solutions/remote-performance-monitoring",
  "/predictive-maintenance": "/solutions/predictive-maintenance",
  "/process-performance-prediction": "/solutions/process-performance-prediction",
  "/real-time-optimization": "/solutions/real-time-optimization",
  "/decarbonization": "/solutions/decarbonization",
  "/virtual-reality-and-augmented-reality": "/solutions/virtual-reality-and-augmented-reality",
  "/about": "/company",
  "/partners": "/partners-portal",
  "/partners-portal": "/partners-portal",
  "/contact": "/contact",
  "/contact/": "/contact",
};

// Normalize WP URLs (absolute visionaize.com / "#" / trailing slashes) into local paths.
function normalizeHref(url: string): string {
  if (!url || url === "#") return "#";
  let path = url;
  try {
    if (url.startsWith("http")) {
      const u = new URL(url);
      if (/visionaize\.com$/i.test(u.hostname)) {
        path = u.pathname;
      } else {
        return url;
      }
    }
  } catch {
    /* ignore */
  }
  path = path.replace(/\/$/, "") || "/";
  return ROUTE_REMAP[path] ?? path;
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, "").trim();
}

function buildTree(items: MenuItem[]): NavNode[] {
  const byId = new Map<number, NavNode & { _parent: number; _order: number }>();
  items.forEach((it) => {
    byId.set(it.id, {
      label: stripHtml(it.title) || "—",
      href: normalizeHref(it.url),
      target: it.target,
      children: [],
      _parent: it.parent,
      _order: it.order,
    });
  });
  const roots: NavNode[] = [];
  byId.forEach((node) => {
    if (node._parent && byId.has(node._parent)) {
      byId.get(node._parent)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  const sort = (arr: NavNode[]) => {
    arr.sort((a, b) => (a as any)._order - (b as any)._order);
    arr.forEach((n) => sort(n.children));
  };
  sort(roots);
  return roots.filter((n) => n.label && n.label !== "—");
}

function attachInsightsChildren(nodes: NavNodeWithColumns[]): NavNodeWithColumns[] {
  return nodes.map((node) => {
    if (node.label === "Insights" || node.href === "/blog" || node.href === "/insights") {
      const existing = new Map(node.children.map((child) => [child.href, child]));
      const merged = [...INSIGHT_CHILDREN];
      for (const child of node.children) {
        if (!existing.has(child.href)) {
          merged.push(child);
        }
      }
      return { ...node, children: merged.filter((child, index, arr) => arr.findIndex((item) => item.href === child.href) === index) };
    }
    // Preserve columns (used by the Solutions mega-menu) when present.
    return { ...node, children: node.children.map((child) => ({ ...child })), columns: node.columns };
  });
}

// If the CMS-driven "Solutions" menu doesn't come with columns (e.g. it's built
// from the WP menu API rather than the fallback), attach our fixed two-column
// layout so the dropdown always renders "By Industry" / "By Application".
function attachSolutionsColumns(nodes: NavNodeWithColumns[]): NavNodeWithColumns[] {
  return nodes.map((node) => {
    if (node.label === "Solutions" || node.href === "/solutions") {
      return {
        ...node,
        // Also guarantee the flat children list (used on mobile) always
        // includes the full By Industry + By Application set, even if the
        // CMS menu only returned a subset.
        children:
          node.children.length > 0
            ? node.children
            : [...SOLUTIONS_BY_INDUSTRY, ...SOLUTIONS_BY_APPLICATION],
        columns: node.columns ?? [
          { heading: "By Industry", items: SOLUTIONS_BY_INDUSTRY },
          { heading: "By Application", items: SOLUTIONS_BY_APPLICATION },
        ],
      };
    }
    return node;
  });
}

function useNav(): NavNodeWithColumns[] {
  const { data } = useQuery({
    queryKey: ["menus"],
    queryFn: () => api.menus(),
    staleTime: 5 * 60_000,
    retry: false,
  });
  const primary = data?.menus?.["Primary menu"];
  if (primary && primary.length > 0) return attachSolutionsColumns(attachInsightsChildren(buildTree(primary)));
  return attachSolutionsColumns(attachInsightsChildren(FALLBACK_NAV));
}

function isInternal(href: string) {
  return href.startsWith("/") && href !== "#";
}

function NavLink({ href, target, children, className }: { href: string; target?: string; children: React.ReactNode; className?: string }) {
  if (href === "#") return <span className={className}>{children}</span>;
  if (!isInternal(href)) {
    return (
      <a href={href} target={target || undefined} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const nav = useNav();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-6 lg:px-10 lg:py-7">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Visionaize home">
          <img
            src="https://visionaize.in/wp-content/uploads/2024/03/Group-1000007231-1-1-3.svg"
            alt="Visionaize"
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.slice(0, 6).map((item) => (
            <div key={item.label} className="group relative">
              <NavLink
                href={item.href}
                target={item.target}
                className="inline-flex items-center gap-1.5 py-2 text-base font-medium text-brand-navy hover:text-brand-blue transition-colors"
              >
                {item.label}
                {(item.children.length > 0 || (item.columns && item.columns.length > 0)) && (
                  <ChevronDown className="h-4 w-4 opacity-60" />
                )}
              </NavLink>

              {/* Mega-menu with column headings (used for Solutions) */}
              {item.columns && item.columns.length > 0 && (
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="flex min-w-[520px] gap-10 rounded-b-md border-t-2 border-brand-blue bg-white p-6 shadow-lg">
                    {item.columns.map((col) => (
                      <div key={col.heading} className="min-w-[200px]">
                        <div
                          className="mb-3 bg-clip-text text-sm font-semibold text-transparent"
                          style={{
                            backgroundImage:
                              "linear-gradient(90deg, #8CC63F 0%, #39B54A 25%, #28A9A2 55%, #1E88E5 100%)",
                          }}
                        >
                          {col.heading}
                        </div>
                        <div className="flex flex-col gap-3">
                          {col.items.map((c) => (
                            <NavLink
                              key={`${c.label}-${c.href}`}
                              href={c.href}
                              target={c.target}
                              className="text-sm text-brand-ink hover:text-brand-blue"
                            >
                              {c.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Standard single-column dropdown (Company, Insights, V-Suite Platform, etc.) */}
              {!item.columns && item.children.length > 0 && (
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="min-w-64 rounded-b-md border-t-2 border-brand-blue bg-white p-2 shadow-lg">
                    {item.children.map((c) => (
                      <div key={`${c.label}-${c.href}`}>
                        <NavLink
                          href={c.href}
                          target={c.target}
                          className="block rounded-md px-3 py-2 text-sm text-brand-ink hover:bg-secondary hover:text-brand-blue"
                        >
                          {c.label}
                        </NavLink>
                        {c.children.length > 0 && (
                          <div>
                            {c.children.map((gc) => (
                              <NavLink
                                key={`${gc.label}-${gc.href}`}
                                href={gc.href}
                                target={gc.target}
                                className="block rounded-md px-3 py-2 pl-8 text-sm text-brand-ink hover:bg-secondary hover:text-brand-blue"
                              >
                                {gc.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue transition-colors whitespace-nowrap"
          >
            Talk to an expert
          </Link>
          <img
            src="https://visionaize.in/wp-content/uploads/2024/03/Official_logo_of_the_Confederation_of_Indian_Industry_CII.svg-1.svg"
            alt="Confederation of Indian Industry"
            className="hidden sm:block h-10 w-auto shrink-0"
          />
          <button
            className="lg:hidden text-brand-navy"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="mx-auto max-w-7xl px-6 py-4 space-y-1">
            {nav.flatMap((item) => [
              <NavLink
                key={`g-${item.label}`}
                href={item.href}
                target={item.target}
                className="block rounded-md px-3 py-2 text-sm font-semibold text-brand-navy"
              >
                {item.label}
              </NavLink>,
              ...item.children.flatMap((c) => [
                <NavLink
                  key={`${item.label}-${c.label}-${c.href}`}
                  href={c.href}
                  target={c.target}
                  className="block rounded-md px-6 py-2 text-sm text-brand-ink hover:bg-secondary"
                >
                  {c.label}
                </NavLink>,
                ...c.children.map((gc) => (
                  <NavLink
                    key={`${item.label}-${c.label}-${gc.label}-${gc.href}`}
                    href={gc.href}
                    target={gc.target}
                    className="block rounded-md px-9 py-2 text-sm text-brand-ink hover:bg-secondary"
                  >
                    {gc.label}
                  </NavLink>
                )),
              ]),
            ])}
            <div className="flex items-center gap-3 mt-3">
              <Link
                to="/contact"
                className="flex-1 rounded-full bg-brand-navy px-5 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Talk to an expert
              </Link>
              <img
                src="https://visionaize.in/wp-content/uploads/2024/03/Official_logo_of_the_Confederation_of_Indian_Industry_CII.svg-1.svg"
                alt="Confederation of Indian Industry"
                className="h-9 w-auto shrink-0"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}