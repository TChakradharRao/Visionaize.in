import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSeedContentItem } from "@/lib/seed-content";

export const Route = createFileRoute("/industries/digital-twin-for-manufacturing")({
  head: () => ({
    meta: [
      { title: "Digital Twin for Manufacturing — Visionaize" },
      {
        name: "description",
        content:
          "Maximize plant productivity with cutting-edge 3D Digital Twin technology for the Manufacturing industry.",
      },
      { property: "og:title", content: "Digital Twin for Manufacturing — Visionaize" },
      {
        property: "og:description",
        content:
          "Reduce downtime, increase OEE, and reimagine factory operations with Visionaize.",
      },
      {
        property: "og:image",
        content:
          "https://visionaize.com/wp-content/uploads/2022/07/istockphoto-846859964-1024x1024-1-2.png",
      },
    ],
  }),
  component: ManufacturingPage,
});

/* ---------------- data ---------------- */

const seedItem = getSeedContentItem("page", "digital-twin-for-manufacturing");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];
const heroParagraphs = heroSection?.paragraphs?.length ? heroSection.paragraphs : ["Maximize your plant’s productivity with cutting edge Digital Twin technology for the Manufacturing industry."];
const heroImage =
  seedSections
    .flatMap((section) => section.images ?? [])
    .find(
      (image) =>
        !image.src.endsWith(".svg") &&
        !image.src.includes("Group.png") &&
        !image.src.includes("Group-523-2.png")
    )?.src ??
  "https://visionaize.com/wp-content/uploads/2022/07/istockphoto-846859964-1024x1024-1-2.png";
const introSection = seedSections.find((section) => section.heading?.toLowerCase() === "reduce consumption");
const introHeading = introSection?.heading ?? "Reduce downtime and maximize plant output";
const introParagraphs = introSection?.paragraphs?.length
  ? introSection.paragraphs
  : [
      "Get more out of your plant operations by experiencing data like never before. Combine AI, AR and VR technologies with advanced 3D data visualization capabilities.",
      "Connect with a Digital Twin expert to learn more about how this transformational technology can apply to your unique use case.",
    ];

const PILLARS = [
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Vector-6.svg",
    title: "Extend Asset Lifetime",
    body: "Better planning and data access extend your plant's life expectancy",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-3.svg",
    title: "Increase OEE",
    body: "Sustain operations with better foresight into overall equipment effectiveness",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/07/Group.png",
    title: "Reduce Consumption",
    body: "Run more energy-efficient operations that also consume less time and money",
  },
];

const CASE_STUDIES = [
  {
    eyebrow: "CASE STUDY",
    title: "Optimizing OEE with Predictive Maintenance and AI Solutions",
    tabs: {
      Challenge:
        "A leading global food manufacturing company was faced with productivity issues from unplanned downtime and lack of operational visibility. Visionaize was tasked with not only implementing the right solutions for enhancing the productivity and efficiency of the production lines but also with helping correct unexplainable production interruptions.",
      Solution:
        "Visionaize deployed predictive maintenance and AI-driven anomaly detection across the production lines, unifying sensor data into a single operational view so operators could anticipate failures before they cascaded.",
      Results:
        "Unplanned downtime fell sharply, OEE climbed, and the producer gained a reusable AI playbook to roll out to additional plants.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-502120934.webp",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Metal Manufacturer leans on Digital Twin tech to increase productivity",
    tabs: {
      Challenge:
        "A leading manufacturer of metal parts was experiencing difficulty tracking downtime, leading to poor machine performance, unclear operating procedures, and production bottlenecks. A digital twin pilot focusing on machine health analysis was run to optimize throughput and equipment utilization and provide visibility into the benefits of potential maintenance policies, in various scenarios.",
      Solution:
        "Visionaize built a machine-health digital twin that ingested live telemetry and modeled different maintenance policies, giving leadership a simulator for throughput and utilization decisions.",
      Results:
        "Bottlenecks were located and removed, machine performance lifted, and the team scaled the twin to additional cells with a clear ROI story.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1182152185.webp",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Optimizing Steel Manufacturing with Digital Twins and IIoT",
    tabs: {
      Challenge:
        "One of the largest global steel conglomerates in the world had needs to reduce costs, maintain efficiencies and improve product development. Temperature variations were a challenge that affected product quality and contributed to unnecessary downtime. Reducing costs, maintaining safety standards, and aligning divisional and corporate needs were also important needs.",
      Solution:
        "Visionaize layered IIoT sensing and a process digital twin over the line, surfacing real-time temperature variance and tying it back to product quality and maintenance triggers.",
      Results:
        "Scrap and rework dropped, safety standards held firm, and divisional and corporate teams finally worked off the same operational data.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1202781474.webp",
  },
];

const FORM_TOPICS = [
  "Respond better to critical factory alerts",
  "Optimize plant maintenance operations",
  "Improve inspections on the factory floor",
  "Reduce downtime and improve productivity",
];

/* ---------------- component ---------------- */

function ManufacturingPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F1B2D]">
      <Header />
      <Hero />
      <Pillars />
      <Intro />
      <CaseStudyCarousel />
      <FactoryReimagined />
      <TalkDigitalTwins />
      <Whitepaper />
      <LetsConnect />
      <Footer />
    </div>
  );
}

/* ---------------- sections ---------------- */

function Hero() {
  return (
    <section
      className="relative h-[640px] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('${heroImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative mx-auto flex h-full max-w-[1280px] items-center px-6">
        <div className="w-full max-w-[520px] bg-white p-12">
          <h1
            className="text-[64px] font-light leading-[1.05] tracking-tight"
            style={{
              background:
                "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Manufacturing
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
            {introHeading}
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
            alt="Visionaize 3D Digital Twin for manufacturing"
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
            <p className="text-xs font-semibold tracking-[0.18em] text-[#A6E04A]">
              {cs.eyebrow}
            </p>
            <h3 className="mt-3 text-[34px] font-semibold leading-tight">
              {cs.title}
            </h3>

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
            <img
              src={cs.img}
              alt={cs.title}
              className="w-full max-w-[560px] rounded shadow-lg"
              loading="lazy"
            />
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

function FactoryReimagined() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <h2 className="text-[44px] font-semibold leading-tight">
          Factory operations reimagined
        </h2>
        <div className="mt-8 max-w-[920px] space-y-6 text-[16px] leading-[1.8] text-[#3a4658]">
          <p>
            Imagine your factory manager, your shift supervisors, and your
            maintenance engineers being able to visualize rich, contextualized
            data and insights in an immersive 3D environment. Giving them the
            ability to see the future more clearly with advanced predictive
            maintenance and remote operations helps them get more done with less
            time and less risk.
          </p>
          <p>
            Visionaize provides the Manufacturing industry with cutting edge
            technology to succeed in The Industrial Metaverse. Advanced AI, AR
            and VR technologies, combined with supercharged remote operations
            capabilities maximize factory output.
          </p>
          <p>
            Connect with a Digital Twin expert to learn more about how
            Visionaize’s manufacturing software can help you get the most out of
            your floor operations.
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
          <h2 className="text-[44px] font-semibold leading-tight">
            Let’s talk digital twins
          </h2>
          <p className="mt-6 text-[16px] leading-[1.8] text-[#3a4658]">
            V-Suite turns your factory into your digital metaverse. Visualize
            your manufacturing operations through a real-time, up-to-date 3-D
            digital twin. Connect with us to learn how it works.
          </p>
          <h3 className="mt-10 text-[20px] font-semibold">Visionaize a better world</h3>
          <ul className="mt-6 space-y-4">
            {FORM_TOPICS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[16px] text-[#0F1B2D]">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #A6E04A 0%, #2E8DC5 100%)",
                  }}
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
                background:
                  "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              Send request
            </button>
            <p className="text-center text-xs text-[#64748B]">
              We generally respond within 24 hours
            </p>
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
        <path d="M-100 400 C 200 100, 600 100, 900 400" stroke="url(#cg)" strokeWidth="1.5" fill="none" />
        <path d="M-100 380 C 250 120, 650 120, 900 380" stroke="url(#cg)" strokeWidth="1.5" fill="none" />
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="800" y2="400">
            <stop offset="0%" stopColor="#A6E04A" />
            <stop offset="100%" stopColor="#2E8DC5" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative mx-auto max-w-[1280px] px-6">
        <h2 className="text-[64px] font-semibold leading-[1.05] text-white">
          Let’s Connect
        </h2>
        <p className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-white/80">
          Learn how Visionaize can reduce downtime and increase productivity
        </p>
        <Link
          to="/contact"
          className="mt-10 inline-flex items-center rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
          style={{
            background:
              "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
          }}
        >
          Talk to an expert
        </Link>
      </div>
    </section>
  );
}
