/* eslint-disable prettier/prettier */
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
const heroImage = heroSection?.images[0]?.src ?? "/process-performance-prediction/iStock-690047808-scaled.jpg";
const problems = [
  {
    title: "Hybrid Modeling",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "hybrid modeling")?.paragraphs[0] ?? "Detect even the smallest anomalies with first principle and AI models",
  },
  {
    title: "Root Cause Analysis",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "root cause analysis")?.paragraphs[0] ?? "Zero in on root causes and provide actionable recommendations with rule-based and Gen AI",
  },
  {
    title: "What-If Analysis",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "what-if analysis")?.paragraphs[0] ?? "Simulate varying conditions based on data science and industrial process expertise",
  },
  {
    title: "Integrated",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "integrated")?.paragraphs[0] ?? "Insight, simulations, prescriptive actions rolled into a single solution",
  },
];
const introParagraphs = [
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
        image: seedSections[2]?.images[0]?.src ?? "/process-performance-prediction/iStock-1954891394-1-1536x810.jpg",
        bullets: [
          "Avoid process trips, production loss and reduced yield",
          "Eliminate off-spec product issues",
          "Maintain high safety standards of process system and equipment",
          "Reduce shutdown, cleaning and restart-up costs",
        ],
      }}
      caseStudy={{
        title: "Ammonia Plant: Predicting CO2 Excursions",
        image: "/process-performance-prediction/iStock-690047808-scaled.jpg",
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
              "By applying Process Performance Prediction(PPP), Visionaize AI experts identified tags related to CO2 absorber issues, studying 2 years of data for parameters Correlations mapping. Deployed AI/ML for early anomaly detection, quantifying contributing factors, 6 hours prior of high CO2 ppm prediction, GenAI-based recommendations and AI-driven what-if analysis.",
            ],
          },
          {
            key: "Results",
            paragraphs: [
              "Total savings: $4M per incident",
              "Production loss reduction",
              "Catalyst and cleaning cost savings"
            ],
          },
        ],
      }}
      faqHeading="Learn More about Process Performance Prediction"
      faqs={[
        {
          q: "What are some of the key benefits of Process Performance Prediction?",
          a: [
            "By leveraging AI, real-time analytics and remote monitoring capabilities, Process Performance Prediction is a solution that maximizes operational efficiencies at complex, industrial facilities.  Now operations can be guided by data-informed recommendations, saving owners & operators of industrial facilities immense amount of time and energy.",
          ],
        },
        {
          q: "What are the problems that Process Performance Prediction solve?",
          a: [
            "A number of challenges surface in plants.  Cracking heater high coking rate, reactor lump format, degradations, product quality issues are just some examples of challenges that can occur very suddenly and quickly, leading to unplanned shutdowns.  The Process Performance Prediction solution from Visionaize enables owners & operators to proactively spot trouble, often well before a shutdown is required.  The result is a more continuous operation and greater output.",
          ],
        },
        {
          q: "What makes Process Performance Prediction unique?",
          a: [
            "Some data tools are built by data scientists with no practical domain expertise in the industries being served. Visionaize’s Process Performance Prediction solution is different, in that it is designed by those who are rooted in data science and have decades of deep domain experience in heavy industries.  The development of the solutions’s proprietary, innovative KPIs and machine learning logic have been steered by this rich, practical experience.  ",
          ],
        },
        {
          q: "How can I learn more about Process Performance Prediction?",
          a: ["To learn more about Process Performance Prediction and its capabilities, please connect with a product expert."],
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