import { createFileRoute } from "@tanstack/react-router";
import { InsightPage } from "@/components/site/InsightPage";

export const Route = createFileRoute("/re-inventing-turnarounds-in-the-metaverse")({
  head: () => ({
    meta: [
      { title: "Reinventing Turnarounds in the Metaverse — Visionaize" },
      { name: "description", content: "A practical view of how industrial metaverse strategies and digital twins help operators reduce turnaround cost and downtime." },
    ],
  }),
  component: TurnaroundsPage,
});

function TurnaroundsPage() {
  return (
    <InsightPage
      title="Reinventing Turnarounds in the Metaverse"
      eyebrow="Whitepaper"
      intro="A collaboration between Visionaize and industry partners exploring how digital twins and immersive industrial environments can modernize turnarounds, improve coordination, and reduce cost overrun risk."
      heroImage="https://visionaize.com/wp-content/uploads/2023/09/PricewaterhouseCoopers_Logo.svg-1.png"
      sections={[
        {
          title: "Why turnarounds are so costly",
          body: `Turnarounds are planned but highly complex events that involve engineering, maintenance, operations, safety, and supply chain teams. When planning is fragmented, hidden delays and rework can quickly drive cost overruns.

A turnaround often represents one of the biggest opportunities for a plant to improve reliability and performance, but it also carries major risk if the work is not coordinated and executed with precision.`,
          bullets: ["Align planning across multiple teams", "Cut avoidable downtime and rework", "Improve execution visibility in real time"],
          image: "https://visionaize.com/wp-content/uploads/2022/07/Rectangle-425-3.png",
        },
        {
          title: "How digital twins change the model",
          body: `A connected 3D environment, grounded in operational data and work-management systems, helps teams rehearse the event, identify risk earlier, and coordinate more effectively before the outage begins.

Instead of relying on spreadsheets and fragmented views, teams can review work packages, plant context, and execution constraints in a shared environment that brings the physical asset and the operating plan together.`,
          bullets: ["Support better scoping and planning", "Visualize work packages and outage status", "Improve handoffs between planning and execution"],
          reverse: true,
          image: "https://visionaize.com/wp-content/uploads/2022/07/unnamed-file.png",
        },
        {
          title: "What this unlocks for plant leaders",
          body: `By bringing the turnaround into a more collaborative digital setting, organizations can reduce surprises, improve schedule confidence, and make it easier for operations, maintenance, and engineering to work toward the same objectives.

The result is a stronger path to lower cost, fewer delays, and better overall asset performance during and after the event.`,
        },
      ]}
      cards={[
        { title: "The Industrial Metaverse", description: "See how immersive industrial environments connect data, operations, and decision-making.", href: "/theindustrialmetaverse", eyebrow: "Perspective" },
        { title: "Digital Twin FAQ", description: "Understand the basics of digital twins and how they create operational value.", href: "/digital-twin-faq", eyebrow: "FAQ" },
        { title: "Remote Performance Monitoring", description: "Explore how connected insight supports safer, smarter operations in the field.", href: "/solutions/remote-performance-monitoring", eyebrow: "Solution" },
      ]}
      cta={{ label: "Download the whitepaper", href: "/contact" }}
    />
  );
}
