/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BlogPostLayout } from "@/components/site/BlogPostLayout";
import { getPostBySlug, type BlogPost } from "@/lib/blogData";

function blogPostQuery(slug: string) {
  return queryOptions({
    queryKey: ["blog", "post", slug],
    queryFn: async (): Promise<BlogPost> => {
      const post = getPostBySlug(slug);
      if (!post) throw notFound();
      return post;
    },
    staleTime: 60_000,
    retry: false,
  });
}

export const Route = createFileRoute("/$slug")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(blogPostQuery(params.slug)),
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: loaderData.title },
            { name: "description", content: loaderData.excerpt },
            { property: "og:title", content: loaderData.title },
            { property: "og:description", content: loaderData.excerpt },
            { property: "og:type", content: "article" },
            ...(loaderData.cover_image ? [{ property: "og:image", content: loaderData.cover_image }] : []),
          ],
        }
      : {},
  component: DynamicPage,
  notFoundComponent: NotFoundPage,
});

function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-brand-blue">404</p>
          <h1 className="mt-2 text-4xl font-bold text-brand-navy">Page not found</h1>
          <p className="mt-3 text-brand-ink/70">This page is no longer available.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function DynamicPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(blogPostQuery(slug));
  return (
    <>
      <Header />
      <BlogPostLayout post={data} />
      <Footer />
    </>
  );
}
