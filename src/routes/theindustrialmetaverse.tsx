import { createFileRoute } from "@tanstack/react-router";
import { InsightPage } from "@/components/site/InsightPage";

export const Route = createFileRoute("/theindustrialmetaverse")({
  head: () => ({
    meta: [
      { title: "The Industrial Metaverse — Visionaize" },
      { name: "description", content: "A deep dive into how the industrial metaverse helps organizations connect data, people, and 3D operations in a more intelligent way." },
    ],
  }),
  component: IndustrialMetaversePage,
});

function IndustrialMetaversePage() {
  return (
    <InsightPage
      title="The Industrial Metaverse"
      eyebrow="Perspective"
      intro="As industrial organizations scale digital transformation, the industrial metaverse is emerging as a practical way to align operations, engineering, and decision-making around shared 3D context."
      heroImage="https://visionaize.com/wp-content/uploads/2023/09/PricewaterhouseCoopers_Logo.svg-1.png"
      sections={[
        {
          title: "Why the industrial metaverse matters",
          body: `The promise is not just immersive visuals. It is a more intuitive way to work with data, collaborate across teams, and make operational decisions with richer context.

The industrial metaverse helps bring together engineering information, process data, and operational knowledge in a way that is easier for humans to understand and act on.`,
          bullets: ["Connect engineering, operations, and maintenance data", "Improve collaboration across distributed teams", "Create a better experience for plant-wide decision support"],
          image: "https://visionaize.com/wp-content/uploads/2024/12/27884641567-1.png",
        },
        {
          title: "A practical path to value",
          body: `Organizations can begin with targeted use cases such as remote support, training, inspections, or turnaround planning, then expand into wider workflows and AI-enabled applications.

The value comes from making complex industrial information easier to access and easier to use at the point of action, whether that is in the control room, the field, or across distributed teams.`,
          bullets: ["Start with high-value operational scenarios", "Use 3D context to bridge IT and OT", "Scale from pilot programs to enterprise workflows"],
          reverse: true,
          image: "https://visionaize.com/wp-content/uploads/2024/12/90045162083.png",
        },
        {
          title: "A stronger foundation for industrial AI",
          body: "When 3D visualizations are combined with real-time information and contextual data, teams gain a better base for predictive maintenance, anomaly detection, and operational insight. That is the difference between dashboards that inform and experiences that actually help people act.",
        },
      ]}
      cards={[
        { title: "Reinventing Turnarounds", description: "Learn how a metaverse-driven approach helps reduce downtime and improve execution quality.", href: "/re-inventing-turnarounds-in-the-metaverse", eyebrow: "Whitepaper" },
        { title: "Digital Twin FAQ", description: "Get the key concepts and use cases behind industrial digital twins.", href: "/digital-twin-faq", eyebrow: "FAQ" },
        { title: "V-Plant", description: "Explore the platform behind 3D digital twin experiences for operations and maintenance.", href: "/platform/v-plant", eyebrow: "Platform" },
      ]}
      cta={{ label: "Discuss an industrial use case", href: "/contact" }}
    />
  );
}
