import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visionaize — The Future of Remote Monitoring" },
      {
        name: "description",
        content:
          "Visionaize's 3D Digital Twin & Smart Apps enable real-time monitoring, optimization, and prediction for heavy industry.",
      },
      { property: "og:title", content: "Visionaize — The Future of Remote Monitoring" },
      {
        property: "og:description",
        content:
          "3D Digital Twin & Smart Apps for industrial safety, productivity, and sustainability.",
      },
    ],
  }),
  component: Home,
});

/* ------------------------- data ------------------------- */

const HERO_LINES = [
  "INDUSTRIAL SAFETY",
  "OPERATIONAL PRODUCTIVITY",
  "INDUSTRIAL SUSTAINABILITY",
  " REMOTE MONITORING ",
];

const PRODUCT_PILLS = [
  { label: "V-Smart DocX", href: "/platform/v-smart-docx", color: "#A6E04A",
    icon: "https://visionaize.com/wp-content/uploads/2024/10/280fe858-3ffb-429f-9f1e-3dd6210ad7b2.png" },
  { label: "V-Plant", href: "/platform/v-plant", color: "#5BAE7E",
    icon: "https://visionaize.com/wp-content/uploads/2024/10/99769f4d-7c7c-42fc-8bd3-4bad12e2e352.png" },
  { label: "Smart Apps", href: "/solutions", color: "#3EA0A8",
    icon: "https://visionaize.com/wp-content/uploads/2024/10/e2154971-0d06-4b27-be8c-991075b14a8e.png" },
  { label: "VIZI CoPilot", href: "/platform/vizi-copilot-gen-ai", color: "#2E8DC5",
    icon: "https://visionaize.com/wp-content/uploads/2024/10/6696e1dcd0d97179d019c6c79f2a95e0.png" },
  { label: "Signal Miner", href: "/platform/signal-miner", color: "#0A7BC2",
    icon: "https://visionaize.com/wp-content/uploads/2024/10/b473a13b-7db2-4ded-9e38-8be0d52bba9f.png" },
];

const STATS = [
  { color: "#A6E04A", value: "10%",  label: "reduction in turnaround costs", prefix: "" },
  { color: "#5BAE7E", value: "1.5%", label: "gain in production yield through real-time monitoring", prefix: "Up to" },
  { color: "#3EA0A8", value: "10%",  label: "reduction in energy consumption", prefix: "Up to" },
  { color: "#2E8DC5", value: "8%",   label: "reduction in carbon emissions", prefix: "Up to" },
  { color: "#0A7BC2", value: "20%",  label: "improvement in operational efficiency", prefix: "Up to" },
  { color: "#A6E04A", value: "25%",  label: "in productivity gain", prefix: "Up to" },
];

const PLATFORM_CARDS = [
  {
    title: "Document Digitization",
    body: "Create an asset registry by converting static P&ID documents using AI-powered tools; enabling automated tag creation, equipment cataloging, piping and continuations.",
    link: "Discover V-Smart DocX",
    href: "/platform/v-smart-docx",
    color: "#A6E04A",
    img: "https://visionaize.com/wp-content/uploads/2024/10/0adbb9bd43275b4ea5872e02f4c47edc.png",
  },
  {
    title: "3D Digital Twin Foundation",
    body: "Explore 3D visualizations of the plant remotely to improve training, accelerate onboarding, and act as a foundation for Risk Based Inspection (RBI) programs.",
    link: "Discover V-Plant Explorer",
    href: "/platform/v-plant",
    color: "#5BAE7E",
    img: "https://visionaize.com/wp-content/uploads/2024/10/20927d682ec966a258f7c28439693ac7.png",
  },
  {
    title: "3D Digital Twin Modeling",
    body: "3D visualizations integrated with real-time data from sensors and other enterprise solutions enable condition-based monitoring for a Mechanical Integrity (MI) program.",
    link: "Discover V-Plant Pro",
    href: "/platform/v-plant",
    color: "#3EA0A8",
    img: "https://visionaize.com/wp-content/uploads/2024/10/702a5d2454e9013fcb5dbee03497c9bf-1.png",
  },
  {
    title: "AI Smart Apps",
    body: "Leverage plant data for remote performance monitoring, predictive maintenance, process prediction, real-time optimization and decarbonization.",
    link: "Discover V-Smart Apps",
    href: "/solutions",
    color: "#2E8DC5",
    img: "https://visionaize.com/wp-content/uploads/2024/06/RPM-1.jpeg",
  },
  {
    title: "Gen-AI Integration",
    body: "Get accurate, fast responses to complex queries and challenges. Operates flexibly as a standalone solution or embedded within other systems to enhance operational excellence.",
    link: "Discover VIZI CoPilot",
    href: "/platform/vizi-copilot-gen-ai",
    color: "#0A7BC2",
    img: "https://visionaize.com/wp-content/uploads/2024/10/Vizi-Copilot-Chat-Image-1-1-300x189.png",
  },
  {
    title: "Signal Miner",
    body: "Avoid equipment downtime and failure by leveraging historical and real-time data. Pinpoint root causes of failure before they bring operations to a halt.",
    link: "Discover Signal Miner",
    href: "/platform/signal-miner",
    color: "#A6E04A",
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1182152185-e1699026887686-1024x541.jpg",
  },
];

const CASE_STUDIES = [
  {
    title: "Optimizing OEE with Predictive Maintenance and AI Solutions",
    image: "https://visionaize.com/wp-content/uploads/2023/11/steel-service-platform-and-stairs-equipment-refinery-SBI-300930077-scaled-1.jpg",
    tabs: {
      Challenge:
        "One of the world's largest oil producers was plagued with a data silo issue with data from 15 different enterprise applications sealed off from one another. Besides the data not being integrated into the same system, the teams managing these different applications were not collaborating to the extent that they should have been.",
      Solution:
        "Visionaize built an integrated 3D digital twin layer on top of all 15 systems, unifying inspection, maintenance, and operations workflows with a single contextual view of the asset.",
      Results:
        "Within six months the customer eliminated duplicate inspections, cut planned-shutdown costs by over 10%, and made every cross-team decision traceable back to the digital twin.",
    },
  },
  {
    title: "Reducing Corrosion Discovery Time from Weeks to Days",
    image: "https://visionaize.com/wp-content/uploads/2023/11/oil-refinery-equipment-for-primary-oil-refining-SBI-300925954-1.jpg",
    tabs: {
      Challenge:
        "A major refinery's inspection team needed to investigate suspected corrosion across thousands of feet of piping with limited access and shrinking turnaround windows.",
      Solution:
        "V-Plant overlaid inspection data on the 3D digital twin, letting engineers triage hotspots remotely and dispatch crews only where needed.",
      Results:
        "Corrosion problems that previously took two weeks to localize were solved in two days, freeing teams for higher-value work.",
    },
  },
  {
    title: "Cutting Inspection Backlogs with Risk-Based Prioritization",
    image: "https://visionaize.com/wp-content/uploads/2023/11/iStock-469895003-copy@0.5x-1.png",
    tabs: {
      Challenge:
        "A global petrochemical operator faced a growing inspection backlog driven by aging assets and limited field inspector availability.",
      Solution:
        "Visionaize Smart Apps prioritized inspections using risk scores derived from real-time process data and historical failures.",
      Results:
        "The backlog dropped by 40% in one year while critical-asset coverage improved, with no added headcount.",
    },
  },
];

const TESTIMONIALS = [
  {
    quote:
      "It is astounding how this platform is able to integrate data from complex systems like SCADA, AMI Meter, and GIS Systems to provide accurate 3D visualizations",
    name: "Bill Andrew",
    role: "President, Delaware Electric Cooperative",
  },
  {
    quote:
      "During the early stages of implementation, V-Plant helped the inspection team find and solve a corrosion problem in 2 days. A similar exercise required 2 weeks using a competitor's product.",
    name: "Inspection Lead",
    role: "CHS, Inc.",
  },
  {
    quote:
      "Visionaize's digital twin completely changed how our engineers collaborate across sites. Decisions that used to take days now happen in hours.",
    name: "Operations Director",
    role: "Global Energy Operator",
  },
];

const NAVY_PARTNERS = [
  { name: "ExxonMobil", logo: "https://visionaize.com/wp-content/uploads/2024/02/exxonmobil-white.png" },
  { name: "Shell", logo: "https://visionaize.com/wp-content/uploads/2024/02/shell-white.png" },
  { name: "GE Digital", logo: "https://visionaize.com/wp-content/uploads/2024/02/ge-digital-white.png" },
  { name: "Bayer", logo: "https://visionaize.com/wp-content/uploads/2024/02/bayer-white.png" },
  { name: "Saudi Aramco", logo: "https://visionaize.com/wp-content/uploads/2024/02/saudi-aramco-white.png" },
];

const LIGHT_PARTNERS = [
  { name: "Microsoft", logo: "https://visionaize.com/wp-content/uploads/2024/08/Microsoft-Logo.wine_-1024x219.png" },
  { name: "GE Vernova", logo: "https://visionaize.com/wp-content/uploads/2024/04/GE_Vernova_logo-1024x226.png" },
  { name: "Visionaize Corporation", logo: "https://visionaize.com/wp-content/uploads/2022/11/visionaizecorporation.svg" },
  { name: "Snowflake", logo: "https://visionaize.com/wp-content/uploads/2026/06/Snowflake_Logo.svg-1024x245.png" },
  { name: "NVMS", logo: "https://visionaize.com/wp-content/uploads/2022/05/NVMS-logo-1.png" },
];

const IMPROVE_STEPS = [
  {
    title: "Meet with an Expert",
    body: "Meet with one of our experts to explore our solutions and receive a live demo of our platforms.",
    icon: "https://visionaize.in/wp-content/uploads/2024/10/8795c753-cb33-4970-8480-54fc5cdab0ee-300x239.png",
  },
  {
    title: "Discover Use Cases",
    body: "Allow our experts to understand your unique use cases and provide recommendations for quick wins.",
    icon: "https://visionaize.in/wp-content/uploads/2024/10/04e53ef6-cf2b-4556-b8b5-dfd74f1e285e-300x158.png",
  },
  {
    title: "Improve Operations",
    body: "Start leveraging data and technology to enhance operations and advance digital maturity.",
    icon: "https://visionaize.in/wp-content/uploads/2024/10/5b90fcc2-cde5-41ee-8373-715689b46b32-300x273.png",
  },
];

const BLOG_POSTS = [
  {
    title: "The Role of AI in Oil and Gas: Transforming Operations with Intelligence",
    excerpt:
      "The oil and gas industry is undergoing a significant digital transformation, driven by the integration of artificial intelligence and advanced analytics.",
    img: "https://visionaize.com/wp-content/uploads/2024/10/image-1-9-2048x1155.png",
    href: "/blog/role-of-ai-in-oil-and-gas",
  },
  {
    title: "How 3D Digital Twins and Generative AI Accelerate Industrial Decarbonization",
    excerpt:
      "In an era where sustainability is a competitive advantage, industrial decarbonization has become a strategic imperative for heavy industry leaders.",
    img: "https://visionaize.com/wp-content/uploads/2024/09/image-1-8-1024x433.png",
    href: "/blog/3d-twins-decarbonization",
  },
  {
    title: "Artificial Intelligence in Oil and Gas: Transforming Industry Operations with AI",
    excerpt:
      "The oil and gas industry is undergoing a significant transformation, driven by the integration of artificial intelligence and machine learning.",
    img: "https://visionaize.com/wp-content/uploads/2024/09/37242334722.png",
    href: "/blog/ai-transforming-industry-operations",
  },
];

const CERTIFICATIONS = [
  {
    title: "ISO/IEC 27001:2022 — Information Security Management",
    img: "https://visionaize.in/wp-content/uploads/2026/04/VISIONAIZE-TECHNOLOGIES-PRIVATE-LIMITED-27001-1-01-scaled.png",
  },
  {
    title: "ISO 9001:2015 — Quality Management System",
    img: "https://visionaize.in/wp-content/uploads/2026/04/VISIONAIZE-TECHNOLOGIES-PRIVATE-LIMITED-qms-01-1447x2048.png",
  },
];

/* ------------------------- component ------------------------- */

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />
      <Hero />
      <IntroAndStats />
      <RemotePlantAccess />
      <CaseStudyCarousel />
      <TestimonialSlider />
      {/* <NavyPartners /> */}
      <ImproveOps />
      <ReactiveToPredictive />
      <InnovatingTogether />
      <BlogSection />
      <Certifications />
      {/* <LetsConnect /> */}
      <Footer />
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % HERO_LINES.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black min-h-[480px] sm:min-h-[560px] md:min-h-[620px]">
      {/* Background video: object-cover keeps it filling the section edge-to-edge
          at every breakpoint, cropping the sides/top rather than letterboxing */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://visionaize.com/wp-content/uploads/2024/12/iStock-1219920849-2-1-1-1-1-1.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" aria-hidden />

      <div className="relative mx-auto flex min-h-[480px] max-w-7xl flex-col justify-end px-4 pb-10 sm:min-h-[560px] sm:px-6 sm:pb-16 md:min-h-[620px] md:grid md:grid-cols-12 md:items-end">
        <div className="md:col-span-9">
          {/* Rotating keyword band, flush to viewport left edge on the design.
              Sizing steps down through the breakpoints instead of using a
              fixed 640px min-width, so it no longer forces horizontal scroll
              on small phones. */}
          <div className="relative -ml-4 translate-y-8 sm:-ml-6 sm:translate-y-12 md:-ml-12 md:translate-y-16">
            <div
              className="relative inline-flex max-w-[92vw] items-center pl-4 pr-10 py-3 text-base font-bold tracking-wide text-white shadow-xl sm:max-w-none sm:pl-8 sm:pr-16 sm:py-4 sm:text-xl md:pl-16 md:pr-20 md:py-6 md:text-2xl lg:text-4xl"
              style={{
                background:
                  "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 35%, #3EA0A8 70%, #6FC7E0 100%)",
                clipPath: "polygon(0 0, 100% 0, calc(100% - 32px) 100%, 0 100%)",
              }}
            >
              <span className="mr-2 whitespace-nowrap opacity-90 sm:mr-3">THE FUTURE OF</span>
              <span
                key={i}
                className="animate-fade-in whitespace-nowrap border-l-2 border-white/80 pl-2 sm:pl-3"
              >
                {HERO_LINES[i]}
              </span>
            </div>
          </div>

          {/* Product pills: below md, hover-to-expand doesn't work on touch,
              so this renders as a plain horizontal row of icon links instead
              of the absolutely-positioned expanding column used on desktop. */}
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 md:hidden">
            {PRODUCT_PILLS.map((p) => (
              <Link
                key={p.label}
                to={p.href}
                aria-label={p.label}
                className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg sm:h-12 sm:w-12"
                style={{ background: p.color }}
              >
                <img src={p.icon} alt="" className="h-6 w-6 object-contain" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right rail product pills — desktop only (md and up) */}
        <div className="absolute right-4 top-24 z-20 hidden flex-col gap-5 md:right-8 md:top-28 md:flex">
          {PRODUCT_PILLS.map((p) => (
            <Link
              key={p.label}
              to={p.href}
              className="group relative flex h-16 w-16 self-end items-center overflow-hidden rounded-full transition-all duration-500 ease-in-out hover:w-[250px]"
              style={{ background: p.color }}
            >
              <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full">
                <img src={p.icon} alt={p.label} className="h-8 w-8 object-contain" />
              </div>

              <span className="ml-20 whitespace-nowrap text-lg font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                {p.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fadeIn .55s ease-out both; }
      `}</style>
    </section>
  );
}

/* ---------- Intro + stats ---------- */
function IntroAndStats() {
  return (
    <section className="bg-white pb-12 pt-10 md:pb-0 md:pt-0">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 sm:gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
        {/* Image column: overflow-hidden contains the intentional "bleed"
            width used at md/lg so it can't cause horizontal scrolling */}
        <div className="flex justify-center overflow-hidden md:justify-start">
          <img
            src="https://visionaize.com/wp-content/uploads/2024/11/Group-1000007065.png"
            alt="Visionaize 3D Digital Twin & Smart Apps"
            className="h-[260px] w-full max-w-none object-contain sm:h-[360px] md:h-[500px] md:w-[150%] lg:h-[650px] lg:w-[190%]"
          />
        </div>

        {/* Text column */}
        <div className="px-2 sm:px-0">
          <h2 className="text-xl font-semibold leading-snug text-brand-navy sm:text-2xl md:text-[32px]">
            Visionaize's 3D Digital Twin &amp; Smart Apps Enable Real-Time Monitoring,
            Optimization, and Prediction for Heavy Industry
          </h2>

          <ul className="mt-6 space-y-4 sm:mt-8">
            {STATS.map((s, index) => (
              <li
                key={s.label}
                className="flex flex-wrap items-baseline gap-2 text-brand-ink/90"
              >
                <span
                  className="mt-1 inline-block h-2 w-2 flex-none rounded-full"
                  style={{ background: s.color }}
                />

                {s.prefix && (
                  <span className="text-sm text-brand-ink/70">{s.prefix}</span>
                )}

                <span
                  className="animate-percentage text-lg font-bold sm:text-xl"
                  style={{
                    color: s.color,
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  {s.value}
                </span>

                <span className="text-sm text-brand-ink/85 sm:text-base">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Remote Plant Access cards ---------- */
function RemotePlantAccess() {
  return (
    <section className="bg-[#E6F4FB] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Remote Plant Access - Be There From Anywhere
        </h2>

        <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_CARDS.map((c) => (
            <article
              key={c.title}
              className="group relative flex flex-col overflow-hidden rounded-md bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="p-6 pb-0">
                <div className="mb-5 aspect-[16/10] overflow-hidden rounded">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        "https://visionaize.com/wp-content/uploads/2024/02/image_27-removebg-preview.png")
                    }
                    loading="lazy"
                  />
                </div>
                <h3
                  className="mt-4 bg-clip-text text-xl font-bold leading-tight text-transparent sm:text-[24px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #8CC63F 0%, #39B54A 25%, #28A9A2 55%, #1E88E5 100%)",
                  }}
                >
                  {c.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-brand-ink/80">{c.body}</p>
              </div>

              {/* spacer pushes link + accent bar to bottom, keeping card heights aligned */}
              <div className="flex-1" />

              <div className="px-6 pb-5 pt-5">
                <Link
                  to={c.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-navy"
                >
                  {c.link} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* colored accent bar at the very bottom, per-card color */}
              <div
                className="h-1 w-full"
                style={{
                  background:
                    "linear-gradient(to right, #93C01F 0%, #52B788 45%, #00A8E8 100%)",
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Case Study Carousel ---------- */
function CaseStudyCarousel() {
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState<"Challenge" | "Solution" | "Results">("Challenge");
  // direction drives which way the slide-in animation comes from:
  // 1 = next (slides in from the right), -1 = prev (slides in from the left)
  const [direction, setDirection] = useState<1 | -1>(1);

  const next = () => {
    setDirection(1);
    setIdx((x) => (x + 1) % CASE_STUDIES.length);
    setTab("Challenge");
  };
  const prev = () => {
    setDirection(-1);
    setIdx((x) => (x - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
    setTab("Challenge");
  };
  const cs = CASE_STUDIES[idx];

  return (
    <section className="bg-white py-14 sm:py-20">
      <style>{`
        @keyframes csSlideInRight {
          from { transform: translateX(48px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes csSlideInLeft {
          from { transform: translateX(-48px); opacity: 0; }
          to   { transform: translateX(0);      opacity: 1; }
        }
        .cs-slide-right { animation: csSlideInRight 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
        .cs-slide-left  { animation: csSlideInLeft  0.45s cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Demonstrated Success in Oil &amp; Gas, Manufacturing, and Power Industries
        </h2>

        <div className="relative mt-10 sm:mt-14">
          {/* Arrows sit just inside the safe area on mobile (left-0/right-0)
              and step outward on larger screens, so they never overlap the
              page's own edge padding or get clipped off-screen. */}
          <button
            onClick={prev}
            aria-label="Previous case study"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 text-brand-navy shadow-md ring-1 ring-brand-ink/10 hover:bg-secondary sm:-left-2 sm:p-2 md:-left-4"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next case study"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 text-brand-navy shadow-md ring-1 ring-brand-ink/10 hover:bg-secondary sm:-right-2 sm:p-2 md:-right-4"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* overflow-hidden clips the slide motion; it's scoped to just this
              inner wrapper so it doesn't clip the arrow buttons positioned
              outside the grid above */}
          <div className="overflow-hidden">
            {/* key={idx} forces React to remount this block on every case-study
                change, which restarts the CSS animation each time */}
            <div
              key={idx}
              className={`grid items-start gap-8 px-8 sm:gap-10 sm:px-10 md:grid-cols-2 md:px-6 ${
                direction === 1 ? "cs-slide-right" : "cs-slide-left"
              }`}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-lime">
                  CASE STUDY
                </p>
                <h3 className="mt-3 text-xl font-bold text-brand-navy sm:text-2xl md:text-3xl">
                  {cs.title}
                </h3>

                <div className="mt-6 flex gap-4 overflow-x-auto border-b border-brand-ink/10 sm:mt-8 sm:gap-6">
                  {(["Challenge", "Solution", "Results"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`relative -mb-px whitespace-nowrap pb-3 text-sm font-semibold transition ${
                        tab === t ? "text-brand-blue" : "text-brand-ink/55 hover:text-brand-ink"
                      }`}
                    >
                      {t}
                      {tab === t && (
                        <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-blue" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-md border border-brand-ink/10 bg-white p-4 text-base leading-7 text-brand-ink/85 sm:p-6 sm:leading-8">
                  {cs.tabs[tab]}
                </div>
              </div>

              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-[#E6F4FB] to-[#CDE7F3] shadow-lg">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="h-full w-full object-cover"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "https://visionaize.com/wp-content/uploads/2024/02/image_27-removebg-preview.png")
                  }
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonial slider on navy with decorative arcs ---------- */
function TestimonialSlider() {
  const [i, setI] = useState(0);
  const prev = () => setI((x) => (x - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setI((x) => (x + 1) % TESTIMONIALS.length);
  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[i];
  return (
    <section className="relative overflow-hidden bg-[#0F2237] pb-8 pt-16 text-white sm:pt-24">
      {/* decorative arcs */}
      <svg
        className="pointer-events-none absolute -bottom-32 -right-32 h-[340px] w-[340px] opacity-70 sm:h-[420px] sm:w-[420px] md:h-[520px] md:w-[520px]"
        viewBox="0 0 500 500"
        fill="none"
      >
        <circle cx="250" cy="250" r="240" stroke="#A6E04A" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="200" stroke="#3EA0A8" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="160" stroke="#2E8DC5" strokeWidth="1.5" />
      </svg>

      <div className="relative mx-auto max-w-5xl px-4 pb-24 text-center sm:px-6 sm:pb-32">
        <h2
          className="mb-10 bg-gradient-to-r from-[#A6E04A] via-[#3EA0A8] to-[#2E8DC5] bg-clip-text text-center text-2xl font-bold text-transparent drop-shadow-sm sm:mb-12 sm:text-3xl md:text-4xl"
        >
          Trusted by Global Industry Leaders
        </h2>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex-none rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white sm:p-2"
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
          <div className="flex-1">
            <p className="text-balance text-base font-medium leading-relaxed text-white sm:text-xl md:text-2xl">
              &ldquo;{t.quote}&rdquo;
            </p>
          </div>
          <button
            onClick={next}
            aria-label="Next"
            className="flex-none rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white sm:p-2"
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
        </div>
      </div>

      {/* logo image pinned to the very bottom of the section */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <img
          src="https://visionaize.in/wp-content/uploads/2022/05/Logos-mini-desktop.png"
          alt={`${t.name}, ${t.role}`}
          className="mx-auto h-auto w-full max-w-5xl object-contain px-4 sm:px-6"
          loading="lazy"
        />
      </div>
    </section>
  );
}

/* ---------- Navy partner band ---------- */
function NavyPartners() {
  return (
    <section className="relative bg-[#0F2237] pb-16 pt-4">
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-8 px-4 sm:px-6 md:grid-cols-5">
        {NAVY_PARTNERS.map((p) => (
          <div key={p.name} className="flex items-center justify-center">
            <img
              src={p.logo}
              alt={p.name}
              className="h-10 max-w-[180px] object-contain opacity-90 md:h-12"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.outerHTML = `<span class="text-white/80 text-lg font-semibold tracking-wide">${p.name}</span>`;
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {/* bottom gradient line */}
      <div
        className="absolute inset-x-0 bottom-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 35%, #3EA0A8 70%, #2E8DC5 100%)",
        }}
      />
    </section>
  );
}

/* ---------- Improve Operations with icons ---------- */
function ImproveOps() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Improve Your Operations Today
        </h2>
        <div className="mt-10 grid gap-10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {IMPROVE_STEPS.map((s) => (
            <div key={s.title} className="flex flex-col items-center">
              <img
                src={s.icon}
                alt=""
                className="mb-5 h-14 w-14 object-contain"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
              <h3 className="text-xl font-bold text-brand-navy sm:text-2xl">{s.title}</h3>
              <p className="mt-3 max-w-xs text-base leading-relaxed text-brand-ink/75 sm:text-lg">
                {s.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 sm:mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg sm:px-9 sm:py-4"
            style={{
              background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
            }}
          >
            Meet with an Expert
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reactive to Predictive (video) ---------- */
function ReactiveToPredictive() {
  return (
    <section className="bg-[#D6ECF7] py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 sm:gap-10 md:grid-cols-2 md:items-center">
        {/* aspect-video keeps a correct 16:9 box at every width, so the
            player never gets cropped or stretched on small screens */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-brand-navy shadow-xl">
          <video
            src="https://visionaize.com/wp-content/uploads/2024/10/1714666253230.mp4"
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold leading-tight text-brand-navy sm:text-3xl md:text-4xl">
            Transform Operations from Reactive to Predictive
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-ink/80 sm:mt-5 sm:text-lg">
            Minimize unpredictability, manual reporting, and data analysis tasks by leveraging
            real-time data to enhance industrial intelligence across your plant. Improve remote
            performance monitoring, predictive maintenance, process performance forecasting,
            real-time optimization, and decarbonization efforts.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Innovating Together (whitepaper + partner logos) ---------- */
function InnovatingTogether() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Innovating Together with Our Valued Partners
        </h2>

        <div className="mt-10 grid items-center gap-10 sm:mt-14 sm:gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold leading-tight text-brand-navy sm:text-2xl md:text-3xl">
              Turnarounds that Reduce
              <br />
              Costs by More Than 10%
            </h3>
            <p className="mt-5 text-base leading-relaxed text-brand-ink/80 sm:mt-6 sm:text-lg">
              A collaboration between PwC and Visionaize, this whitepaper delves deeply into a
              modern approach to Turnarounds that enables operators to maximize productivity and
              significantly reduce downtime.
            </p>
            <a
              href="https://visionaize.com/re-inventing-turnarounds-in-the-metaverse/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg sm:mt-8 sm:px-8 sm:py-3.5"
              style={{
                background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              Download White Paper
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="https://visionaize.com/wp-content/uploads/2024/10/caa1b2e0de661dece3de9db3994b2f91.png"
              alt="Reinventing Turnarounds in the Metaverse whitepaper"
              className="w-full max-w-xs sm:max-w-md"
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://visionaize.com/wp-content/uploads/2024/02/image_27-removebg-preview.png")
              }
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 items-center gap-8 sm:mt-16 sm:gap-10 md:grid-cols-5">
          {LIGHT_PARTNERS.map((p) => (
            <div key={p.name} className="flex items-center justify-center">
              <img
                src={p.logo}
                alt={p.name}
                className="h-10 max-w-[180px] md:h-12"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.outerHTML = `<span class="text-brand-ink/50 text-lg font-semibold tracking-wide">${p.name}</span>`;
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Blog grid ---------- */
function BlogSection() {
  return (
    <section className="bg-white pb-14 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Explore Our Latest Articles
        </h2>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((p) => (
            <article key={p.title} className="group flex flex-col pb-5">
              <div className="aspect-[16/10] overflow-hidden rounded">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "https://visionaize.com/wp-content/uploads/2024/02/image_27-removebg-preview.png")
                  }
                  loading="lazy"
                />
              </div>
              <h3 className="mt-5 text-lg font-bold leading-snug text-brand-navy sm:text-xl">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-brand-ink/75 sm:text-lg">
                {p.excerpt}
              </p>
              <Link
                to="/blog"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-navy"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
              {/* gradient bottom line */}
              <div
                className="mt-5 h-1 w-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 35%, #3EA0A8 70%, #2E8DC5 100%)",
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Our Certifications &amp; Compliance
        </h2>

        <div className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10 md:place-items-center">
          {CERTIFICATIONS.map((c) => (
            <img
              key={c.title}
              src={c.img}
              alt={c.title}
              className="h-auto w-full max-w-xs object-contain shadow-md sm:max-w-sm"
              loading="lazy"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
          ))}
        </div>

        <p className="mt-8 text-base font-bold text-brand-ink/90 sm:mt-10 sm:text-lg">
          Visionaize Technologies is certified for quality management and information
          security standards.
        </p>
      </div>
    </section>
  );
}

// /* ---------- Let's Connect CTA ---------- */
// function LetsConnect() {
//   return (
//     <section className="relative overflow-hidden bg-white py-24">
//       {/* decorative arcs in bottom-right */}
//       <svg
//         className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] opacity-50"
//         viewBox="0 0 600 600"
//         fill="none"
//       >
//         <circle cx="300" cy="300" r="290" stroke="#A6E04A" strokeWidth="1.5" />
//         <circle cx="300" cy="300" r="240" stroke="#3EA0A8" strokeWidth="1.5" />
//         <circle cx="300" cy="300" r="190" stroke="#2E8DC5" strokeWidth="1.5" />
//       </svg>

//       <div className="relative mx-auto max-w-7xl px-6">
//         <h2 className="text-5xl font-bold text-brand-navy md:text-6xl">Let's Connect</h2>
//         <p className="mt-6 max-w-md text-base text-brand-ink/80">
//           Learn how Visionaize can reduce downtime and increase productivity
//         </p>
//         <Link
//           to="/contact"
//           className="mt-8 inline-flex items-center rounded-full bg-brand-navy px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-blue"
//         >
//           Talk to an expert
//         </Link>
//       </div>
//     </section>
//   );
// }