import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSeedContentItem } from "@/lib/seed-content";

export const Route = createFileRoute("/industries/digital-twin-for-cement")({
  head: () => ({
    meta: [
      { title: "Digital Twin for Cement — Visionaize" },
      {
        name: "description",
        content:
          "Optimize kiln performance, reduce specific energy consumption and cut CO2 emissions with 3D Digital Twin technology for cement plants.",
      },
      { property: "og:title", content: "Digital Twin for Cement — Visionaize" },
      {
        property: "og:description",
        content:
          "Stabilize kiln operations, lift OEE and accelerate decarbonization across the cement value chain.",
      },
      {
        property: "og:image",
        content:
          "https://visionaize.com/wp-content/uploads/2023/11/iStock-1182152185.webp",
      },
    ],
  }),
  component: CementPage,
});

const seedItem = getSeedContentItem("page", "digital-twin-for-cement");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];
const heroParagraphs = heroSection?.paragraphs?.length ? heroSection.paragraphs : ["Stabilize the kiln, lift OEE and accelerate decarbonization with cutting-edge 3D Digital Twin technology for cement plants."];
const heroImage = seedSections.flatMap((section) => section.images ?? []).find((image) => !image.src.endsWith(".svg"))?.src ?? "https://visionaize.com/wp-content/uploads/2023/11/iStock-1182152185.webp";
const introSection = seedSections.find((section) => section.heading?.toLowerCase() === "run a stabler kiln, with fewer surprises");
const introParagraphs = introSection?.paragraphs?.length ? introSection.paragraphs : [
  "Combine AI, AR and VR with 3D data visualization to give CCR operators, reliability engineers and plant leadership a single real-time view of the pyro-process, mills and packing lines.",
  "Connect with a Digital Twin expert to learn how Visionaize is helping cement producers improve OEE, reduce energy intensity and hit decarbonization targets.",
];

const PILLARS = [
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Vector-6.svg",
    title: "Stabilize the Kiln",
    body: "Predict upsets early and keep the kiln line running at design throughput",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-3.svg",
    title: "Lift OEE",
    body: "Reduce unplanned downtime across crushers, mills, kilns and packing",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/07/Group.png",
    title: "Cut CO2 &amp; Energy",
    body: "Lower specific thermal and electrical energy and reduce scope 1 emissions",
  },
];

const CASE_STUDIES = [
  {
    eyebrow: "CASE STUDY",
    title: "Integrated Cement Plant: Stabilizing Kiln Operations with AI",
    tabs: {
      Challenge:
        "A large integrated cement producer was experiencing recurring kiln upsets — coating, ring formation and free-lime excursions — that forced de-rates and stoppages, hurting clinker quality and increasing specific energy consumption.",
      Solution:
        "Visionaize deployed a hybrid first-principles + AI model across the pyro-process, ingesting fuel, raw-meal, gas-analyzer and process data, and surfacing early warnings and prescriptive setpoints to the central control room.",
      Results:
        "Kiln stoppages dropped, clinker quality stabilized, and specific thermal energy consumption fell measurably within the first quarter of deployment.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1182152185.webp",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Vertical Roller Mill: Predictive Maintenance & Throughput",
    tabs: {
      Challenge:
        "Frequent unplanned shutdowns on a raw-meal vertical roller mill were driving overtime maintenance and clinker shortfalls. Maintenance was largely reactive, with limited visibility into bearing, gearbox and hydraulic health.",
      Solution:
        "Visionaize built a predictive maintenance digital twin combining vibration, lube oil and process data — flagging bearing and gearbox degradation weeks ahead of failure with prescriptive maintenance windows.",
      Results:
        "Unplanned downtime dropped sharply, throughput climbed back toward nameplate, and the plant moved most VRM maintenance into planned outages.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-502120934.webp",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Cement Major: Decarbonization Roadmap with Digital Twin",
    tabs: {
      Challenge:
        "A global cement major needed a credible, measurable path to its net-zero commitments — including alternative fuels, clinker factor reduction and energy-efficiency programs across dozens of plants.",
      Solution:
        "Visionaize delivered DecarbAI on top of the V-Suite digital twin, baselining scope 1, 2 and 3 emissions per plant and modeling alt-fuel substitution, clinker-factor and waste-heat-recovery scenarios with real-time tracking.",
      Results:
        "Plants ran higher alternative-fuel rates safely, the group consolidated reporting in one place, and the decarbonization roadmap became operationally tracked, not just a slideware target.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1202781474.webp",
  },
];

const FORM_TOPICS = [
  "Stabilize kiln operations and clinker quality",
  "Reduce unplanned downtime on mills and crushers",
  "Cut specific energy consumption and CO2 emissions",
  "Track decarbonization targets across every plant",
];

function CementPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F1B2D]">
      <Header />
      <Hero />
      <Pillars />
      <Intro />
      <CaseStudyCarousel />
      <PlantReimagined />
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
      <div className="absolute inset-0 bg-black/25" />
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
            Cement
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
            <h3 className="mt-6 text-[24px] font-semibold text-white" dangerouslySetInnerHTML={{ __html: p.title }} />
            <p className="mt-4 max-w-[280px] text-[15px] leading-relaxed text-white/80">{p.body}</p>
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
            Run a stabler kiln, with fewer surprises
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
            alt="Visionaize 3D Digital Twin for cement"
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

function PlantReimagined() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <h2 className="text-[44px] font-semibold leading-tight">
          Cement plants, reimagined
        </h2>
        <div className="mt-8 max-w-[920px] space-y-6 text-[16px] leading-[1.8] text-[#3a4658]">
          <p>
            From the quarry to the packing plant, the cement value chain runs
            on a handful of high-energy, high-temperature processes. Visionaize
            unifies them into a single 3D digital twin so plant managers,
            control room operators and reliability engineers work off the same
            real-time picture.
          </p>
          <p>
            Advanced AI, AR and VR combine with supercharged remote operations
            to stabilize the kiln, lift OEE across mills and crushers, and
            unlock alternative-fuel and clinker-factor savings safely.
          </p>
          <p>
            Connect with a Digital Twin expert to learn how Visionaize is
            helping cement producers hit reliability, cost and sustainability
            targets faster.
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
            V-Suite turns your cement plant into a connected digital metaverse.
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
        <path d="M-100 400 C 200 100, 600 100, 900 400" stroke="url(#cmg)" strokeWidth="1.5" fill="none" />
        <path d="M-100 380 C 250 120, 650 120, 900 380" stroke="url(#cmg)" strokeWidth="1.5" fill="none" />
        <defs>
          <linearGradient id="cmg" x1="0" y1="0" x2="800" y2="400">
            <stop offset="0%" stopColor="#A6E04A" />
            <stop offset="100%" stopColor="#2E8DC5" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative mx-auto max-w-[1280px] px-6">
        <h2 className="text-[64px] font-semibold leading-[1.05] text-white">Let's Connect</h2>
        <p className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-white/80">
          Learn how Visionaize can stabilize the kiln and accelerate cement decarbonization
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
