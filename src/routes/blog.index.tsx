import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

interface StaticPost {
  slug: string;
  title: string;
  cover_image: string;
  published_at: string; // ISO date
}

// Wraps an image URL with wsrv.nl to resize/re-encode on the fly (webp, 640px
// wide) instead of downloading the full-size original — fixes slow loads.
function optimized(url: string): string {
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=640&h=400&fit=cover&output=webp&q=80`;
}

// Static data sourced from visionaize.in/blog — swap image URLs for your own
// hosted assets when ready (these hotlink the live reference site for now).
const POSTS: StaticPost[] = [
  {
    slug: "the-rise-of-autonomous-industrial-control-why-real-time-optimization-rto-is-becoming-the-brain-of-the-modern-plant",
    title:
      "The Rise of Autonomous Industrial Control: Why Real-Time Optimization (RTO) Is Becoming the Brain of the Modern Plant",
    cover_image: "https://visionaize.in/wp-content/uploads/2025/12/image-101-3.png",
    published_at: "2025-12-22",
  },
  {
    slug: "why-ai-optimization-is-outperforming-traditional-advanced-process-control",
    title: "Why AI Optimization is Outperforming Traditional Advanced Process Control",
    cover_image: "https://visionaize.in/wp-content/uploads/2025/08/29400734779.png",
    published_at: "2025-08-11",
  },
  {
    slug: "visual-intelligence-meets-context",
    title:
      "Visual Intelligence Meets Context: How Visionaize Is Redefining Industrial Operations with AI and Digital Twins",
    cover_image:
      "https://visionaize.in/wp-content/uploads/2025/07/Blog-Visualization-Context-23.07.2025.png",
    published_at: "2025-07-23",
  },
  {
    slug: "robots-digital-twin-powering-next‑gen-industrial-operations",
    title: "Robots + Digital Twin: Powering Next Gen Industrial Operations",
    cover_image:
      "https://visionaize.in/wp-content/uploads/2025/07/Blog-01.07.2025-Robots-and-Digital-Twins-1.png",
    published_at: "2025-07-01",
  },
  {
    slug: "why-digital-twins-are-a-strategic-imperative-for-utility-ceos",
    title: "Why Digital Twins Are a Strategic Imperative for Utility CEOs",
    cover_image: "https://visionaize.in/wp-content/uploads/2025/05/digital-twin-in-Utilities.jpg",
    published_at: "2025-05-22",
  },
  {
    slug: "why-industrial-plants-can-t-afford-to-ignore-ai-in-2025",
    title: "Why Industrial Plants Can't Afford to Ignore AI in 2025",
    cover_image: "https://visionaize.in/wp-content/uploads/2025/04/blog-22.04.2025.png",
    published_at: "2025-04-22",
  },
  {
    slug: "operational-efficiency-and-decarbonization-the-synergy-in-industrial-transformation",
    title: "Operational Efficiency and Decarbonization: The Synergy in Industrial Transformation",
    cover_image:
      "https://visionaize.in/wp-content/uploads/2025/03/prioritizing-energy-efficiency.jpeg",
    published_at: "2025-03-28",
  },
  {
    slug: "mining-the-future-with-visionaize-signal-miner-to-reveal-hidden-insights-and-maximize-efficiency",
    title:
      "Mining the Future with Visionaize Signal Miner to Reveal Hidden Insights and Maximize Efficiency",
    cover_image: "https://visionaize.in/wp-content/uploads/2025/03/Blog-Picture07.03.2025.png",
    published_at: "2025-03-07",
  },
  {
    slug: "bridging-the-data-gap-how-ai-and-3d-digital-twins-unlock-real-time-emissions-monitoring-in-the-process-industry",
    title:
      "Bridging the Data Gap: How AI and 3D Digital Twins Unlock Real-Time Emissions Monitoring in the Process Industry",
    cover_image: "https://visionaize.in/wp-content/uploads/2025/02/52600491442.png",
    published_at: "2025-02-20",
  },
  {
    slug: "enhancing-operational-efficiency-with-ai-driven-process-performance-prediction",
    title: "Enhancing Operational Efficiency with AI-Driven Process Performance Prediction",
    cover_image: "https://visionaize.in/wp-content/uploads/2025/02/blog-pic-6.2.2025.jpg",
    published_at: "2025-02-10",
  },
  {
    slug: "eliminating-delays-and-cost-overruns-in-capital-projects-with-3d-digital-twins-and-ai",
    title: "Eliminating Delays and Cost Overruns in Capital Projects with 3D Digital Twins and AI",
    cover_image: "https://visionaize.in/wp-content/uploads/2025/01/Blogpic23.01.2025.jpg",
    published_at: "2025-01-23",
  },
  {
    slug: "remote-performance-monitoring-with-digital-twins-drives-efficiency-and-safety",
    title: "Remote Performance Monitoring with Digital Twins Drives Efficiency and Safety",
    cover_image: "https://visionaize.in/wp-content/uploads/2025/01/49350947222.png",
    published_at: "2025-01-10",
  },
  {
    slug: "drilling-into-data-how-generative-ai-is-transforming-oil-and-gas",
    title: "Drilling Into Data: How Generative AI is Transforming Oil and Gas",
    cover_image: "https://visionaize.in/wp-content/uploads/2024/12/90045162083.png",
    published_at: "2024-12-30",
  },
  {
    slug: "optimizing-for-tomorrow-the-roleof-ai-in-decarbonizing-industry",
    title: "Optimizing for Tomorrow: The Role of AI in Decarbonizing Industry",
    cover_image: "https://visionaize.in/wp-content/uploads/2024/12/27884641567-1.png",
    published_at: "2024-12-25",
  },
  {
    slug: "beyond-boundaries-the-future-of-remote-performance-monitoring",
    title: "Beyond Boundaries: The Future of Remote Performance Monitoring",
    cover_image: "https://visionaize.in/wp-content/uploads/2024/12/blogpic16.12.jpg",
    published_at: "2024-12-17",
  },
];

const PAGE_SIZE = 9;

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

  const items = [...POSTS].sort(
    (a, b) => Date.parse(b.published_at) - Date.parse(a.published_at)
  );

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
                  <h2 className="text-base md:text-lg font-semibold text-black no-underline group-hover:no-underline">
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
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
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