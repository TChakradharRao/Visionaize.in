import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import {
  ContentPage,
  ErrorFallback,
  NotFoundPage,
  buildMeta,
} from "@/components/site/ContentPage";
import { api, type ContentItem } from "@/lib/api";

/**
 * Resolves a flat slug against multiple content types, since posts and
 * pages share the same root-level URL space (no /blog/ prefix).
 * Tries "post" first (blog articles), then falls back to "page".
 */
function anyTypeQuery(slug: string) {
  return queryOptions({
    queryKey: ["content", "any", slug],
    queryFn: async (): Promise<ContentItem> => {
      try {
        return await api.getContent("post", slug);
      } catch {
        try {
          return await api.getContent("page", slug);
        } catch {
          throw notFound();
        }
      }
    },
    staleTime: 60_000,
    retry: false,
  });
}

export const Route = createFileRoute("/$slug")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(anyTypeQuery(params.slug)),
  head: ({ loaderData }) =>
    loaderData ? { meta: buildMeta(loaderData, loaderData.title) } : {},
  component: DynamicPage,
  notFoundComponent: NotFoundPage,
  errorComponent: ({ error }) => <ErrorFallback error={error as Error} />,
});

function DynamicPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(anyTypeQuery(slug));
  return <ContentPage item={data} />;
}