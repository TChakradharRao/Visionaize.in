import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ContentPage,
  ErrorFallback,
  NotFoundPage,
  buildMeta,
  pageQuery,
} from "@/components/site/ContentPage";

export const Route = createFileRoute("/$slug")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(pageQuery("page", params.slug)),
  head: ({ loaderData }) =>
    loaderData ? { meta: buildMeta(loaderData, loaderData.title) } : {},
  component: DynamicPage,
  notFoundComponent: NotFoundPage,
  errorComponent: ({ error }) => <ErrorFallback error={error as Error} />,
});

function DynamicPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(pageQuery("page", slug));
  return <ContentPage item={data} />;
}
