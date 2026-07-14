import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ContentPage,
  ErrorFallback,
  NotFoundPage,
  buildMeta,
  pageQuery,
} from "@/components/site/ContentPage";

// WordPress doesn't have a separate `service` post type — service pages live
// under post_type=page. We fetch by slug from the page collection.
export const Route = createFileRoute("/services/$slug")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(pageQuery("page", params.slug)),
  head: ({ loaderData }) =>
    loaderData ? { meta: buildMeta(loaderData, loaderData.title) } : {},
  component: ServicePage,
  notFoundComponent: NotFoundPage,
  errorComponent: ({ error }) => <ErrorFallback error={error as Error} />,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(pageQuery("page", slug));
  return <ContentPage item={data} />;
}
