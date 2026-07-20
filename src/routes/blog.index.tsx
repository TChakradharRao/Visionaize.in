import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getAllPosts } from "@/lib/blogData";

// Wraps an image URL with wsrv.nl to resize/re-encode on the fly (webp, 640px
// wide) instead of downloading the full-size original — fixes slow loads.
function optimized(url: string): string {
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=640&h=400&fit=cover&output=webp&q=80`;
}

// Posts now come from src/data/blogs.json (single source of truth, shared
// with the blog view page and the Digital Twin Resource Center) instead of
// a hardcoded array.
const ALL_POSTS = getAllPosts();

const PAGE_SIZE = 15; // show 15 by default, +15 per "Load More" click, up to 50

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights & Blog — Visionaize" },
      {
        name: "description",
        content:
          "Insights on AI, 3D Digital Twins, predictive maintenance, and decarbonization for asset-intensive industries.",
      },
      { property: "og:title", content: "Insights & Blog — Visionaize" },
      {
        property: "og:description",
        content:
          "Insights on AI, 3D Digital Twins, predictive maintenance, and decarbonization for asset-intensive industries.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const items = useMemo(() => ALL_POSTS, []);
  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-lime to-brand-blue">
          <div className="mx-auto max-w-7xl px-6 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold ">Blog</h1>
            <p className="mt-4 mx-auto max-w-3xl text-brand-navy/90 text-base md:text-lg">
              Learn about Digital Twin technology and how it drives digital transformation for
              the Oil &amp; Gas, Industrial Manufacturing and Power &amp; Energy sectors.
            </p>
          </div>
        </section>

        {/* Content grid */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <p className="mb-8 text-sm text-brand-ink/50">
            Showing {visibleItems.length} of {items.length} articles
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((p) => (
              <Link
                key={p.slug}
                to="/$slug"
                params={{ slug: p.slug }}
                className="group block overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm hover:shadow-lg transition-shadow"
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
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                    {p.category}
                  </span>
                  <h2 className="mt-2 text-base md:text-lg font-semibold text-black no-underline group-hover:no-underline">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-xs text-brand-ink/50">
                    {new Date(p.published_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, items.length))}
                className="rounded-md bg-brand-blue px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-navy transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}