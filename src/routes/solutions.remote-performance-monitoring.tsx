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
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
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
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1
              className="text-5xl md:text-6xl font-light leading-[1.1] tracking-tight bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 50%,#2BA8C7 100%)",
              }}
            >
              Remote Performance Monitoring (RPM)
            </h1>
            <div className="mt-8 space-y-5 text-[15px] leading-7 text-slate-700">
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
            <div className="mt-8">
              <GradientPill href="/contact">Request a demo</GradientPill>
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
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-4xl md:text-5xl font-light text-slate-900">
          Common Problems, Unique Solutions
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-4">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="text-center">
              <h3 className="text-2xl font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERTS BAND */}
      <section className="bg-[#D8F3FB]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900">
            Built by experts who have been there done that
          </h2>
          <p className="mt-6 text-[15px] leading-7 text-slate-700">
            The best solutions are built by people who have experienced the
            problems first hand. Visionaize's Remote Performance Monitoring
            solution is built and managed by industry leaders and AI experts
            with extensive technology backgrounds and years of experience at
            complex facilities around the globe.
          </p>
        </div>
      </section>

      {/* MONITOR & IMPROVE */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <img
              src={DASHBOARD_IMG}
              alt="RPM dashboard"
              className="w-full rounded-md shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900">
              Monitor and improve your plant - from wherever
            </h2>
            <ul className="mt-8 space-y-3">
              {BENEFITS.map((b) => (
                <li
                  key={b}
                  className="flex items-start text-[15px] leading-7 text-slate-700"
                >
                  <span className="mt-2 mr-3 inline-block h-1.5 w-1.5 rounded-full bg-slate-700" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-xs font-bold tracking-widest text-[#A6E04A]">
          CASE STUDY
        </div>
        <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl font-semibold text-slate-900">
          Real-Time Monitoring and Improvement of Ethylene Plant
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <div className="flex gap-8 border-b border-slate-200">
              {CASE_TABS.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setTab(i)}
                  className={`pb-3 text-lg ${
                    tab === i
                      ? "border-b-2 border-[#2BA8C7] font-semibold text-slate-900"
                      : "text-slate-500"
                  }`}
                >
                  {t.key}
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-5 rounded-md border border-slate-200 p-6 text-[15px] leading-7 text-slate-700">
              {CASE_TABS[tab].paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-md shadow-xl">
            <img src={CASE_IMG} alt="Ethylene plant" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* GREEN CTA BAND */}
      <section
        className="py-14"
        style={{ background: "linear-gradient(90deg,#A6E04A 0%,#9ED84F 100%)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-6 md:flex-row">
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Connect with a Solution Specialist
          </h3>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow hover:bg-slate-50"
          >
            Connect with us
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
          Learn more about Remote Performance Monitoring (RPM)
        </h2>
        <div className="mt-10 divide-y divide-slate-200 border-t border-b border-slate-200">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="flex items-center gap-3 text-lg font-semibold text-slate-900">
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center text-2xl leading-none text-[#A6E04A]"
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                    {f.q}
                  </span>
                </button>
                {isOpen && (
                  <div className="space-y-4 pb-6 pl-9 pr-4 text-[15px] leading-7 text-slate-700">
                    {f.a.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <GradientPill href="/contact">Learn More</GradientPill>
        </div>
      </section>

      <Footer />
    </div>
  );
}
