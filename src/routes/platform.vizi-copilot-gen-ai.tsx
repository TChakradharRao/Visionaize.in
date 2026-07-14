import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/platform/vizi-copilot-gen-ai")({
  head: () => ({
    meta: [
      { title: "VIZI CoPilot Gen AI | Visionaize" },
      {
        name: "description",
        content:
          "VIZI CoPilot Gen AI delivers precise, rapid responses to complex queries — boosting operational efficiency across O&M, safety, and capital projects.",
      },
      { property: "og:title", content: "VIZI CoPilot Gen AI | Visionaize" },
      {
        property: "og:description",
        content:
          "VIZI CoPilot Gen AI delivers precise, rapid responses to complex queries — boosting operational efficiency across O&M, safety, and capital projects.",
      },
      {
        property: "og:image",
        content:
          "https://visionaize.com/wp-content/uploads/2024/08/Gen-AI-image-ver-3.0-1024x683.png",
      },
    ],
  }),
  component: ViziCopilotPage,
});

const WP = "https://visionaize.com/wp-content/uploads";

/* ---------- helpers ---------- */
const ViziMark = () => (
  <img
    src={`${WP}/2025/08/Visionaize_logo_without_text.png`}
    alt=""
    className="inline-block h-[0.9em] w-auto align-[-0.12em] mx-1"
  />
);

const GradHeading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h1
    className={`text-[40px] md:text-[52px] leading-[1.15] font-semibold bg-gradient-to-r from-[#7BC242] via-[#3FB6A8] to-[#1F9CD8] bg-clip-text text-transparent ${className}`}
  >
    {children}
  </h1>
);

const PrimaryCTA = ({ children }: { children: React.ReactNode }) => (
  <a
    href="/contact"
    className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-md transition hover:opacity-95"
    style={{
      background:
        "linear-gradient(90deg,#7BC242 0%,#3FB6A8 50%,#1F9CD8 100%)",
    }}
  >
    {children}
  </a>
);

const GhostCTA = ({ children }: { children: React.ReactNode }) => (
  <a
    href="/contact"
    className="inline-flex items-center justify-center rounded-full border border-brand-navy/80 px-8 py-3.5 text-base font-semibold text-brand-navy hover:bg-brand-navy hover:text-white transition"
  >
    {children}
  </a>
);

/* ---------- data ---------- */
const PILLARS = [
  { icon: `${WP}/2024/08/Mask-group-33.svg`, label: "Leverage Existing Data and\nDocuments For Instant Insights" },
  { icon: `${WP}/2024/08/Mask-group-34.svg`, label: "Receive Actionable\nRecommendations" },
  { icon: `${WP}/2024/08/Mask-group-35.svg`, label: "Improve Operational\nEfficiency" },
];

const EMBEDDED = {
  title: "Embedded CoPilots within our AI and 3D Digital Twin Applications",
  image: `${WP}/2024/06/RPM-1.jpeg`,
  intro:
    "Our applications, embedded with VIZI CoPilot, provide prescriptive, action-oriented problem-solving capabilities through root cause analysis, actionable recommendations, and workflows.",
  bullets: [
    ["Remote Performance Monitoring", "Trained on your specific data and logs, offers tailored, actionable recommendations when you ask for assistance."],
    ["Process Performance Prediction", "Trained on your data and expert RCAs, identifies causes and offers precise, advisory-level recommendations."],
    ["Predictive Maintenance", "VIZI CoPilot combines FMEA-based RCA with GenAI to accurately identify issues and provide actionable recommendations, minimizing false positives."],
    ["3D Digital Twin Application", "VIZI CoPilot integrates with V-Plant, assisting in tasks like work packages, P&ID mapping, and queries for streamlined operations."],
  ] as [string, string][],
};

const STANDALONE = {
  title: "Standalone CoPilots for O&M, Safety, and Capital Projects:",
  image: `${WP}/2024/06/Inspector.jpeg`,
  intro:
    "Our VIZI CoPilots are designed to support a variety of standalone Gen AI operations and maintenance (O&M), safety, and capital project use cases, including:",
  bullets: [
    ["Process Troubleshooting Assistant", "Get real-time assistance and technical support for troubleshooting."],
    ["Maintenance Technician Assistant", "Equip your field technicians with GenAI-driven guidance and support."],
    ["Inventory Management Assistant", "Manage your spare parts inventory with intelligent management solutions driven by GenAI."],
    ["Capital Project Assistant", "Enhance your EPC project performance and ensure smooth commissioning and startup with GenAI-driven insights."],
    ["HSE Procedures", "Implement and maintain robust health, safety, and environmental procedures with Gen AI support."],
  ] as [string, string][],
};

const TRANSFORM_BULLETS: [string, string][] = [
  ["Optimize Actions and Generate New Ideas", "Enhance decision-making and foster innovation with fresh ideas and concepts."],
  ["Automate Routine Tasks", "Boost efficiency by automating repetitive tasks, saving time and reducing costs, while allowing your team to focus on more complex work."],
  ["Create Personalized Content and Recommendations", "Deliver tailored solutions and recommendations based on specific needs."],
  ["Facilitate Collaboration", "Enhance team collaboration with shared Gen AI-driven insights and recommendations."],
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Which large language model (LLM) do you use?",
    a: "VIZI CoPilot uses OpenAI, Azure OpenAI, Gemini and Llama for prompting/ training purposes to maximize the accuracy. But for deployment, we are flexible and can use any of LLMs as per client requirements while minimizing the cost of operation.",
  },
  {
    q: "Can you deploy GenAI application on premise or only on cloud?",
    a: "VIZI CoPilot can be deployed on-premise, on private cloud, or on public cloud — whichever best fits your data residency, security, and operational policies.",
  },
  {
    q: "Once VIZI CoPilot is deployed, can the user add more documents for the same application and get the insights out of these?",
    a: "Yes. Users can continuously add new documents and data sources; the system re-indexes them and incorporates the new content into responses without re-training the underlying model.",
  },
  {
    q: "Can user comment if he/ she doesn't like the answer and whether the system learn from it?",
    a: "Users can flag and comment on responses. That feedback is captured and used in our continual improvement loop to refine retrieval, prompts, and ranking over time.",
  },
  {
    q: "How does the Retrieval Augmented Generation (RAG) work?",
    a: "Your documents are chunked, embedded and stored in a vector database. At query time we retrieve the most relevant passages and pass them to the LLM as grounded context, producing answers backed by your own knowledge base.",
  },
  {
    q: "Does VIZI CoPilot have hallucination control?",
    a: "Yes — answers are grounded in retrieved passages, citations are surfaced, low-confidence responses are filtered, and guardrails restrict the model to in-scope content.",
  },
  {
    q: "What are the output formats?",
    a: "Responses can be returned as natural-language answers, structured JSON, tables, and downloadable reports — and embedded into existing dashboards and workflows.",
  },
  {
    q: "What is the VIZI CoPilot accelerator?",
    a: "A pre-built deployment kit — connectors, prompt templates, ingestion pipelines and evaluation harness — that gets a production-grade CoPilot live for your use case in weeks, not months.",
  },
];

/* ---------- page ---------- */
function ViziCopilotPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-6 pt-14 pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <GradHeading>
                VIZI <ViziMark /> CoPilot Gen AI Delivers Precise, Rapid Responses, Improving Operational Efficiency
              </GradHeading>
              <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-brand-ink/80">
                VIZI <ViziMark /> CoPilot is redefining how facilities operate by delivering precise, rapid responses to complex queries and challenges. This innovative technology streamlines decision-making processes, providing accurate insights in real time from unstructured data and documents, which enables organizations to optimize operations, and drive productivity.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <PrimaryCTA>Talk to an expert</PrimaryCTA>
                <GhostCTA>Access demo</GhostCTA>
              </div>
            </div>
            <div>
              <img
                src={`${WP}/2024/08/Gen-AI-image-ver-3.0-1024x683.png`}
                alt="VIZI CoPilot Gen AI"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* PILLARS NAVY BAND */}
        <section className="bg-brand-navy py-16">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.label} className="flex flex-col items-center text-center">
                <img src={p.icon} alt="" className="h-16 w-16" />
                <h3 className="mt-6 whitespace-pre-line text-[20px] font-medium leading-snug text-white">
                  {p.label}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* FLEXIBILITY SECTION */}
        <section className="bg-[#F5F7F9] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mx-auto max-w-5xl text-center text-[32px] md:text-[40px] font-semibold leading-tight text-brand-navy">
              VIZI <ViziMark /> CoPilot Offers Flexibility By Operating Either Standalone or Embedded Within Other Solutions to Drive Operational Excellence.
            </h2>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {[EMBEDDED, STANDALONE].map((card) => (
                <div
                  key={card.title}
                  className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5"
                >
                  <img src={card.image} alt="" className="h-72 w-full object-cover" />
                  <div className="p-8">
                    <h3 className="text-[24px] font-semibold leading-snug text-brand-navy">
                      {card.title}
                    </h3>
                    <p className="mt-5 text-[15px] leading-relaxed text-brand-ink/80">
                      {card.intro.includes("VIZI") ? (
                        <>
                          {card.intro.split("VIZI")[0]}
                          VIZI <ViziMark /> {card.intro.split("VIZI").slice(1).join("VIZI").replace(/^\s*CoPilot/, "CoPilot")}
                        </>
                      ) : (
                        card.intro
                      )}
                    </p>
                    <ul className="mt-5 space-y-4">
                      {card.bullets.map(([k, v]) => (
                        <li key={k} className="flex gap-3 text-[15px] leading-relaxed text-brand-ink/80">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-ink/60" />
                          <span>
                            <strong className="font-semibold text-brand-navy">{k}</strong>: {v}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIME STATS BAND */}
        <section className="bg-[#A4D233] py-7">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-6 text-center text-[20px] md:text-[22px] font-medium text-brand-navy">
            {["Operational Efficiency Improvement > 20%", "Productivity Gain > 25%", "Payback Period < 6 months"].map((s) => (
              <span key={s} className="inline-flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#1F9CD8]" />
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* TRANSFORM SECTION */}
        <section className="bg-[#F5F7F9] py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <GradHeading className="text-[36px] md:text-[44px]">
                With VIZI <ViziMark /> CoPilot You Can Transform Your Operations Today
              </GradHeading>
              <ul className="mt-8 space-y-5">
                {TRANSFORM_BULLETS.map(([k, v]) => (
                  <li key={k} className="flex gap-3 text-[15px] leading-relaxed text-brand-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-ink/60" />
                    <span>
                      <strong className="font-semibold text-brand-navy">{k}</strong>: {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src={`${WP}/2024/08/Vizi-Copilot-Chat-Image.png`}
                alt="VIZI CoPilot chat"
                className="w-full rounded-xl shadow-xl ring-1 ring-black/5"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h3 className="text-[28px] md:text-[34px] font-semibold text-brand-navy">
              Learn More about VIZI <ViziMark /> CoPilot Gen AI
            </h3>
            <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
              {FAQS.map((f, i) => (
                <FaqRow key={f.q} faq={f} defaultOpen={i === 0} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <PrimaryCTA>
                Speak to a VIZI <ViziMark /> CoPilot Expert Today
              </PrimaryCTA>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FaqRow({ faq, defaultOpen }: { faq: { q: string; a: string }; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-4 text-left"
      >
        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white">
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
        <span className="text-[17px] font-medium text-brand-navy">{faq.q}</span>
      </button>
      {open && (
        <div className="mt-3 pl-10 text-[15px] leading-relaxed text-brand-ink/80">{faq.a}</div>
      )}
    </div>
  );
}
