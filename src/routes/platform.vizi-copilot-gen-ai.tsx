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
          "/vizi-copilot-gen-ai/Gen-AI-image-ver-3.0-1024x683.png",
      },
    ],
  }),
  component: ViziCopilotPage,
});

const WP = "/vizi-copilot-gen-ai";

/* ---------- helpers ---------- */
const ViziMark = () => (
  <img
    src={`${WP}/Visionaize_logo_without_text.png`}
    alt=""
    className="inline-block h-[0.9em] w-auto align-[-0.12em] mx-1"
  />
);

/**
 * Renders any string, inserting <ViziMark /> between "VIZI" and "CoPilot"
 * wherever that phrase appears. Falls back to the plain string otherwise.
 * Used for card intros and bullet descriptions that mention VIZI CoPilot.
 */
function renderWithVizi(text: string) {
  if (!text.includes("VIZI")) return text;

  const before = text.split("VIZI")[0];
  const afterRaw = text.split("VIZI").slice(1).join("VIZI");
  const after = afterRaw.replace(/^\s*CoPilot/, "CoPilot");

  return (
    <>
      {before}
      VIZI <ViziMark /> {after}
    </>
  );
}

// NOTE: className is the *only* source of font size for this heading —
// callers must always pass a full responsive size scale (e.g.
// "text-2xl sm:text-3xl md:text-4xl lg:text-[44px]"). This avoids stacking
// a default size class underneath a caller-provided override, which is
// unreliable in Tailwind.
const GradHeading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h1
    className={`leading-[1.15] font-semibold bg-gradient-to-r from-[#7BC242] via-[#3FB6A8] to-[#1F9CD8] bg-clip-text text-transparent ${className}`}
  >
    {children}
  </h1>
);

const PrimaryCTA = ({ children }: { children: React.ReactNode }) => (
  
  <a  href="/contact"
    className="inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-md transition hover:opacity-95"
    style={{
      background:
        "linear-gradient(90deg,#7BC242 0%,#3FB6A8 50%,#1F9CD8 100%)",
    }}
  >
    {children}
  </a>
);

const GhostCTA = ({ children }: { children: React.ReactNode }) => (
  
   <a href="/vizi-copilot-gen-ai-demo-link"
    className="inline-flex items-center justify-center rounded-full border border-brand-navy/80 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-brand-navy"
  >
    {children}
  </a>
);

/* ---------- data ---------- */
const PILLARS = [
  { icon: `${WP}/Mask-group-33.svg`, label: "Leverage Existing Data and\nDocuments For Instant Insights" },
  { icon: `${WP}/Mask-group-34.svg`, label: "Receive Actionable\nRecommendations" },
  { icon: `${WP}/Mask-group-35.svg`, label: "Improve Operational\nEfficiency" },
];

const EMBEDDED = {
  title: "Embedded CoPilots within our AI and 3D Digital Twin Applications",
  image: `${WP}/RPM-1.jpeg`,
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
  image: `${WP}/Inspector.jpeg`,
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

const FAQS: { q: string; a: string | string[] }[] = [
  {
    q: "Which large language model (LLM) do you use?",
    a: "VIZI CoPilot uses OpenAI, Azure OpenAI, Gemini and Llama for prompting/ training purposes to maximize the accuracy. But for deployment, we are flexible and can use any of LLMs as per client requirements while minimizing the cost of operation.",
  },
  {
    q: "Can you deploy GenAI application on premise or only on cloud?",
    a: "We are flexible to deploy on-premise or cloud. But in the case of Azure OpenAI, it will be deployed on Azure cloud.",
  },
  {
    q: "Once VIZI CoPilot is deployed, can the user add more documents for the same application and get the insights out of these?",
    a: "Yes, Super Users in the client organization will be able to upload additional documents and VIZI CoPilot will start giving insights/ answers right after uploading. Overtime accuracy of answers will enhance.",
  },
  {
    q: "Can user comment if he/ she doesn't like the answer and whether the system learn from it?",
    a: "Yes, VIZI CoPilot has feedback loop and it learns from the comments of the user which are verified by the Super User to enhance the authenticity.",
  },
  {
    q: "How does the Retrieval Augmented Generation (RAG) work?",
    a: "By integrating domain-specific data and contextual knowledge, VIZI CoPilot enhances LLMs to deliver highly accurate and relevant responses.",
  },
  {
    q: "Does VIZI CoPilot have hallucination control?",
    a: "Yes. With thorough pre-training, user feedback, and fine-tuning, VIZI CoPilot ensures responses remain within defined boundaries, maintaining accuracy.",
  },
  {
    q: "What are the output formats?",
    a: "VIZI CoPilot supports text-based, chart, and tabular outputs to suit your needs.",
  },
  {
    q: "What is the VIZI CoPilot accelerator?",
    a: [
      "Seamless loading of various data types directly from the source.",
      "Automatic data chunking to eliminate unnecessary noise.",
      "Automatic embedding and vectorizing of data and query prompts.",
      "Easy saving of prompts for quick retrieval, and the ability to create ontologies and FAQs on the fly.",
    ],
  },
];

/* ---------- page ---------- */
function ViziCopilotPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 sm:pt-10 pb-10 sm:pb-14">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <GradHeading className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px]">
                VIZI <ViziMark /> CoPilot Gen AI Delivers Precise, Rapid Responses, Improving Operational Efficiency
              </GradHeading>
              <p className="mt-5 sm:mt-7 max-w-xl text-[15px] sm:text-base md:text-[17px] leading-relaxed text-brand-ink/80">
                VIZI <ViziMark /> CoPilot is redefining how facilities operate by delivering precise, rapid responses to complex queries and challenges. This innovative technology streamlines decision-making processes, providing accurate insights in real time from unstructured data and documents, which enables organizations to optimize operations, and drive productivity.
              </p>
              <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
                <PrimaryCTA>Talk to an expert</PrimaryCTA>
                <GhostCTA>Access demo</GhostCTA>
              </div>
            </div>
            <div>
              <img
                src={`${WP}/Gen-AI-image-ver-3.0-1024x683.png`}
                alt="VIZI CoPilot Gen AI"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* PILLARS NAVY BAND */}
        <section className="bg-brand-navy py-10 sm:py-12">
          <div className="mx-auto grid max-w-6xl gap-8 sm:gap-10 md:gap-12 px-4 sm:px-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.label} className="flex flex-col items-center text-center">
                <img src={p.icon} alt="" className="h-14 w-14 sm:h-16 sm:w-16" />
                <h3 className="mt-4 sm:mt-6 whitespace-pre-line text-lg sm:text-xl font-medium leading-snug text-white">
                  {p.label}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* FLEXIBILITY SECTION */}
        <section className="bg-[#F5F7F9] py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mx-auto max-w-6xl text-center text-xl sm:text-2xl md:text-3xl lg:text-[35px] leading-tight font-light text-brand-navy">
              VIZI <ViziMark /> CoPilot Offers Flexibility By Operating Either Standalone or Embedded Within Other Solutions to Drive Operational Excellence.
            </h2>

            <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[EMBEDDED, STANDALONE].map((card) => (
                <div
                  key={card.title}
                  className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5"
                >
                  <img src={card.image} alt="" className="h-48 sm:h-60 lg:h-72 w-full object-cover" />
                  <div className="p-5 sm:p-6 md:p-8">
                    <h3 className="text-xl sm:text-2xl md:text-[26px] leading-snug text-brand-navy">
                      {card.title}
                    </h3>
                    <p className="mt-4 sm:mt-5 text-[15px] sm:text-base md:text-[17px] leading-relaxed text-brand-ink/80">
                      {renderWithVizi(card.intro)}
                    </p>
                    <ul className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                      {card.bullets.map(([k, v]) => (
                        <li key={k} className="flex gap-3 text-[15px] sm:text-base leading-relaxed text-brand-ink/90">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-ink/60" />
                          <span>
                            <strong className="font-semibold text-brand-navy">{k}</strong>: {renderWithVizi(v)}
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
        <section className="bg-[#A4D233] py-5 sm:py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 sm:gap-x-12 gap-y-3 px-4 sm:px-6 text-center text-base sm:text-lg md:text-xl lg:text-[22px] font-medium text-brand-navy">
            {["Operational Efficiency Improvement > 20%", "Productivity Gain > 25%", "Payback Period < 6 months"].map((s) => (
              <span key={s} className="inline-flex items-center gap-2 sm:gap-3">
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0 rounded-full bg-[#1F9CD8]" />
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* TRANSFORM SECTION */}
        <section className="bg-[#F5F7F9] py-10 sm:py-14">
          <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <GradHeading className="text-xl sm:text-2xl md:text-3xl lg:text-[36px]">
                With VIZI <ViziMark /> CoPilot You Can Transform Your Operations Today
              </GradHeading>
              <ul className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                {TRANSFORM_BULLETS.map(([k, v]) => (
                  <li key={k} className="flex gap-3 text-[15px] sm:text-base md:text-lg leading-relaxed text-brand-ink/80">
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
                src={`${WP}/Vizi-Copilot-Chat-Image.png`}
                alt="VIZI CoPilot chat"
                className="w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px] object-contain rounded-xl shadow-xl ring-1 ring-black/5"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-10 sm:py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h3 className="text-2xl sm:text-[28px] md:text-[34px] font-semibold text-brand-navy">
              Learn More about VIZI <ViziMark /> CoPilot Gen AI
            </h3>
            <div className="mt-8 sm:mt-10 divide-y divide-black/10 border-y border-black/10">
              {FAQS.map((f, i) => (
                <FaqRow
                  key={f.q}
                  faq={f}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq((prev) => (prev === i ? null : i))}
                />
              ))}
            </div>
            <div className="mt-10 sm:mt-12 flex justify-center">
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

function FaqRow({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string | string[] };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="py-4 sm:py-5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-3 sm:gap-4 text-left"
      >
        <span className="mt-1 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white">
          {isOpen ? <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
        </span>
        <span className="text-[15px] sm:text-base md:text-[17px] font-medium text-brand-navy">{renderWithVizi(faq.q)}</span>
      </button>
      {isOpen && (
        <div className="mt-3 pl-8 sm:pl-10 text-sm sm:text-[15px] md:text-base leading-relaxed text-brand-ink/80">
          {Array.isArray(faq.a) ? (
            <ul className="list-disc space-y-2 pl-5">
              {faq.a.map((line, idx) => (
                <li key={idx}>{renderWithVizi(line)}</li>
              ))}
            </ul>
          ) : (
            renderWithVizi(faq.a)
          )}
        </div>
      )}
    </div>
  );
}