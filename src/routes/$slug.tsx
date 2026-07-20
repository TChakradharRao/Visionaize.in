import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BlogPostLayout } from "@/components/site/BlogPostLayout";
import { getPostBySlug } from "@/lib/blogData";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) {
      throw notFound();
    }
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: `${loaderData.title} — Visionaize` },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:image", content: loaderData.cover_image },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: BlogPostNotFound,
});

function BlogPostPage() {
  const post = Route.useLoaderData();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <BlogPostLayout post={post} />
      </main>
      <Footer />
    </>
  );
}

function BlogPostNotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold text-brand-navy">404 — Page not found</h1>
        <p className="mt-3 text-brand-ink/70">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-md bg-brand-blue px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-navy transition-colors"
        >
          Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}