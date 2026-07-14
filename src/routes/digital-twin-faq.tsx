import { createFileRoute } from "@tanstack/react-router";
import { InsightPage } from "@/components/site/InsightPage";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/digital-twin-faq")({
  head: () => ({
    meta: [
      { title: "Digital Twin FAQ — Visionaize" },
      { name: "description", content: "Answers to common questions about digital twins, their applications, and the value they create across complex industrial environments." },
    ],
  }),
  component: DigitalTwinFaqPage,
});

// --- Accordion primitives, styled to match the "+ / −" reference pattern ---

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionGroup = {
  title: string;
  items: AccordionItem[];
};

function AccordionRow({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 py-4 text-left"
      >
        <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center text-gray-700">
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
        <span className="text-lg font-semibold text-gray-900">{item.question}</span>
      </button>
      {open && (
        <div className="pb-5 pl-8 pr-2 text-gray-600 leading-relaxed">
          {item.answer}
        </div>
      )}
    </div>
  );
}

function AccordionSection({ group }: { group: AccordionGroup }) {
  return (
    <section className="mx-auto max-w-3xl py-10">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">{group.title}</h2>
      <div>
        {group.items.map((item) => (
          <AccordionRow key={item.question} item={item} />
        ))}
      </div>
    </section>
  );
}

// --- Sections 3–7 content, in accordion form ---

const accordionGroups: AccordionGroup[] = [
  {
    title: "Why Digital Twins Matter",
    items: [
      {
        question: "Why does it matter for industrial organizations?",
        answer:
          "When data is contextualized inside a digital twin, engineers and operators can act on the right information at the right time and align their work around a single source of truth. That improves planning, helps teams avoid unnecessary downtime, and creates a stronger foundation for AI, automation, and remote collaboration. For asset-intensive businesses, that means better visibility, better coordination, and more confidence in the decisions being made around critical operations.",
      },
    ],
  },
  {
    title: "What a Digital Twin Can Be Used For",
    items: [
      {
        question: "Managing industrial processes",
        answer:
          "Digital twins can track production KPIs and identify bottlenecks in real time, helping teams monitor and optimize industrial processes as they happen.",
      },
      {
        question: "Monitoring infrastructure",
        answer:
          "Digital twins can track the performance of critical infrastructure, such as power grids and transportation networks, helping predict demand peaks and prevent failures.",
      },
      {
        question: "Training AI models",
        answer:
          "Digital twins provide a simulated environment where AI models, including autonomous vehicles, can be trained safely before deployment in the real world.",
      },
      {
        question: "Managing construction projects",
        answer:
          "Digital twins can track construction progress end to end, flag potential risks, and help optimize the use of resources on site.",
      },
    ],
  },
  {
    title: "Background on Digital Twins",
    items: [
      {
        question: "Who invented digital twins?",
        answer:
          "Conceptually, the first digital twin was used by NASA during the Apollo 13 mission. The term itself was coined by Dr. Michael Grieves of the University of Michigan in 2002, who described it as a dynamic software model mirroring the physical characteristics and operational performance of a manufactured product or system. The concept has since expanded well beyond manufacturing.",
      },
    ],
  },
  {
    title: "Benefits of a Digital Twin",
    items: [
      {
        question: "Reducing downtime",
        answer: "Identifying potential problems before they occur helps minimize unplanned downtime.",
      },
      {
        question: "Improving quality control",
        answer: "Continuous monitoring throughout the manufacturing process helps catch quality issues early.",
      },
      {
        question: "Reducing costs",
        answer:
          "Optimizing processes and reducing waste lowers operating costs, while remote operations cut down the resources needed to monitor an asset.",
      },
      {
        question: "Improving safety",
        answer: "Identifying hazards and risks through preventive maintenance keeps teams safer on site.",
      },
      {
        question: "Reducing carbon emissions",
        answer:
          "Fewer trips to the facility lower emissions, since a fuller scope of work can be planned and coordinated proactively through the digital twin.",
      },
    ],
  },
  {
    title: "Digital Twins in Oil and Gas",
    items: [
      {
        question: "How are digital twins used in oil and gas?",
        answer:
          "They enable Operations Center and field teams to optimize wellhead production and refinery performance, delivering digital insights within the industrial metaverse so teams can plan, optimize, and execute work while keeping people safe, operations compliant, and processes on track. Data-driven insights placed within an intelligent 3D digital twin let teams visualize and verify the actions they need to take, with plans laid out in a richly annotated, high-resolution simulation of the operation.",
      },
    ],
  },
];

function DigitalTwinFaqPage() {
  return (
    <InsightPage
      title="Digital Twin FAQ"
      eyebrow="Knowledge Center"
      intro="Learn how digital twins work, where they deliver value, and why they are becoming a core part of asset-intensive operations across manufacturing, oil and gas, power, and other regulated industries."
      heroImage="https://visionaize.com/wp-content/uploads/2024/12/90045162083.png"
      sections={[
        {
          title: "How does a digital twin work?",
          body: `A digital twin is a live virtual replica of a physical asset, process, or facility. It combines engineering, operations, and maintenance data so teams can understand what is happening, predict what could happen next, and make better decisions faster.

In practice, this means plant operators, reliability teams, and engineering leaders can work from the same view of the asset while applying analytics, AI, and operational context to real conditions on the ground.`,
          bullets: ["Connect process, asset, and maintenance data", "Support remote monitoring and predictive operations", "Improve safety, productivity, and reliability"],
          image: "https://visionaize.com/wp-content/uploads/2025/01/49350947222.png",
        },
        {
          title: "What is a digital twin used for?",
          body: `Digital twins are used to monitor performance, reduce downtime, support training, guide maintenance activities, and connect teams to a shared view of the plant. They can support everything from day-to-day operations to capital planning, reliability programs, and AI-enabled decision support.

They are especially useful when organizations want to turn disconnected data into a clear operational picture that people across the business can understand and act on.`,
          bullets: ["Operations and maintenance workflows", "Reliability and inspection planning", "Training, simulation, and decision support"],
          reverse: true,
          image: "https://visionaize.com/wp-content/uploads/2024/05/P-and-I-D-document-digitized-2.png",
        },
      ]}
      cards={[
        { title: "Blog", description: "Read articles on AI, industrial transformation, and digital twin strategy.", href: "/blog", eyebrow: "Insights" },
        { title: "The Industrial Metaverse", description: "See how immersive industrial environments connect people, data, and operations.", href: "/theindustrialmetaverse", eyebrow: "Concept" },
        { title: "Pharmaceutical Manufacturing", description: "Discover how digital twins and smart apps improve monitoring and optimization in regulated environments.", href: "/ai-in-pharmaceutical-manufacturing", eyebrow: "Use case" },
      ]}
      cta={{ label: "Request a demo", href: "/contact" }}
    >
      {accordionGroups.map((group) => (
        <AccordionSection key={group.title} group={group} />
      ))}
    </InsightPage>
  );
}