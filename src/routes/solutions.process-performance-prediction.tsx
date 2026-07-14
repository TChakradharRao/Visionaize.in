import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { getSeedContentItem } from "@/lib/seed-content";

const seedItem = getSeedContentItem("page", "process-performance-prediction");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];
const heroParagraphs = heroSection?.paragraphs?.length
  ? heroSection.paragraphs
  : [
      "Process upsets such as abnormal heater coking, catalyst higher degradation, absorber or column foaming/ flooding, off-spec product quality, are critical issues in any process plant. Operators often get to know them when it's too late to avoid production loss and shutdowns.",
      "Combining industry expertise with cutting edge AI and GenAI technologies, the Visionaize team has developed solutions to not only predict upsets early, and minimize production loss and shutdowns, but avoid them altogether.",
      "Connect with a solution specialist to learn more about how to cut out the downtime.",
    ];
const heroImage = heroSection?.images[0]?.src ?? "https://visionaize.com/wp-content/uploads/2023/12/iStock-514620986-1536x1024.jpg";
const problems = [
  {
    title: "Integrated",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "integrated")?.paragraphs[0] ?? "Insight, simulations, prescriptive actions rolled into a single solution",
  },
  {
    title: "What-If Analysis",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "what-if analysis")?.paragraphs[0] ?? "Simulate varying conditions based on data science and industrial process expertise",
  },
  {
    title: "Root Cause Analysis",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "root cause analysis")?.paragraphs[0] ?? "Zero in on root causes and provide actionable recommendations with rule-based and Gen AI",
  },
  {
    title: "Hybrid Modeling",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "hybrid modeling")?.paragraphs[0] ?? "Detect even the smallest anomalies with first principle and AI models",
  },
];
const introParagraphs = seedSections.find((section) => section.heading?.toLowerCase() === "learn more about process performance prediction")?.paragraphs ?? [
  "Process upset does not just prevent heater run length, catalyst remaining life, or product quality from being met. It often leads to shutdowns, which can have severe impacts on productivity.",
  "Process Performance Prediction combines unique industry expertise with innovative AI &GenAI to help facility owners minimize these impacts.",
];

function ProcessPerformancePredictionPage() {
  return (
    <SolutionPage
      title="Process Performance Prediction (PPP)"
      heroImage={heroImage}
      heroParagraphs={heroParagraphs}
      problems={problems}
      introBand={{
        heading: "Avoid Plant Disruption with Early Detection",
        paragraphs: introParagraphs,
      }}
      benefits={{
        heading: "Increase Your Productivity, by Avoiding Upsets & Shutdowns",
        image: seedSections[2]?.images[0]?.src ?? "https://visionaize.com/wp-content/uploads/2024/03/iStock-1954891394-1-1536x810.jpg",
        bullets: [
          "Avoid process trips, production loss and reduced yield",
          "Eliminate off-spec product issues",
          "Maintain high safety standards of process system and equipment",
          "Reduce shutdown, cleaning and restart-up costs",
        ],
      }}
      caseStudy={{
        title: "Ammonia Plant: Predicting CO2 Excursions",
        image: heroImage,
        tabs: [
          {
            key: "Challenge",
            paragraphs: [
              "A leading chemical and fertilizer company faced issues with foaming in their ammonia plant's CO2 absorber, causing CO2 levels to surpass specifications. This led to downstream temperature spikes of the methanator, affecting catalysts and triggering plant shutdowns. The resulting production loss, cleanup expenses, and safety concerns posed significant challenges for the client.",
            ],
          },
          {
            key: "Solution",
            paragraphs: [
              "Visionaize deployed a hybrid first-principle + AI model to monitor the CO2 absorber in real time, detect early signs of foaming, and alert operators with prescriptive recommendations — well before CO2 levels exceeded spec.",
            ],
          },
          {
            key: "Results",
            paragraphs: [
              "Early detection eliminated unplanned methanator trips, protected catalyst life, and recovered significant lost production hours each quarter.",
            ],
          },
        ],
      }}
      faqHeading="Learn More about Process Performance Prediction"
      faqs={[
        {
          q: "What are some of the key benefits of Process Performance Prediction?",
          a: [
            "By leveraging AI, real-time analytics and remote monitoring capabilities, Process Performance Prediction is a solution that maximizes operational efficiencies at complex, industrial facilities. Now operations can be guided by data-informed recommendations, saving owners & operators of industrial facilities immense amount of time and energy.",
          ],
        },
        {
          q: "What are the problems that Process Performance Prediction solve?",
          a: [
            "PPP addresses unpredictable process upsets — heater coking, catalyst degradation, absorber/column foaming and flooding, and off-spec product — which traditionally surface too late to prevent production loss or shutdowns.",
          ],
        },
        {
          q: "What makes Process Performance Prediction unique?",
          a: [
            "PPP fuses first-principle physics-based models with AI/GenAI and deep domain expertise to detect even the smallest anomalies and recommend prescriptive actions.",
          ],
        },
        {
          q: "How can I learn more about Process Performance Prediction?",
          a: ["Connect with a Visionaize solutions expert for a personalized walkthrough and demo."],
        },
      ]}
      faqCtaLabel="Request a demo"
    />
  );
}

export const Route = createFileRoute("/solutions/process-performance-prediction")({
  head: () => ({
    meta: [
      { title: "Process Performance Prediction (PPP) — Visionaize" },
      {
        name: "description",
        content:
          "Predict process upsets early with AI & GenAI. Minimize production loss and shutdowns at process plants.",
      },
    ],
  }),
  component: ProcessPerformancePredictionPage,
});
