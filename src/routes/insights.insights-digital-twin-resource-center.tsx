import { createFileRoute } from "@tanstack/react-router";
import { InsightPage } from "@/components/site/InsightPage";

export const Route = createFileRoute("/insights/insights-digital-twin-resource-center")({
  head: () => ({
    meta: [
      { title: "Digital Twin Resource Center — Visionaize" },
      { name: "description", content: "Explore articles, use cases, and thought leadership around digital twins, AI, and industrial transformation." },
    ],
  }),
  component: ResourceCenterPage,
});

function ResourceCenterPage() {
  return (
    <InsightPage
      title="Digital Twin Resource Center"
      eyebrow="Insights"
      intro="Explore practical guides, thought leadership, and real-world examples showing how 3D digital twins, AI, and connected operations are helping industrial teams turn data into action."
      heroImage="https://visionaize.com/wp-content/uploads/2025/08/29400734779.png"
      stats={[
        { label: "3D Digital Twins", value: "100+" },
        { label: "AI & GenAI Insights", value: "24/7" },
        { label: "Industrial Use Cases", value: "12" },
        { label: "Decarbonization Topics", value: "8" },
      ]}
      sections={[
        {
          title: "From strategy to execution",
          body: `The digital twin resource center brings together the latest thinking on industrial transformation, remote monitoring, predictive maintenance, and operational optimization. It is built for teams that want to understand the technology and move from pilot concepts to operational value.

Each article and perspective is designed to help organizations connect data, systems, and people in a way that supports faster decisions, better performance, and safer operations.`,
          bullets: [
            "Explore the role of AI in modern industrial operations",
            "Learn how data-rich 3D twins accelerate decision-making",
            "See how operators and engineers apply these ideas in real plants",
          ],
          image: "https://visionaize.com/wp-content/uploads/2025/07/Blog-Visualization-Context-23.07.2025.png",
        },
        {
          title: "Designed for operators, engineers, and executives",
          body: `Whether you are building a digital roadmap or looking for an immediate use case, these resources help connect operational priorities to practical transformation initiatives. The content covers planning, deployment, change management, and value realization so the conversation can move beyond experimentation into measurable outcomes.

From asset-intensive operations to decarbonization and reliability programs, the insights are written to support both technical and business stakeholders.`,
          bullets: [
            "Improve visibility into reliability and performance",
            "Support predictive maintenance and decarbonization goals",
            "Create a better foundation for remote collaboration",
          ],
          reverse: true,
          image: "https://visionaize.com/wp-content/uploads/2024/12/27884641567-1.png",
        },
      ]}
      cards={[
        { title: "Insights & Blog", description: "Read the latest articles on industrial AI, digital twins, and operational excellence.", href: "/blog", eyebrow: "Articles" },
        { title: "Digital Twin FAQ", description: "Get concise answers to core questions about digital twin technology and its business value.", href: "/digital-twin-faq", eyebrow: "FAQ" },
        { title: "The Industrial Metaverse", description: "Learn how 3D environments and connected data are reshaping industrial operations.", href: "/theindustrialmetaverse", eyebrow: "Perspective" },
      ]}
      cta={{ label: "Talk to an expert", href: "/contact", secondaryLabel: "Explore blog", secondaryHref: "/blog" }}
    />
  );
}
