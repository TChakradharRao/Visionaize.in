import { createFileRoute, Link } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { getSeedContentItem } from "@/lib/seed-content";

const seedItem = getSeedContentItem("page", "decarbonization");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];
const heroParagraphs = heroSection?.paragraphs?.length
  ? heroSection.paragraphs
  : [
      "Companies lack real-time quantification and monitoring of carbon emissions and the ability to identify large emission sources, due to evolving regulations, lack of sensors and the dynamic nature of emissions.",
      "Many plant operators struggle with managing carbon emissions and energy consumption due to process upsets, unscheduled flaring events and inefficient operations. Visionaize DecarbAI meets these challenges head on. Connect with us to see how it works.",
    ];
const heroImage = heroSection?.images[0]?.src ?? "/decarbonization/oil-1685981_1920.jpg";
const problems = [
  {
    title: "Quantify",
    body:
      seedSections.find((section) => section.heading?.toLowerCase() === "quantify")?.paragraphs[0] ??
      "Estimate emissions at source level or Battery Limit; use regulatory-approved methodologies",
  },
  {
    title: "Monitor",
    body:
      seedSections.find((section) => section.heading?.toLowerCase() === "monitor")?.paragraphs[0] ??
      "Track & analyze real-time emissions; Raise alerts and GenAI-based recommendations",
  },
  {
    title: "Report",
    body:
      seedSections.find((section) => section.heading?.toLowerCase() === "report")?.paragraphs[0] ??
      "Auto-generated reporting and automated carbon and emissions accounting to improve efficiency",
  },
  {
    title: "Strategize",
    body:
      seedSections.find((section) => section.heading?.toLowerCase() === "strategize")?.paragraphs[0] ??
      "Reduce emissions by minimize consumption, avoid unplanned shutdowns and large flaring",
  },
];
const introParagraphs = seedSections.find((section) => section.heading?.toLowerCase() === "common problems, unique solutions")?.paragraphs ?? [
  "Looking for a comprehensive approach to carbon emission monitoring and reduction? The Visionaize DecarbAI solution covers scope 1 direct emissions, scope 2 indirect emissions and scope 3 indirect emissions from others' sources. Reduce carbon emissions by efficient energy management, and by reducing plant upsets and shutdowns which result heavy emissions from flare and other sources.",
];

function DecarbonizationPage() {
  return (
    <SolutionPage
      title="DecarbAI"
      heroImage={heroImage}
      heroParagraphs={heroParagraphs}
      problems={problems}
     introBand={{
  heading: "Empowering Sustainability: Monitor, Reduce, Thrive!",
  paragraphs: [
    "Looking for a comprehensive approach to carbon emission monitoring and reduction? The Visionaize DecarbAI solution covers scope 1 direct emissions, scope 2 indirect emissions and scope 3 indirect emissions from others' sources. Reduce carbon emissions by efficient energy management, and by reducing plant upsets and shutdowns which result heavy emissions from flare and other sources.",
  ],
}}
      benefits={{
        heading: (
          <>
            Reduce Carbon Emissions
            <br />
            <span className="text-3xl md:text-4xl text-slate-700">by up to 8%</span>
          </>
        ),
        image:
          seedSections.find((section) => section.heading?.toLowerCase() === "strategize")?.images[0]?.src ??
          "/decarbonization/iStock-1954891394-1-min-1-1536x810.png",
        bullets: [
          "Identification of high emission sources (units/equipment).",
          "Real-time emissions monitoring, enabling effective and timely actions to reduce net emissions.",
          "Energy efficiency improvement using what-if and optimization techniques.",
          "People efficiency for emissions report generation – for internal and external stakeholders.",
        ],
      }}
      faqHeading="Learn More about DecarbAI"
      faqs={[
        {
          q: "What are some of the key benefits of DecarbAI?",
          a: [
            "Visionaize DecarbAI enables the identification of high emission sources, energy efficiency improvements through what-if and optimization techniques, and provides monitoring & reporting capabilities that help develop action plans for fast remediation.",
          ],
        },
        {
          q: "What are the problems that DecarbAI solve?",
          a: [
            "Mounting expectations from investors, regulators, customers, and various stakeholders regarding environmental, social, and governance matters, decarbonization has emerged as a central concern for companies spanning heavy industries. Fortunately, Visionaize DecarbAI offers a transformative solution to address these challenges.",
          ],
        },
        {
          q: "What makes DecarbAI unique?",
          a: [
            "Some data tools are built by data scientists with no practical domain expertise in the industries being served. Visionaize’s DecarbAI solution is different, in that it is designed by those who are rooted in data science and have decades of experience in heavy industries.  The development of the solutions’s  innovative monitoring and machine learning logic have been steered by this hands on industry experience.  ",
          ],
        },
        {
          q: "How can I learn more about DecarbAI?",
          a: [
            <>
              To learn more about DecarbAI and its capabilities, please{" "}
              <Link to="/contact" className="text-blue-600 no-underline hover:no-underline">
                connect with a product expert
              </Link>
              .
            </>,
          ],
        },
      ]}
      faqCtaLabel="Request a demo"
    />
  );
}

export const Route = createFileRoute("/solutions/decarbonization")({
  head: () => ({
    meta: [
      { title: "DecarbAI — Visionaize" },
      {
        name: "description",
        content:
          "Real-time quantification, monitoring and reduction of carbon emissions across scope 1, 2 and 3 with Visionaize DecarbAI.",
      },
    ],
  }),
  component: DecarbonizationPage,
});