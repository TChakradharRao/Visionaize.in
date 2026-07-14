import { createFileRoute } from "@tanstack/react-router";
import { InsightPage } from "@/components/site/InsightPage";

export const Route = createFileRoute("/ai-in-pharmaceutical-manufacturing")({
  head: () => ({
    meta: [
      { title: "AI in Pharmaceutical Manufacturing — Visionaize" },
      { name: "description", content: "See how AI, digital twins, and smart apps are helping pharmaceutical manufacturers improve operations, compliance, and visibility." },
    ],
  }),
  component: PharmaceuticalManufacturingPage,
});

function PharmaceuticalManufacturingPage() {
  return (
    <InsightPage
      title="AI in Pharmaceutical Manufacturing"
      eyebrow="Industry Use Case"
      intro="Pharmaceutical manufacturing demands precision, compliance, and rapid visibility into plant performance. AI-powered digital twins make it easier to monitor critical processes, strengthen quality workflows, and respond faster to change."
      heroImage="https://visionaize.com/wp-content/uploads/2025/01/49350947222.png"
      stats={[
        { label: "Yield improvement", value: "+1.5%" },
        { label: "Energy reduction", value: "10%" },
        { label: "Operational efficiency", value: "+20%" },
        { label: "Carbon reduction", value: "8%" },
      ]}
      sections={[
        {
          title: "A smarter way to monitor and optimize",
          body: "By combining plant data, engineering context, and AI models, teams can identify anomalies earlier, improve process control, and create a more proactive operating model. The goal is not only to understand performance, but to make that insight available in a format that helps teams act quickly and confidently.",
          bullets: ["Improve monitoring of process and asset performance", "Unify data across operations and maintenance", "Support better decisions in regulated environments"],
          image: "https://visionaize.com/wp-content/uploads/2024/12/27884641567-1.png",
        },
        {
          title: "Supporting quality, resilience, and speed",
          body: "Industrial AI helps teams reduce manual analysis, react faster to process drift, and improve visibility across sites without adding unnecessary complexity. That is especially important in pharmaceutical environments where quality, compliance, and uptime all depend on fast, reliable information.",
          bullets: ["Strengthen operational resilience", "Improve traceability and collaboration", "Accelerate time to insight for critical events"],
          reverse: true,
          image: "https://visionaize.com/wp-content/uploads/2025/07/Blog-Visualization-Context-23.07.2025.png",
        },
        {
          title: "A practical foundation for continuous improvement",
          body: "From remote monitoring to process optimization, digital twins can help manufacturers establish a stronger operating model grounded in shared visibility and more intelligent decision support.",
        },
      ]}
      cards={[
        { title: "Remote Performance Monitoring", description: "See how connected insight helps teams monitor plant performance from anywhere.", href: "/solutions/remote-performance-monitoring", eyebrow: "Solution" },
        { title: "V-Smart DocX", description: "Digitize and structure plant documentation to support faster planning and better knowledge access.", href: "/platform/v-smart-docx", eyebrow: "Platform" },
        { title: "Digital Twin FAQ", description: "Explore the foundational concepts behind digital twin deployments.", href: "/digital-twin-faq", eyebrow: "FAQ" },
      ]}
      cta={{ label: "Book a discovery call", href: "/contact" }}
    />
  );
}
