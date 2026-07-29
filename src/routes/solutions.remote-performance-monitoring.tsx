import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/solutions/remote-performance-monitoring")({
  head: () => ({
    meta: [
      { title: "Remote Performance Monitoring (RPM) — Visionaize" },
      {
        name: "description",
        content:
          "Visionaize's Remote Performance Monitoring combines industry expertise with AI/Digital, GenAI & Metaverse technologies for real-time monitoring of plant performance.",
      },
      { property: "og:title", content: "Remote Performance Monitoring (RPM) — Visionaize" },
      {
        property: "og:description",
        content:
          "Real-time monitoring and improvement of plant performance from anywhere – anytime.",
      },
    ],
  }),
  component: RPMPage,
});

const HERO_IMG = "https://visionaize.com/wp-content/uploads/2024/03/image-47-1-1536x863.jpg";
const DASHBOARD_IMG =
  "https://visionaize.com/wp-content/uploads/2024/03/MacBook-Pro-14_-9-2-3-1.jpg";
const CASE_IMG =
  "https://visionaize.com/wp-content/uploads/2024/03/image-47-1-1536x863.jpg";

const PROBLEMS = [
  {
    title: "Recommendations",
    body: "Get proactive alerts and Generative AI-based recommendations",
  },
  {
    title: "What-If Analysis",
    body: "Perform what-if scenarios for plant improvement and debottlenecking",
  },
  {
    title: "Diagnosis",
    body: "Zero in on root causes faster, with drill downs from plant to equipment to tag",
  },
  {
    title: "KPI-Driven Analysis",
    body: "Analyze plant performance with domain specific KPIs and 2D/3D Digital Twin of plant",
  },
];

const BENEFITS = [
  "Increased production/yield",
  "Decreased energy consumption",
  "Ramp-up start-up/re-startup",
  "Reduced carbon emissions",
  "Increased people collaboration",
];

const CASE_TABS = [
  {
    key: "Challenge",
    paragraphs: [
      "A large Petrochemical company with operations along the US Gulf Coast had been doing plant monitoring at the plant level with DCS. Although a lot of data was captured at DCS by historians and LIMS, this operator was lacking the tools to get insight from the massive amount of data and realize its value.",
      "This presents a challenge in improving plant health and asset performance. The engineering team was leveraging an in-house developed tool using spreadsheets and downloading the data in batches. But these tools were static and had limited analytics capability and value add.",
    ],
  },
  {
    key: "Solution",
    paragraphs: [
      "Visionaize deployed its Remote Performance Monitoring solution, ingesting data from DCS, historians and LIMS into a unified analytics layer. Domain-specific KPIs, color-coded alerts and AI-driven recommendations were configured for the ethylene unit, enabling engineers to monitor and optimize the plant in real time from anywhere.",
    ],
  },
  {
    key: "Results",
    paragraphs: [
      "The operator saw faster issue diagnosis, reduced downtime, and measurable improvements in yield and energy consumption — replacing static spreadsheets with a live, collaborative performance monitoring environment.",
    ],
  },
];

const FAQS = [
  {
    q: "What are the problems that Remote Performance Monitoring solves?",
    a: [
      "Plant performance monitoring is primarily done at the plant level with Distributed Control Systems (DCS), producing tons of data. While data is often good, companies lack the tools to extract much insight from the data. Static spreadsheets and other in-house tools have limited analytical capabilities.",
      "Using smart KPIs derived from the team's deep industrial experience and expertise, RPM speeds up insight to action and allows teams to quickly zero in on issues, based on color-coded alerts and AI-driven recommendations. Faster learning means quicker resolutions and significant reductions in downtime.",
    ],
  },
  {
    q: "What makes Remote Performance Monitoring unique?",
    a: [
      "RPM is built and managed by industry leaders and AI experts with deep experience at complex facilities. It blends domain expertise with AI/Digital, GenAI and Metaverse technologies so operators can monitor and improve plant performance from anywhere, anytime.",
    ],
  },
  {
    q: "How can I learn more about Remote Performance Monitoring?",
    a: ["Connect with a Visionaize solutions expert to schedule a personalized demo and architecture walkthrough."],
  },
];

function GradientPill({
  children,
  href = "#",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    
    <a  href={href}
      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 sm:px-8"
      style={{
        background:
          "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 45%,#2BA8C7 100%)",
      }}
    >
      {children}
    </a>
  );
}

function RPMPage() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pt-4 pb-14 sm:px-6 sm:pt-6 sm:pb-20">
        <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h1
              className="text-3xl font-light leading-[1.15] tracking-tight bg-clip-text text-transparent sm:text-4xl md:text-5xl lg:text-6xl"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 50%,#2BA8C7 100%)",
              }}
            >
              Remote Performance Monitoring (RPM)
            </h1>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-700 sm:mt-8 sm:space-y-5">
              <p>
                With data captured by DCS, SCADA, Historians, LIMS, APM and ERP
                systems, operators face steep challenges in extracting insights
                and value from this mountain of data.
              </p>
              <p>
                Visionaize's Remote Performance Monitoring solution combines
                industry expertise with AI/Digital, GenAI &amp; Metaverse
                technologies for real-time monitoring and improvement of plant
                performance from anywhere – anytime.
              </p>
              <p>Connect with a solutions expert to learn more.</p>
            </div>
            <div className="mt-6 sm:mt-8">
              <GradientPill href="/request-a-demo/">Request a demo</GradientPill>
            </div>
          </div>
          <div>
            <img
              src={HERO_IMG}
              alt="Operator monitoring plant performance"
              className="w-full rounded-md shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div
        className="h-2 w-full"
        style={{
          background:
            "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 50%,#2BA8C7 100%)",
        }}
      />

      {/* COMMON PROBLEMS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-center text-3xl font-light text-slate-900 sm:text-4xl md:text-5xl">
          Common Problems, Unique Solutions
        </h2>
        <div className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="text-center">
              <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">{p.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERTS BAND */}
      <section className="bg-[#D8F3FB]">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <h2 className="text-2xl font-light text-slate-900 sm:text-3xl md:text-4xl">
            Built by experts who have been there done that
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700 sm:mt-6">
            The best solutions are built by people who have experienced the
            problems first hand. Visionaize's Remote Performance Monitoring
            solution is built and managed by industry leaders and AI experts
            with extensive technology backgrounds and years of experience at
            complex facilities around the globe.
          </p>
        </div>
      </section>

      {/* MONITOR & IMPROVE */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <img
              src={DASHBOARD_IMG}
              alt="RPM dashboard"
              className="w-full rounded-md shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-light text-slate-900 sm:text-4xl md:text-5xl">
              Monitor and improve your plant - from wherever
            </h2>
            <ul className="mt-6 space-y-3 sm:mt-8">
              {BENEFITS.map((b) => (
                <li
                  key={b}
                  className="flex items-start text-base leading-7 text-slate-700"
                >
                  <span className="mt-2 mr-3 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-700" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="text-xs font-bold tracking-widest text-[#A6E04A]">
          CASE STUDY
        </div>
        <h2 className="mt-3 max-w-2xl text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl">
          Real-Time Monitoring and Improvement of Ethylene Plant
        </h2>

        <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 md:grid-cols-2">
          <div>
            <div className="flex gap-4 overflow-x-auto border-b border-slate-200 sm:gap-8">
              {CASE_TABS.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setTab(i)}
                  className={`whitespace-nowrap pb-3 text-base sm:text-lg ${
                    tab === i
                      ? "border-b-2 border-[#2BA8C7] font-semibold text-slate-900"
                      : "text-slate-500"
                  }`}
                >
                  {t.key}
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-5 rounded-md border border-slate-200 p-4 text-base leading-7 text-slate-700 sm:p-6">
              {CASE_TABS[tab].paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-md shadow-xl md:aspect-auto md:h-full">
            <img src={CASE_IMG} alt="Ethylene plant" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* GREEN CTA BAND */}
      <section
        className="py-10 sm:py-14"
        style={{ background: "linear-gradient(90deg,#A6E04A 0%,#9ED84F 100%)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center sm:gap-6 sm:px-6 md:flex-row">
          <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl md:text-3xl">
            Connect with a Solution Specialist
          </h3>
          <Link
            to="/contact"
            className="inline-flex flex-shrink-0 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow hover:bg-slate-50 sm:px-7"
          >
            Connect with us
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl">
          Learn more about Remote Performance Monitoring (RPM)
        </h2>
        <div className="mt-8 divide-y divide-slate-200 border-t border-b border-slate-200 sm:mt-10">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-4 text-left sm:py-5"
                >
                  <span className="flex items-start gap-3 text-base font-semibold text-slate-900 sm:items-center sm:text-lg">
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center text-2xl leading-none text-[#A6E04A] sm:mt-0"
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                    {f.q}
                  </span>
                </button>
                {isOpen && (
                  <div className="space-y-4 pb-6 pl-8 pr-2 text-base leading-7 text-slate-700 sm:pl-9 sm:pr-4">
                    {f.a.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center sm:mt-10">
          <GradientPill href="/request-a-demo/">Learn More</GradientPill>
        </div>
      </section>

      <Footer />
    </div>
  );
}