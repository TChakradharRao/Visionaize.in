import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/platform/microsoft-fabric-expertise")({
  head: () => ({
    meta: [
      { title: "Microsoft Fabric Expertise — Unified Analytics | Visionaize" },
      {
        name: "description",
        content:
          "We help organizations design, implement, and optimize Microsoft Fabric to build a single, end-to-end analytics platform—from data ingestion to AI-powered insights—at enterprise scale.",
      },
      { property: "og:title", content: "Microsoft Fabric Expertise — Visionaize" },
      {
        property: "og:description",
        content:
          "Unified Analytics. Faster Insights. Scalable Intelligence. Microsoft Fabric services from Visionaize.",
      },
    ],
  }),
  component: FabricPage,
});

const HERO_BG =
  "https://visionaize.com/wp-content/uploads/2026/01/Group-1000007236-1.svg";
const WHY_IMG =
  "https://visionaize.com/wp-content/uploads/2026/01/Group-1000007239-1024x531.png";
const ARCH_IMG =
  "https://visionaize.com/wp-content/uploads/2026/01/Ecosystem-FABRIC-BLOCK-DIAGRAM.2-1024x576.jpg";
const ENGAGEMENT_IMG =
  "https://visionaize.com/wp-content/uploads/2026/01/Group-1000007263-1-1024x516.png";

const WHY_BULLETS = [
  ["OneLake", "A single, unified data lake for the entire organization"],
  ["Lakehouse Architecture", "Best of data lakes + warehouses"],
  ["Built-in Power BI", "Real-time insights without data movement"],
  ["Native AI & ML", "Advanced analytics and predictive intelligence"],
  ["Enterprise Security & Governance", "End-to-end compliance and control"],
];

const SERVICES = [
  {
    icon: "🧩",
    title: "Fabric Architecture & Strategy",
    bullets: [
      "Fabric readiness assessment & roadmap",
      "Migration strategy from legacy DWH, Synapse, Snowflake & on-prem",
      "Domain-driven data architecture using OneLake",
    ],
  },
  {
    icon: "⚙️",
    title: "Data Engineering on Fabric",
    bullets: [
      "Data ingestion using Data Pipelines & Dataflows Gen2",
      "Lakehouse modeling (Bronze–Silver–Gold)",
      "Scalable ELT using Spark & SQL",
      "Incremental loads, CDC & performance tuning",
    ],
  },
  {
    icon: "🏛️",
    title: "Fabric Data Warehousing",
    bullets: [
      "Modern warehouse design using Fabric Warehouse",
      "Optimized SQL analytics for large-scale reporting",
      "Cost-efficient storage & compute separation",
    ],
  },
  {
    icon: "⚡",
    title: "Real-Time & Streaming Analytics",
    bullets: [
      "Eventstream & Real-Time Analytics implementation",
      "Streaming from IoT, applications & APIs",
      "Low-latency dashboards & alerts",
    ],
  },
  {
    icon: "📊",
    title: "Power BI & Semantic Modeling",
    bullets: [
      "Enterprise semantic models",
      "Direct Lake optimization",
      "Performance tuning & governance",
      "Executive, operational & self-service dashboards",
    ],
  },
  {
    icon: "🤖",
    title: "AI, ML & Advanced Analytics",
    bullets: [
      "Predictive analytics using Fabric Data Science",
      "ML model lifecycle management",
      "Azure OpenAI & Copilot-ready analytics",
      "Anomaly detection & forecasting",
    ],
  },
];

const CASES = [
  {
    title: "Digitizing Shopfloor Operations Across 12 Plants with Microsoft Fabric",
    challenge:
      "A leading automotive manufacturer produces critical components across technologies ranging from conventional combustion engines to advanced electric powertrains. While production and maintenance teams followed defined workflows, data collection remained largely manual. Production staff had to visit machine consoles, collect parts and downtime data, and enter it into a central PC, taking about five minutes per shift, with tooling changes adding more effort. Maintenance teams printed SAP work orders, carried them to machines, diagnosed and fixed issues, and then updated SAP, spending around 15 minutes per task. A unified, scalable digital platform was needed to connect data sources, improve transparency, and streamline processes across all plants.",
    solution:
      "Visionaize delivered an end-to-end Microsoft Fabric platform that connected shop-floor PLCs, SAP, and quality systems through Eventstream and Data Pipelines, with a Bronze–Silver–Gold lakehouse model standardizing data across all 12 plants. Real-time Power BI dashboards replaced manual data entry, while AI-driven alerts surfaced downtime, tooling changes, and maintenance issues to the right teams instantly.",
    results:
      "Manual data collection effort dropped by more than 80%, average maintenance task time fell from 15 minutes to under 4, and plant managers gained a unified, real-time view of production and asset health across all 12 sites.",
  },
  {
    title: "Modernizing Fleet Analytics for Faster, Smarter Decisions",
    challenge:
      "A leading provider of fleet management, grappling with dispersed data sources, slow query performance, and rising infrastructure costs, recognized that its existing data and analytics infrastructure was no longer adequate. To address these challenges, the company embarked on a strategic transformation to modernize its systems, streamline data access, and enhance decision-making and business agility. Partnering with Visionaize, the company built a data platform powered by Microsoft Fabric – a solution designed for scalability, automation, and real-time analytics.",
    solution:
      "We migrated legacy warehouses to Fabric Warehouse and OneLake, consolidated telematics, dispatch, and billing feeds via Dataflows Gen2, and rebuilt semantic models on Direct Lake for sub-second BI. Automated CI/CD pipelines and governed workspaces replaced the team's manual deployment process.",
    results:
      "Query response times improved 6×, infrastructure cost dropped ~35%, and operations leaders gained near real-time visibility into fleet utilization, fuel, and route performance.",
  },
  {
    title: "Creating a Single Source of Truth for a Data-Driven Smart Port",
    challenge:
      "A large international port handling high shipping volumes aimed to become a data-led organization but found its data management and storage needed a major overhaul. Data was fragmented across multiple operational systems, each providing different and sometimes inconsistent views, making it hard to access, use, and maintain accurate information. The port also struggled to synchronize critical reference data across systems, limiting reliable insights on vessels, ports, and other core entities. In parallel, the port sought to reduce high energy costs and improve sustainability, but energy meter data was scattered across systems and providers, preventing a single source of truth for consumption and performance tracking.",
    solution:
      "Visionaize built a port-wide OneLake foundation with a master data layer for vessels, berths, and assets, then layered governed semantic models and Power BI apps for operations, energy, and sustainability. Streaming pipelines unified energy meter telemetry from multiple providers into a single curated dataset.",
    results:
      "The port now operates from a single trusted source of truth, with energy consumption analytics surfacing more than 18% in efficiency opportunities and reference data harmonized across every operational system.",
  },
];

const WHY_US = [
  {
    title: "Large-Scale Migration Experience",
    body: "Proven experience delivering large-scale data migration programs",
  },
  {
    title: "Strong Analytics & Modernization Background",
    body: "Strong capabilities in Snowflake, SQL, Python, and analytics modernization",
  },
  {
    title: "Microsoft Fabric & Azure Expertise",
    body: "Deep expertise in Microsoft Fabric, Power BI, Azure, and Data Engineering",
  },
  {
    title: "Continuous Support",
    body: "Continuous support, optimization, and analytics consulting",
  },
  {
    title: "Business First Approach",
    body: "Business-first approach focused on measurable outcomes",
  },
  {
    title: "AI and Advanced Analytics",
    body: "AI and advanced analytics driven decision support",
  },
];

function FabricPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Intro />
      <WhyFabric />
      <Services />
      <ExpertBand />
      <Architecture />
      <CaseStudies />
      <WhyChooseUs />
      <EngagementModels />
      <ReadyCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-[#1a0b2e]">
      <img
        src={HERO_BG}
        alt="Microsoft Fabric Expertise — Unified Analytics. Faster Insights. Scalable Intelligence."
        className="w-full h-auto block"
      />
      <h1 className="sr-only">
        Microsoft Fabric Expertise — Unified Analytics. Faster Insights. Scalable Intelligence.
      </h1>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-5xl px-6 text-center space-y-6">
        <p className="text-lg md:text-xl text-brand-ink leading-relaxed">
          We help organizations design, implement, and optimize Microsoft Fabric to build a
          single, end-to-end analytics platform—from data ingestion to AI-powered
          insights—at enterprise scale.
        </p>
        <p className="text-lg md:text-xl text-brand-ink leading-relaxed">
          Microsoft Fabric brings together Data Engineering, Data Science, Real-Time
          Analytics, Data Warehousing, and Business Intelligence into one unified SaaS
          platform. Our team ensures you get maximum business value from this powerful
          ecosystem.
        </p>
      </div>
    </section>
  );
}

function WhyFabric() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={WHY_IMG}
          alt="Microsoft Fabric ecosystem"
          className="w-full h-auto"
          loading="lazy"
        />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
            Why Microsoft Fabric?
          </h2>
          <p className="font-semibold text-brand-navy mb-4">
            Microsoft Fabric eliminates data silos and complexity by providing:
          </p>
          <ul className="space-y-3 mb-6">
            {WHY_BULLETS.map(([term, def]) => (
              <li key={term} className="flex gap-3 text-brand-ink">
                <span className="text-brand-blue mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
                <span>
                  <span className="font-semibold">{term}</span> – {def}
                </span>
              </li>
            ))}
          </ul>
          <p className="font-semibold text-brand-navy">
            We help you adopt Fabric strategically, not just technically.
          </p>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-12">
          Our Microsoft Fabric Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="bg-[#f5fbf2] border border-[#dceccd] rounded-2xl p-6"
            >
              <div className="h-12 w-12 rounded-xl bg-[#1f9b8a] text-white text-2xl flex items-center justify-center mb-4 -mt-12 shadow">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-4">{s.title}</h3>
              <ul className="space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-brand-ink">
                    <Check className="h-4 w-4 text-[#1f9b8a] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertBand() {
  return (
    <section className="bg-[#A4D233] py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
          Connect with a Microsoft Fabric Expert
        </h2>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-full bg-white text-brand-blue font-semibold px-8 py-3 shadow hover:shadow-lg transition"
        >
          Connect with us
        </Link>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-12">
          Microsoft Fabric Architecture
        </h2>
        <img
          src={ARCH_IMG}
          alt="Microsoft Fabric architecture diagram"
          className="w-full h-auto mx-auto max-w-5xl"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function CaseStudies() {
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState<"challenge" | "solution" | "results">("challenge");
  const cs = CASES[idx];
  const text = cs[tab];

  const next = () => {
    setIdx((idx + 1) % CASES.length);
    setTab("challenge");
  };
  const prev = () => {
    setIdx((idx - 1 + CASES.length) % CASES.length);
    setTab("challenge");
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 relative">
        <button
          onClick={prev}
          aria-label="Previous case study"
          className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-blue hover:text-brand-navy"
        >
          <ChevronLeft className="h-10 w-10" />
        </button>
        <button
          onClick={next}
          aria-label="Next case study"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-blue hover:text-brand-navy"
        >
          <ChevronRight className="h-10 w-10" />
        </button>
        <div className="grid md:grid-cols-2 gap-10 px-12">
          <div>
            <div className="text-sm font-bold tracking-wider text-[#A4D233] mb-3">
              CASE STUDY
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6 leading-tight">
              {cs.title}
            </h3>
            <div className="border border-gray-200 rounded">
              <div className="flex border-b border-gray-200">
                {(["challenge", "solution", "results"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 capitalize py-3 text-sm font-semibold transition ${
                      tab === t
                        ? "text-brand-blue border-b-2 border-brand-blue -mb-px bg-white"
                        : "text-brand-ink hover:text-brand-blue"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="p-6 text-sm leading-relaxed text-brand-ink">{text}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#dceefb] to-[#a4d2ff] shadow-xl flex items-center justify-center text-white text-6xl">
              <span className="text-brand-navy/40 text-sm tracking-wider">
                {idx + 1} / {CASES.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="bg-[#dff1fb] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US.map((w) => (
            <div key={w.title} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-[#4ab3e0] text-white flex items-center justify-center mb-4">
                <Check className="h-6 w-6" strokeWidth={3} />
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">{w.title}</h3>
              <p className="text-sm text-brand-ink leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EngagementModels() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-12">
          Engagement Models
        </h2>
        <img
          src={ENGAGEMENT_IMG}
          alt="Visionaize engagement models"
          className="w-full h-auto mx-auto max-w-4xl"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function ReadyCTA() {
  return (
    <section className="bg-[#e8f3c2] py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
          Ready to Modernize Your Analytics with Microsoft Fabric?
        </h2>
        <p className="text-brand-navy mb-8 font-semibold">
          Let us help you build a future-ready, AI-powered analytics platform using
          Microsoft Fabric.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-full bg-white text-brand-blue font-semibold px-8 py-3 shadow hover:shadow-lg transition"
        >
          Connect with us
        </Link>
      </div>
    </section>
  );
}
