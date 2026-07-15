import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap,  Target, BarChart3 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight, ArrowUpRight, ArrowUp, Play, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getSeedContentItem } from "@/lib/seed-content";
import { useState, useRef, useCallback } from "react";

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
const heroParagraphs = heroSection?.paragraphs?.length
  ? heroSection.paragraphs
  : [
      "Many Digital Twins look good, but the true power lies in the ability to stay in sync with its twin in the field. V-Plant has been built to be the most connected and current Digital Twin solution for industrial assets.",
    ];
const heroImage = heroSection?.images[0]?.src ?? "https://visionaize.com/wp-content/uploads/2022/07/image-2.jpg";

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
    shot: "https://visionaize.com/wp-content/uploads/2024/05/V-Plant_Explorer-1536x798.png",
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
    shot: "https://visionaize.com/wp-content/uploads/2024/05/V-Plant_Pro-1536x792.png",
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
    shot: "https://visionaize.com/wp-content/uploads/2024/05/V-Plant_360.png",
    short:
      "For those looking for full Digital Transformation, with all available functionality and deep data integrations. Best option for those ready to apply Digital Twin technology across the plant.",
  },
];

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
  return (
    <div className="flex min-h-screen flex-col bg-white">
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
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-brand-navy md:text-5xl lg:text-5xl">
            A 3D digital twin that's<br />always in sync
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-brand-ink/80">
            {heroParagraphs[0]}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-md"
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
              className="inline-flex items-center gap-3 rounded-full border border-brand-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy hover:border-brand-ink/30"
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
          className="relative aspect-[16/9] w-full select-none overflow-hidden rounded-md bg-brand-navy/5 md:aspect-[4/3]"
        >
          {/* Right image (full width, base layer) */}
          <img
            src="https://visionaize.com/wp-content/uploads/2022/07/image1.jpg"
            alt="Field photograph of plant"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Left image (clipped to slider position) */}
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

          {/* Divider line */}
          <div
            className="absolute inset-y-0 w-0.5 bg-white/90"
            style={{ left: `${sliderPos}%` }}
          />

          {/* Drag handle */}
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
              className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
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
   <section className="relative overflow-hidden bg-[#0F2237] py-24 text-white">
  <div
    aria-hidden
    className="pointer-events-none absolute right-0 top-0 h-full w-full md:w-1/2"
    style={{
      backgroundImage:
        "url('https://visionaize.in/wp-content/uploads/2022/04/Qbg-min.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top right",
      backgroundSize: "contain",
      opacity: 0.5,
    }}
  />
  <div
    aria-hidden
    className="pointer-events-none absolute right-6 top-10 select-none text-[20rem] font-serif leading-none"
    style={{
      background: "linear-gradient(135deg, #A6E04A 0%, #2E8DC5 80%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      opacity: 0.18,
    }}
  >
  
  </div>
  <div className="relative mx-auto max-w-7xl px-6">
    <p className="text-balance text-3xl font-light leading-tight tracking-tight md:text-5xl">
      An hour in V-Plant is<br />like 8 hours in the field
    </p>
    <p className="mt-8 text-sm font-semibold">
      <span style={{ color: "#A6E04A" }}>Top 5</span>{" "}
      <span className="text-white/80">Global Oil &amp; Gas Company</span>
    </p>
  </div>
</section>
  );
}

function JourneyCards() {
  return (
<section className="relative overflow-hidden bg-[#DAEEF8] py-40">
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0"
    style={{
      backgroundImage: "url('https://visionaize.in/wp-content/uploads/2025/12/Arrows.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right center",
      backgroundSize: "90% 120%",
    }}
  />

  <div className="relative mx-auto max-w-7xl px-6">
    <h2 className="text-center text-3xl font-semibold text-brand-navy md:text-4xl">
      Digital Twins for Every Stage of The Journey
    </h2>

    <div className="relative mt-14 grid gap-6 md:grid-cols-3">
      {TIERS.map((t, idx) => (
        <article
          key={t.name}
          className="relative flex flex-col overflow-hidden bg-white px-7 pb-10 pt-10 shadow-md"
          style={{ marginTop: `${idx * 24}px` }}
        >
          <div className="mb-6 overflow-hidden rounded bg-[#DAEEF8]">
            <img src={t.shot} alt={t.name} className="block aspect-[16/9] w-full object-cover" />
          </div>

          <h3 className="text-xl font-bold" style={{ color: t.color }}>
            {t.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-brand-ink/80">{t.short}</p>

          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById(`tier-detail-${idx}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="inline-flex items-center gap-3 text-sm font-semibold"
              style={{ color: t.color }}
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

          {/* Solid bottom color band, full width of the card */}
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

    <h2 className="text-center text-3xl font-semibold text-brand-navy md:text-4xl">
      Digital Twin Technology Built to Scale
    </h2>
    <div className="mt-16 space-y-24">
      {TIERS.map((t, i) => {
        const reverse = i % 2 === 1;
        return (
          <div
            key={t.name}
            id={`tier-detail-${i}`}
            className={`grid scroll-mt-24 items-center gap-12 md:grid-cols-2 ${
              reverse ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="relative">
              <div className="relative mx-auto max-w-xl rounded-t-xl border-x-8 border-t-8 border-brand-ink/15 bg-white">
                <img
                  src={t.shot}
                  alt={`${t.name} screenshot`}
                  className="block aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="mx-auto h-3 max-w-2xl rounded-b-2xl bg-brand-ink/15" />
            </div>
            <div className={reverse ? "md:pr-8" : "md:pl-8"}>
             <div className="flex items-center gap-3">
  <h3 className="text-3xl font-bold text-brand-navy">{t.name}</h3>
  <ArrowUp
    className="floaty h-7 w-7"
    style={{ color: t.color, animationDelay: `${i * 0.2}s` }}
  />
</div>
              <p className="mt-5 text-base text-brand-ink/85">{t.intro}</p>
              <ul className="mt-5 space-y-3">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-base text-brand-ink/85">
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
        <div className="mt-14 grid gap-10 text-center md:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center">
              <img src={f.icon} alt="" className="h-16 w-auto object-contain" loading="lazy" />
              <h3 className="mt-6 text-xl font-bold leading-snug text-brand-navy">{f.title}</h3>
              <p className="mt-4 text-m leading-relaxed text-brand-ink/75">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessCaseBand() {
  return (
  <section className="bg-[#A6E04A] py-10 md:py-15">
  <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-6 md:flex-row md:gap-14">
    <p className="text-2xl font-semi text-brand-navy md:text-2xl">
      Building a case for a 3D Digital Twin
    </p>
    <Link
      to="/contact"
      className="inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 text-base font-semibold text-brand-blue shadow-sm hover:bg-white/90"
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
    backgroundImage: "url('https://visionaize.in/wp-content/uploads/2022/04/Qbg-min.png')",
    backgroundPosition: "right bottom",
    backgroundSize: "45% auto",
  }}
>
  <div className="relative mx-auto max-w-5xl px-6">
    <blockquote className="max-w-2xl text-balance text-1xl font-medium leading-snug text-brand-navy md:text-3xl">
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
  <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 md:grid-cols-2">
    {/* Laptop mockup with video */}
    <div className="relative mx-auto w-full max-w-xl">
      <div className="relative rounded-t-xl border-x-8 border-t-8 border-brand-ink/15 bg-black">
        <video
          src="https://visionaize.com/wp-content/uploads/2022/07/3Dtwinanimation.mp4"
          className="block aspect-[3/3] w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="mx-auto h-3 max-w-2xl rounded-b-2xl bg-brand-ink/15" />
    </div>

    {/* Benefits */}
    <div>
      <h2 className="text-4xl font-bold text-brand-navy md:text-5xl">Benefits</h2>
      <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
       {BENEFITS.map((b) => (
  <div key={b.title}>
    {typeof b.icon === "string" ? (
      <img src={b.icon} alt="" className="h-7 w-7" aria-hidden="true" />
    ) : (
      <b.icon className="h-7 w-7 text-emerald-500" strokeWidth={1.5} />
    )}
    <h3 className="mt-3 text-lg font-bold text-brand-navy">{b.title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-brand-ink/80">{b.body}</p>
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
 <section className="bg-white pb-25 pt-8">
  <div className="mx-auto max-w-6xl px-8">
    <h2 className="text-center text-4xl font-semibold text-brand-navy md:text-4xl">
      We are in good company
    </h2>
    <div className="mt-18 grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 md:grid-cols-6">
      {PARTNERS.map((p) => (
        <div key={p.name} className="flex items-center justify-center">
          <img
            src={p.src}
            alt={p.name}
            className="h-20 w-auto max-w-[180px] object-contain"
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
  className="relative overflow-hidden bg-[#0F2237] py-26 bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://visionaize.in/wp-content/uploads/2022/05/footer-bg-2.png')",
    backgroundPosition: "right center",
    backgroundSize: "65% auto",
  }}
>
  <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
    {/* Left copy */}
    <div>
      <h2 className="text-5xl font-semibold leading-tight text-white md:text-4xl">
        Contextualize mountains of data with cutting edge technology
      </h2>
      <p className="mt-8 max-w-md text-large leading-relaxed text-white/70">
        Reliable connectivity and data are critical drivers to successful
        infrastructure management. Taking advantage of IIoT sensors requires
        flexible methods to interact with real-time data.
      </p>
    </div>

    {/* Right: circular image trio */}
    <div className="flex items-center justify-center gap-12 pt-16 md:justify-center md:pt-20">
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
          <div className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/90 md:h-30 md:w-30">
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
  className="relative overflow-hidden bg-[#F2F4F6] bg-no-repeat py-32"
  style={{
    backgroundImage: "url('https://visionaize.in/wp-content/uploads/2022/04/Qbg-min.png')",
    backgroundPosition: "right bottom",
    backgroundSize: "45% auto",
  }}
>
  <div className="relative mx-auto max-w-5xl px-6">
    <blockquote className="max-w-2xl text-balance text-1xl font-medium leading-snug text-brand-navy md:text-3xl">
     It is astounding how this platform is able to integrate data from complex systems like SCADA, AMI Meter, and GIS Systems to provide accurate 3D visualizations.
    </blockquote>
    <p className="mt-10 text-sm font-semibold text-brand-ink/70">Bill Andrew, President, Delaware Electric Cooperative
</p>
  </div>
</section>
  );
}

function Integrations() {
  return (
    <section className="bg-white pb-30 pt-20">
      <div className="mx-auto max-w-6xl px-8">
        <h2 className="text-center text-4xl font-semibold text-brand-navy md:text-4xl">
          We integrate with<br />best-in-class technologies
        </h2>
        <div className="mt-18 grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 md:grid-cols-5">
          {INTEGRATIONS.map((p) => (
            <div key={p.name} className="flex items-center justify-center">
              <img
                src={p.src}
                alt={p.name}
                className="h-20 w-auto max-w-[180px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
