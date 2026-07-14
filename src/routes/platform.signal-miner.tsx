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
const HERO_POSTER = heroSection?.images[0]?.src ?? "https://visionaize.com/wp-content/uploads/2023/11/iStock-1182152185-e1699026887686.jpg";
const CASE_IMG = HERO_POSTER;
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
    body: "A leading global food manufacturing company was faced with productivity issues from unplanned downtime and lack of operational visibility. Visionaize was tasked with not only implementing the right solutions for enhancing the productivity and efficiency of the production lines but also with helping correct unexplainable production interruptions.",
  },
  {
    label: "Solution",
    body: "Visionaize deployed Signal Miner across critical production assets, instrumenting historic process data and real-time sensor streams. AI-driven anomaly detection and pattern recognition models surfaced early indicators of failure, while contextual alerts routed insights directly to maintenance and operations teams.",
  },
  {
    label: "Results",
    body: "Within months, the customer saw a meaningful reduction in unplanned downtime, faster root-cause investigation, and measurable OEE gains on the most critical lines — turning unexplainable interruptions into predictable, preventable events.",
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

function SignalMinerPage() {
  const [tab, setTab] = useState(0);
  return (
    <>
      <Header />
      <main className="bg-white text-brand-ink">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-24">
            <div>
              <h1 className="font-display text-[56px] leading-[1.05] font-semibold lg:text-[72px]">
                <span className="bg-gradient-to-r from-[#8DC73F] to-[#21B8B0] bg-clip-text text-transparent">
                  {HERO_TITLE}
                </span>
              </h1>
              {HERO_PARAGRAPHS.map((paragraph, index) => (
                <p key={index} className={`max-w-xl text-lg text-brand-ink/80 ${index === 0 ? "mt-8" : "mt-5"}`}>
                  {paragraph}
                </p>
              ))}
              <div className="mt-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-[#8DC73F] via-[#21B8B0] to-[#1F88C8] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-black/10 transition hover:opacity-95"
                >
                  Connect with a product expert
                </Link>
              </div>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <img
                src={HERO_POSTER}
                alt="Signal Miner platform"
                className="h-full w-full object-cover opacity-70"
                loading="eager"
              />
              <button
                type="button"
                className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:bg-white"
                aria-label="Play video"
              >
                <Play className="h-8 w-8 translate-x-0.5 fill-brand-navy text-brand-navy" />
              </button>
            </div>
          </div>
        </section>

        {/* KEY CAPABILITIES */}
        <section className="bg-[#DDEEF7] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center font-display text-[44px] font-semibold text-brand-navy lg:text-[56px]">
              Key Capabilities
            </h2>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {CAPABILITIES.map((c) => (
                <div key={c.title} className="text-center">
                  <h3 className="font-display text-2xl font-semibold text-brand-navy">
                    {c.title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-relaxed text-brand-ink/80">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDY */}
        <section className="py-24">
          <div className="mx-auto grid max-w-7xl items-start gap-14 px-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#8DC73F]">
                CASE STUDY
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-brand-navy lg:text-[40px] lg:leading-tight">
                Optimizing OEE with Predictive Maintenance and AI Solutions
              </h2>
              <div className="mt-8 flex gap-8 border-b border-brand-ink/15">
                {CASE_TABS.map((t, i) => (
                  <button
                    key={t.label}
                    onClick={() => setTab(i)}
                    className={`-mb-px border-b-2 pb-3 text-base font-semibold transition ${
                      tab === i
                        ? "border-brand-blue text-brand-blue"
                        : "border-transparent text-brand-ink/80 hover:text-brand-navy"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-brand-ink/10 p-6 text-[15px] leading-relaxed text-brand-ink/80">
                {CASE_TABS[tab].body}
              </div>
            </div>
            <img
              src={CASE_IMG}
              alt="Optimizing OEE with predictive maintenance"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </section>

        {/* GREEN BAND */}
        <section className="bg-[#A4D233]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-6 py-14 sm:flex-row">
            <p className="font-display text-2xl font-semibold text-brand-navy lg:text-3xl">
              Connect with a Signal Miner specialist
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-semibold text-brand-navy shadow transition hover:bg-white/90"
            >
              Connect with us
            </Link>
          </div>
        </section>

        {/* DEPLOYMENT OPTIONS */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center font-display text-[44px] font-semibold text-brand-navy lg:text-[56px]">
              Deployment Options
            </h2>
            <div className="mt-14 grid gap-12 lg:grid-cols-3">
              {DEPLOYMENT.map((d) => (
                <div key={d.title}>
                  <h3 className="font-display text-2xl font-semibold text-brand-navy">
                    {d.title}
                  </h3>
                  <ul className="mt-6 list-disc space-y-3 pl-6 text-[15px] leading-relaxed text-brand-ink/80 marker:text-brand-ink/60">
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
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-display text-3xl font-semibold text-brand-navy lg:text-4xl">
              Learn More about Signal Miner
            </h2>
            <div className="mt-10 space-y-4">
              {FAQS.map((f, i) => (
                <FAQItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-[#8DC73F] via-[#21B8B0] to-[#1F88C8] px-10 py-4 text-base font-semibold text-white shadow-lg shadow-black/10 transition hover:opacity-95"
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
  defaultOpen,
}: {
  q: string;
  a: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-brand-ink/10 pb-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 py-3 text-left"
        aria-expanded={open}
      >
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center text-xl font-semibold text-brand-navy"
          aria-hidden
        >
          {open ? "−" : "+"}
        </span>
        <span className="flex-1 font-display text-lg font-semibold text-brand-navy">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-brand-navy/60 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pl-10 pr-4 pb-2 text-[15px] leading-relaxed text-brand-ink/80">
          {a}
        </div>
      )}
    </div>
  );
}
