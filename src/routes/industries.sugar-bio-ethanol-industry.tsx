import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-field";
// Adjust this import path to wherever your api.ts actually lives.
import { api, type CompanyLeadFormSubmission } from "@/lib/api";

export const Route = createFileRoute("/industries/sugar-bio-ethanol-industry")({
  head: () => ({
    meta: [
      { title: "Sugar & Bioethanol Production — Visionaize" },
      {
        name: "description",
        content:
          "Redefining the optimization & efficiencies in the manufacturing process of Sugar Mill and Bioethanol Plant.",
      },
    ],
  }),
  component: RouteComponent,
});
const AI_STEPS_IN = [
  {
    lead: "Stabilize critical processes",
    rest: "by predicting variations in cane preparation, milling, extraction, evaporation, and crystallization before they impact output.",
  },
  {
    lead: "Optimize energy-intensive areas",
    rest: "like boilers, turbo-generators, and steam networks with real-time load balancing and fuel efficiency insights.",
  },
  {
    lead: "Maximize sugar recovery",
    rest: "through continuous setpoint adjustments maintaining ideal purity, brix, temperature, and flow.",
  },
  {
    lead: "Accelerate production cycles",
    rest: "by optimizing fermentation duration, enabling more batches per month with consistent quality.",
  },
  {
    lead: "Ensure yield consistency",
    rest: "with AI-driven prediction of variability in cycle time, ethanol purity, and final output.",
  },
  {
    lead: "Improve operational planning",
    rest: "with accurate scheduling for distillation and downstream units.",
  },
  {
    lead: "Lower production costs",
    rest: "through enzyme and yeast dosing optimization and higher throughput.",
  },
  {
    lead: "Reduce downtime",
    rest: "using predictive maintenance for mills, boilers, and critical rotating equipment.",
  },
  {
    lead: "Enable centralized, remote monitoring",
    rest: "for anomaly detection, advisory systems, and real-time optimization.",
  },
  {
    lead: "Digitize process intelligence",
    rest: "with automated tracking of key parameters — pH, gravity, temperature, sugar levels, fermentation time, purity, and cost — eliminating manual logbooks and scattered data sources.",
  },
];

const KEY_BENEFITS = [
  {
    icon: "/Sugar & Bioethanol Production/Mask-group-45.svg",
    title: "Maximize Sugar Recovery",
    body: "Improve sucrose extraction efficiency with real-time process intelligence that minimizes losses across milling, clarification, and crystallization.",
  },
  {
    icon: "/Sugar & Bioethanol Production/Mask-group-46.svg",
    title: "Higher Cane throughput, Improved Yields",
    body: "Focusing on KPIs, minimizing Pol Percent in Bagasse, Moisture percent in Bagasse and maximizing Mixed Juice Brix.",
  },
  {
    icon: "/Sugar & Bioethanol Production/Mask-group-47.svg",
    title: "Stabilize Fermentation & Boost Ethanol Yield",
    body: "Predict inhibitors, control critical parameters, and prevent batch variability with AI models tuned for continuous, high-yield ethanol production.",
  },
  {
    icon: "/Sugar & Bioethanol Production/Mask-group-48.svg",
    title: "Lower Energy Use Across the Plant",
    body: "Optimize steam, power, and heat balance dynamically to reduce fuel costs and improve turbine, boiler, and evaporator performance.",
  },
];

const LOSS_CARDS = [
  {
    emoji: "🌾",
    title: "Raw Material",
    loss: "Starch inconsistency & moisture",
    impact: "Lower fermentable solids",
    intelligence: "Smart storage insights & spoilage detection",
  },
  {
    emoji: "🏭",
    title: "Liquefaction",
    loss: "Poor gelatinization",
    impact: "Unused starch → efficiency loss",
    intelligence: "Real-time liquefaction monitoring",
  },
  {
    emoji: "🧫",
    title: "Fermentation",
    loss: "Contamination or stuck batches",
    impact: "Sugars diverted to acids & glycerol",
    intelligence: "Predictive contamination control",
  },
  {
    emoji: "🍬",
    title: "Saccharification",
    loss: "Incomplete starch conversion",
    impact: "Reduced ethanol yield",
    intelligence: "AI-optimized saccharification",
  },
  {
    emoji: "⚗️",
    title: "Distillation",
    loss: "High steam load",
    impact: "Higher cost & downtime",
    intelligence: "Steam balancing & purity optimizer",
  },
  {
    emoji: "🧺",
    title: "DDGS",
    loss: "Over-drying & inconsistency",
    impact: "Reduced co-product value",
    intelligence: "Drying automation & quality monitoring",
  },
];

const CASE_STUDIES = [
  {
    title: "AI-Based Fermentation Optimization for Ethanol Plants",
    image: "/Sugar & Bioethanol Production/61645814622.png",
    tabs: {
      Challenge:
        "Fermentation relies heavily on manual dosing, offline lab measurements, and long 50-60 hour batch cycles. Lack of real-time visibility into pH, gravity, and sugar levels leads to inconsistent yield, delayed corrective action, and difficulty planning distillation schedules. Variability in process conditions impacts ethanol purity and overall batch efficiency.",
      Solution:
        "Visionaize deployed real-time fermentation monitoring that streams pH, specific gravity, and sugar-level sensor data into a single dashboard, triggering automated alerts and dosing recommendations the moment a batch drifts outside its ideal range.",
      Results:
        "Batch-to-batch consistency improved, corrective actions moved from hours to minutes, and plants gained a reliable basis for planning distillation schedules — lifting both ethanol purity and overall fermentation efficiency.",
    },
  },
  {
    title: "AI-Driven Yield & Energy Optimization in Sugar Mills",
    image: "/Sugar & Bioethanol Production/dsc-5312-rz-03-1e-ret-1-1.jpg",
    tabs: {
      Challenge:
        "Sugar mills operate in highly variable conditions due to seasonal cane quality, geographic sourcing, and siloed process data. Operators struggle to consistently maximize extraction, reduce Pol and moisture in bagasse, manage steam usage, and maintain plant stability. These inefficiencies impact yield, energy cost, and overall mill profitability.",
      Solution:
        "Visionaize unified milling, boiler, and steam data into one digital twin model, using AI to recommend extraction and steam-balancing adjustments in real time as cane quality and load conditions shift through the season.",
      Results:
        "Mills achieved steadier extraction rates despite variable cane quality, cut avoidable steam losses, and improved plant stability — translating directly into higher yield and lower energy cost per tonne crushed.",
    },
  },
  {
    title: "Revenue Growth Through KPI & Process Optimization",
    image: "/Sugar & Bioethanol Production/sugar4.jpg",
    tabs: {
      Challenge:
        "Sugar mills struggle with fragmented data, manual KPI tracking and inconsistent process control across milling, juice clarification, crystallization and recovery units. Variability in key parameters leads to avoidable losses, off-spec production and missed revenue opportunities, with no real-time insight into where performance is slipping.",
      Solution:
        "Visionaize consolidated KPIs from every unit — milling, clarification, crystallization, and recovery — into one live scorecard, with AI flagging the specific parameters driving losses so teams could act before a shift closed out.",
      Results:
        "Off-spec production dropped, previously invisible revenue leaks became visible and actionable, and mills gained a repeatable, data-backed process for closing the gap between actual and achievable performance.",
    },
  },
];

// Bullet copy for the "Let's talk digital twins" lead-capture section.
// Written as JSX fragments (rather than lead/rest strings) because the bold
// span isn't always the leading phrase — sometimes it's mid-sentence.
const DIGITAL_TWIN_VALUE_PROPS: React.ReactNode[] = [
  <>
    <span className="font-bold text-slate-900">Real-time AI models</span> that
    continuously learn mill behavior and predict process deviations in advance.
  </>,
  <>
    <span className="font-bold text-slate-900">Smart setpoint recommendations</span>{" "}
    to stabilize operations and improve yield and recovery.
  </>,
  <>
    <span className="font-bold text-slate-900">Simultaneous optimization of key KPIs</span>{" "}
    including throughput, energy efficiency, and product quality.
  </>,
  <>
    <span className="font-bold text-slate-900">Advanced AI/ML models</span> to
    enhance fermentation performance with accurate predictions of batch
    completion, ethanol purity, production cost, and maintenance needs.
  </>,
  <>
    Operator-focused advisory dashboards with{" "}
    <span className="font-bold text-slate-900">
      real-time insights and remote monitoring capability
    </span>
    .
  </>,
  <>
    Clear <span className="font-bold text-slate-900">profitability</span>{" "}
    impact by reducing process losses, maximizing output, and optimizing
    resource and energy usage.
  </>,
];

const HEAR_ABOUT_US_OPTIONS = [
  "Search Engine (Google, Bing, etc.)",
  "LinkedIn",
  "Referral",
  "Industry Event / Conference",
  "Existing Customer",
  "Other",
];

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Header />
      <Hero />
      <KeyBenefits />
      <AchievableResults />
      <SealTheLosses />
      <CaseStudyCarousel />
      <ConnectBanner />
      <AIStepsIn />
      <TalkToExpert />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative w-full bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('/Sugar & Bioethanol Production/wmremove-transformed.webp')",
        backgroundPosition: "center",
      }}
    >
      {/* Faint overlay only behind the card area on mobile, where the card
          sits directly on top of the image full-width, so the text stays
          legible even over busy parts of the photo. */}
      <div className="relative mx-auto flex min-h-[240px] max-w-7xl items-center px-4 py-8 xs:min-h-[280px] sm:min-h-[320px] sm:px-6 sm:py-10 md:min-h-[380px] lg:min-h-[460px] lg:px-8 xl:min-h-[500px]">
        <div className="w-full max-w-md rounded-sm bg-white px-6 py-6 shadow-xl sm:max-w-lg sm:px-9 sm:py-7 md:max-w-xl md:px-10 md:py-8">
          <h1 className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-2xl font-bold leading-tight text-transparent sm:text-3xl md:text-4xl">
            Sugar &amp; Bioethanol Production
          </h1>

          <h2 className="mt-3 text-sm font-bold text-brand-navy sm:mt-4 sm:text-base md:text-lg">
            Unlocking Hidden Efficiency &amp; Sustainability
          </h2>

          <p className="mt-2 text-xs leading-relaxed text-brand-ink/80 sm:mt-3 sm:text-sm md:text-base">
            Redefining the optimization &amp; efficiencies in the manufacturing
            process of Sugar Mill and Bioethanol Plant.
          </p>
        </div>
      </div>
    </section>
  );
}

function KeyBenefits() {
  return (
    <section className="bg-[#0F2237] py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-y-0">
          {KEY_BENEFITS.map((b) => (
            <div key={b.title} className="flex flex-col items-center px-2 text-center">
              <img
                src={b.icon}
                alt=""
                aria-hidden="true"
                className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                loading="lazy"
              />
              <h3 className="mt-5 text-lg font-bold leading-snug text-white sm:mt-6 sm:text-xl">
                {b.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70 sm:text-base">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievableResults() {
  return (
    <section className="bg-white py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <img
          src="/Sugar & Bioethanol Production/image-165.svg"
          alt="Achievable Results: AI Digital Twin outcomes including 10-25% energy savings, 3-15% higher sugar and ethanol yield, 5-15% revenue growth, up to 30% less downtime, 12-18% recovery improvement, up to 35% cost downtime, 8-12% reduction in steam losses, better resource efficiency, virtual plants scenarios, and 10-20% ROI"
          className="h-auto w-full object-contain"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function SealTheLosses() {
  return (
    <section className="bg-[#0F2237] py-14 sm:py-16 md:py-20">
      {/* Animated gradient-border hover effect: a ::before layer sized to the
          card, masked so only the 1px "border" ring shows, with its gradient
          background sliding on a loop while the card is hovered. */}
      <style>{`
        @property --loss-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .loss-card {
          position: relative;
          isolation: isolate;
        }
        .loss-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: conic-gradient(
            from var(--loss-angle),
            transparent 0deg,
            #8CC63F 40deg,
            #1B75BC 90deg,
            #7FE0C4 140deg,
            transparent 200deg,
            transparent 360deg
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .loss-card:hover::before {
          opacity: 1;
          animation: lossBorderSpin 2.2s linear infinite;
        }
        @keyframes lossBorderSpin {
          to { --loss-angle: 360deg; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl">
          Seal the Losses. Unlock More Ethanol Every Single Day.
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {LOSS_CARDS.map(({ emoji, title, loss, impact, intelligence }) => (
            <div
              key={title}
              className="loss-card rounded-lg border border-white/10 bg-white/5 p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-brand-lime to-brand-blue text-base leading-none">
                  {emoji}
                </span>
                <h3 className="text-sm font-bold text-white sm:text-base">{title}</h3>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-white/70 sm:text-sm">
                <span className="font-semibold text-white/90">Operational Loss:</span> {loss}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">
                <span className="font-semibold text-white/90">Business Impact:</span> {impact}
              </p>
              <p className="mt-2 text-xs leading-relaxed sm:text-sm" style={{ color: "#7FE0C4" }}>
                <span className="font-semibold">Visionaize Intelligence:</span> {intelligence}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm font-medium text-white sm:mt-10 sm:text-base">
          A 2-3% yield improvement translates directly to multi-crore savings per year.
        </p>
      </div>
    </section>
  );
}

function CaseStudyCarousel() {
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState<"Challenge" | "Solution" | "Results">("Challenge");
  // direction drives which way the slide-in animation comes from:
  // 1 = next (slides in from the right), -1 = prev (slides in from the left)
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

  // Auto-advance on a timer; re-arms every time idx changes, whether that
  // change came from autoplay itself or a manual click.
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
    <section className="bg-white py-14 sm:py-16 md:py-20">
      <style>{`
        @keyframes sbeCsSlideInRight {
          from { transform: translateX(48px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes sbeCsSlideInLeft {
          from { transform: translateX(-48px); opacity: 0; }
          to   { transform: translateX(0);      opacity: 1; }
        }
        .sbe-cs-slide-right { animation: sbeCsSlideInRight 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
        .sbe-cs-slide-left  { animation: sbeCsSlideInLeft  0.45s cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Arrows sit just inside the safe area on mobile and step outward
              on larger screens so they never overlap the page's own edge
              padding or get clipped off-screen. */}
          <button
            onClick={prev}
            aria-label="Previous case study"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 text-brand-navy shadow-md ring-1 ring-brand-ink/10 hover:bg-brand-mist sm:-left-2 sm:p-2 md:-left-4"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next case study"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 text-brand-navy shadow-md ring-1 ring-brand-ink/10 hover:bg-brand-mist sm:-right-2 sm:p-2 md:-right-4"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* overflow-hidden clips the slide motion; scoped to just this
              inner wrapper so it doesn't clip the arrow buttons above */}
          <div className="overflow-hidden">
            {/* key={idx} forces React to remount this block on every case
                study change, which restarts the CSS animation each time */}
            <div
              key={idx}
              className={`grid items-stretch gap-8 px-8 sm:gap-10 sm:px-10 md:grid-cols-2 md:px-6 ${
                direction === 1 ? "sbe-cs-slide-right" : "sbe-cs-slide-left"
              }`}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-lime">
                  CASE STUDY
                </p>
                <h3 className="mt-3 text-xl font-bold text-brand-navy sm:text-2xl md:text-3xl">
                  {cs.title}
                </h3>

                <div className="mt-6 rounded-md border border-brand-ink/15 sm:mt-8">
                  <div className="flex flex-wrap gap-2 border-b border-brand-ink/15 p-3 sm:gap-3 sm:p-4">
                    {(["Challenge", "Solution", "Results"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                          tab === t
                            ? "border border-brand-blue text-brand-blue"
                            : "border border-transparent text-brand-ink/55 hover:text-brand-ink"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 text-base leading-7 text-brand-ink/85 sm:p-6 sm:leading-8">
                    {cs.tabs[tab]}
                  </div>
                </div>
              </div>

              <div className="min-h-[16rem] w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#E6F4FB] to-[#CDE7F3] shadow-lg">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="h-full w-full object-cover"
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

function ConnectBanner() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 bg-[#A6E04A] px-4 py-6 text-center sm:flex-row sm:gap-6 sm:py-8 md:py-9">
      <p className="text-base font-semibold text-brand-navy sm:text-lg md:text-xl">
        Connect with a Digital Twin specialist
      </p>

      <a
        href="/contact"
        className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-navy shadow-sm hover:bg-white/90 sm:px-7 sm:py-3.5 sm:text-base"
      >
        Connect with us
      </a>
    </section>
  );
}

function AIStepsIn() {
  return (
    <section className="bg-white py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        {/* Row 1: image left, "Where AI Steps In" copy right. */}
        <div className="grid grid-cols-1 gap-8 sm:gap-9 md:grid-cols-[32%_1fr] md:items-start md:gap-8 lg:grid-cols-[30%_1fr] lg:gap-12 xl:grid-cols-[28%_1fr] xl:gap-16">
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg sm:max-w-md md:mx-0 md:max-w-none">
            <img
              src="/Sugar & Bioethanol Production/c06430575da893e1ed5dfacb9ddebfb8.webp"
              alt="Sugar mill and bioethanol plant processing towers at dusk"
              className="h-72 w-full object-cover sm:h-96 md:h-full md:min-h-[420px] lg:min-h-[500px] xl:min-h-[580px]"
              loading="lazy"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
              Where Artificial Intelligence Steps In
            </h2>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700 sm:mt-4 sm:text-base">
              Smarter data. Smarter operations. Smarter sugar &amp; ethanol plants.
            </p>

            <ul className="mt-6 space-y-3 sm:mt-7 sm:space-y-4">
              {AI_STEPS_IN.map(({ lead, rest }) => (
                <li key={lead} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-sm bg-lime-500"
                  />
                  <span className="text-sm leading-relaxed text-slate-700 sm:text-base">
                    <span className="font-bold text-slate-900">{lead}</span> {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 2: "Ready to Transform?" copy left, image right. */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:mt-16 sm:gap-9 md:mt-20 md:grid-cols-2 md:items-center md:gap-10 lg:gap-14">
          <div>
            <h2 className="text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
              Ready to Transform?
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:mt-5 sm:text-base">
              If your sugar mill or bioethanol plant is under pressure to reach
              higher yield, lower energy usage, extend campaign length, or
              improve co-gen economics – let&rsquo;s talk.{" "}
              <a href="/contact" className="font-semibold text-blue-600 hover:underline">
                Connect with Visionaize
              </a>{" "}
              and explore how our AI-driven optimisation platform can be
              configured for your unique operation.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src="/Sugar & Bioethanol Production/sugar3-1024x687.jpg"
              alt="Aerial view of a sugar and bioethanol processing plant at sunset"
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// "Let's talk digital twins" lead-capture section
// ---------------------------------------------------------------------------

type LeadFormState = {
  first_name: string;
  last_name: string;
  company_name: string;
  business_email: string;
  phone_number: string;
  hear_about_us: string;
  message: string;
};

const EMPTY_LEAD_FORM: LeadFormState = {
  first_name: "",
  last_name: "",
  company_name: "",
  business_email: "",
  phone_number: "",
  hear_about_us: "",
  message: "",
};

type LeadFormErrors = Partial<Record<keyof LeadFormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Digits only (spaces/dashes stripped before checking); must be exactly 10.
const PHONE_DIGITS_RE = /^\d{10}$/;
// Letters, spaces, apostrophes, and hyphens — covers most real names
// (Anne-Marie, O'Brien, etc.) while rejecting digits/symbols.
const NAME_RE = /^[A-Za-z][A-Za-z'\-\s]{1,49}$/;
// Company names may reasonably include digits, &, ., commas, etc.
const COMPANY_RE = /^.{2,100}$/;

function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function validateLeadForm(values: LeadFormState): LeadFormErrors {
  const errors: LeadFormErrors = {};

  const firstName = values.first_name.trim();
  if (!firstName) {
    errors.first_name = "First name is required.";
  } else if (!NAME_RE.test(firstName)) {
    errors.first_name = "Use letters only (2-50 characters).";
  }

  const lastName = values.last_name.trim();
  if (!lastName) {
    errors.last_name = "Last name is required.";
  } else if (!NAME_RE.test(lastName)) {
    errors.last_name = "Use letters only (2-50 characters).";
  }

  const companyName = values.company_name.trim();
  if (!companyName) {
    errors.company_name = "Company name is required.";
  } else if (!COMPANY_RE.test(companyName)) {
    errors.company_name = "Enter a company name (2-100 characters).";
  }

  const email = values.business_email.trim();
  if (!email) {
    errors.business_email = "Business email is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.business_email = "Enter a valid email address.";
  }

  if (!values.phone_number.trim()) {
    errors.phone_number = "Phone number is required.";
  } else if (!PHONE_DIGITS_RE.test(onlyDigits(values.phone_number))) {
    errors.phone_number = "Enter a valid 10-digit phone number.";
  }

  // hear_about_us and message are optional — no validation.

  return errors;
}

function TalkToExpert() {
  const [form, setForm] = useState<LeadFormState>(EMPTY_LEAD_FORM);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function updateField<K extends keyof LeadFormState>(field: K) {
    return (
      ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const value = ev.target.value;
      setForm((f) => ({ ...f, [field]: value }));
      // Clear that field's error as soon as the person starts fixing it.
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };
  }

  // Phone gets its own handler: strip anything non-numeric as the person
  // types and cap at 10 digits, so it's impossible to type an invalid value.
  function handlePhoneChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = onlyDigits(ev.target.value).slice(0, 10);
    setForm((f) => ({ ...f, phone_number: digitsOnly }));
    setErrors((prev) => {
      if (!prev.phone_number) return prev;
      const next = { ...prev };
      delete next.phone_number;
      return next;
    });
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();

    const validationErrors = validateLeadForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setServerError(null);

    const payload: CompanyLeadFormSubmission = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      company_name: form.company_name.trim(),
      business_email: form.business_email.trim(),
      phone_number: onlyDigits(form.phone_number),
      hear_about_us: form.hear_about_us || undefined,
      message: form.message.trim() || undefined,
      source_page: "sugar-bio-ethanol-industry",
    };

    try {
      await api.submitCompanyLeadForm(payload);
      setStatus("success");
      setForm(EMPTY_LEAD_FORM);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your request. Please try again."
      );
    }
  }

  const inputBaseClass =
    "w-full rounded-md border-2 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue";

  function fieldClass(field: keyof LeadFormState) {
    return `${inputBaseClass} ${errors[field] ? "border-red-500" : "border-slate-900/85"}`;
  }

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left: value proposition — flat, light-gray backdrop the copy sits
            directly on (no card, matches the reference screenshot). */}
        <div className="bg-[#EEF0F2] px-6 py-14 sm:px-10 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mx-auto max-w-xl">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Let&rsquo;s talk digital twins
            </h2>
            <p className="mt-2 text-base text-slate-700 sm:text-lg">
              Unique Visionaize Value-Proposition
            </p>

            <ul className="mt-8 space-y-5">
              {DIGITAL_TWIN_VALUE_PROPS.map((content, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gradient-to-br from-brand-lime to-brand-blue"
                  >
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700 sm:text-base">
                    {content}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: form column shares the same light-gray backdrop as the
            left column; the form itself sits inside a white card that
            overlays that gray. */}
        <div className="bg-[#EEF0F2] px-6 py-14 sm:px-10 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-lg sm:p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Talk to an expert
            </h2>

            <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <input
                  type="text"
                  value={form.first_name}
                  onChange={updateField("first_name")}
                  placeholder="First name*"
                  aria-required="true"
                  aria-invalid={!!errors.first_name}
                  aria-describedby={errors.first_name ? "first_name-error" : undefined}
                  className={fieldClass("first_name")}
                />
                {errors.first_name && (
                  <p id="first_name-error" className="mt-1 text-xs font-medium text-red-600">
                    {errors.first_name}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={updateField("last_name")}
                  placeholder="Last name*"
                  aria-required="true"
                  aria-invalid={!!errors.last_name}
                  aria-describedby={errors.last_name ? "last_name-error" : undefined}
                  className={fieldClass("last_name")}
                />
                {errors.last_name && (
                  <p id="last_name-error" className="mt-1 text-xs font-medium text-red-600">
                    {errors.last_name}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={form.company_name}
                  onChange={updateField("company_name")}
                  placeholder="Company name*"
                  aria-required="true"
                  aria-invalid={!!errors.company_name}
                  aria-describedby={errors.company_name ? "company_name-error" : undefined}
                  className={fieldClass("company_name")}
                />
                {errors.company_name && (
                  <p id="company_name-error" className="mt-1 text-xs font-medium text-red-600">
                    {errors.company_name}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  value={form.business_email}
                  onChange={updateField("business_email")}
                  placeholder="Business Email*"
                  aria-required="true"
                  aria-invalid={!!errors.business_email}
                  aria-describedby={errors.business_email ? "business_email-error" : undefined}
                  className={fieldClass("business_email")}
                />
                {errors.business_email && (
                  <p id="business_email-error" className="mt-1 text-xs font-medium text-red-600">
                    {errors.business_email}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={form.phone_number}
                  onChange={handlePhoneChange}
                  placeholder="Phone number* (10 digits)"
                  maxLength={10}
                  aria-required="true"
                  aria-invalid={!!errors.phone_number}
                  aria-describedby={errors.phone_number ? "phone_number-error" : undefined}
                  className={fieldClass("phone_number")}
                />
                {errors.phone_number && (
                  <p id="phone_number-error" className="mt-1 text-xs font-medium text-red-600">
                    {errors.phone_number}
                  </p>
                )}
              </div>

              <div>
                <select
                  value={form.hear_about_us}
                  onChange={updateField("hear_about_us")}
                  className={`${fieldClass("hear_about_us")} text-slate-700`}
                >
                  <option value="">How did you first hear about us?</option>
                  {HEAR_ABOUT_US_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <textarea
                  value={form.message}
                  onChange={updateField("message")}
                  placeholder="Message"
                  rows={3}
                  className={`${inputBaseClass} border-slate-900/85 resize-none`}
                />
              </div>

              {status === "error" && serverError && (
                <p className="text-sm font-medium text-red-600">{serverError}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="w-full rounded-full bg-gradient-to-r from-brand-lime to-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
              >
                {status === "submitting" ? "Sending…" : "Send request"}
              </button>

              {status === "success" ? (
                <p className="text-center text-sm font-semibold text-emerald-700">
                  Thanks — your request is in. We&rsquo;ll be in touch soon.
                </p>
              ) : (
                <p className="text-center text-xs text-slate-500 sm:text-sm">
                  We generally respond within 24 hours
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}