import { createFileRoute, Link } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight, ArrowUpRight, Play, ChevronDown } from "lucide-react";
import { getSeedContentItem } from "@/lib/seed-content";

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
    title: "Reduce cost",
    body:
      "Reduce unnecessary and costly field visits by facilitating remote access to reliable data, via web and mobile applications.",
  },
  {
    title: "Drive better decisions",
    body:
      "Leverage our expertise in advanced data science and our ability to turn data into insights that power smarter decision making.",
  },
  {
    title: "Increase reliability",
    body:
      "Improve knowledge capture and information accuracy and dynamically generate operational plans.",
  },
  {
    title: "Boost performance",
    body:
      "Maximize wrench time with better advance access to plant information and knowledge. Get more done with fewer trips into the field.",
  },
];

const PARTNERS = [
  { name: "GE Vernova", src: "https://visionaize.com/wp-content/uploads/2024/04/GE_Vernova_logo-2.webp" },
  { name: "Honeywell", src: "https://visionaize.com/wp-content/uploads/2022/05/1356px-Honeywell_logo.png" },
  { name: "SAP", src: "https://visionaize.com/wp-content/uploads/2022/05/SAP_2011_logo.png" },
  { name: "IBM Maximo", src: "https://visionaize.com/wp-content/uploads/2022/05/ibmmaximo-1.png" },
  { name: "BP", src: "https://visionaize.com/wp-content/uploads/2022/05/bp-logo.png" },
  { name: "SABIC", src: "https://visionaize.com/wp-content/uploads/2022/05/sabic-logo-saudikayan_tcm1043-30158.png" },
  { name: "CHS", src: "https://visionaize.com/wp-content/uploads/2022/05/chs-inc-logo.png" },
  { name: "Partner", src: "https://visionaize.com/wp-content/uploads/2022/05/Group-599.png" },
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
      <Footer />
    </div>
  );
}

/* ---------------- Sections ---------------- */

function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-brand-navy md:text-5xl lg:text-6xl">
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
              className="inline-flex items-center gap-3 rounded-full border border-brand-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy hover:border-brand-ink/30"
            >
              Watch video
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy text-white">
                <Play className="h-3 w-3 fill-white" />
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-square overflow-hidden rounded-md bg-brand-navy/5">
          <img
              src={heroImage}
              alt="3D digital twin visualization"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-md bg-brand-navy/5">
            <img
              src="https://visionaize.com/wp-content/uploads/2022/07/image1.jpg"
              alt="Field photograph of plant"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              aria-label="Play video"
              className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 text-white backdrop-blur-sm transition hover:scale-110"
            >
              <Play className="h-5 w-5 fill-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="relative overflow-hidden bg-[#0F2237] py-24 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-10 select-none text-[20rem] font-serif leading-none"
        style={{
          background:
            "linear-gradient(135deg, #A6E04A 0%, #2E8DC5 80%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: 0.18,
        }}
      >
        “
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
    <section className="relative overflow-hidden bg-[#E6F4FB] py-20">
      {/* Decorative upward arrows */}
      <div aria-hidden className="pointer-events-none absolute -right-10 top-20 text-brand-lime opacity-40">
        <svg width="220" height="420" viewBox="0 0 220 420" fill="none">
          {[0, 30, 60, 90, 120].map((x, i) => (
            <path
              key={i}
              d={`M${x + 20} 400 L${x + 20} 40 M${x + 5} 60 L${x + 20} 30 L${x + 35} 60`}
              stroke="#A6E04A"
              strokeWidth="2"
              opacity={1 - i * 0.18}
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-semibold text-brand-navy md:text-4xl">
          Digital Twins for Every Stage of The Journey
        </h2>

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          {TIERS.map((t, idx) => (
            <article
              key={t.name}
              className="relative flex flex-col bg-white px-7 pb-14 pt-10 shadow-md"
              style={{ marginTop: `${idx * 24}px` }}
            >
              <div className="mb-6 overflow-hidden rounded bg-[#E6F4FB]">
                <img src={t.shot} alt={t.name} className="block aspect-[16/9] w-full object-cover" />
              </div>
              <h3 className="text-xl font-bold" style={{ color: t.color }}>
                {t.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-ink/80">{t.short}</p>
              <div className="mt-auto pt-8">
                <button
                  type="button"
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
              <span
                className="absolute inset-x-7 bottom-0 h-[3px]"
                style={{
                  background: `linear-gradient(90deg, ${t.color} 0%, transparent 100%)`,
                }}
              />
            </article>
          ))}
        </div>

        {/* Hand-script "Start Fast" overlay */}
        <p
          className="mt-10 text-center text-5xl text-white md:text-6xl"
          style={{
            fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
            textShadow: "0 4px 12px rgba(15,34,55,0.18)",
          }}
        >
          Start Fast
        </p>
      </div>
    </section>
  );
}

function BuiltToScale() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-semibold text-brand-navy md:text-4xl">
          Digital Twin Technology Built to Scale
        </h2>

        <div className="mt-16 space-y-24">
          {TIERS.map((t, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={t.name}
                className={`grid items-center gap-12 md:grid-cols-2 ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Laptop mockup */}
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
                    <ArrowUpRight className="h-7 w-7" style={{ color: t.color }} />
                  </div>
                  <p className="mt-5 text-base text-brand-ink/85">{t.intro}</p>
                  <ul className="mt-5 space-y-3">
                    {t.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-base text-brand-ink/85"
                      >
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
              <p className="mt-4 text-sm leading-relaxed text-brand-ink/75">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessCaseBand() {
  return (
    <section className="bg-[#A6E04A] py-7">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 px-6 md:flex-row md:gap-10">
        <p className="text-lg font-semibold text-brand-navy md:text-xl">
          Building a case for a 3D Digital Twin
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-brand-blue shadow-sm hover:bg-white/90"
        >
          Build a business case
        </Link>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="relative overflow-hidden bg-[#F2F4F6] py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-8 select-none text-[24rem] font-serif leading-none"
        style={{
          background:
            "linear-gradient(135deg, #A6E04A 0%, #2E8DC5 80%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: 0.22,
        }}
      >
        “
      </div>
      <div className="relative mx-auto max-w-5xl px-6">
        <blockquote className="text-balance text-2xl font-medium leading-snug text-brand-navy md:text-4xl">
          During the early stages of an implementation, V-Plant helped the inspection team find
          and solve a corrosion problem in 2 days. A similar exercise required 2 weeks using a
          competitor's product.
        </blockquote>
        <p className="mt-10 text-sm font-semibold text-brand-ink/70">CHS, Inc.</p>
      </div>
    </section>
  );
}

function VideoBenefits() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-md bg-black shadow-xl">
          <img
            src="https://visionaize.com/wp-content/uploads/2022/11/iStock-1148243718-1-1536x1024.jpg"
            alt="V-Plant demo"
            className="h-full w-full object-cover opacity-70"
          />
          <button
            type="button"
            aria-label="Play video"
            className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-white/10 text-white backdrop-blur-sm hover:scale-110"
          >
            <Play className="h-6 w-6 fill-white" />
          </button>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-brand-navy md:text-4xl">Benefits</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title}>
                <h3 className="text-base font-bold text-brand-navy">{b.title}</h3>
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
    <section className="bg-white pb-20 pt-6">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-semibold text-brand-navy md:text-4xl">
          We are in good company
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-4 md:grid-cols-8">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center"
            >
              <img src={p.src} alt={p.name} className="h-10 w-auto max-w-[140px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#0F2237] py-20 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-[100%]"
        style={{
          background: "linear-gradient(90deg, #A6E04A 0%, #2E8DC5 100%)",
          opacity: 0.18,
          filter: "blur(60px)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold leading-tight md:text-4xl">
          Ready to see V-Plant in action?
        </h2>
        <p className="mt-4 text-white/70">
          Book a 30-minute walkthrough with one of our solutions engineers.
        </p>
        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg"
            style={{
              background:
                "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
            }}
          >
            Talk to an expert <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
