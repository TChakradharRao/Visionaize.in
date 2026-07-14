import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSeedContentItem } from "@/lib/seed-content";

export const Route = createFileRoute("/industries/digital-twin-for-power-and-energy")({
  head: () => ({
    meta: [
      { title: "Digital Twin for Power & Energy — Visionaize" },
      {
        name: "description",
        content:
          "Improve plant availability, reduce emissions and accelerate the energy transition with 3D Digital Twin technology for Power & Energy.",
      },
      { property: "og:title", content: "Digital Twin for Power & Energy — Visionaize" },
      {
        property: "og:description",
        content:
          "Maximize uptime, optimize generation, and accelerate decarbonization across the power & energy value chain.",
      },
      {
        property: "og:image",
        content:
          "https://visionaize.com/wp-content/uploads/2022/07/iStock-1369468534-1024x683-1.jpg",
      },
    ],
  }),
  component: PowerEnergyPage,
});

const seedItem = getSeedContentItem("page", "digital-twin-for-power-and-energy");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];
const heroParagraphs = heroSection?.paragraphs?.length ? heroSection.paragraphs : ["Maximize plant availability, reduce emissions and accelerate the energy transition with cutting-edge 3D Digital Twin technology."];
const heroImage = seedSections.flatMap((section) => section.images ?? []).find((image) => !image.src.endsWith(".svg"))?.src ?? "https://visionaize.com/wp-content/uploads/2022/07/iStock-1369468534-1024x683-1.jpg";
const introSection = seedSections.find((section) => section.heading?.toLowerCase() === "greater reliability and resiliency");
const introParagraphs = introSection?.paragraphs?.length
  ? introSection.paragraphs
  : [
      "Combine AI, AR and VR technologies with advanced 3D data visualization to give control room, reliability and engineering teams a single, real-time view of every plant in your fleet.",
      "Connect with a Digital Twin expert to learn how this technology applies to thermal, renewable, hydro and nuclear assets.",
    ];

const PILLARS = [
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Vector-6.svg",
    title: "Maximize Availability",
    body: "Predict failures early and keep generation assets producing at peak performance",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-3.svg",
    title: "Accelerate Transition",
    body: "Optimize renewables, hybrid plants and battery storage from a single operational view",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/07/Group.png",
    title: "Lower Emissions",
    body: "Track, model and reduce scope 1, 2 and 3 emissions across every plant in the fleet",
  },
];

const CASE_STUDIES = [
  {
    eyebrow: "CASE STUDY",
    title: "Combined-Cycle Gas Plant: Reducing Forced Outages with Predictive AI",
    tabs: {
      Challenge:
        "A large independent power producer was suffering recurring forced outages on its combined-cycle units, driving costly merchant replacement power and missed capacity commitments. Operators lacked early warning of degradation across HRSG, gas turbine and steam turbine systems.",
      Solution:
        "Visionaize deployed AI-driven anomaly detection and a hybrid first-principles + data-driven digital twin across the units, unifying historian, vibration and process data into one operational picture with prescriptive actions for control-room and reliability teams.",
      Results:
        "Forced outage rate dropped, heat-rate held steady through the run, and the operator avoided several seven-figure replacement-power events in the first year.",
    },
    img: "https://visionaize.com/wp-content/uploads/2022/07/iStock-1369468534-1024x683-1.jpg",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Wind Fleet: Boosting Availability with Remote Performance Monitoring",
    tabs: {
      Challenge:
        "A renewables operator with hundreds of turbines across multiple sites struggled to convert SCADA data into action. Underperformance and gearbox issues were detected too late, eroding capacity factor and warranty recoveries.",
      Solution:
        "Visionaize centralized SCADA, CMS and weather data into a remote performance monitoring solution with AI-driven KPI diagnostics and what-if analysis tuned for wind assets.",
      Results:
        "Fleet availability improved, mean time to detect dropped from days to hours, and warranty claims were backed by stronger evidence packs.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/12/iStock-514620986-1536x1024.jpg",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Nuclear Operator: Inspection Optimization with 3D Digital Twin",
    tabs: {
      Challenge:
        "A nuclear utility needed to compress outage windows and reduce dose exposure during inspection campaigns while maintaining the highest safety standards across complex containment areas.",
      Solution:
        "A photorealistic 3D digital twin of the plant was built from laser scans and integrated with inspection records, isometric drawings and procedure libraries — enabling virtual walk-downs, dose planning and remote expert support.",
      Results:
        "Outage duration shrank, dose exposure dropped, and engineering teams onboarded contractors faster using the twin instead of physical site visits.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1202781474.webp",
  },
];

const FORM_TOPICS = [
  "Reduce forced outages on critical generation assets",
  "Optimize renewables and hybrid plant performance",
  "Cut emissions and accelerate decarbonization",
  "Plan safer, shorter outages and inspections",
];

function PowerEnergyPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F1B2D]">
      <Header />
      <Hero />
      <Pillars />
      <Intro />
      <CaseStudyCarousel />
      <GridReimagined />
      <TalkDigitalTwins />
      <Whitepaper />
      <LetsConnect />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative h-[640px] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('${heroImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto flex h-full max-w-[1280px] items-center px-6">
        <div className="w-full max-w-[560px] bg-white p-12">
          <h1
            className="text-[60px] font-light leading-[1.05] tracking-tight"
            style={{
              background:
                "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Power &amp; Energy
          </h1>
          {heroParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-6 text-[18px] leading-relaxed text-[#0F1B2D]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="bg-[#0F1B2D] py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 md:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="flex flex-col items-center text-center">
            <img src={p.icon} alt="" className="h-20 w-20" loading="lazy" />
            <h3 className="mt-6 text-[24px] font-semibold text-white">{p.title}</h3>
            <p className="mt-4 max-w-[280px] text-[15px] leading-relaxed text-white/80">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-[44px] font-semibold leading-tight">
            Keep generation assets running at peak performance
          </h2>
          {introParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-6 text-[16px] leading-[1.8] text-[#3a4658]">
              {paragraph}
            </p>
          ))}
          <div className="mt-10">
            <a
              href="#talk-to-an-expert"
              className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
              style={{
                background:
                  "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              Connect with an expert
            </a>
          </div>
        </div>
        <div className="flex justify-center bg-[#E6F0F7] p-8">
          <img
            src="https://visionaize.com/wp-content/uploads/2022/07/Group-523-2.png"
            alt="Visionaize 3D Digital Twin for power and energy"
            className="w-full max-w-[600px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function CaseStudyCarousel() {
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState<"Challenge" | "Solution" | "Results">("Challenge");
  const cs = CASE_STUDIES[idx];
  const next = () => {
    setIdx((i) => (i + 1) % CASE_STUDIES.length);
    setTab("Challenge");
  };
  const prev = () => {
    setIdx((i) => (i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
    setTab("Challenge");
  };
  return (
    <section className="bg-white pb-20">
      <div className="relative mx-auto max-w-[1280px] px-6">
        <button
          aria-label="Previous case study"
          onClick={prev}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-[#2E8DC5] hover:text-[#A6E04A]"
        >
          <svg width="28" height="56" viewBox="0 0 28 56" fill="none">
            <path d="M22 4L6 28L22 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          aria-label="Next case study"
          onClick={next}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-[#2E8DC5] hover:text-[#A6E04A]"
        >
          <svg width="28" height="56" viewBox="0 0 28 56" fill="none">
            <path d="M6 4L22 28L6 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid grid-cols-1 items-center gap-10 px-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#A6E04A]">{cs.eyebrow}</p>
            <h3 className="mt-3 text-[34px] font-semibold leading-tight">{cs.title}</h3>

            <div className="mt-8 flex gap-6 border-b border-[#E2E8F0]">
              {(["Challenge", "Solution", "Results"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-3 text-sm font-semibold transition ${
                    tab === t
                      ? "border-b-2 border-[#2E8DC5] text-[#2E8DC5]"
                      : "text-[#64748B] hover:text-[#0F1B2D]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded border border-[#E2E8F0] p-6">
              <p className="text-[15px] leading-[1.8] text-[#3a4658]">{cs.tabs[tab]}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <img src={cs.img} alt={cs.title} className="w-full max-w-[560px] rounded shadow-lg" loading="lazy" />
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {CASE_STUDIES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setIdx(i);
                setTab("Challenge");
              }}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-8 bg-[#2E8DC5]" : "w-2 bg-[#CBD5E1]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GridReimagined() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <h2 className="text-[44px] font-semibold leading-tight">
          The grid, reimagined
        </h2>
        <div className="mt-8 max-w-[920px] space-y-6 text-[16px] leading-[1.8] text-[#3a4658]">
          <p>
            From thermal plants to wind, solar, hydro and nuclear, the energy
            sector is being rebuilt around data. Visionaize gives operators a
            unified 3D digital twin of every asset — so control rooms,
            reliability engineers and executives work off the same real-time
            picture.
          </p>
          <p>
            Advanced AI, AR and VR technologies combine with supercharged
            remote-operations capabilities to maximize generation, minimize
            unplanned downtime, and surface decarbonization opportunities
            across the fleet.
          </p>
          <p>
            Connect with a Digital Twin expert to learn how Visionaize is
            helping power &amp; energy companies hit reliability, ESG and
            transition targets faster.
          </p>
        </div>
      </div>
    </section>
  );
}

function TalkDigitalTwins() {
  return (
    <section id="talk-to-an-expert" className="bg-[#F1F5F9] py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-[44px] font-semibold leading-tight">Let's talk digital twins</h2>
          <p className="mt-6 text-[16px] leading-[1.8] text-[#3a4658]">
            V-Suite turns your power plants into a connected digital metaverse.
            Visualize operations through a real-time, up-to-date 3-D digital
            twin. Connect with us to learn how it works.
          </p>
          <h3 className="mt-10 text-[20px] font-semibold">Visionaize a better world</h3>
          <ul className="mt-6 space-y-4">
            {FORM_TOPICS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[16px] text-[#0F1B2D]">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: "linear-gradient(135deg, #A6E04A 0%, #2E8DC5 100%)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <h3 className="text-[24px] font-semibold text-[#2E8DC5]">Talk to an expert</h3>
          <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="First name*" />
            <Input placeholder="Last name*" />
            <Input placeholder="Company name*" />
            <Input placeholder="Business Email*" type="email" />
            <Input placeholder="Phone number*" type="tel" />
            <select className="w-full rounded border border-[#CBD5E1] px-4 py-3 text-sm text-[#3a4658] focus:border-[#2E8DC5] focus:outline-none">
              <option>How did you first hear about us?</option>
              <option>Web Search</option>
              <option>LinkedIn</option>
              <option>Industry Event</option>
              <option>Referral</option>
              <option>Other</option>
            </select>
            <textarea
              rows={4}
              placeholder="Message"
              className="w-full rounded border border-[#CBD5E1] px-4 py-3 text-sm text-[#3a4658] focus:border-[#2E8DC5] focus:outline-none"
            />
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
              style={{
                background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              Send request
            </button>
            <p className="text-center text-xs text-[#64748B]">We generally respond within 24 hours</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded border border-[#CBD5E1] px-4 py-3 text-sm text-[#3a4658] placeholder:text-[#94A3B8] focus:border-[#2E8DC5] focus:outline-none"
    />
  );
}

function Whitepaper() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div className="flex justify-center">
          <img
            src="https://visionaize.com/wp-content/uploads/2022/07/Rectangle-425-6.png"
            alt="The Industrial Metaverse whitepaper"
            className="w-full max-w-[460px] shadow-xl"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-[44px] font-semibold leading-tight">
            Experience data in The Industrial Metaverse
          </h2>
          <p className="mt-6 text-[16px] leading-[1.8] text-[#3a4658]">
            With the emergence of Industry 4.0 and IIoT sensors, data overload
            is a common challenge. Explore how 3D digital twin technology can
            turn the data deluge into a competitive advantage.
          </p>
          <a
            href="https://visionaize.com/the-industrial-metaverse/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-full border border-[#0F1B2D] px-7 py-3 text-sm font-semibold text-[#0F1B2D] transition hover:bg-[#0F1B2D] hover:text-white"
          >
            Explore how
          </a>
        </div>
      </div>
    </section>
  );
}

function LetsConnect() {
  return (
    <section className="relative overflow-hidden bg-[#0F1B2D] py-24">
      <svg
        className="pointer-events-none absolute right-0 top-0 h-full w-2/3 opacity-50"
        viewBox="0 0 800 400"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M-100 400 C 200 100, 600 100, 900 400" stroke="url(#peg)" strokeWidth="1.5" fill="none" />
        <path d="M-100 380 C 250 120, 650 120, 900 380" stroke="url(#peg)" strokeWidth="1.5" fill="none" />
        <defs>
          <linearGradient id="peg" x1="0" y1="0" x2="800" y2="400">
            <stop offset="0%" stopColor="#A6E04A" />
            <stop offset="100%" stopColor="#2E8DC5" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative mx-auto max-w-[1280px] px-6">
        <h2 className="text-[64px] font-semibold leading-[1.05] text-white">Let's Connect</h2>
        <p className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-white/80">
          Learn how Visionaize can maximize availability and accelerate the energy transition
        </p>
        <Link
          to="/contact"
          className="mt-10 inline-flex items-center rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
          style={{
            background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
          }}
        >
          Talk to an expert
        </Link>
      </div>
    </section>
  );
}
