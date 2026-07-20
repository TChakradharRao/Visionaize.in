import { notFound } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero, RenderSections, CTASection } from "@/components/site/PageSections";
import { api, type ContentItem, type ContentSection } from "@/lib/api";

export function pageQuery(postType: string, slug: string) {
  return queryOptions({
    queryKey: ["content", postType, slug],
  queryFn: async () => {
  try {
    return await api.listContent("post");
  } catch {
    return { items: [] as ContentItem[] };   // 👈 hides the real problem
  }
},
    staleTime: 60_000,
    retry: false,
  });
}

export function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-brand-blue">404</p>
          <h1 className="mt-2 text-4xl font-bold text-brand-navy">Page not found</h1>
          <p className="mt-3 text-brand-ink/70">
            This page isn't available. The CMS backend may not be reachable from this preview.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function ErrorFallback({ error }: { error: Error }) {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="max-w-xl px-6 text-center">
          <h1 className="text-3xl font-bold text-brand-navy">Something went wrong</h1>
          <p className="mt-3 text-brand-ink/70">{error.message}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function categoryLabel(item: ContentItem): string {
  if (item.post_type === "post") return "Article";
  if (/^industry-|^industries|oil-|power-|manufacturing/.test(item.slug)) return "Industry";
  if (/platform|v-suite|v-plant|v-port/.test(item.slug)) return "Platform";
  if (/solution|service/.test(item.slug)) return "Solutions";
  return item.category || "Visionaize";
}

export function ContentPage({ item }: { item: ContentItem }) {
  const sections: ContentSection[] = item.content_json?.sections ?? [];
  const eyebrow = categoryLabel(item);
  const hasContent = sections.some(
    (s) => s.heading || s.paragraphs.length || s.bullets.length || s.images.length || s.ctas.length
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHero item={item} eyebrow={eyebrow} />

        {hasContent ? (
          <RenderSections sections={sections} />
        ) : (
          <section className="mx-auto max-w-3xl px-6 py-20 text-center text-brand-ink/70">
            <p>More information about this topic is coming soon.</p>
          </section>
        )}

        <CTASection />
      </main>
      <Footer />
    </>
  );
}

type MetaEntry =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

export function buildMeta(item: ContentItem, fallbackTitle: string): MetaEntry[] {
  const title = item.seo_title || item.title || fallbackTitle;
  const desc = item.seo_description || item.excerpt || "";
  const img = item.og_image || item.cover_image || undefined;
  const meta: MetaEntry[] = [
    { title },
    { name: "description", content: desc },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: item.post_type === "post" ? "article" : "website" },
  ];
  if (img) {
    meta.push({ property: "og:image", content: img });
    meta.push({ name: "twitter:image", content: img });
  }
  return meta;
}
