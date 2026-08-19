/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, type LucideIcon } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight, ArrowUpRight, ArrowUp, Play, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getSeedContentItem } from "@/lib/seed-content";
import { useState, useRef, useCallback, useEffect, type PointerEvent } from "react";

export const Route = createFileRoute("/platform/v-plant")({
  head: () => ({
    meta: [
      { title: "V-Plant — A 3D Digital Twin that's always in sync | Visionaize" },
      {
        name: "description",
        content:
          "V-Plant is the most connected and current Digital Twin solution for industrial assets — from V-Plant Explorer to V-Plant Pro and V-Plant 360.",
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
          "/V-Plant/image_27-removebg-preview.png",
      },
    ],
  }),
  component: VPlantPage,
});

/* ---------------- Data ---------------- */

const seedItem = getSeedContentItem("page", "v-plant");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];
const heroParagraphs = heroSection?.paragraphs?.length
  ? heroSection.paragraphs
  : [
      "Many Digital Twins look good, but the true power lies in the ability to stay in sync with its twin in the field. V-Plant has been built to be the most connected and current Digital Twin solution for industrial assets.",
    ];
const heroImage = heroSection?.images[0]?.src ?? "/V-Plant/image-2.jpg";

const TIERS = [
  {
    name: "V-Plant Explorer",
    color: "#3EA0A8",
    intro: "For owners & operators that want to:",
    bullets: [
      "Start simple before scaling",
      "Realize fast time-to-value",
      "Leverage 3D scans and images",
      "Use light data integration",
    ],
    shot: "/V-Plant/side-by-side-desktop-left-v-plant-explorer.png",
    mobileShot: "/V-Plant/Group-1000002873.png",
    journeyShot: "/V-Plant/V-Plant_Explorer.png",
    short:
      "Start fast and dip your toes into the Digital Twin waters with V-Plant Explorer – an entry-level foray into asset visualization that can scale as needed.",
  },
  {
    name: "V-Plant Pro",
    color: "#5BAE7E",
    intro: "For owners & operators that want to:",
    bullets: [
      "Integrate mesh and 3D modeling techniques",
      "“Operationalize” rich 3D models",
      "Use deeper data integrations",
      "Scale operational use cases across the plant",
    ],
    shot: "/V-Plant/side-by-side-desktop-right-1-copy-1.png",
    mobileShot: "/V-Plant/Group-1000002873-1.png",
    journeyShot: "/V-Plant/V-Plant_Pro.png",
    short:
      "For those that want to scale Digital Twin functionality and operationalize their 3D models. Offers Asset virtualization approaches for both speed and precision.",
  },
  {
    name: "V-Plant 360",
    color: "#A6E04A",
    intro: "For owners & operators that want to:",
    bullets: [
      "Manage all plant data",
      "Tap advanced capabilities including VR",
      "Leverage Model Management of Change (MMOC)",
      "Scale operational use cases across the plant",
    ],
    shot: "/V-Plant/side-by-side-desktop-left-v-plant-360.png",
    mobileShot: "/V-Plant/Group-1000002873-2.png",
    journeyShot: "/V-Plant/V-Plant_360.png",
    short:
      "For those looking for full Digital Transformation, with all available functionality and deep data integrations. Best option for those ready to apply Digital Twin technology across the plant.",
  },
];

const FEATURES = [
  {
    title: "Advanced Visualization",
    body: "3D Model available 24/7/365 Intuitive Data Driven",
    icon: "/V-Plant/Group.png",
  },
  {
    title: "Integration of Enterprise Data",
    body: "Contextualize data from real-time IIoT sensors, historical & enterprise systems of record",
    icon: "/V-Plant/Group-1.png",
  },
  {
    title: "Platform for Advanced Solutions",
    body: "Role-Based Work Packages for Enterprise Asset Management (EAM)",
    icon: "/V-Plant/Group-2.png",
  },
  {
    title: "VR, AR, AI & Simulations",
    body: "Rapid deployment Robust Model Management of Change (MMOC)",
    icon: "/V-Plant/Group-3.png",
  },
];

const BENEFITS: Array<{ icon: string | LucideIcon; title: string; body: string }> = [
  {
    icon: "/V-Plant/Group-608-1.svg",
    title: "Reduce cost",
    body: "Reduce unnecessary and costly field visits by facilitating remote access to reliable data, via web and mobile applications.",
  },
  {
    icon: "/V-Plant/Group-606-1.svg",
    title: "Drive better decisions",
    body: "Leverage our expertise in advanced data science and our ability to turn data into insights that power smarter decision making.",
  },
  {
    icon: "/V-Plant/Group-605-1.svg",
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
  { name: "Partner", src: "/V-Plant/Group-5.png" },
  { name: "Partner", src: "/V-Plant/image-31.png" },
  { name: "Partner", src: "/V-Plant/Group-6.png" },
  { name: "SABIC", src: "/V-Plant/sabic-logo-saudikayan_tcm1043-30158.png" },
  { name: "Partner", src: "/V-Plant/Vector-4.png" },
  { name: "Partner", src: "/V-Plant/Vector-4.png" },
  { name: "Larsen & Toubro", src: "/V-Plant/Larsen__Toubro_Logo-1536x284.png" },
  { name: "Partner", src: "/V-Plant/XMLID_1_.png" },
  { name: "BP", src: "/V-Plant/bp-logo.png" },
  { name: "Partner", src: "/V-Plant/Group-482.png" },
  { name: "Partner", src: "/V-Plant/image-33.png" },
];

/* Label-based scroll anchors — index-aligned with TIERS.
   Used by JourneyCards' "Explore Benefits" buttons, BuiltToScale's tier
   sections, and the header nav hrefs (#v-plant-explorer, #v-plant-pro, #v-plant-360). */
const TIER_ANCHORS = ["v-plant-explorer", "v-plant-pro", "v-plant-360"];

function smoothScrollToElement(element: HTMLElement | null, duration = 650) {
  if (!element) return;

  const startY = window.scrollY;
  const targetY = element.getBoundingClientRect().top + window.scrollY;
  const distance = targetY - startY;
  if (!distance) return;

  const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

const INTEGRATIONS = [
  { name: "GE Vernova", src: "/V-Plant/GE_Vernova_logo.png" },
  { name: "Honeywell", src: "/V-Plant/1356px-Honeywell_logo.png" },
  { name: "AWS S3", src: "/V-Plant/Group-600.png" },
  { name: "Microsoft", src: "/V-Plant/Group-599.png" },
  { name: "SAP", src: "/V-Plant/SAP_2011_logo.png" },
  { name: "Aspentech", src: "/V-Plant/Vector-3.png" },
  { name: "IBM Maximo", src: "/V-Plant/ibmmaximo-1.png" },
  { name: "Oracle", src: "/V-Plant/Group-530.png" },
  { name: "Documentum", src: "/V-Plant/Group-528.png" },
  { name: "OSIsoft", src: "/V-Plant/Group-529.png" },
];
/* ---------------- Page ---------------- */

function VPlantPage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    // Wait a frame so the page has laid out before measuring scroll position
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white overflow-x-hidden">
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
       <Data/>
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
      <div className="mx-auto grid max-w-7xl gap-1 px-6 py-16 md:grid-cols-2 md:items-center md:py-20">
        <div className="pr-8 tracking-[-0.02em] text-brand-navy md:pr-8 lg:pr-10">
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-brand-navy md:text-4xl lg:text-5xl">
            A 3D digital twin that's<br />always in sync
          </h1>
          <p className="mt-7 max-w-xl py-3 text-base text-lg leading-relaxed text-black/80">
            {renderHeroParagraph(heroParagraphs[0])}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-1">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-lg font-bold text-white shadow-md motion-effects-layer">
              Talk to an expert
            </Link>
            <button
              type="button"
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-3 rounded-full border border-brand-ink/15 bg-white px-6 py-3.5 text-lg font-bold text-black hover:border-brand-ink/30"
            >
              Watch video
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy text-white">
                <Play className="h-3 w-3 fill-white" />
              </span>
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative aspect-[16/9] w-full select-none overflow-hidden rounded-md bg-brand-navy/5 md:aspect-[4/3]"
        >
          <img
            src="/V-Plant/image1.jpg"
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
            className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white shadow-lg"
            style={{ left: `${sliderPos}%` }}
          >
            <span className="flex items-center text-brand-navy">
              <ChevronLeft className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
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
              className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-md bg-black shadow-1xl">
              <video
                src="/V-Plant/Converted-Visionaize-in-a-Minute-Oct-2023.mp4"
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
   <section className="relative overflow-hidden bg-[#0F2237] py-24 text-white">
  <div
    aria-hidden
    className="pointer-events-none absolute right-0 top-0 h-full w-full md:w-1/2"
    style={{
      backgroundImage:
        "url('/V-Plant/Qbg-min.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom right",
      backgroundSize: "contain",
      opacity: 1,
      width: "30%",
    }}
  />
  <div
    aria-hidden="true"
    className="hidden md:block pointer-events-none absolute right-6 top-10 select-none text-[20rem] font-serif leading-none opacity-20"
    style={{
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
    }}
  >
    V-PLANT
  </div>
  <div className="relative mx-auto max-w-7xl px-8">
    <p className="text-balance text-3xl font-light leading-tight tracking-tight md:text-[68px] lg:text-[68px]" style={{ fontWeight: 200 }}>
      An hour in V-Plant is<br />like 8 hours in the field
    </p>
    <p className="mt-8 text-sm font-semibold">
      <span className="theme-multicolor-weight-400 text-2xl">Top 5 Global Oil &amp; Gas Company</span>
    </p>
  </div>
</section>
  );
}
function JourneyCards() {
  return (
<section id="journey-cards" className="relative overflow-hidden bg-[#DAEEF8] py-40">
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0"
    style={{
      backgroundImage: "url('/V-Plant/Arrows.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom left",
      backgroundSize: "96% 76%",
    }}
  />
  <div className="relative mx-auto max-w-7xl px-6">
    <h2 className="text-center text-4xl font-semibold text-brand-navy md:text-5xl pb-4">
      Digital Twins for Every Stage of The Journey
    </h2>
    <div className="relative mt-14 grid gap-8 md:grid-cols-3">
      {TIERS.map((t, idx) => (
        <article
          key={t.name}
          className="relative flex flex-col overflow-hidden bg-white pb-10  shadow-md"
          style={{ marginTop: `${2 - idx * 24}px` }}
        >
          <div className="mb-6 overflow-hidden rounded bg-[#DAEEF8]">
            <img src={t.journeyShot ?? t.shot} alt={t.name} className="block aspect-[16/9] w-full object-cover" />
          </div>
        <div className="px-8">
          <h3 className="text-2xl font-bold theme-multicolor-weight-900">
            {t.name}
          </h3>
          <p className="mt-3 text-lg leading-relaxed text-black/80">{t.short}</p>
          <div className="mt-auto pt-8">
            <button
              type="button"
              id={`arrow-navigate-button-${idx}`}
              className="arrow-navigate inline-flex items-center gap-3 text-lg font-semibold theme-multicolor-weight-400"
              onClick={() => smoothScrollToElement(document.getElementById(TIER_ANCHORS[idx]))}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full border-2"
                style={{ borderColor: t.color }}
              >
                <ChevronDown className="h-4 w-4" style={{ color: t.color }} />
              </span>
              Explore Benefits
            </button>
          </div>
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
  return (
 <section className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-6">
    <style>{`
      @keyframes floatUpDown {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      .floaty {
        animation: floatUpDown 2.2s ease-in-out infinite;
      }
    `}</style>
    <h2 className="text-center text-3xl font-semibold text-brand-navy md:text-5xl">
      Digital Twin Technology Built to Scale
    </h2>
    <div className="mt-16 space-y-24">
      {TIERS.map((t, i) => {
        const reverse = i % 2 === 1;
        return (
          <div
            key={t.name}
            id={TIER_ANCHORS[i]}
            className={`grid grid-cols-1 scroll-mt-24 items-center gap-12 md:grid-cols-2 ${
              reverse ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="relative w-full">
              <div className="w-full rounded-xl bg-white ">
                <picture>
                  <source media="(max-width: 1023px)" srcSet={t.mobileShot ?? t.shot} />
                  <img
                    src={t.shot}
                    alt={`${t.name} screenshot`}
                    className={`block w-full max-w-full justify-center relative ${reverse ? "md:right-[22rem]" : "md:left-[22.5rem]"} scale-100 md:w-[150%] lg:scale-[2.0] object-contain`}
                  />
                </picture>
              </div>
            </div>
            <div className={reverse ? "md:pr-8 pl-8 py-[38px]" : "md:pl-8 py-[38px]" }>
             <div className="flex items-center gap-3">
              <h3 className="text-4xl font-bold text-brand-navy">{t.name}</h3>
              <button
                type="button"
                className="floaty inline-flex h-9 w-9 items-center justify-center bg-white"
                style={{ animationDelay: `${i * 0.2}s` }}
                onClick={() => smoothScrollToElement(document.getElementById("journey-cards"))}
                aria-label="Back to Digital Twins for Every Stage of The Journey"
              >
                <ArrowUp className="h-5 w-5" style={{ color: t.color }} />
              </button>
            </div>
              <p className="mt-5 text-xl text-brand-ink/85">{t.intro}</p>
              <ul className="mt-5 space-y-3">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-lg text-brand-navy/65">
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
    <section className="bg-white pb-16 pt-4">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-semibold text-brand-navy md:text-4xl">
          Features
        </h2>
        <div className="mt-14 grid grid-cols-2 gap-10 text-center lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className=" flex flex-col items-center">
              <img src={f.icon} alt="" className="h-12 w-auto object-contain" loading="lazy" />
              <h3 className="mt-6 text-3xl font-bold leading-snug text-brand-navy">{f.title}</h3>
              <p className="mt-4 text-m leading-relaxed text-brand-ink/75">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderHeroParagraph(text: string) {
  const pattern = /(stay in sync)/i;
  if (pattern.test(text)) {
    const parts = text.split(pattern);
    return (
      <>
        {parts.map((part, i) =>
          pattern.test(part) ? (
            <Link
              key={i}
              to="/solutions/maintain-and-sustain/"
              className="font-semibold"
              style={{ color: "#088FD1" }}
            >
              {part}
            </Link>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  }
  return text;
}

function BusinessCaseBand() {
  return (
  <section className="bg-[#A6E04A] py-10 md:py-[3.75rem]">
  <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-6 md:flex-row md:gap-14">
    <p className="text-3xl font-semi text-brand-navy md:text-3xl">
      Building a case for a 3D Digital Twin
    </p>
    <Link
      to="/build-a-business-case"
      className="inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 text-lg font-bold text-brand-blue shadow-sm hover:bg-white/90"
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
  className="relative overflow-hidden bg-[#F2F4F6] bg-no-repeat py-32"
  style={{
    backgroundImage: "url('/V-Plant/Qbg-min.png')",
    backgroundPosition: "right bottom",
    backgroundSize: "45% auto",
  }}
>
  <div className="relative mx-auto max-w-7xl px-6">
    <blockquote className="max-w-2xl text-balance text-xl font-medium leading-snug text-brand-navy md:text-4xl">
      During the early stages of an implementation, V-Plant helped the
      inspection team find and solve a corrosion problem in 2 days. A similar
      exercise required 2 weeks using a competitor's product.
    </blockquote>
    <p className="mt-10 text-sm font-semibold text-brand-ink/70">CHS, Inc.</p>
  </div>
</section>
  );
}

function VideoBenefits() {
  return (
   <section className="bg-white py-20">
  <div className="mx-auto grid grid-cols-1 max-w-7xl items-start gap-4 px-6 lg:grid-cols-2">
    <div className="relative mx-auto w-full max-w-xl">
      <div className="relative rounded-t-xl bg-black">
        <video
          src="/V-Plant/3Dtwinanimation.mp4"
          className="block aspect-[3/3] w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="mx-auto h-3 max-w-2xl rounded-b-2xl bg-brand-ink/15" />
    </div>
    <div>
      <h2 className="text-4xl font-bold text-brand-navy md:text-4xl">Benefits</h2>
      <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
       {BENEFITS.map((b) => (
          <div key={b.title}>
            {typeof b.icon === "string" ? (
              <img src={b.icon} alt="" className="h-7 w-7" aria-hidden="true" loading="lazy" />
            ) : (
              <b.icon className="h-9 w-9 font-bold text-emerald-500" strokeWidth={1.5} />
            )}
            <h3 className="mt-3 text-xl font-bold text-brand-navy">{b.title}</h3>
            <p className="mt-2 text-md leading-relaxed text-brand-ink/80">{b.body}</p>
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
 <section className="bg-white pb-[25px] pt-8">
  <div className="mx-auto max-w-6xl px-8">
    <h2 className="text-center text-4xl font-semibold text-brand-navy md:text-5xl">
      We are in good company
    </h2>
    <div className="mt-[18px] grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 md:grid-cols-6">
      {PARTNERS.map((p, index) => (
        <div key={`${p.name}-${p.src}-${index}`} className="flex items-center justify-center">
          <img
            src={p.src}
            alt={p.name}
            className="h-20 w-auto lg:max-w-[180px] sm:max-w-[110px] object-contain lg:px-5"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </div>
</section>
  );
}

function CTA() {
  return (
<section
  className="relative overflow-hidden bg-[#0F2237] sm:py-8 bg-no-repeat py-48"
  style={{
    backgroundImage:
      "url('/V-Plant/Group-526.png')",
    backgroundPosition: "bottom center",
    backgroundSize: "cover",
  }}
>
  <div className="relative z-10 mx-auto grid max-w-7xl gap-24 px-2 md:grid-cols-2">
    <div className="max-w-md pt-10 pb-32">
      <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
        Contextualize mountains of data with cutting edge technology
      </h2>
      <p className="mt-8 max-w-sm text-lg leading-relaxed text-white/90 sm:text-xl">
        Reliable connectivity and data are critical drivers to successful
        infrastructure management. Taking advantage of IIoT sensors requires
        flexible methods to interact with real-time data.
      </p>
    </div>
    <div className="flex items-start justify-center gap-12 pt-0 md:pt-28 md:justify-center relative lg:static bottom-0 md:bottom-32 lg:bottom-0">
      {[
        {
          label: "Mobile",
          src: "/V-Plant/image-36.png",
        },
        {
          label: "Virtual Reality",
          src: "/V-Plant/iStock-1148243718-1-2048x1365.jpg",
        },
        {
          label: "Augmented Reality",
          src: "/V-Plant/image-38.png",
        },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-3">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-white sm:h-28 sm:w-28 md:h-32 md:w-32">
            <img
              src={item.src}
              alt={item.label}
              className={item.label === "Virtual Reality" ? "h-full w-full object-contain" : "h-full w-full object-cover"}
            />
          </div>
          <span className="text-md font-medium text-white">{item.label}</span>
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
  className="relative overflow-hidden bg-[#F2F4F6] bg-no-repeat py-[38px]"
  style={{
    backgroundImage: "url('/V-Plant/Qbg-min.png')",
    backgroundPosition: "right bottom",
    backgroundSize: "45% auto",
  }}
>
  <div className="relative mx-auto max-w-7xl px-6">
    <blockquote className="max-w-3xl text-balance text-xl font-medium leading-snug text-brand-navy md:text-4xl">
     It is astounding how this platform is able to integrate data from complex systems like SCADA, AMI Meter, and GIS Systems to provide accurate 3D visualizations.
    </blockquote>
    <p className="mt-10 text-xl font-semibold text-brand-ink/90">Bill Andrew, President, Delaware Electric Cooperative
</p>
  </div>
</section>
  );
}
function Integrations() {
  return (
    <section className="bg-white pb-[30px] pt-20">
      <div className="mx-auto max-w-6xl px-8">
        <h2 className="text-center text-xl font-semibold text-brand-navy md:text-5xl mb-4">
          We integrate with<br />best-in-class technologies
        </h2>
        <div className="lg:mt-[4.5rem] grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 md:grid-cols-5">
          {INTEGRATIONS.map((p) => (
            <div key={p.name} className="flex items-center justify-center ">
              <img
                src={p.src}
                alt={p.name}
                className="w-auto lg:max-w-[200px] sm:max-w-[130px] scale-[1.2] object-contain lg:px-5 my-2"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}