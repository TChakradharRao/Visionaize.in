import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { api, type ContentItem } from "@/lib/api";
import { ErrorFallback, NotFoundPage } from "@/components/site/ContentPage";

const postsQuery = queryOptions({
  queryKey: ["content", "post", "list"],
  queryFn: async () => {
    try {
      return await api.listContent("post");
    } catch {
      return { items: [] as ContentItem[] };
    }
  },
  staleTime: 60_000,
  retry: false,
});

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
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
  notFoundComponent: NotFoundPage,
  errorComponent: ({ error }) => <ErrorFallback error={error as Error} />,
});

function BlogIndex() {
  const { data } = useSuspenseQuery(postsQuery);
  const items = [...data.items].sort((a, b) => {
    const ad = a.published_at ? Date.parse(a.published_at) : 0;
    const bd = b.published_at ? Date.parse(b.published_at) : 0;
    return bd - ad;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-brand-navy to-brand-blue text-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-sm uppercase tracking-widest text-brand-lime">Insights</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">Visionaize Blog</h1>
            <p className="mt-4 max-w-2xl text-white/80">
              Perspectives on AI, 3D Digital Twins, and industrial transformation.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          {items.length === 0 ? (
            <p className="text-brand-ink/70">No posts available yet.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <Link
                  key={p.id}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:shadow-lg transition-shadow"
                >
                  {p.cover_image && (
                    <div className="aspect-[16/10] overflow-hidden bg-secondary">
                      <img
                        src={p.cover_image}
                        alt={p.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {p.published_at && (
                      <p className="text-xs uppercase tracking-wider text-brand-ink/60">
                        {new Date(p.published_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                    <h2 className="mt-2 text-xl font-semibold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {p.title}
                    </h2>
                    {p.excerpt && (
                      <p className="mt-3 text-sm text-brand-ink/70 line-clamp-3">
                        {p.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
