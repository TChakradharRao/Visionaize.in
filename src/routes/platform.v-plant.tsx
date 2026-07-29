import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Target, BarChart3 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight, ArrowUpRight, ArrowUp, Play, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getSeedContentItem } from "@/lib/seed-content";
import { TIERS } from "@/lib/v-plant-tiers";
import { useState, useRef, useCallback, useEffect } from "react";


export const Route = createFileRoute("/platform/v-plant")({
  head: () => ({
    meta: [
      { title: "V-Plant — A 3D Digital Twin that's always in sync | Visionaize" },
      {
        name: "description",
        content:
          "V-Plant is the most connected and current 3D Digital Twin solution for industrial assets — from V-Plant Explorer to V-Plant Pro and V-Plant 360.",
      },
      {
        property: "og:title",
        content: "V-Plant — A 3D Digital Twin that's always in sync",
      },
      {
        property: "og:description",
        content:
          "An hour in V-Plant is like 8 hours in the field. Digital twins for every stage of the journey.",
      },
      {
        property: "og:image",
        content:
          "https://visionaize.com/wp-content/uploads/2024/02/image_27-removebg-preview.png",
      },
    ],
  }),
  component: VPlantPage,
});

/* ---------------- Data ---------------- */

const seedItem = getSeedContentItem("page", "v-plant");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];

const heroParagraphs: string[] = heroSection?.paragraphs?.length
  ? heroSection.paragraphs
  : [
      "Many Digital Twins look good, but the true power lies in the ability to stay in sync with its twin in the field. V-Plant has been built to be the most connected and current Digital Twin solution for industrial assets.",
    ];

const heroImage = heroSection?.images[0]?.src ?? "https://visionaize.com/wp-content/uploads/2022/07/image-2.jpg";

/**
 * Renders a hero paragraph string, converting the phrase "stay in sync"
 * into a styled Link to /solutions/maintain-and-sustain.
 * Works regardless of whether the text comes from the CMS seed content
 * or the hardcoded fallback above, since both are plain strings.
 */
function renderHeroParagraph(text: string) {
  const marker = "stay in sync";
  const idx = text.indexOf(marker);
  if (idx === -1) return text;

  const before = text.slice(0, idx);
  const after = text.slice(idx + marker.length);

  return (
    <>
      {before}
      <Link
        to="/solutions/maintain-and-sustain"
        className="!text-[#2563EB] !no-underline hover:!no-underline"
        style={{ color: "#2563EB", textDecoration: "none" }}
      >
        {marker}
      </Link>
      {after}
    </>
  );
}

const FEATURES = [
  {
    title: "Advanced Visualization",
    body: "3D Model available 24/7/365 Intuitive Data Driven",
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group.png",
  },
  {
    title: "Integration of Enterprise Data",
    body: "Contextualize data from real-time IIoT sensors, historical & enterprise systems of record",
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-1.png",
  },
  {
    title: "Platform for Advanced Solutions",
    body: "Role-Based Work Packages for Enterprise Asset Management (EAM)",
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-2.png",
  },
  {
    title: "VR, AR, AI & Simulations",
    body: "Rapid deployment Robust Model Management of Change (MMOC)",
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-3.png",
  },
];

const BENEFITS = [
  {
    icon: "https://visionaize.in/wp-content/uploads/2022/05/Group-608-1.svg",
    title: "Reduce cost",
    body: "Reduce unnecessary and costly field visits by facilitating remote access to reliable data, via web and mobile applications.",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2022/05/Group-605-1.svg",
    title: "Drive better decisions",
    body: "Leverage our expertise in advanced data science and our ability to turn data into insights that power smarter decision making.",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2022/05/Group-601-1.svg",
    title: "Increase reliability",
    body: "Improve knowledge capture and information accuracy and dynamically generate operational plans.",
  },
  {
    icon: BarChart3,
    title: "Boost performance",
    body: "Maximize wrench time with better advance access to plant information and knowledge. Get more done with fewer trips into the field.",
  },
];

const PARTNERS = [
  { name: "Partner", src: "https://visionaize.in/wp-content/uploads/2022/05/Group-5.png" },
  { name: "Partner", src: "https://visionaize.in/wp-content/uploads/2026/01/image-31.png" },
  { name: "Partner", src: "https://visionaize.in/wp-content/uploads/2022/05/Group-6.png" },
  { name: "SABIC", src: "https://visionaize.in/wp-content/uploads/2022/05/sabic-logo-saudikayan_tcm1043-30158.png" },
  { name: "Partner", src: "https://visionaize.in/wp-content/uploads/2022/05/Group-517.png" },
  { name: "Partner", src: "https://visionaize.in/wp-content/uploads/2022/05/Vector-4.png" },
  { name: "Larsen & Toubro", src: "https://visionaize.in/wp-content/uploads/2026/01/Larsen__Toubro_Logo-1536x284.png" },
  { name: "Partner", src: "https://visionaize.in/wp-content/uploads/2022/05/XMLID_1_.png" },
  { name: "BP", src: "https://visionaize.in/wp-content/uploads/2022/05/bp-logo.png" },
  { name: "Partner", src: "https://visionaize.in/wp-content/uploads/2022/05/Group-482.png" },
  { name: "Partner", src: "https://visionaize.in/wp-content/uploads/2022/05/image-33.png" },
];

const INTEGRATIONS = [
  { name: "GE Vernova", src: "https://visionaize.in/wp-content/uploads/2024/04/GE_Vernova_logo-2.webp" },
  { name: "Honeywell", src: "https://visionaize.in/wp-content/uploads/2022/05/1356px-Honeywell_logo.png" },
  { name: "AWS S3", src: "https://visionaize.in/wp-content/uploads/2022/05/Group-600.png" },
  { name: "Microsoft", src: "https://visionaize.in/wp-content/uploads/2022/05/Group-599.png" },
  { name: "SAP", src: "https://visionaize.in/wp-content/uploads/2022/05/SAP_2011_logo.png" },
  { name: "AspenTech", src: "https://visionaize.in/wp-content/uploads/2022/05/Group-530.png" },
  { name: "IBM", src: "https://visionaize.in/wp-content/uploads/2022/05/Vector-3.png" },
  { name: "IBM Maximo", src: "https://visionaize.in/wp-content/uploads/2022/05/ibmmaximo-1.png" },
  { name: "Oracle", src: "https://visionaize.in/wp-content/uploads/2022/05/Group-528.png" },
  { name: "OSIsoft", src: "https://visionaize.in/wp-content/uploads/2022/05/Group-529.png" },
];

/* ---------------- Page ---------------- */

function VPlantPage() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const t = setTimeout(scrollToHash, 100);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Header />
      <Hero />
      <Quote />
      <JourneyCards />
      <BuiltToScale />
      <Features />
      <BusinessCaseBand />
      <Testimonial />
      <VideoBenefits />
      <GoodCompany />
      <CTA />
      <Data />
      <Integrations />
      <Footer />
    </div>
  );
}

/* ---------------- Sections ---------------- */

function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [sliderPos, setSliderPos] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateSliderFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateSliderFromClientX(e.clientX);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateSliderFromClientX(e.clientX);
  };
  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 md:grid-cols-2 md:items-center md:py-14">
        <div>
          <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            A 3D digital twin that's<br className="hidden sm:block" /> always in sync
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-brand-ink/80 sm:mt-7 sm:text-lg">
            {renderHeroParagraph(heroParagraphs[0])}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md sm:px-7 sm:py-3.5"
              style={{
                background:
                  "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              Talk to an expert
            </Link>
            <button
              type="button"
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-3 rounded-full border border-brand-ink/15 bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:border-brand-ink/30 sm:px-6 sm:py-3.5"
            >
              Watch video
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy text-white">
                <Play className="h-3 w-3 fill-white" />
              </span>
            </button>
          </div>
        </div>

        {/* Before/after comparison slider */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-md bg-brand-navy/5 sm:aspect-[16/9] md:aspect-[4/3]"
        >
          <img
            src="https://visionaize.com/wp-content/uploads/2022/07/image1.jpg"
            alt="Field photograph of plant"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            className="absolute inset-0 h-full w-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={heroImage}
              alt="3D digital twin visualization"
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>

          <div
            className="absolute inset-y-0 w-0.5 bg-white/90"
            style={{ left: `${sliderPos}%` }}
          />

          <div
            className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white shadow-lg sm:h-10 sm:w-10"
            style={{ left: `${sliderPos}%` }}
          >
            <span className="flex items-center text-brand-navy">
              <ChevronLeft className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Video modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:-top-12"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-md bg-black shadow-1xl">
              <video
                src="https://visionaize.in/wp-content/uploads/2023/10/Converted-Visionaize-in-a-Minute-Oct-2023.mp4"
                className="w-full"
                controls
                autoPlay
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Quote() {
  return (
    <section className="relative overflow-hidden bg-[#0F2237] py-10 text-white sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-full md:block md:w-1/2"
        style={{
          backgroundImage:
            "url('https://visionaize.in/wp-content/uploads/2022/04/Qbg-min.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          backgroundSize: "contain",
          opacity: 0.5,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-balance text-2xl font-light leading-tight tracking-tight sm:text-3xl md:text-5xl">
          An hour in V-Plant is<br /> like 8 hours in the field
        </p>
        <p className="mt-6 text-sm font-semibold sm:mt-8">
          <span style={{ color: "#A6E04A" }}>Top 5</span>{" "}
          <span className="text-white/80">Global Oil &amp; Gas Company</span>
        </p>
      </div>
    </section>
  );
}

function JourneyCards() {
  // Heights grow left -> right to visualize "scaling up" through the journey
  const CARD_MIN_HEIGHTS = ["380px", "600px", "650px"];

  return (
    <section className="relative overflow-hidden bg-[#DAEEF8] py-12 sm:py-16">
      <style>{`
        .journey-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .journey-grid {
            grid-template-columns: repeat(3, 1fr);
            align-items: end;
          }
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          backgroundImage: "url('https://visionaize.in/wp-content/uploads/2025/12/Arrows.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "90% 120%",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-xl font-semibold text-brand-navy sm:text-2xl md:text-4xl">
          Digital Twins for Every Stage of The Journey
        </h2>

        <div className="journey-grid relative mt-8 sm:mt-10">
          {TIERS.map((t, i) => (
            <article
              key={t.name}
              id={`journey-${t.slug}`}
              className="relative flex scroll-mt-24 flex-col overflow-hidden bg-white px-5 pb-8 pt-8 shadow-md sm:px-7 sm:pb-10 sm:pt-10"
              style={{ minHeight: CARD_MIN_HEIGHTS[i] ?? CARD_MIN_HEIGHTS[CARD_MIN_HEIGHTS.length - 1] }}
            >
              <div className="mb-5 overflow-hidden rounded bg-[#DAEEF8] sm:mb-6">
                <img src={t.shot} alt={t.name} className="block aspect-[16/9] w-full object-cover" />
              </div>

              <h3 className="text-xl font-bold sm:text-2xl" style={{ color: t.color }}>
                {t.name}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-brand-ink/80 sm:text-lg">{t.short}</p>

              <div className="mt-auto pt-6 sm:pt-8">
                
               <a   href={`#v-plant-${t.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`v-plant-${t.slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="inline-flex items-center gap-3 text-sm font-semibold sm:text-base"
                  style={{ color: t.color }}
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(15,34,55,0.15)]">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1 L15 1 L8 13 Z" fill="#000000" />
                    </svg>
                  </span>
                  Explore Benefits
                </a>
              </div>

              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2"
                style={{ background: t.color }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuiltToScale() {
  const IMAGE_POSITION = [
    "left center",
    "right center",
    "left center",
  ];

  interface ThinArrowUpProps {
    color: string;
    style?: React.CSSProperties;
    className?: string;
  }

  const ThinArrowUp = ({ color, style, className }: ThinArrowUpProps) => (
    <svg
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M12 26 L12 2 M4 10 L12 2 L20 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <style>{`
          @keyframes floatUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .floaty {
            animation: floatUpDown 2.2s ease-in-out infinite;
          }
        `}</style>

        <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Digital Twin Technology Built to Scale
        </h2>
        <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-14">
          {TIERS.map((t, i) => {
            const reverse = i % 2 === 1;
            const objectPosition = IMAGE_POSITION[i] ?? "center";
            return (
              <div
                key={t.name}
                id={`v-plant-${t.slug}`}
                className={`grid scroll-mt-24 items-center gap-10 sm:gap-12 md:grid-cols-2 md:gap-16 ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative">
                  <div className="relative mx-auto max-w-xl overflow-hidden rounded-xl bg-white">
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={t.shot}
                        alt={`${t.name} screenshot`}
                        className="block h-full w-full object-cover"
                        style={{ objectPosition }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-brand-navy sm:text-3xl md:text-4xl">{t.name}</h3>
                    <button
                      type="button"
                      aria-label={`Back to ${t.name} card`}
                      onClick={() =>
                        document.getElementById(`journey-${t.slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                      className="flex-none rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/40"
                    >
                      <ThinArrowUp
                        color={t.color}
                        className="floaty h-7 w-7 sm:h-9 sm:w-9"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    </button>
                  </div>
                  <p className="mt-4 text-base text-brand-ink/85 sm:mt-5 sm:text-lg">{t.intro}</p>
                  <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-base text-brand-ink/85 sm:text-lg">
                        <span
                          aria-hidden
                          className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full"
                          style={{ background: t.color }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="bg-white pb-10 pt-2 sm:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          Features
        </h2>
        <div className="mt-8 grid gap-8 text-center sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center">
              <img src={f.icon} alt="" className="h-14 w-auto object-contain sm:h-16" loading="lazy" />
              <h3 className="mt-5 text-lg font-bold leading-snug text-brand-navy sm:mt-6 sm:text-2xl">{f.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-brand-ink/75 sm:mt-4 sm:text-lg">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessCaseBand() {
  return (
    <section className="bg-[#A6E04A] py-7 sm:py-8 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 px-4 text-center sm:gap-8 sm:px-6 md:flex-row md:gap-14 md:text-left">
        <p className="text-lg font-semibold text-brand-navy sm:text-xl md:text-2xl">
          Building a case for a 3D Digital Twin
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-blue shadow-sm hover:bg-white/90 sm:px-9 sm:py-4 sm:text-base"
        >
          Build a business case
        </Link>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section
      className="relative overflow-hidden bg-[#F2F4F6] bg-no-repeat py-12 sm:py-16"
      style={{
        backgroundImage: "url('https://visionaize.in/wp-content/uploads/2022/04/Qbg-min.png')",
        backgroundPosition: "right bottom",
        backgroundSize: "45% auto",
      }}
    >
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <blockquote className="max-w-2xl text-balance text-xl font-medium leading-snug text-brand-navy sm:text-2xl md:text-3xl">
          During the early stages of an implementation, V-Plant helped the
          inspection team find and solve a corrosion problem in 2 days. A similar
          exercise required 2 weeks using a competitor's product.
        </blockquote>
        <p className="mt-8 text-sm font-semibold text-brand-ink/70 sm:mt-10">CHS, Inc.</p>
      </div>
    </section>
  );
}

function VideoBenefits() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-12">
        {/* Laptop mockup with video */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative rounded-t-xl border-x-4 border-t-4 border-brand-ink/15 bg-black sm:border-x-8 sm:border-t-8">
            <video
              src="https://visionaize.com/wp-content/uploads/2022/07/3Dtwinanimation.mp4"
              className="block aspect-square w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div className="mx-auto h-2 max-w-2xl rounded-b-2xl bg-brand-ink/15 sm:h-3" />
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl md:text-5xl">Benefits</h2>
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:mt-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10">
            {BENEFITS.map((b) => (
              <div key={b.title}>
                {typeof b.icon === "string" ? (
                  <img src={b.icon} alt="" className="h-10 w-10" aria-hidden="true" />
                ) : (
                  <b.icon className="h-10 w-10 text-emerald-500" strokeWidth={1.5} />
                )}
                <h3 className="mt-3 text-lg font-bold text-brand-navy">{b.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-brand-ink/80 sm:text-lg">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GoodCompany() {
  return (
    <section className="bg-white pb-10 pt-6 sm:pb-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          We are in good company
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-10 sm:mt-14 sm:gap-x-14 sm:gap-y-14 md:gap-x-16">
          {PARTNERS.map((p, i) => (
            <>
              <div
                key={`${p.src}-${i}`}
                className="flex w-[calc(50%-1.25rem)] items-center justify-center sm:w-[calc(33.333%-2.34rem)] md:w-auto"
              >
                <img
                  src={p.src}
                  alt={p.name}
                  className="h-12 w-auto max-w-[130px] object-contain sm:h-16 sm:max-w-[150px] md:h-20 md:max-w-[170px]"
                  loading="lazy"
                />
              </div>
              {/* Force a line break after the 6th logo on md+ so row 1 = 6, row 2 = rest, both centered */}
              {i === 5 && <div key="break" className="hidden w-full md:block" />}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      className="relative overflow-hidden bg-[#0F2237] bg-no-repeat py-12 sm:py-16"
      style={{
        backgroundImage:
          "url('https://visionaize.in/wp-content/uploads/2022/05/footer-bg-2.png')",
        backgroundPosition: "right center",
        backgroundSize: "65% auto",
      }}
    >
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
        {/* Left copy */}
        <div>
          <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
            Contextualize mountains of data with cutting edge technology
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:mt-8 sm:text-lg">
            Reliable connectivity and data are critical drivers to successful
            infrastructure management. Taking advantage of IIoT sensors requires
            flexible methods to interact with real-time data.
          </p>
        </div>

        {/* Right: circular image trio */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-4 sm:gap-12 sm:pt-8 md:pt-10">
          {[
            {
              label: "Mobile",
              src: "https://visionaize.in/wp-content/uploads/2022/05/image-36.png",
            },
            {
              label: "Virtual Reality",
              src: "https://visionaize.in/wp-content/uploads/2022/11/iStock-1148243718-1-2048x1365.jpg",
            },
            {
              label: "Augmented Reality",
              src: "https://visionaize.in/wp-content/uploads/2022/05/image-38.png",
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <div className="h-20 w-20 overflow-hidden rounded-full ring-4 ring-white/90 sm:h-24 sm:w-24 md:h-28 md:w-28">
                <img
                  src={item.src}
                  alt={item.label}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-white">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Data() {
  return (
    <section
      className="relative overflow-hidden bg-[#F2F4F6] bg-no-repeat py-12 sm:py-16"
      style={{
        backgroundImage: "url('https://visionaize.in/wp-content/uploads/2022/04/Qbg-min.png')",
        backgroundPosition: "right bottom",
        backgroundSize: "45% auto",
      }}
    >
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <blockquote className="max-w-2xl text-balance text-xl font-medium leading-snug text-brand-navy sm:text-2xl md:text-3xl">
          It is astounding how this platform is able to integrate data from complex systems like SCADA, AMI Meter, and GIS Systems to provide accurate 3D visualizations.
        </blockquote>
        <p className="mt-8 text-sm font-semibold text-brand-ink/70 sm:mt-10">
          Bill Andrew, President, Delaware Electric Cooperative
        </p>
      </div>
    </section>
  );
}
function Integrations() {
  return (
    <section className="bg-white pb-12 pt-8 sm:pb-16 sm:pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl md:text-4xl">
          We integrate with<br />best-in-class technologies
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14 md:grid-cols-5">
          {INTEGRATIONS.map((p) => {
            const isGEVernova = p.name === "GE Vernova";
            return (
              <div key={p.name} className="flex items-center justify-center">
                <img
                  src={p.src}
                  alt={p.name}
                  className={
                    isGEVernova
                      ? "h-24 w-auto max-w-[220px] object-contain sm:h-32 sm:max-w-[280px]"
                      : "h-14 w-auto max-w-[140px] object-contain sm:h-20 sm:max-w-[180px]"
                  }
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}