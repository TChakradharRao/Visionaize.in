import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSeedContentItem } from "@/lib/seed-content";

export const Route = createFileRoute("/platform/signal-miner")({
  head: () => ({
    meta: [
      { title: "Signal Miner — Predictive anomaly detection | Visionaize" },
      {
        name: "description",
        content:
          "Avoid equipment downtime and failure by leveraging historic and real-time data. Pinpoint root causes of failure before they bring operations to a halt.",
      },
      { property: "og:title", content: "Signal Miner — Visionaize" },
      {
        property: "og:description",
        content:
          "Predictive maintenance and anomaly detection for industrial operations.",
      },
    ],
  }),
  component: SignalMinerPage,
});

const seedItem = getSeedContentItem("page", "signal-miner");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];
const HERO_POSTER = heroSection?.images[0]?.src ?? "/signal-miner/iStock-1182152185-e1699026887686.jpg";
const CASE_IMG = "/signal-miner/iStock-1182152185-e1699026887686.jpg";
const HERO_TITLE = seedItem?.title ?? "Signal Miner";
const HERO_PARAGRAPHS = heroSection?.paragraphs?.length
  ? heroSection.paragraphs
  : [
      "Avoid equipment downtime and failure by leveraging historic and real-time data. Pinpoint root causes of failure before they brings operations to a halt.",
      "Connect with a Signal Miner expert to learn more about how this groundbreaking new platform works.",
    ];

const CAPABILITIES = [
  {
    title: "Anomaly Detection",
    body: "Identify unforeseen equipment failures, enabling proactive maintenance and reducing downtime.",
  },
  {
    title: "Root Cause Analysis",
    body: "Accurately pinpoint failure origins, enhancing equipment longevity, reliability, and operational efficiency.",
  },
  {
    title: "Pattern Recognition",
    body: "Improve quality control by detecting deviations in real-time, ensuring products meet high standards.",
  },
  {
    title: "Real-Time Alerts",
    body: "Stay apprised with alert notifications, the moment operating conditions deviate from the norm.",
  },
];

const DEPLOYMENT = [
  {
    title: "Managed SaaS",
    bullets: [
      "Reduced upfront investment",
      "No IT staff needed",
      "Automatic updates",
      "Scalable with growth",
      "Enhances operational flexibility",
    ],
  },
  {
    title: "Private Cloud",
    bullets: [
      "Flexible scalability",
      "Remote accessibility",
      "Reliable cloud infrastructure",
      "Industry-specific compliance",
      "Customized resource control",
    ],
  },
  {
    title: "On-Premise",
    bullets: [
      "Maximum data security",
      "Full control on-site",
      "Independent of external networks",
      "Seamless operational efficiency",
      "Complies with regulations",
    ],
  },
];

const CASE_TABS = [
  {
    label: "Challenge",
    body: `A leading global food manufacturing company was faced with productivity issues from unplanned downtime and lack of operational visibility. Visionaize was tasked with not only implementing the right solutions for enhancing the productivity and efficiency of the production lines but also with helping correct unexplainable production interruptions.`,
  },

  {
    label: "Solution",
    body: `Using Predictive Maintenance, Advanced Analytics and Machine Learning, Visionaize developed a solution that would identify failure and reliability issues before they occurred. The solution diagnosed the faulty equipment and by uncovering the root cause and providing recommended actions, Visionaize enabled the operator to take quick and valuable plant floor level decisions.`,
  },

  {
    label: "Results",
    bullets: [
      "Reduced unplanned downtime by 17%",
      "Reduced energy consumption by 2.5%",
      "Improved OEE by over 15% by avoiding downtime",
    ],
  },
];

const FAQS = [
  {
    q: "What are some of the key benefits of Signal Miner?",
    a: (
      <>
        <p>
          Key benefits of Signal Miner is the ability to eliminate equipment
          downtime and failure by leveraging historic and real-time data to
          improve processes, provide transparency, and deliver the best quality
          on time and on budget. Some specific benefits include:
        </p>
        <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-brand-ink/60">
          <li>Enhanced predictive insights</li>
          <li>Streamlined data analysis</li>
          <li>Operational efficiency boost</li>
          <li>Reduced energy consumption</li>
          <li>Maximized RoI</li>
          <li>Flexible integration and deployment</li>
          <li>Optimized process management</li>
          <li>Comprehensive asset performance monitoring</li>
          <li>Increased organizational transparency</li>
          <li>Support for sustainability goals</li>
        </ul>
      </>
    ),
  },
  {
    q: "What are the problems that Signal Miner solve?",
    a: (
      <p>
        Signal Miner solves the operational pain of unplanned downtime, opaque
        root-cause investigations, and reactive maintenance. By continuously
        analyzing historic and real-time signal data, it surfaces early failure
        indicators, isolates root causes, and routes contextual alerts to the
        right teams — replacing guesswork with predictive insight.
      </p>
    ),
  },
  {
    q: "What makes Signal Miner unique?",
    a: (
      <p>
        Signal Miner combines proven anomaly-detection algorithms with
        domain-tuned pattern recognition, deep contextualization of plant data,
        and flexible deployment (SaaS, Private Cloud, or On-Premise) — so
        insights are not only accurate but actionable inside the workflows your
        operators already use.
      </p>
    ),
  },
  {
    q: "How can I learn more about Signal Miner?",
    a: (
      <p>
        Reach out via the Contact Sales button below and our team will set up a
        personalised walkthrough focused on your assets, sensor data, and
        priority use cases.
      </p>
    ),
  },
];

function CheckIcon() {
  return (
    <span
      aria-hidden
      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      style={{ background: "linear-gradient(135deg, #7ED957 0%, #2E8DC5 100%)" }}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8.5l3 3 7-7" />
      </svg>
    </span>
  );
}

function SignalMinerPage() {
  const [tab, setTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Header />
      <main className="bg-white text-brand-ink overflow-x-hidden">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-8 pb-14 sm:px-6 sm:gap-12 lg:pt-10 lg:pb-24 lg:grid-cols-2">
            <div>
              <h1 className="font-display text-[32px] leading-[1.15] sm:text-[40px] lg:text-[50px] lg:leading-[1.1]">
                <span className="bg-gradient-to-r from-[#8DC73F] to-[#21B8B0] bg-clip-text text-transparent">
                  {HERO_TITLE}
                </span>
              </h1>
              {HERO_PARAGRAPHS.map((paragraph, index) => (
                <p
                  key={index}
                  className={`max-w-xl text-base text-brand-ink/80 sm:text-lg ${
                    index === 0 ? "mt-6 sm:mt-8" : "mt-4 sm:mt-5"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 sm:mt-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-[#8DC73F] via-[#21B8B0] to-[#1F88C8] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:opacity-95 sm:px-8 sm:py-4 sm:text-base"
                >
                  Connect with a product expert
                </Link>
              </div>
            </div>
            <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/11] lg:rounded-none">
              <video
                src="/signal-miner/signal-miner-2.mp4"
                className="h-full w-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </section>

        {/* KEY CAPABILITIES */}
        <section className="bg-[#DDEEF7] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-center font-display text-[30px] font-semibold text-brand-navy sm:text-[38px] lg:text-[56px]">
              Key Capabilities
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
              {CAPABILITIES.map((c) => (
                <div key={c.title} className="text-center">
                  <h3 className="font-display text-xl font-semibold text-brand-navy sm:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/80 sm:mt-5">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDY */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 sm:px-6 lg:gap-16 lg:grid-cols-[1.45fr_1fr]">
            {/* Left Content */}
            <div className="flex flex-col">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8CC63F]">
                CASE STUDY
              </p>

              <h2 className="mt-4 text-[22px] leading-[1.25] text-[#111827] sm:text-[28px] lg:text-[42px] lg:leading-[1.2]">
                Optimizing OEE with Predictive Maintenance and AI Solutions
              </h2>

              {/* Tabs — underline style with a full-width divider beneath */}
              <div className="mt-8 flex gap-6 border-b border-gray-200 sm:mt-10 sm:gap-8">
                {CASE_TABS.map((tabItem, index) => (
                  <button
                    key={tabItem.label}
                    onClick={() => setTab(index)}
                    className={`relative -mb-px pb-3 text-sm font-semibold transition-colors sm:text-base ${
                      tab === index
                        ? "text-[#1789D4]"
                        : "text-[#111827] hover:text-[#1789D4]"
                    }`}
                  >
                    {tabItem.label}
                    {tab === index && (
                      <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#1789D4]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Content Card — fully rounded, sits below the divider */}
              <div className="mt-6 flex-1 rounded-xl border border-[#E3E8EE] bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-8">
                {CASE_TABS[tab].bullets ? (
                  <ul className="space-y-5">
                    {CASE_TABS[tab].bullets.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[15px] leading-7 text-[#222] sm:text-[17px]"
                      >
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[15px] leading-7 text-[#222] sm:text-[17px]">
                    {CASE_TABS[tab].body}
                  </p>
                )}
              </div>
            </div>

            {/* Right Image */}
            <div className="h-64 sm:h-80 lg:h-full">
              <img
                src={CASE_IMG}
                alt="Optimizing OEE with Predictive Maintenance"
                className="h-full w-full rounded-2xl object-cover shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* GREEN BAND */}
        <section className="bg-[#9EE02E]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-4 py-10 text-center sm:gap-8 sm:px-6 sm:py-14 sm:flex-row sm:text-left">
            <p className="font-display text-xl font-semibold text-brand-navy sm:text-2xl lg:text-3xl">
              Connect with a Signal Miner specialist
            </p>
            <Link
              to="/platform/signal-miner-contact"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#088FD1] shadow transition sm:px-8 sm:py-4 sm:text-base"
            >
              Connect with us
            </Link>
          </div>
        </section>

        {/* DEPLOYMENT OPTIONS */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-center font-display text-[30px] font-semibold text-brand-navy sm:text-[38px] lg:text-[56px]">
              Deployment Options
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {DEPLOYMENT.map((d) => (
                <div key={d.title}>
                  <h3 className="font-display text-2xl font-semibold text-brand-navy sm:text-3xl">
                    {d.title}
                  </h3>
                  <ul className="mt-5 list-disc space-y-3 pl-6 text-base leading-relaxed text-brand-ink/80 sm:mt-6 sm:text-[20px] marker:text-brand-ink/60">
                    {d.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GRADIENT DIVIDER */}
        <div className="h-1 w-full bg-gradient-to-r from-[#8DC73F] via-[#21B8B0] to-[#1F88C8]" />

        {/* FAQ */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-brand-navy sm:text-3xl lg:text-4xl">
              Learn More about Signal Miner
            </h2>
            <div className="mt-8 space-y-4 sm:mt-10">
              {FAQS.map((f, i) => (
                <FAQItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex((prev) => (prev === i ? null : i))
                  }
                />
              ))}
            </div>
            <div className="mt-10 text-center sm:mt-12">
              <Link
                to="/platform/signal-miner-contact"
                className="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-[#8DC73F] via-[#21B8B0] to-[#1F88C8] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:opacity-95 sm:px-10 sm:py-4 sm:text-base"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FAQItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-brand-ink/10 pb-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 py-3 text-left sm:gap-4"
        aria-expanded={isOpen}
      >
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center text-xl font-semibold text-brand-navy"
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </span>
        <span className="flex-1 font-display text-base font-semibold text-brand-navy sm:text-[19px]">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand-navy/60 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pl-9 pr-2 pb-2 text-[15px] leading-relaxed text-brand-ink/90 sm:pl-10 sm:pr-4 sm:text-[16px]">
          {a}
        </div>
      )}
    </div>
  );
}