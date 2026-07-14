import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { getSeedContentItem } from "@/lib/seed-content";

const seedItem = getSeedContentItem("page", "real-time-optimization");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];
const heroParagraphs = heroSection?.paragraphs?.length
  ? heroSection.paragraphs
  : [
      "Operating conditions, feedstock availability and plant dynamic behavior often stray from what was planned during the design & build phase, resulting in sub-optimal productivity.",
      "Visionaize's RTO solution is designed to maximize production/yield and minimize energy consumption, through a combination of “first principle” physics-based models and advanced AI algorithms.",
      "Connect with an expert to learn more.",
    ];
const heroImage = heroSection?.images[0]?.src ?? "https://visionaize.com/wp-content/uploads/2024/03/iStock-6817332800.5x-1-1-1536x1024.png";
const problems = [
  {
    title: "Open or Close Loop",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "open or close loop")?.paragraphs[0] ?? "RTO as an advisor for open loop and Integrated RTO + software agnostic APC for close loop",
  },
  {
    title: "Flexible Objectives",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "flexible objectives")?.paragraphs[0] ?? "Profit, yield, energy – freely adapt to the operating goals that are most critical",
  },
  {
    title: "AI Optimization",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "ai optimization")?.paragraphs[0] ?? "Advanced AI algorithms to determine global maxima/ minima that continuously optimizes performance",
  },
  {
    title: "Plant Predictive Model",
    body: seedSections.find((section) => section.heading?.toLowerCase() === "plant predictive model")?.paragraphs[0] ?? "Plant fundamental model using AI and engineering models along with safe & stable operating range",
  },
];

function RealTimeOptimizationPage() {
  return (
    <SolutionPage
      title="Real-Time Optimization (RTO)"
      heroImage={heroImage}
      heroParagraphs={heroParagraphs}
      problems={problems}
      introBand={{
        heading: "Optimizing Performance Means Adapting for Change",
        paragraphs: [
          "We all know that plant behavior changes over time. Product requirements get updated. Feedstock availability fluctuates. The only way to maximize performance over time is to be able to adapt to changing conditions. Visionaize's RTO solution addresses these plant dynamics by using its AI capability and domain, optimization & process control expertise.",
        ],
      }}
      benefits={{
        heading: "Optimize Yield, while Staying within Safe & Stable Limits",
        image: seedSections[1]?.images[0]?.src ?? "https://visionaize.com/wp-content/uploads/2024/03/iStock-1973069940-1536x810.jpg",
        bullets: [
          "Continuous production of optimal product mix",
          "Yield improvements of overall liquid products",
          "Decrease energy consumption by 5-10%",
          "Improve margins by 3-5%",
        ],
      }}
      caseStudy={{
        title: "Refinery Optimization: Fluid Catalytic Cracking",
        image: heroImage,
        tabs: [
          {
            key: "Challenge",
            paragraphs: [
              "A large refinery in The Middle East often experienced changes in product requirements, feedstock availability and also observed dynamic behavior of their FCC unit. However, their FCC unit was not designed for these dynamic conditions. Hence, there was always a gap between current and optimal performance of the FCC unit, leaving a lot of benefits on the table.",
            ],
          },
          {
            key: "Solution",
            paragraphs: [
              "Visionaize deployed its RTO solution combining first-principle FCC models with AI optimization, continuously tuned for changing feedstock and product objectives, integrated with the refinery's APC layer.",
            ],
          },
          {
            key: "Results",
            paragraphs: [
              "The refinery closed the gap to optimal performance, improved yield of high-value liquid products, reduced energy consumption and increased margins — all while staying within safe and stable operating limits.",
            ],
          },
        ],
      }}
      faqHeading="Learn More about Real-Time Optimization"
      faqs={[
        {
          q: "What are some of the key benefits of Real-Time Optimization?",
          a: ["RTO enables continuous production of the optimal product mix, drives greater yield, increases margins and decreases energy consumption."],
        },
        {
          q: "What are the problems that Real-Time Optimization solve?",
          a: [
            "Plant operating conditions, feedstock, and demand patterns shift constantly. Without real-time optimization, plants run sub-optimally, missing yield, energy and margin opportunities.",
          ],
        },
        {
          q: "What makes Real-Time Optimization unique?",
          a: [
            "Visionaize RTO combines first-principle plant models with advanced AI algorithms and works as an advisor (open loop) or fully integrated with software-agnostic APC (closed loop).",
          ],
        },
        {
          q: "How can I learn more about Real-Time Optimization?",
          a: ["Connect with a Visionaize expert for a demo tailored to your unit."],
        },
      ]}
      faqCtaLabel="Request a demo"
    />
  );
}

export const Route = createFileRoute("/solutions/real-time-optimization")({
  head: () => ({
    meta: [
      { title: "Real-Time Optimization (RTO) — Visionaize" },
      {
        name: "description",
        content:
          "Maximize production/yield and minimize energy consumption with first principle models and advanced AI algorithms.",
      },
    ],
  }),
  component: () => (
    <SolutionPage
      title="Real-Time Optimization (RTO)"
      heroImage="https://visionaize.com/wp-content/uploads/2024/03/iStock-6817332800.5x-1-1-1536x1024.png"
      heroParagraphs={[
        "Operating conditions, feedstock availability and plant dynamic behavior often stray from what was planned during the design & build phase, resulting in sub-optimal productivity.",
        "Visionaize's RTO solution is designed to maximize production/yield and minimize energy consumption, through a combination of \u201Cfirst principle\u201D physics-based models and advanced AI algorithms.",
        "Connect with an expert to learn more.",
      ]}
      problems={[
        { title: "Open or Close Loop", body: "RTO as an advisor for open loop and Integrated RTO + software agnostic APC for close loop" },
        { title: "Flexible Objectives", body: "Profit, yield, energy – freely adapt to the operating goals that are most critical" },
        { title: "AI Optimization", body: "Advanced AI algorithms to determine global maxima/ minima that continuously optimizes performance" },
        { title: "Plant Predictive Model", body: "Plant fundamental model using AI and engineering models along with safe & stable operating range" },
      ]}
      introBand={{
        heading: "Optimizing Performance Means Adapting for Change",
        paragraphs: [
          "We all know that plant behavior changes over time. Product requirements get updated. Feedstock availability fluctuates. The only way to maximize performance over time is to be able to adapt to changing conditions. Visionaize's RTO solution addresses these plant dynamics by using its AI capability and domain, optimization & process control expertise.",
        ],
      }}
      benefits={{
        heading: "Optimize Yield, while Staying within Safe & Stable Limits",
        image: "https://visionaize.com/wp-content/uploads/2024/03/iStock-1973069940-1536x810.jpg",
        bullets: [
          "Continuous production of optimal product mix",
          "Yield improvements of overall liquid products",
          "Decrease energy consumption by 5-10%",
          "Improve margins by 3-5%",
        ],
      }}
      caseStudy={{
        title: "Refinery Optimization: Fluid Catalytic Cracking",
        image: "https://visionaize.com/wp-content/uploads/2024/03/iStock-6817332800.5x-1-1-1536x1024.png",
        tabs: [
          {
            key: "Challenge",
            paragraphs: [
              "A large refinery in The Middle East often experienced changes in product requirements, feedstock availability and also observed dynamic behavior of their FCC unit. However, their FCC unit was not designed for these dynamic conditions. Hence, there was always a gap between current and optimal performance of the FCC unit, leaving a lot of benefits on the table.",
            ],
          },
          {
            key: "Solution",
            paragraphs: [
              "Visionaize deployed its RTO solution combining first-principle FCC models with AI optimization, continuously tuned for changing feedstock and product objectives, integrated with the refinery's APC layer.",
            ],
          },
          {
            key: "Results",
            paragraphs: [
              "The refinery closed the gap to optimal performance, improved yield of high-value liquid products, reduced energy consumption and increased margins — all while staying within safe and stable operating limits.",
            ],
          },
        ],
      }}
      faqHeading="Learn More about Real-Time Optimization"
      faqs={[
        {
          q: "What are some of the key benefits of Real-Time Optimization?",
          a: ["RTO enables continuous production of the optimal product mix, drives greater yield, increases margins and decreases energy consumption."],
        },
        {
          q: "What are the problems that Real-Time Optimization solve?",
          a: [
            "Plant operating conditions, feedstock, and demand patterns shift constantly. Without real-time optimization, plants run sub-optimally, missing yield, energy and margin opportunities.",
          ],
        },
        {
          q: "What makes Real-Time Optimization unique?",
          a: [
            "Visionaize RTO combines first-principle plant models with advanced AI algorithms and works as an advisor (open loop) or fully integrated with software-agnostic APC (closed loop).",
          ],
        },
        {
          q: "How can I learn more about Real-Time Optimization?",
          a: ["Connect with a Visionaize expert for a demo tailored to your unit."],
        },
      ]}
      faqCtaLabel="Request a demo"
    />
  ),
});
