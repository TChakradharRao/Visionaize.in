import { Link } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

type NavNode = { label: ReactNode; href: string; target?: string; children: NavNode[] };
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
  { label: "Renewable Energy", href: "/industries/renewables-energy", target: "", children: [] },
  { label: "Sugar Industry", href: "/industries/sugar-bio-ethanol-industry/", target: "", children: [] },
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
  { label: "Certifications & Compliance", href: "/company#certifications", target: "", children: [] },
  { label: "Meet the team", href: "/company#team", target: "", children: [] },
  { label: "Office Locations", href: "/company#office", target: "", children: [] },
  { label: "Contact Us", href: "/company#contact", target: "", children: [] },
];

const FALLBACK_NAV: NavNodeWithColumns[] = [
  {
    label: "V-Suite Platform",
    href: "/",
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
{ label: (
    <span className="inline-flex items-center gap-1.5">
      VIZI
      <img
        src="/vizi-copilot-gen-ai/Visionaize_logo_without_text.png"
        alt=""
        className="h-4 w-auto object-contain"
      />
      CoPilot
    </span>
  ),
  href: "/platform/vizi-copilot-gen-ai",
  target: "",
  children: [],
},
      { label: "Signal Miner", href: "/platform/signal-miner", target: "", children: [] },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    target: "",
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
    href: "/insights/insights-digital-twin-resource-center",
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
    return { ...node, children: node.children.map((child) => ({ ...child })), columns: node.columns };
  });
}

function attachSolutionsColumns(nodes: NavNodeWithColumns[]): NavNodeWithColumns[] {
  return nodes.map((node) => {
    if (node.label === "Solutions" || node.href === "/solutions") {
      return {
        ...node,
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
  return attachSolutionsColumns(attachInsightsChildren(FALLBACK_NAV));
}

function isInternal(href: string) {
  return href.startsWith("/") && href !== "#";
}

function NavLink({
  href,
  target,
  children,
  className,
  onClick,
}: {
  href: string;
  target?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  if (href === "#") return <span className={className}>{children}</span>;
  if (!isInternal(href)) {
    return (
      <a
        href={href}
        target={target || undefined}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  // Handle internal links with hash fragments so they navigate to the route
  // and then scroll to the element id denoted by the fragment.
  const hasHash = href.includes("#");
  if (hasHash) {
    const [pathPart, hashPart] = href.split("#");
    const path = pathPart || "/";
    return (
      <Link
        to={path}
        className={className}
        onClick={() => {
          onClick?.();
          // allow the router to navigate first, then scroll
          setTimeout(() => {
            try {
              const id = decodeURIComponent(hashPart);
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else window.location.hash = `#${hashPart}`;
            } catch {
              window.location.hash = `#${hashPart}`;
            }
          }, 80);
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}


// Single top-level row in the mobile drawer: label navigates (and closes the
// drawer), the chevron button on the right toggles the sub-list open/closed
// as an accordion, independent of navigation.
// `min-w-0 flex-1` on the label is what keeps the page name visible: as a
// flex child, an anchor/Link can otherwise refuse to shrink below its
// content width and get squeezed out of the row by the sibling chevron
// button, especially for labels that contain an inline <img> (VIZI CoPilot).


function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavNodeWithColumns;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const childItems =
    item.columns && item.columns.length > 0
      ? item.columns.flatMap((col) => col.items)
      : item.children;

  const hasChildren = childItems.length > 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 py-4">
        <NavLink
          href={item.href}
          target={item.target}
          className="block min-w-0 flex-1 truncate text-lg font-medium text-brand-ink"
          onClick={onNavigate}
        >
          {item.label}
        </NavLink>

        {hasChildren && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-label={expanded ? "Collapse submenu" : "Expand submenu"}
            aria-expanded={expanded}
            className="flex h-8 w-9 shrink-0 items-center justify-center rounded-full border border-border text-brand-navy transition-colors hover:bg-secondary"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="pb-2">
          {childItems.map((c) => (
            <NavLink
              key={c.href}
              href={c.href}
              target={c.target}
              className="block border-b border-border/70 py-4 text-base text-brand-ink/80 hover:text-brand-blue"
              onClick={onNavigate}
            >
              {c.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const nav = useNav();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const toggleSection = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closeMenu = () => {
    setOpen(false);
    setExpanded({});
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8 lg:py-5 xl:px-10 xl:py-7">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Visionaize home">
          <img
            src="/head-footer/Group-1000007231-1-1-3.svg"
            alt="Visionaize"
            className="h-8 w-auto sm:h-9 md:h-10 lg:h-11 xl:h-12"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.slice(0, 6).map((item) => (
            <div key={item.href} className="group relative">
              <NavLink
                href={item.href}
                target={item.target}
                className="inline-flex items-center gap-1.5 whitespace-nowrap py-2 text-sm font-medium text-brand-navy transition-colors hover:text-brand-blue xl:text-base"
              >
                {item.label}
                {(item.children.length > 0 || (item.columns && item.columns.length > 0)) && (
                  <ChevronDown className="h-4 w-4 flex-none opacity-60" />
                )}
              </NavLink>

              {/* Mega-menu with column headings (used for Solutions) */}
              {item.columns && item.columns.length > 0 && (
                <div className="invisible absolute left-0 top-full z-50 max-w-[92vw] pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="flex min-w-[420px] max-w-[92vw] gap-8 overflow-x-auto rounded-b-md border-t-2 border-brand-blue bg-white p-5 shadow-lg xl:min-w-[520px] xl:gap-10 xl:p-6">
                    {item.columns.map((col) => (
                      <div key={col.heading} className="min-w-[180px] xl:min-w-[200px]">
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
                              key={c.href}
                              href={c.href}
                              target={c.target}
                              className="whitespace-nowrap text-sm text-brand-ink hover:text-brand-blue"
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
                <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="min-w-56 max-w-[92vw] rounded-b-md border-t-2 border-brand-blue bg-white p-2 shadow-lg xl:min-w-64">
                    {item.children.map((c) => (
                      <div key={c.href}>
                        <NavLink
                          href={c.href}
                          target={c.target}
                          className="block whitespace-nowrap rounded-md px-3 py-2 text-sm text-brand-ink hover:bg-secondary hover:text-brand-blue"
                        >
                          {c.label}
                        </NavLink>
                        {c.children.length > 0 && (
                          <div>
                            {c.children.map((gc) => (
                              <NavLink
                                key={`${c.href}-${gc.href}`}
                                href={gc.href}
                                target={gc.target}
                                className="block whitespace-nowrap rounded-md px-3 py-2 pl-8 text-sm text-brand-ink hover:bg-secondary hover:text-brand-blue"
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
            to="/Talk-to-an-expert"
            className="hidden sm:inline-flex items-center rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap"
          >
            Talk to an expert
          </Link>
          <img
            src="/head-footer/Official_logo_of_the_Confederation_of_Indian_Industry_CII.svg-1.svg"
            alt="Confederation of Indian Industry"
            className="hidden h-8 w-auto shrink-0 md:block md:h-9 lg:h-10"
          />
          <button
            className="lg:hidden text-brand-navy"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile drawer: a full-width, fully opaque overlay (not a partial
          sliding panel) so nothing from the page behind it is ever visible
          and there's exactly one close (X) control. Always mounted so the
          slide transform actually animates; visibility + interactivity are
          toggled via classes so it doesn't intercept clicks while closed. */}
    {open && (
  <div className="lg:hidden border-t border-border bg-white">
    <nav className="mx-auto max-w-7xl px-6 py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
      {nav.map((item) => {
        const sectionKey = `section-${item.href}`;
        const isExpanded = !!expanded[sectionKey];
        return (
          <div key={item.href} className="space-y-1">
            <div className="flex items-center justify-between gap-3">
              <NavLink
                href={item.href}
                target={item.target}
                className="block flex-1 min-w-0 rounded-md px-3 py-3 text-left text-sm font-semibold text-brand-navy transition hover:text-brand-cyan"
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>

              {item.children.length > 0 && (
                <button
                  type="button"
                  onClick={() => toggleSection(sectionKey)}
                  aria-label={isExpanded ? "Collapse submenu" : "Expand submenu"}
                  aria-expanded={isExpanded}
                  className="flex h-8 w-9 shrink-0 items-center justify-center rounded-full border border-border text-brand-navy transition-colors hover:bg-secondary"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>

            {item.children.length > 0 && isExpanded && (
              <div className="space-y-1 pl-4">
                {item.columns && item.columns.length > 0 ? (
                  <div className="space-y-4">
                    {item.columns.map((column) => (
                      <div key={column.heading} className="space-y-3">
                        <p className="text-sm font-semibold text-brand-navy">{column.heading}</p>
                        <div className="space-y-1">
                          {column.items.map((child) => (
                            <NavLink
                              key={`${item.label}-${column.heading}-${child.label}`}
                              href={child.href}
                              target={child.target}
                              className="block rounded-md px-3 py-2 text-sm text-brand-ink transition hover:text-brand-cyan"
                              onClick={closeMenu}
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {item.children.map((child) => (
                      <div key={`${item.label}-${child.label}`} className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <NavLink
                            href={child.href}
                            target={child.target}
                            className="block flex-1 min-w-0 rounded-md px-3 py-2 text-sm text-brand-ink transition hover:text-brand-cyan"
                            onClick={closeMenu}
                          >
                            {child.label}
                          </NavLink>
                          {child.children.length > 0 && (
                            <button
                              type="button"
                              onClick={() => toggleSection(`${sectionKey}-${child.href}`)}
                              aria-label="Expand submenu"
                              aria-expanded={!!expanded[`${sectionKey}-${child.href}`]}
                              className="flex h-7 w-8 shrink-0 items-center justify-center rounded-full border border-border text-brand-navy transition-colors hover:bg-secondary"
                            >
                              <ChevronDown
                                className={`h-3.5 w-3.5 transition-transform ${
                                  expanded[`${sectionKey}-${child.href}`] ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>
                        {child.children.length > 0 && expanded[`${sectionKey}-${child.href}`] && (
                          <div className="space-y-1 pl-4">
                            {child.children.map((grandchild) => (
                              <NavLink
                                key={`${item.label}-${child.label}-${grandchild.label}`}
                                href={grandchild.href}
                                target={grandchild.target}
                                className="block rounded-md px-3 py-2 text-sm text-brand-ink transition hover:text-brand-cyan"
                                onClick={closeMenu}
                              >
                                {grandchild.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="flex items-center gap-3 mt-3">
        <Link
          to="/Talk-to-an-expert"
          className="max-w-xl rounded-full bg-brand-navy px-5 py-2.5 text-center text-sm font-semibold text-white"
          onClick={closeMenu}
        >
          Talk to an expert
        </Link>
      </div>
    </nav>
  </div>
)}
    </header>
  );
}