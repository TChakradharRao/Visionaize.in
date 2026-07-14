import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ContentPage,
  ErrorFallback,
  NotFoundPage,
  buildMeta,
  pageQuery,
} from "@/components/site/ContentPage";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(pageQuery("post", params.slug)),
  head: ({ loaderData }) =>
    loaderData ? { meta: buildMeta(loaderData, loaderData.title) } : {},
  component: BlogPost,
  notFoundComponent: NotFoundPage,
  errorComponent: ({ error }) => <ErrorFallback error={error as Error} />,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(pageQuery("post", slug));
  return <ContentPage item={data} />;
}
