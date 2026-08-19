import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
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
  "REMOTE MONITORING",
];

const PRODUCT_PILLS = [
  { label: "V-Smart DocX", href: "/platform/v-smart-docx", color: "#A6E04A",
    icon: "/homepage/visionai-dox-icon.png" },
  { label: "V-Plant", href: "/platform/v-plant", color: "#5BAE7E",
    icon: "/homepage/v-plant-icon.png" },
  { label: "Smart Apps", href: "/solutions", color: "#3EA0A8",
    icon: "/homepage/smatapp-icon.png" },
  { label: "VIZI CoPilot", href: "/platform/vizi-copilot-gen-ai", color: "#2E8DC5",
    icon: "/homepage/vizi-icon.png" },
  { label: "Signal Miner", href: "/platform/signal-miner", color: "#0A7BC2",
    icon: "/homepage/signalminar-icon.png" },
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
    img: "/homepage/remote-section-document.png",
  },
  {
    title: "3D Digital Twin Foundation",
    body: "Explore 3D visualizations of the plant remotely to improve training, accelerate onboarding, and act as a foundation for Risk Based Inspection (RBI) programs.",
    link: "Discover V-Plant Explorer",
    href: "/platform/v-plant",
    color: "#5BAE7E",
    img: "/homepage/remote-sect-3dfoundation.png",
  },
  {
    title: "3D Digital Twin Modeling",
    body: "3D visualizations integrated with real-time data from sensors and other enterprise solutions enable condition-based monitoring for a Mechanical Integrity (MI) program.",
    link: "Discover V-Plant Pro",
    href: "/platform/v-plant",
    color: "#3EA0A8",
    img: "/homepage/remote-sect-3dmodeling.png",
  },
  {
    title: "AI Smart Apps",
    body: "Leverage plant data for remote performance monitoring, predictive maintenance, process prediction, real-time optimization and decarbonization.",
    link: "Discover V-Smart Apps",
    href: "/solutions",
    color: "#2E8DC5",
    img: "/homepage/remote-sect-aismart.jpeg",
  },
  {
    title: "Gen-AI Integration",
    body: "Get accurate, fast responses to complex queries and challenges. Operates flexibly as a standalone solution or embedded within other systems to enhance operational excellence.",
    link: "Discover VIZI CoPilot",
    href: "/platform/vizi-copilot-gen-ai",
    color: "#0A7BC2",
    img: "/homepage/remote-sect-genai.png",
  },
  {
    title: "Signal Miner",
    body: "Avoid equipment downtime and failure by leveraging historical and real-time data. Pinpoint root causes of failure before they bring operations to a halt.",
    link: "Discover Signal Miner",
    href: "/platform/signal-miner",
    color: "#A6E04A",
    img: "/homepage/remote-sect-signalminar.jpg",
  },
];

const CASE_STUDIES = [
  {
    title: "Refinery Precision: Quick Returns Through Operational Efficiency",
    image: "/homepage/case-refenary.png",
    tabs: {
        Challenge:
          "In the complex world of a petroleum refinery, the company grappled with significant challenges like <b>elevating the plant-wide Mechanical Integrity (MI) program</b>, implementing Risk-Based Inspection (RBI), and overcoming the limitations of legacy systems emerged as formidable hurdles.",
        Solution:
          "In overcoming these challenges, the company partnered with Visionaize. Leveraging Visionaize V-Suite software, MI & RBI solutions were successfully implemented, deploying PCMS at the site. The <b>integration of the V-Suite 3DBI Active Model with visual inspection software</b> became a game changer, ensuring effective management and resolution.",
      Results: [
        "Realized an impressive IRR of 132%",
        "Achieved a swift 13-month payback period",
        "Substantial reduction in carbon emissions",
      ],
    },
  },
  {
    title: "Optimizing OEE with Predictive Maintenance and AI Solutions",
    image: "/homepage/case-optimiz.jpg",
    tabs: {
      Challenge:
        "One of the world's largest oil producer's in the world was <b>plagued with a data silo issue with data from 15 different enterprise applications</b> sealed off from one another. Besides the data not being integrated into the same system, the teams managing these different applications were not collaborating to the extent that they should have been.",
      Solution:
        "Visionaize developed integrated, role-based 3D applications for Operations, Turnaround, Inspection, Maintenance and Safety teams. This allows workers to zero in on what matters most to them, while still being able to all experience the same data in the same system, overall. This spurred <b>more opportunities to collaborate and develop more cross-team cohesion</b>.",
      Results: [
        "Broke down silos across 6 functional teams",
        "Efficiencies drove 5-year savings of $15.3MM",
      ],
    },
  },
  {
    title: "Transforming Operations: Lessons from a Petrochemical Journey",
    image: "/homepage/case-trasform.jpg",
    tabs: {
      Challenge:
        "In the vast landscape of a Large Petrochemical complex, the company encountered a significant hurdle in <b>developing a cost-effective Risk-Based Inspection (RBI) program</b>, focused on corrosion. Balancing rising inspection costs while needing to mitigate risks proved challenging, and configuring operational data added to the complexity.",
      Solution:
        "In addressing the challenges, the company successfully deployed Visionaize's V-Suite software. This solution facilitated the <b>creation of 3D ISOs and efficient placement of TMLs, streamlined inspection management for 79,000 TMLs, and seamlessly loaded asset information into systems of record</b>. Visionaize's expertise proved instrumental in resolving the complexities faced by the company.",
      Results: [
        "Reduced downtime and improved worker safety",
        "Achieved an outstanding 287% IRR",
        "Rapid payback period of just 4 months",
      ],
    },
  },
];

const TESTIMONIALS = [
  {
    quote:
      "It is astounding how this platform is able to integrate data from complex systems like SCADA, AMI Meter, and GIS Systems to provide accurate 3D visualizations",
    name: "Bill Andrew",
    role: "President, Delaware Electric Cooperative",
    tag: "Leading US Electric Cooperative,",
  },
  {
    quote:
      "An hour in V-Plant is like 8 hours in the field",
    name: "Inspection Lead",
    role: "CHS, Inc.",
    tag: "Top 5 Global Oil & Gas Company,",
  },
  {
    quote:
      "Visionaize's digital twin completely changed how our engineers collaborate across sites. Decisions that used to take days now happen in hours.",
    name: "Operations Director",
    role: "Global Energy Operator",
    tag: "Fortune 500 Energy Operator,",
  },
];

// const NAVY_PARTNERS = [
//   { name: "ExxonMobil", logo: "https://visionaize.com/wp-content/uploads/2024/02/exxonmobil-white.png" },
//   { name: "Shell", logo: "https://visionaize.com/wp-content/uploads/2024/02/shell-white.png" },
//   { name: "GE Digital", logo: "https://visionaize.com/wp-content/uploads/2024/02/ge-digital-white.png" },
//   { name: "Bayer", logo: "https://visionaize.com/wp-content/uploads/2024/02/bayer-white.png" },
//   { name: "Saudi Aramco", logo: "https://visionaize.com/wp-content/uploads/2024/02/saudi-aramco-white.png" },
// ];

const LIGHT_PARTNERS = [
  { name: "Microsoft", logo: "/homepage/company-img1.png", url: "https://marketplace.microsoft.com/en-us/product/visionaize.vplant?tab=Overview." },
  { name: "GE Vernova", logo: "/homepage/company-img2.png", url: "/ge-v-suite" },
  { name: "Visionaize Corporation", logo: "/homepage/company-img3.svg", url: "https://www.chiyodacorp.com/en/" },
  { name: "Wipro", logo: "/homepage/company-img4.png", url: "https://www.wipro.com/" },
  { name: "L&T", logo: "/homepage/company-img5.png", url: "https://www.ltts.com/" },
];

const IMPROVE_STEPS = [
  {
    title: "Meet with an Expert",
    body: "Meet with one of our experts to explore our solutions and receive a live demo of our platforms.",
    icon: "/homepage/imporve-meeticon.png",
  },
  {
    title: "Discover Use Cases",
    body: "Allow our experts to understand your unique use cases and provide recommendations for quick wins.",
    icon: "/homepage/improve-discovericon.png",
  },
  {
    title: "Improve Operations",
    body: "Start leveraging data and technology to enhance operations and advance digital maturity.",
    icon: "/homepage/imporve-improveicon.png",
  },
];

const BLOG_POSTS = [
  {
    title: "The Role of AI in Oil and Gas: Transforming Operations with Intelligence",
    excerpt:
      "The oil and gas industry is undergoing a significant digital transformation, driven by the integration of artificial intelligence and advanced analytics.",
    img: "/homepage/explore-img1.png",
    href: "/blog/role-of-ai-in-oil-and-gas",
  },
  {
    title: "How 3D Digital Twins and Generative AI Accelerate Industrial Decarbonization",
    excerpt:
      "In an era where sustainability is a competitive advantage, industrial decarbonization has become a strategic imperative for heavy industry leaders.",
    img: "/homepage/explore-img2.png",
    href: "/blog/3d-twins-decarbonization",
  },
  {
    title: "Artificial Intelligence in Oil and Gas: Transforming Industry Operations with AI",
    excerpt:
      "The oil and gas industry is undergoing a significant transformation, driven by the integration of artificial intelligence and machine learning.",
    img: "/homepage/explore-img3.png",
    href: "/blog/ai-transforming-industry-operations",
  },
];

const CERTIFICATIONS = [
  {
    title: "ISO/IEC 27001:2022 — Information Security Management",
    img: "/homepage/certificate-1.png",
  },
  {
    title: "ISO 9001:2015 — Quality Management System",
    img: "/homepage/certificate-2.png",
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
/* ---------- Hero ---------- */
function Hero() {
   const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
 
  useEffect(() => {
    const currentLine = HERO_LINES[lineIndex];
    let delay = 90;
 
    if (!isDeleting && charIndex === currentLine.length) {
      delay = 1200;
    } else if (isDeleting && charIndex === 0) {
      delay = 200;
    } else if (isDeleting) {
      delay = 30;
    }
 
    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentLine.length) {
          setCharIndex((x) => x + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((x) => x - 1);
        } else {
          setIsDeleting(false);
          setLineIndex((x) => (x + 1) % HERO_LINES.length);
        }
      }
    }, delay);
 
    return () => window.clearTimeout(timeout);
  }, [charIndex, isDeleting, lineIndex]);
 
  const currentText = HERO_LINES[lineIndex].slice(0, charIndex);
 
 
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/homepage/homepage-backgroundvideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-auto gap-10 px-6 py-24 md:grid-cols-12 md:pt-28 min-h-[85vh]">
        <div className="md:col-span-9">
          {/* Rotating keyword band, flush to viewport left edge on the design */}
          <div className="relative -ml-6 md:-ml-12">
            <div
              className="relative inline-flex items-center pl-8 md:pl-16 md:pr-20 py-6 text-white md:text-2xl lg:text-[2.5vw] text-xs min-w-[400px] font-bold tracking-wide sm:min-w-[320px] shadow-xl lg:top-75 md:min-w-[750px] lg:min-w-[1080px] sm:text-lg xs:text-md sm:min-w-[550px] xs:min-w-[400px]"
              style={{
                background:
                  "linear-gradient(90deg, #8cd33aa8 0%, #2acbeeb5 100%)",
                clipPath: "polygon(0 0, 90% 0, 100% 100%, 0% 100%)",
              }}
            >
              <span className="opacity-90 mr-3">THE FUTURE OF</span>
              <span className="animate-typewriter border-r-2 border-black pr-3 inline-block whitespace-nowrap" style={{ minWidth: '10px' }}>
                {currentText}
              </span>
            </div>
          </div>
        </div>

        {/* Right rail product pills */}
        <div className="absolute top-4 right-2 lg:top-24 z-20 hidden flex-col lg:gap-5 lg:right-10 md:top-18 md:flex">
          {PRODUCT_PILLS.map((p) => (
            <Link
              key={p.label}
              to={p.href}
              className="group relative flex h-14 w-14 lg:h-18 lg:w-18 self-end items-center overflow-hidden items-center justify-center rounded-full transition-all duration-500 ease-in-out hover:w-[200px]"
              style={{ background: p.color }}
            >
              <div className="absolute lg:left-1 lg:top-1 flex h-10 w-10 lg:h-16 lg:w-16 items-center justify-center rounded-full">
                <img src={p.icon} alt={p.label} className="h-7 w-7 lg:h-10 lg:w-10 object-contain" />
              </div>

              <span className="ml-18 whitespace-nowrap text-lg font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
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
          

      <style>{`
        @keyframes blink {
          0%, 49% { border-right-color: rgba(0, 0, 0, 0.9); }
          50%, 100% { border-right-color: transparent; }
        }
        .animate-typewriter {
          animation: blink 0.7s infinite 0.1s;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          min-width: 10px;
          border-right-color: rgba(0, 0, 0, 0.9);
        }
      `}</style>
    </section>
  );
}


/* ---------- Animated stat number (slow count-up + gentle continuous float) ---------- */
function AnimatedStat({
  value,
  className,
  style,
  delay = 0,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const [display, setDisplay] = useState("0");

  // numeric target + trailing unit (e.g. "%") pulled apart so we can
  // animate the number while keeping the suffix static
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2200; // slow, deliberate count-up
    let raf: number;
    let startTime: number | null = null;

    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = target * eased;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, decimals]);

  return (
    <span
      ref={ref}
      className={`inline-block animate-stat-float ${className ?? ""}`}
      style={{ ...style, animationDelay: `${delay}s` }}
    >
      {display}
      {suffix}
    </span>
  );
}

function IntroAndStats() {
  return (
    <section className="bg-white py-10 home-page-section1">
      <div className="mx-auto grid md:grid-cols-1 max-w-auto gap-2 px-6 lg:grid-cols-2 md:items-center">
        <div className="mx-auto w-full lg:w-[160%] md:w-[90%] flex justify-center items-center">
          <picture>
            <source
              media="(max-width: 1023px)"
              srcSet="/homepage/Visionaize's-3D--smallscreen.png"
            />
            <img
               src="/homepage/Visionaize's-3D-largescreen.png"
              alt="Visionaize 3D Digital Twin & Smart Apps"
              className="w-full h-auto object-contain mx-auto"
              loading="lazy"
            />
          </picture>

        </div>
        <div className="lg:pr-14 ">
          <h2 className="text-2xl md:text-[32px] font-semibold leading-snug text-brand-navy">
            Visionaize’s 3D Digital Twin &amp; Smart Apps Enable Real-Time Monitoring,
            Optimization, and Prediction for Heavy Industry
          </h2>
          <ul className="mt-8 space-y-4">
            {STATS.map((s) => (
              <li key={s.label} className="flex items-baseline gap-2 f-12 text-black/90">
                <span
                  className="mt-1 inline-block h-2 w-2 flex-none rounded-full"
                  style={{ background:"black" }}
                />
                {s.prefix && <span className="text-sm text-black/70">{s.prefix}</span>}
                <span className="text-xl font-bold animation-type-slide-down" style={{ color: '#92C122' }}>{s.value}</span>
                <span className="text-base text-black/85">{s.label}</span>
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
    <section className="bg-[#E6F4FB] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Remote Plant Access - Be There From Anywhere
        </h2>

        <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 md:mt-14 lg:grid-cols-3 lg:gap-8">
          {PLATFORM_CARDS.map((c) => (
            <article
              key={c.title}
              className="group relative flex flex-col overflow-hidden rounded-md bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="p-5 pb-0 sm:p-6">
                <div className="mb-4 aspect-[16/10] overflow-hidden rounded sm:mb-5">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        "/homepage/image_27-removebg-preview.png")
                    }
                    loading="lazy"
                  />
                </div>
                <h3
                  className="mt-3 bg-clip-text text-lg font-bold leading-tight text-transparent sm:mt-4 sm:text-xl md:text-[22px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #8CC63F 0%, #39B54A 25%, #28A9A2 55%, #1E88E5 100%)",
                  }}
                >
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-ink/80 sm:text-base">{c.body}</p>
              </div>

              {/* spacer pushes link + accent bar to bottom, keeping card heights aligned */}
              <div className="flex-1" />

              <div className="px-5 pb-5 pt-5 sm:px-6">
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

function CaseStudyCarousel() {
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState<"Challenge" | "Solution" | "Results">(
    "Challenge"
  );
  const [direction, setDirection] = useState<1 | -1>(1);

  const AUTO_SLIDE_MS = 6000;

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

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIdx((x) => (x + 1) % CASE_STUDIES.length);
      setTab("Challenge");
    }, AUTO_SLIDE_MS);

    return () => clearInterval(timer);
  }, [idx]);

  const cs = CASE_STUDIES[idx];

  return (
    <section className="bg-white py-10 sm:py-12 md:py-16">
      <style>{`
        @keyframes csSlideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes csSlideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .cs-slide-right {
          animation: csSlideInRight .45s ease;
        }

        .cs-slide-left {
          animation: csSlideInLeft .45s ease;
        }
      `}</style>

      <div className="mx-auto max-w-[1500px] px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-center text-3xl font-bold leading-tight text-[#0F2237] sm:text-4xl md:text-5xl">
          Demonstrated Success in Oil &amp; Gas, Manufacturing, and Power Industries
        </h2>

        <div className="relative mt-10 flex items-center px-8 sm:mt-12 sm:px-10 md:mt-16 md:px-14 lg:px-16">

          {/* Left Arrow */}
          <button
            onClick={prev}
            aria-label="Previous case study"
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-1 shadow-sm"
          >
            <ChevronLeft
              className="h-6 w-6 text-[#0F2237] sm:h-7 sm:w-7 md:h-8 md:w-8"
              strokeWidth={1.8}
            />
          </button>

          {/* Right Arrow */}
          <button
            onClick={next}
            aria-label="Next case study"
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-1 shadow-sm"
          >
            <ChevronRight
              className="h-6 w-6 text-[#0F2237] sm:h-7 sm:w-7 md:h-8 md:w-8"
              strokeWidth={1.8}
            />
          </button>

          <div
            key={idx}
            className={`grid w-full grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14
              ${
                direction === 1
                  ? "cs-slide-right"
                  : "cs-slide-left"
              }`}
          >
            {/* LEFT */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#8BC53F]">
                CASE STUDY
              </p>

              <h3 className="mt-3 text-3xl font-bold leading-[1.15] text-black sm:text-4xl">
                {cs.title}
              </h3>

              {/* Tabs */}
              <div className="mt-6">
                <div className="flex border-b border-gray-200">
                  {(["Challenge", "Solution", "Results"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`relative -mb-px px-1 py-3 mr-8 text-base font-medium transition-colors
                        ${
                          tab === t
                            ? "border-b-2 border-[#0088D2] text-[#0088D2]"
                            : "border-b-2 border-transparent text-gray-500 hover:text-[#0088D2]"
                        }
                      `}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="mt-6 rounded-md border border-gray-200 bg-white p-6">
                  {tab === "Results" ? (
                    <ul className="space-y-4">
                      {cs.tabs.Results.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-xl leading-9 text-gray-600"
                        >
                          <span
                            className="flex h-7 w-7 flex-none items-center justify-center rounded-full shadow-sm"
                            style={{
                              background: "linear-gradient(135deg, #5BAE7E 0%, #2E8DC5 100%)",
                            }}
                          >
                            <svg
                              viewBox="0 0 16 16"
                              fill="none"
                              className="h-3.5 w-3.5"
                              aria-hidden
                            >
                              <path
                                d="M3 8.5L6.2 11.5L13 4.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div
                      className="
                        text-xl
                        leading-9
                        text-gray-600
                        [&_b]:font-semibold
                        [&_b]:text-[#0088D2]
                      "
                      dangerouslySetInnerHTML={{
                        __html: cs.tabs[tab] as string,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={cs.image}
                alt={cs.title}
                className="h-[260px] w-full object-cover sm:h-[380px] md:h-[420px]"
                loading="lazy"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "/homepage/image_27-removebg-preview.png")
                }
              />
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
    <section className="relative overflow-hidden bg-[#0F2237] pb-6 pt-10 text-white sm:pb-8 sm:pt-14 md:pt-16 lg:pt-20">
      {/* Content block: heading, quote, tag. The arc graphic is scoped to
          THIS wrapper (not the whole section), so it ends right above the
          logos row instead of stretching down behind it — matching the
          reference where the arc sits mid-section, not full-bleed. */}
      <div className="relative overflow-hidden pb-8 sm:pb-10 md:pb-12 lg:pb-14">
        <img
          src="/homepage/trust-background.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-2 right-0 h-[180px] w-auto translate-x-4 opacity-80 sm:h-[150px] sm:translate-x-6 md:h-[130px] lg:h-[110px] xl:h-[130px] 2xl:h-[150px]"
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:max-w-6xl lg:px-8">
          <h2 className="mb-6 bg-gradient-to-r from-[#A6E04A] via-[#3EA0A8] to-[#2E8DC5] bg-clip-text text-center text-2xl font-bold text-transparent drop-shadow-sm sm:mb-10 sm:text-3xl md:text-4xl lg:mb-12 lg:text-[42px]">
            Trusted by Global Industry Leaders
          </h2>

          <div className="flex items-center gap-2 sm:gap-6 lg:gap-8">
            <button
              onClick={prev}
              aria-label="Previous"
              className="flex-none rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white sm:p-2"
            >
              <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
            </button>
            <div className="flex-1">
              <p className="text-balance text-sm font-medium leading-relaxed text-white sm:text-xl md:text-2xl lg:text-2xl lg:leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <button
              onClick={next}
              aria-label="Next"
              className="flex-none rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white sm:p-2"
            >
              <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
            </button>
          </div>

          {t.tag && (
            <p className="mt-6 bg-gradient-to-r from-[#A6E04A] to-[#2E8DC5] bg-clip-text text-lg font-semibold text-transparent sm:mt-8 sm:text-2xl lg:mt-10">
              {t.tag}
            </p>
          )}
        </div>
      </div>

      {/* Partner logos + gradient line — using the pre-built flattened
          image asset (already matches the reference pixel-for-pixel)
          instead of reconstructing it from individual logos. object-contain
          keeps it crisp and correctly scaled at every screen width. */}
      <div className="relative mx-auto mt-2 w-full max-w-6xl px-4 sm:mt-4 sm:px-6 lg:px-8">
        <img
          src="/homepage/trust-bottomallicons.png"
          alt="ExxonMobil, Shell, GE Digital, Bayer, Saudi Aramco"
          className="mx-auto h-auto w-full max-w-[700px] object-contain sm:max-w-3xl md:max-w-4xl lg:max-w-6xl"
          loading="lazy"
        />
      </div>
    </section>
  );
}
/* ---------- Navy partner band ---------- */
// function NavyPartners() {
//   return (
//     <section className="relative bg-[#0F2237] pb-16 pt-4">
//       <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-8 px-4 sm:px-6 md:grid-cols-5">
//         {NAVY_PARTNERS.map((p) => (
//           <div key={p.name} className="flex items-center justify-center">
//             <img
//               src={p.logo}
//               alt={p.name}
//               className="h-10 max-w-[180px] object-contain opacity-90 md:h-12"
//               onError={(e) => {
//                 const img = e.target as HTMLImageElement;
//                 img.outerHTML = `<span class="text-white/80 text-lg font-semibold tracking-wide">${p.name}</span>`;
//               }}
//               loading="lazy"
//             />
//           </div>
//         ))}
//       </div>
//       {/* bottom gradient line */}
//       <div
//         className="absolute inset-x-0 bottom-0 h-1"
//         style={{
//           background:
//             "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 35%, #3EA0A8 70%, #2E8DC5 100%)",
//         }}
//       />
//     </section>
//   );
// }

/* ---------- Improve Operations with icons ---------- */
function ImproveOps() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Improve Your Operations Today
        </h2>
        <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {IMPROVE_STEPS.map((s) => (
            <div key={s.title} className="flex flex-col items-center">
              <img
                src={s.icon}
                alt=""
                className="mb-4 h-12 w-12 object-contain sm:mb-5 sm:h-14 sm:w-14"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
              <h3 className="text-lg font-bold text-brand-navy sm:text-xl md:text-2xl">{s.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-ink/75 sm:text-base md:text-lg">
                {s.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 sm:mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg sm:px-9 sm:py-4"
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
    <section className="bg-[#D6ECF7] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:gap-10 sm:px-6 md:grid-cols-2 md:items-center md:gap-12">
        {/* aspect-video keeps a correct 16:9 box at every width, so the
            player never gets cropped or stretched on small screens */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-brand-navy shadow-xl">
          <video
            src="/homepage/home-trasforsection-video.mp4"
            className="h-full w-full object-cover"
            style={{ filter: "none" }}
            autoPlay
            muted
            loop
            controls
            playsInline
            preload="auto"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold leading-tight text-brand-navy sm:text-3xl md:text-4xl">
            Transform Operations from Reactive to Predictive
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-ink/80 sm:mt-5 sm:text-lg">
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
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Innovating Together with Our Valued Partners
        </h2>

        <div className="mt-8 grid items-center gap-8 sm:mt-12 sm:gap-12 md:grid-cols-2 md:mt-14">
          <div>
            <h3 className="text-xl font-bold leading-tight text-brand-navy sm:text-2xl md:text-3xl">
              Turnarounds that Reduce
              <br />
              Costs by More Than 10%
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-brand-ink/80 sm:mt-6 sm:text-lg">
              A collaboration between PwC and Visionaize, this whitepaper delves deeply into a
              modern approach to Turnarounds that enables operators to maximize productivity and
              significantly reduce downtime.
            </p>
            <a
              href="/re-inventing-turnarounds-in-the-metaverse/"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg sm:mt-8 sm:px-8 sm:py-3.5"
              style={{
                background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              Download White Paper
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="/homepage/inovat-section.png"
              alt="Reinventing Turnarounds in the Metaverse whitepaper"
              className="w-full max-w-xs sm:max-w-md"
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "/homepage/image_27-removebg-preview.png")
              }
              loading="lazy"
            />
          </div>
        </div>
<div className="mt-10 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 sm:mt-16 sm:gap-8 lg:grid-cols-5 lg:gap-10">
  {LIGHT_PARTNERS.map((p) => (
    <div key={p.name} className="flex items-center justify-center">
      
       <a href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={p.name}
        className="flex items-center justify-center"
      >
        <img
          src={p.logo}
          alt={p.name}
          className="h-10 max-w-[120px] object-contain sm:h-14 sm:max-w-[140px] md:h-16 md:max-w-[180px] lg:h-18"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.outerHTML = `<span class="text-brand-ink/50 text-lg font-semibold tracking-wide">${p.name}</span>`;
          }}
          loading="lazy"
        />
      </a>
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
    <section className="bg-white pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Explore Our Latest Articles
        </h2>

        <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-5 lg:gap-8">
          {BLOG_POSTS.map((p) => (
            <article key={p.title} className="group flex flex-col pb-5">
              <div className="aspect-[16/10] overflow-hidden rounded">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "/homepage/image_27-removebg-preview.png")
                  }
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug text-brand-navy sm:mt-5 sm:text-xl">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-ink/75 sm:text-base md:text-lg">
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
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Our Certifications &amp; Compliance
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12 justify-items-center">
          {CERTIFICATIONS.map((c) => (
            <img
              key={c.title}
              src={c.img}
              alt={c.title}
              className="h-auto w-full max-w-[300px] object-contain shadow-md sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[480px]"
              loading="lazy"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
          ))}
        </div>

        <p className="mt-6 text-sm font-bold text-brand-ink/90 sm:mt-10 sm:text-lg">
          Visionaize Technologies is certified for quality management and information
          security standards.
        </p>
      </div>
    </section>
  );
}