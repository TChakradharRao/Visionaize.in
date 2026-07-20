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
const heroParagraphs = heroSection?.paragraphs?.length
  ? heroSection.paragraphs
  : [
      "Maximize your plant's productivity with cutting edge Digital Twin technology for the Manufacturing industry.",
    ];

const FALLBACK_HERO_IMAGE =
  "https://visionaize.in/wp-content/uploads/2026/05/ChatGPT-Image-May-14-2026-manufacturing.png"; // placeholder — replace with your actual fallback if you have one

const heroImage =
  seedSections
    .flatMap((section) => section.images ?? [])
    .find(
      (image) =>
        !image.src.endsWith(".svg") &&
        !image.src.includes("Group.png") &&
        !image.src.includes("Group-523-2.png")
    )?.src ?? FALLBACK_HERO_IMAGE;

const introSection = seedSections.find(
  (section) => section.heading?.toLowerCase() === "Reduce downtime and maximize plant output"
);
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
    eyebrow: "CASE STUDY (01 of 03)",
    title: "Optimizing Steel Manufacturing with Digital Twins and IIoT",
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-502120934.webp",
    tabs: {
      Challenge:
        "Steel manufacturers face fluctuating yields, unplanned equipment downtime, and fragmented visibility across rolling, casting, and finishing lines, making it hard to pinpoint the root cause of quality and throughput issues.",
      Solution:
        "Visionaize deployed an IIoT-connected digital twin across the plant floor, unifying sensor data from casters, rolling mills, and furnaces into a single real-time 3D view with AI-driven anomaly detection.",
      Results:
        "The plant gained faster root-cause diagnosis, improved yield consistency, and reduced unplanned downtime across critical steel production lines.",
    },
  },
  {
    eyebrow: "CASE STUDY (02 of 03)",
    title: "Optimizing OEE with Predictive Maintenance and AI Solutions",
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1182152185.webp",
    tabs: {
      Challenge:
        "Manual inspection schedules and reactive maintenance were driving down Overall Equipment Effectiveness (OEE), with unplanned stoppages disrupting production targets across the facility.",
      Solution:
        "An AI-based predictive maintenance model was layered onto existing plant sensors, continuously scoring equipment health and flagging early degradation before failures occurred.",
      Results:
        "The facility saw measurable OEE improvement, fewer unplanned stoppages, and maintenance teams shifted from reactive to planned, condition-based servicing.",
    },
  },
  {
    eyebrow: "CASE STUDY (03 of 03)",
    title: "Metal Manufacturer leans on Digital Twin tech to increase productivity",
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1202781474.webp",
    tabs: {
      Challenge:
        "A metal manufacturer struggled with siloed data across production lines, making it difficult for operators and engineers to get a unified view of plant performance and bottlenecks.",
      Solution:
        "Visionaize built a 3D digital twin of the facility that contextualizes production, quality, and asset data in one immersive environment, giving teams a shared operational picture.",
      Results:
        "The manufacturer achieved increased overall productivity, faster bottleneck identification, and better cross-team coordination between operations and engineering.",
    },
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
        backgroundImage:
          "url('https://visionaize.com/wp-content/uploads/2022/07/istockphoto-846859964-1024x1024-1-2.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative mx-auto flex h-full max-w-[1280px] items-center px-6">
        <div className="w-full max-w-[640px] bg-white p-14">
          <h1
            className="text-[56px] font-light leading-[1.05] tracking-tight"
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
          <h2 className="text-[40px] font-semibold leading-tight">
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
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);

  const cs = CASE_STUDIES[idx];

  const goTo = (newIdx: number, dir: "left" | "right") => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setIdx(newIdx);
      setTab("Challenge");
      setIsAnimating(false);
    }, 250);
  };

  const next = () => goTo((idx + 1) % CASE_STUDIES.length, "right");
  const prev = () =>
    goTo((idx - 1 + CASE_STUDIES.length) % CASE_STUDIES.length, "left");

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

        <div className="overflow-hidden px-10">
          <div
            className="grid grid-cols-1 items-center gap-10 transition-all duration-250 ease-out lg:grid-cols-2"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating
                ? `translateX(${direction === "right" ? "-24px" : "24px"})`
                : "translateX(0)",
            }}
          >
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
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {CASE_STUDIES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i, i > idx ? "right" : "left")}
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
    <section className="bg-white pb-20 pt-2">
      <div className="mx-auto max-w-[1290px] px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="whitespace-nowrap text-[40px] font-semibold leading-tight">
              Factory operations reimagined
            </h2>
            <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-[#3a4658]">
              <p>
                Imagine your factory manager, your shift supervisors, and your
                maintenance engineers being able to visualize rich,
                contextualized data and insights in an immersive 3D
                environment. Giving them the ability to see the future more
                clearly with advanced predictive maintenance and remote
                operations helps them get more done with less time and less
                risk.
              </p>
              <p>
                Visionaize provides the Manufacturing industry with cutting
                edge technology to succeed in The Industrial Metaverse.
                Advanced AI, AR and VR technologies, combined with
                supercharged remote operations capabilities maximize factory
                output.
              </p>
              <p>
                Connect with a Digital Twin expert to learn more about how
                Visionaize&rsquo;s manufacturing software can help you get the
                most out of your floor operations.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://visionaize.in/wp-content/uploads/2022/07/Rectangle-425-6.png"
              alt="Factory operations reimagined with 3D digital twin visualization"
              className="h-[490px] w-full max-w-[500px] rounded-lg object-cover shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TalkDigitalTwins() {
  return (
    <section id="talk-to-an-expert" className="bg-[#F1F5F9] py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-[44px] font-semibold leading-tight">
            Let&rsquo;s talk digital twins
          </h2>
          <p className="mt-6 text-[18px] leading-[1.8] text-[#3a4658]">
            V-Suite turns your factory into your digital metaverse. Visualize
            your manufacturing operations through a real-time, up-to-date 3-D
            digital twin. Connect with us to learn how it works.
          </p>
          <h3 className="mt-10 text-[22px] font-semibold">Visionaize a better world</h3>
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

        <div className="flex justify-center rounded-lg bg-white p-8 shadow-md w-full max-w-[420px]">
          <div className="w-full max-w-[360px]">
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
    <section className="bg-white pb-20 pt-6">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
        <div className="flex justify-center">
          <img
            src="https://visionaize.in/wp-content/uploads/2026/05/Group-1171277152-1.png"
            alt="The Industrial Metaverse whitepaper"
            className="w-full max-w-[460px] "
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-[44px] font-semibold leading-tight">
            Experience data in The Industrial Metaverse
          </h2>
          <p className="mt-6 text-[18px] leading-[1.8] text-[#3a4658]">
            With the emergence of Industry 4.0 and IIoT sensors, data overload
            is a common challenge. Explore how 3D digital twin technology can
            turn the data deluge into a competitive advantage.
          </p>
          
           <a href="https://visionaize.com/the-industrial-metaverse/"
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

