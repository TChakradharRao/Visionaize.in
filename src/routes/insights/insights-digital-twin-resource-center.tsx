import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getAllPosts, getResourceTags, filterPosts } from "@/lib/blogData";

function optimized(url: string): string {
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=640&h=400&fit=cover&output=webp&q=80`;
}

const ALL_POSTS = getAllPosts();
// Full site tag taxonomy (~80 tags) — the sidebar is a single flat checkbox
// list of these, in taxonomy order, matching the live site's filter panel.
const TAGS = getResourceTags();

const PAGE_SIZE = 12;

export const Route = createFileRoute("/insights/insights-digital-twin-resource-center")({
  head: () => ({
    meta: [
      { title: "Digital Twin Resource Center — Visionaize" },
      {
        name: "description",
        content:
          "Search and filter Visionaize's full library of articles on AI, Digital Twins, predictive maintenance, and decarbonization.",
      },
    ],
  }),
  component: ResourceCenter,
});

function ResourceCenter() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return filterPosts(ALL_POSTS, { search, tags: selectedTags });
  }, [search, selectedTags]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const hasActiveFilters = search.trim() !== "" || selectedTags.length > 0;

  function toggleTag(tag: string) {
    setPage(1);
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function clearFilters() {
    setSearch("");
    setSelectedTags([]);
    setPage(1);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Plain centered title, no gradient band */}
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy">
            Digital Twin Resource Center
          </h1>
        </div>
        <div className="border-b border-brand-navy/10" />

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
            {/* ---- Sidebar: flat checkbox list of every tag ---- */}
            <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mb-4 text-sm font-medium text-brand-blue hover:text-brand-navy"
                >
                  Clear all filters
                </button>
              )}
              <ul className="space-y-4">
                {TAGS.map((tag) => {
                  const id = `tag-${tag.replace(/\s+/g, "-").toLowerCase()}`;
                  return (
                    <li key={tag}>
                      <label
                        htmlFor={id}
                        className="flex cursor-pointer items-start gap-2.5 text-sm text-brand-blue"
                      >
                        <input
                          id={id}
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                          className="mt-0.5 h-4 w-4 flex-none rounded-sm border-brand-ink/30 accent-brand-blue focus:ring-brand-blue"
                        />
                        <span>{tag}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* ---- Search + results ---- */}
            <div>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ink/40"
                  aria-hidden
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search Resources"
                  className="w-full rounded-md border border-brand-navy/15 bg-white py-3 pl-11 pr-4 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>

              {pageItems.length === 0 ? (
                <div className="mt-10 rounded-xl border border-dashed border-brand-navy/20 py-20 text-center">
                  <p className="text-brand-ink/60">
                    No resources match your filters. Try broadening your search.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 rounded-md bg-brand-blue px-5 py-2 text-sm font-medium text-white hover:bg-brand-navy transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {pageItems.map((p) => (
                    <Link
                      key={p.slug}
                      to="/$slug"
                      params={{ slug: p.slug }}
                      className="group block overflow-hidden rounded-xl border border-brand-navy/10 bg-white"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-secondary">
                        <img
                          src={optimized(p.cover_image)}
                          alt={p.title}
                          width={640}
                          height={400}
                          decoding="async"
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5">
                        <h2 className="text-lg font-bold leading-snug text-brand-navy">
                          {p.title}
                        </h2>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onChange={setPage}
                />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onChange,
}: {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  // Build a compact page list: 1 … c-1 c c+1 … totalPages
  const pages = useMemo(() => {
    const set = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    return Array.from(set)
      .filter((n) => n >= 1 && n <= totalPages)
      .sort((a, b) => a - b);
  }, [currentPage, totalPages]);

  return (
    <nav className="mt-12 flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        className="rounded-md px-3 py-2 text-sm font-medium text-brand-ink/70 hover:bg-brand-mist disabled:opacity-30 disabled:hover:bg-transparent"
      >
        Prev
      </button>

      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <span key={p} className="flex items-center">
            {showEllipsis && <span className="px-2 text-brand-ink/40">…</span>}
            <button
              type="button"
              onClick={() => onChange(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${
                p === currentPage
                  ? "bg-brand-blue text-white"
                  : "text-brand-ink/70 hover:bg-brand-mist"
              }`}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
        className="rounded-md px-3 py-2 text-sm font-medium text-brand-ink/70 hover:bg-brand-mist disabled:opacity-30 disabled:hover:bg-transparent"
      >
        Next
      </button>
    </nav>
  );
}