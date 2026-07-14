import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSeedContentItem } from "@/lib/seed-content";

export const Route = createFileRoute("/industries/digital-twin-for-oil-and-gas")({
  head: () => ({
    meta: [
      { title: "Digital Twin for Oil & Gas — Visionaize" },
      {
        name: "description",
        content:
          "Reduce downtime and maximize the productivity of your oil & gas infrastructure with Visionaize's 3D Digital Twin platform.",
      },
      { property: "og:title", content: "Digital Twin for Oil & Gas — Visionaize" },
      {
        property: "og:description",
        content:
          "A 3D Digital Twin that stays connected and in sync through the operations of complex oil & gas assets.",
      },
      {
        property: "og:image",
        content:
          "https://visionaize.com/wp-content/uploads/2022/07/offshore-oil-platform-iStock-636032898-1.png",
      },
    ],
  }),
  component: OilAndGasPage,
});

/* ---------------- data ---------------- */

const seedItem = getSeedContentItem("page", "digital-twin-for-oil-and-gas");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections.find((section) => section.heading?.toLowerCase() === "plan more clearly");
const heroParagraphs = heroSection?.paragraphs?.length ? heroSection.paragraphs : ["Reduce downtime and maximize the productivity of your oil & gas infrastructure."];
const heroImage = heroSection?.images[0]?.src ?? seedSections.flatMap((section) => section.images ?? []).find((image) => !image.src.endsWith(".svg"))?.src ?? "https://visionaize.com/wp-content/uploads/2022/07/offshore-oil-platform-iStock-636032898-1.png";
const introSection = seedSections.find((section) => section.heading?.toLowerCase() === "plan more clearly");
const introParagraphs = introSection?.paragraphs?.length ? introSection.paragraphs : [
  "Oil & Gas infrastructure that yields greater productivity and profitability, with less downtime and safer working conditions can be realized with a 3D Digital Twin that is designed to stay connected and in sync through the operations of complex assets.",
  "Learn more from a product demo or an RoI exploration with a 3D Digital Twin expert.",
];

const PILLARS = [
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Vector-6.svg",
    title: "Reduce downtime",
    body: "Be more productive by minimizing planned and unplanned downtime",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-3.svg",
    title: "Boost productivity",
    body: "Train and learn faster, plan better, work more efficiently",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-4.svg",
    title: "Plan more clearly",
    body: "Enables teams to contextualize rich data, anytime, from anywhere",
  },
];

const CASE_STUDIES = [
  {
    eyebrow: "CASE STUDY",
    title: "Refinery Precision: Quick Returns Through Operational Efficiency",
    tabs: {
      Challenge:
        "In the complex world of a petroleum refinery, the company grappled with significant challenges like elevating the plant-wide Mechanical Integrity (MI) program, implementing Risk-Based Inspection (RBI), and overcoming the limitations of legacy systems emerged as formidable hurdles.",
      Solution:
        "Visionaize deployed V-Plant with an integrated RBI module, unifying corrosion loops, inspection data, and asset history into a single digital twin so the MI team could prioritize work by real risk.",
      Results:
        "The refinery achieved a measurable lift in inspection throughput, cut redundant fieldwork, and built a defensible RBI program that scales across the plant.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/steel-service-platform-and-stairs-equipment-refinery-SBI-300930077-scaled-1.jpg",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Optimizing OEE with Predictive Maintenance and AI Solutions",
    tabs: {
      Challenge:
        "One of the world's largest oil producer's in the world was plagued with a data silo issue with data from 15 different enterprise applications sealed off from one another. Besides the data not being integrated into the same system, the teams managing these different applications were not collaborating to the extent that they should have been.",
      Solution:
        "Visionaize stitched the 15 enterprise systems into one operational data fabric and layered predictive AI on top, giving every team a shared, contextualized view of asset health.",
      Results:
        "OEE improved across the producer's fleet, unplanned events were caught earlier, and cross-functional teams finally collaborated against the same source of truth.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/oil-refinery-equipment-for-primary-oil-refining-SBI-300925954-1.jpg",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Transforming Operations: Lessons from a Petrochemical Journey",
    tabs: {
      Challenge:
        "In the vast landscape of a Large Petrochemical complex, the company encountered a significant hurdle in developing a cost-effective Risk-Based Inspection (RBI) program, focused on corrosion. Balancing rising inspection costs while needing to mitigate risks proved challenging, and configuring operational data added to the complexity.",
      Solution:
        "Visionaize delivered a corrosion-focused RBI program inside V-Plant, automating data capture from operational systems and standardizing inspection planning.",
      Results:
        "Inspection spend was rationalized, corrosion risk was quantified, and the operator now scales the same RBI playbook across additional units.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/oil-refinery-equipment-for-primary-oil-refining-SBI-300925954-1.jpg",
  },
];

const FORM_TOPICS = [
  "Plan, optimize and execute critical work",
  "Keep processes running smoothly",
  '"Experience" data to ease decision making',
  "Keep teams safe and operationally compliant",
];

/* ---------------- component ---------------- */

function OilAndGasPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F1B2D]">
      <Header />

      <Hero />
      <Pillars />
      <Intro />
      <CaseStudyCarousel />
      <Wellhead />
      <Quote />
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
        <div className="w-full max-w-[520px] bg-white p-12 shadow-sm">
          <h1
            className="text-[64px] font-light leading-[1.05] tracking-tight"
            style={{
              background:
                "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Oil &amp; Gas
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
            Oil &amp; Gas, Visionaized
          </h2>
          {introParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-6 text-[16px] leading-[1.8] text-[#3a4658]">
              {index === 1 ? (
                <>
                  {paragraph.split("RoI exploration")[0]}
                  <a
                    href="#talk-to-an-expert"
                    className="font-semibold text-[#2E8DC5] underline-offset-4 hover:underline"
                  >
                    RoI exploration
                  </a>
                  {paragraph.split("RoI exploration")[1]}
                </>
              ) : (
                paragraph
              )}
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
              Talk to an expert
            </a>
          </div>
        </div>
        <div className="flex justify-center bg-[#E6F0F7] p-8">
          <img
            src="https://visionaize.com/wp-content/uploads/2022/07/Group-523.png"
            alt="Visionaize 3D Digital Twin on laptop and tablet"
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

function Wellhead() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-[42px] font-semibold leading-tight">
            Better wellhead production and refinery performance
          </h2>
          <p className="mt-6 text-[16px] leading-[1.8] text-[#3a4658]">
            Through advanced predictive maintenance capabilities and the most
            immersive 3D data experiences, Visionaize is built from the ground
            up to maximize operational efficiencies and keep complex assets
            running smoothly. The end result is greater resiliency,
            sustainability and efficiency.
          </p>
          <p className="mt-6 text-[16px] leading-[1.8] text-[#3a4658]">
            With advanced work packages and a combination of AI, AR and VR
            technologies, operations teams can proactively resolve a myriad of
            issues before they have a chance to cause downtime. Powerful remote
            infrastructure management capabilities mean fewer trips into the
            field. And when in the field, workers come more prepared to get the
            job done faster and more safely.
          </p>
          <p className="mt-6 text-[16px] leading-[1.8] text-[#3a4658]">
            Experience contextualized data like never before, and take your Oil
            &amp; Gas operations to new heights.
          </p>
        </div>
        <div>
          <img
            src="https://visionaize.com/wp-content/uploads/2023/12/Reinventing-Mockup-1024x1024.png"
            alt="3D digital twin of a refinery"
            className="w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="relative">
          {/* Decorative gradient quote glyphs */}
          <svg
            className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block"
            width="520"
            height="380"
            viewBox="0 0 520 380"
            fill="none"
          >
            <defs>
              <linearGradient id="qg" x1="0" y1="0" x2="520" y2="380" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A6E04A" />
                <stop offset="100%" stopColor="#2E8DC5" />
              </linearGradient>
            </defs>
            {/* Left big quote */}
            <path
              d="M40 340 C 40 200, 120 100, 240 60"
              stroke="url(#qg)" strokeWidth="2" fill="none" strokeLinecap="round"
            />
            <path
              d="M90 340 C 90 220, 160 140, 260 110"
              stroke="url(#qg)" strokeWidth="2" fill="none" strokeLinecap="round"
            />
            {/* Right big quote */}
            <path
              d="M280 340 C 280 200, 360 100, 480 60"
              stroke="url(#qg)" strokeWidth="2" fill="none" strokeLinecap="round"
            />
            <path
              d="M330 340 C 330 220, 400 140, 500 110"
              stroke="url(#qg)" strokeWidth="2" fill="none" strokeLinecap="round"
            />
          </svg>

          <blockquote className="relative max-w-[920px] text-[34px] font-medium leading-[1.3] text-[#0F1B2D]">
            During the early stages of an implementation, V-Suite helped the
            inspection team find and solve a corrosion problem in 2 days. A
            similar exercise required 2 weeks using a competitor’s product”
          </blockquote>
          <p className="relative mt-6 text-sm font-semibold tracking-wider text-[#3a4658]">
            NCRA/CHS
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
            Enable your operations center and field teams to optimize wellhead
            production and refinery performance, by delivering digital insights
            within The Industrial Metaverse.
          </p>
          <h3 className="mt-10 text-[20px] font-semibold">
            Example topics we may explore in a call:
          </h3>
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
          <h3 className="text-[24px] font-semibold text-[#2E8DC5]">
            Talk to an expert
          </h3>
          <form
            className="mt-6 grid grid-cols-1 gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
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
            src="https://visionaize.com/wp-content/uploads/2024/10/caa1b2e0de661dece3de9db3994b2f91.png"
            alt="Reinventing Turnarounds in the Metaverse whitepaper"
            className="w-full max-w-[460px] shadow-xl"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-[44px] font-semibold leading-tight">
            Reinventing Turnarounds in the Metaverse.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.8] text-[#3a4658]">
            Explore how a metaverse-enabled digital twin could help plant
            operators reduce cost and risk.
          </p>
          <p className="mt-4 text-[16px] leading-[1.8] text-[#3a4658]">
            <strong>Reinventing Turnarounds in the Metaverse</strong> is a joint
            collaboration between Visionaize and PwC.
          </p>
          <a
            href="https://visionaize.com/re-inventing-turnarounds-in-the-metaverse/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-full border border-[#0F1B2D] px-7 py-3 text-sm font-semibold text-[#0F1B2D] transition hover:bg-[#0F1B2D] hover:text-white"
          >
            Read the Whitepaper
          </a>
        </div>
      </div>
    </section>
  );
}

function LetsConnect() {
  return (
    <section className="relative overflow-hidden bg-[#0F1B2D] py-24">
      {/* Decorative arc */}
      <svg
        className="pointer-events-none absolute right-0 top-0 h-full w-2/3 opacity-50"
        viewBox="0 0 800 400"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M-100 400 C 200 100, 600 100, 900 400"
          stroke="url(#cg)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M-100 380 C 250 120, 650 120, 900 380"
          stroke="url(#cg)"
          strokeWidth="1.5"
          fill="none"
        />
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
