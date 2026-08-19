import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-field";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
export const Route = createFileRoute("/industries/renewables-energy")({
  head: () => ({
    meta: [
      { title: "Renewable Energy — AI & Digital Twins | Visionaize" },
      {
        name: "description",
        content:
          "Empower solar, wind, hydro, biomass, and green hydrogen facilities with AI-driven Digital Twin solutions for optimized performance, sustainability, and operational excellence.",
      },
      {
        property: "og:title",
        content: "Accelerating Renewable Energy Operations with AI & Digital Twins",
      },
      {
        property: "og:description",
        content:
          "Smarter Renewable Assets. Higher Efficiency. Predictive Intelligence.",
      },
    ],
  }),
  component: RenewableEnergyPage,
});

const KEY_BENEFITS = [
  {
    icon: "/renewables-energy/Mask-group-8.svg",
    title: "Predictive Asset Reliability",
    body: "Prevent failures before they impact renewable energy generation and operational continuity.",
  },
  {
    icon: "/renewables-energy/Mask-group-9.svg",
    title: "Real-Time Operational Visibility",
    body: "Monitor distributed renewable assets through centralized intelligent dashboards.",
  },
  {
    icon: "/renewables-energy/Mask-group-10.svg",
    title: "Improved Energy Efficiency",
    body: "Optimize plant performance and reduce energy losses using AI-driven analytics.",
  },
  {
    icon: "/renewables-energy/Mask-group-11.svg",
    title: "Reduced Downtime",
    body: "Identify anomalies early and minimize costly unplanned shutdowns.",
  },
  {
    icon: "/renewables-energy/Mask-group-12.svg",
    title: "Sustainability Optimization",
    body: "Track emissions, resource utilization, and ESG performance with intelligent insights.",
  },
  {
    icon: "/renewables-energy/Mask-group-13.svg",
    title: "Remote Asset Monitoring",
    body: "Enable centralized monitoring for geographically distributed renewable facilities.",
  },
];
const KEY_AI_APPLICATIONS = [
  "Predictive maintenance for turbines, solar inverters, and critical equipment",
  "AI-driven energy forecasting and generation optimization",
  "Real-time anomaly detection for asset health monitoring",
  "Intelligent load balancing and grid stability enhancement",
  "Digital Twins for operational simulation and performance optimization",
  "Automated alerts and root-cause analysis for faster decision-making",
  "Energy consumption optimization and sustainability tracking",
  "Remote monitoring for geographically distributed renewable assets",
];
const VALUE_PROPS = [
  {
    icon: "/renewables-energy/image-15.svg",
    title: "Unified Operational Visibility",
    body: "Connect and visualize all renewable assets within a single intelligent platform.",
  },
  {
    icon: "/renewables-energy/109827-1.svg",
    title: "AI-Powered Predictive Maintenance",
    body: "Predict failures, optimize maintenance, and extend asset lifespan.",
  },
  {
    icon: "/renewables-energy/3488812-1.svg",
    title: "Digital Twins for Performance Excellence",
    body: "Simulate, analyze, and optimize operations in real time for improved efficiency and reliability.",
  },
  {
    icon: "/renewables-energy/900784-1.svg",
    title: "Data-Driven Decision Intelligence",
    body: "Turn complex data into actionable insights for faster, smarter, and more informed operational decisions.",
  },
  {
    icon: "/renewables-energy/2391086-1.svg",
    title: "Sustainability Leadership",
    body: "Improve efficiency, reduce emissions, and achieve ESG goals confidently.",
  },
];
const CASE_STUDIES = [
  {
    title: "Renewable Energy Site Selection & Optimization",
    image: "/renewables-energy/image-case-stud-y3.jpg",
    tabs: {
      Challenge:
        "Renewable project developers often face difficulties in selecting optimal sites due to multiple influencing factors such as terrain conditions, environmental restrictions, infrastructure availability, and feasibility analysis requirements.",
      Solution:
        "Visionaize implemented a Digital Twin-enabled site selection and optimization solution leveraging AI/ML, GIS mapping, satellite data, and digital modeling for feasibility assessment and planning.",
      Results: [
        "Accelerated project planning timelines",
        "Improved site selection accuracy",
        "Reduced project risks and uncertainties",
        "Enhanced cost and feasibility analysis",
        "Increased efficiency in renewable project development",
      ],
    },
  },
  {
    title: "AI-Powered Intelligent Demand & Generation Forecasting",
    image: "/renewables-energy/image-1-2 1.png",
    tabs: {
      Challenge:
        "Power utilities struggle with accurately forecasting electricity demand and renewable energy generation due to changing weather conditions, fluctuating consumption patterns, and increasing grid complexity. Traditional forecasting methods often result in inaccurate predictions and inefficient resource planning.",
      Solution:
        "Visionaize implemented an AI-powered Intelligent Demand Forecasting solution using Artificial Neural Network (ANN) models integrated with historical and real-time operational data. The platform delivers short-term, medium-term, and long-term forecasting while continuously adapting to changing patterns.",
      Results: [
        "Achieved 96–97% forecasting accuracy",
        "Improved demand prediction and planning efficiency",
        "Reduced forecasting uncertainty",
        "Enhanced load balancing and resource optimization",
      ],
    },
  },
  {
    title: "Wind Turbine Predictive Maintenance",
    image: "/renewables-energy/image-3 1.png",
    tabs: {
      Challenge:
        "Unexpected wind turbine failures were causing unplanned downtime, increased maintenance costs, and disruptions in power generation schedules. Reactive maintenance practices made it difficult to identify early equipment issues, impacting turbine reliability, operational efficiency, and energy output across wind farm operations.",
      Solution:
        "An AI-powered predictive maintenance solution with real-time condition monitoring and anomaly detection was implemented to identify early signs of turbine failures. Machine learning models enabled proactive maintenance planning, optimized repair schedules, and improved asset reliability and operational efficiency.",
      Results: [
        "Reduced turbine failures by 32%",
        "Improved maintenance efficiency",
        "Minimized unplanned downtime",
        "Enhanced turbine reliability",
      ],
    },
  },
];

const BENEFITS_LIST = [
  "Reduce field visits with remote monitoring & maintenance",
  "Improve renewable asset performance and operational efficiency",
  "Enhance reliability, safety, and real-time decision-making",
  "Drive sustainability through optimized energy operations and reduced emissions",
];

const HOW_FOUND_OPTIONS = [
  "Search Engine (Google, Bing, etc.)",
  "LinkedIn",
  "Referral",
  "Conference / Event",
  "Industry Publication",
  "Other",
];

function RenewableEnergyPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Header />
      <Hero />
      <PoweringProgress />
      <KeyBenefits />
      <AIApplications />
      <ValueProposition />
      <CaseStudyCarousel />
      <TalkToExpert />
      <WhitepaperCTA />
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
          "url('/renewables-energy/hero banner.png')",
        backgroundPosition: "center 30%",
      }}
    >
      {/* Dark gradient overlay for text legibility — heavier on the left where
          the copy sits, tapering off toward the right where the imagery matters.
          On mobile the overlay covers more of the image since text and image
          share the same vertical space rather than sitting side by side. */}
      <div
        aria-hidden
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,20,36,0.78) 0%, rgba(6,20,36,0.6) 55%, rgba(6,20,36,0.42) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,20,36,0.72) 0%, rgba(6,20,36,0.45) 45%, rgba(6,20,36,0.15) 75%, rgba(6,20,36,0) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[320px] max-w-7xl flex-col justify-center px-4 py-10 xs:min-h-[380px] sm:min-h-[420px] sm:px-6 sm:py-14 md:min-h-[460px] lg:min-h-[520px] lg:px-8 xl:min-h-[560px] xl:px-10 2xl:min-h-[600px]">
        <div className="max-w-xl sm:max-w-2xl md:max-w-3xl">
          <h1 className="text-xl font-extrabold leading-[1.25] text-white xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3.5rem]">
            Accelerating Renewable Energy Operations with AI &amp; Digital Twins
          </h1>

          <p className="mt-3 text-sm font-bold leading-snug text-white xs:mt-4 sm:mt-6 sm:text-lg md:text-xl">
            Smarter Renewable Assets. Higher Efficiency. Predictive Intelligence.
          </p>

          <p className="mt-3 max-w-md text-xs leading-relaxed text-white/90 sm:mt-5 sm:max-w-2xl sm:text-base md:text-lg">
            Empower solar, wind, hydro, biomass, and green hydrogen facilities
            with AI-driven Digital Twin solutions for optimized performance,
            sustainability, and operational excellence.
          </p>

          <Link
            to="/renewable-energy-whitepaper"
            className="mt-6 inline-flex w-auto items-center justify-center whitespace-nowrap rounded-full px-5 py-3 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] sm:mt-9 sm:px-8 sm:py-4 sm:text-base"
            style={{
              background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
            }}
          >
            Download the Whitepaper
          </Link>
        </div>
      </div>
    </section>
  );
}
function PoweringProgress() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 sm:gap-8 sm:px-6 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Image */}
        <div className="overflow-hidden rounded-lg shadow-lg sm:rounded-2xl">
          <img
            src="/renewables-energy/Gemini_Generated_Image_scs3s1scs3s1scs3-1-1024x576.png"
            alt="Renewable energy site with wind turbines, solar array, and battery storage units"
            className="h-48 w-full object-cover xs:h-60 sm:h-72 md:h-[420px] lg:h-[480px] xl:h-[520px]"
            loading="lazy"
          />
        </div>

        {/* Copy */}
        <div>
          <h2 className="text-lg font-semibold leading-tight text-brand-navy xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Powering Progress. Sustainably
          </h2>

          <div className="mt-3 space-y-2.5 sm:mt-6 sm:space-y-5">
            <p className="text-sm leading-relaxed text-brand-ink/80 sm:text-base md:text-lg">
              As the global energy landscape shifts toward cleaner and smarter
              power generation, renewable energy operators are under
              increasing pressure to improve efficiency, reliability, and
              sustainability.
            </p>
            <p className="text-sm leading-relaxed text-brand-ink/80 sm:text-base md:text-lg">
              Visionaize enables renewable enterprises to optimize solar,
              wind, hydro, and hybrid energy assets through AI-powered
              monitoring, predictive analytics, digital twins, and real-time
              operational intelligence.
            </p>
            <p className="hidden text-sm leading-relaxed text-brand-ink/80 sm:block sm:text-base md:text-lg">
              By transforming complex asset data into actionable insights, we
              help organizations maximize energy output, reduce downtime, and
              accelerate their journey toward a more sustainable future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function KeyBenefits() {
  return (
    <section className="bg-[#0F2237] py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-6">
        <h2 className="text-center text-xl font-semibold text-white xs:text-2xl md:text-4xl">
          Key Benefits
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 xs:grid-cols-2 sm:mt-9 sm:gap-x-8 sm:gap-y-9 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
          {KEY_BENEFITS.map((b) => (
            <div key={b.title} className="flex flex-col items-center px-2 text-center">
              <img
                src={b.icon}
                alt=""
                aria-hidden="true"
                className="h-11 w-11 object-contain sm:h-12 sm:w-12 md:h-14 md:w-14"
                loading="lazy"
              />
              <h3 className="mt-3 text-sm font-bold leading-snug text-white sm:mt-3.5 sm:text-base">
                {b.title}
              </h3>
              <p
                className="mt-1.5 max-w-[220px] text-2xs leading-relaxed sm:mt-2 sm:max-w-xs"
                style={{ color: "#7FE0C4" }}
              >
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function AIApplications() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-12 lg:px-8">
        {/* Left: copy */}
        <div>
          <h2 className="text-xl font-semibold leading-tight text-brand-navy xs:text-2xl sm:text-3xl md:text-4xl">
            Accelerating the Future of Renewable Energy with AI
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-brand-ink/80 sm:mt-5 sm:text-base">
            Artificial Intelligence is becoming the backbone of next-generation
            renewable energy operations. As renewable assets grow more
            distributed and complex, AI helps organizations maximize
            efficiency, reliability, and sustainability.
          </p>

          <h3 className="mt-6 text-base font-bold text-brand-navy sm:mt-7 sm:text-lg">
            Key AI Applications in Renewable Energy:
          </h3>

          <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3.5">
            {KEY_AI_APPLICATIONS.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
                  style={{ background: "#2E8DC5" }}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3 w-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-brand-ink/80 sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: image + industry impact card */}
        <div>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src="/renewables-energy/1732179207314-1-1024x576.png"
              alt="AI-powered renewable energy digital twin visualization with wind turbines"
              className="h-52 w-full object-cover xs:h-56 sm:h-64 md:h-56 lg:h-64 xl:h-72"
              loading="lazy"
            />
          </div>

          <div className="mt-5 rounded-xl border border-brand-ink/10 bg-white p-5 shadow-md sm:mt-6 sm:p-6">
            <div className="flex items-center gap-3">
              <img
                src="/renewables-energy/Group-1410138685.svg"
                alt=""
                aria-hidden="true"
                className="h-8 w-8 flex-none object-contain sm:h-9 sm:w-9"
                loading="lazy"
              />
              <h4 className="text-base font-bold text-brand-navy sm:text-lg">
                Industry Impact
              </h4>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brand-ink/75 sm:text-base">
              AI-powered renewable facilities can significantly improve
              operational efficiency, reduce maintenance costs, enhance
              energy reliability, and support global sustainability goals
              through data-driven decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function ValueProposition() {
  return (
    <section className="bg-[#0F2237] pb-12 pt-6 sm:pb-16 sm:pt-8 md:pb-20 md:pt-10">
      <div className="mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-white xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Visionaize Value Proposition For Renewable Energy
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-5 lg:gap-3">
          {VALUE_PROPS.map((v) => (
            <div
              key={v.title}
              className="flex flex-col items-center rounded-xl bg-white px-4 py-7 text-center shadow-lg sm:px-5 sm:py-8"
            >
              <img
                src={v.icon}
                alt=""
                aria-hidden="true"
                className="h-10 w-10 object-contain sm:h-11 sm:w-11"
                loading="lazy"
              />
              <h3 className="mt-3.5 text-sm font-bold leading-snug text-brand-navy sm:mt-4 sm:text-base">
                {v.title}
              </h3>
              <p className="mt-2.5 text-xs leading-relaxed text-brand-ink/70 sm:mt-3 sm:text-sm">
                {v.body}
              </p>
            </div>
          ))}
        </div>
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

  // Auto-advance right-to-left on a timer; re-arms every time idx changes,
  // whether that change came from autoplay itself or a manual click.
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
    <section className="bg-white py-12 sm:py-20">
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
        <h2 className="text-center text-xl font-semibold text-brand-navy xs:text-2xl sm:text-3xl md:text-4xl">
          Case Studies
        </h2>

        <div className="relative mt-8 sm:mt-14">
          {/* Arrows sit just inside the safe area on the smallest phones and
              step progressively further outward as the viewport grows, so
              they never overlap the surrounding text/padding at any size. */}
          <button
            onClick={prev}
            aria-label="Previous case study"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1 text-brand-navy shadow-md ring-1 ring-brand-ink/10 hover:bg-secondary xs:p-1.5 sm:-left-2 sm:p-2 md:-left-4"
          >
            <ChevronLeft className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next case study"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1 text-brand-navy shadow-md ring-1 ring-brand-ink/10 hover:bg-secondary xs:p-1.5 sm:-right-2 sm:p-2 md:-right-4"
          >
            <ChevronRight className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
          </button>

          {/* overflow-hidden clips the slide motion; it's scoped to just this
              inner wrapper so it doesn't clip the arrow buttons positioned
              outside the grid above */}
          <div className="overflow-hidden">
            {/* key={idx} forces React to remount this block on every case-study
                change, which restarts the CSS animation each time */}
            <div
              key={idx}
              className={`grid items-start gap-6 px-6 xs:px-8 sm:gap-10 sm:px-10 lg:grid-cols-2 lg:px-6 ${
                direction === 1 ? "cs-slide-right" : "cs-slide-left"
              }`}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-lime">
                  CASE STUDY
                </p>
                <h3 className="mt-3 text-lg font-bold text-brand-navy xs:text-xl sm:text-2xl md:text-3xl">
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

                <div className="mt-6 rounded-md border border-brand-ink/10 bg-white p-4 sm:p-6">
                  {Array.isArray(cs.tabs[tab]) ? (
                    <ul className="space-y-3 sm:space-y-4">
                      {(cs.tabs[tab] as string[]).map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full"
                            style={{
                              background:
                                "linear-gradient(135deg, #7ED957 0%, #2E8DC5 100%)",
                            }}
                          >
                            <svg
                              viewBox="0 0 16 16"
                              className="h-3.5 w-3.5 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 8.5l3 3 7-7" />
                            </svg>
                          </span>
                          <span className="text-sm leading-relaxed text-brand-ink/85 sm:text-base">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-6 text-brand-ink/85 sm:text-base sm:leading-8">
                      {cs.tabs[tab]}
                    </p>
                  )}
                </div>
              </div>

              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-[#E6F4FB] to-[#CDE7F3] shadow-lg">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="h-full w-full object-cover"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "/homepage/image_27-removebg-preview.png")
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

function TalkToExpert() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    howFound: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      await api.submitCompanyLeadForm({
        first_name: form.firstName,
        last_name: form.lastName,
        company_name: form.company,
        business_email: form.email,
        phone_number: form.phone,
        hear_about_us: form.howFound || undefined,
        message: form.message || undefined,
        source_page: "/industries/renewables-energy",
      });
      setStatus("sent");
      setForm({
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        howFound: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      // apiFetch throws `Error(\`API ${status}: ${text}\`)`, where `text` is the
      // raw JSON body as a string — parse it to pull out the real message.
      let friendlyMessage = "Something went wrong. Please try again.";
      try {
        const raw = (err as Error).message.split(": ").slice(1).join(": ");
        const parsed = JSON.parse(raw);
        if (parsed?.message) friendlyMessage = parsed.message;
      } catch {
        /* fall back to generic message */
      }
      setErrorMessage(friendlyMessage);
    }
  };

  return (
    <section className="bg-[#0F2237]">
      {/* Top lime banner — full viewport width regardless of any parent max-width */}
      <div className="flex w-full flex-col items-center justify-center gap-4 bg-[#A6E04A] px-4 py-6 text-center sm:flex-row sm:gap-6 sm:py-8 md:py-9">
        <p className="text-sm font-semibold text-brand-navy xs:text-base sm:text-lg md:text-xl">
          Connect with a Digital Twin specialist
        </p>

        <a
          href="#talk-to-expert-form"
          className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-navy shadow-sm hover:bg-white/90 sm:px-7 sm:py-3.5 sm:text-base"
        >
          Connect with us
        </a>
      </div>

      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 sm:px-6 sm:py-16 md:gap-12 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* Left copy */}
        <div>
          <h2 className="text-xl font-semibold leading-tight text-white xs:text-2xl sm:text-3xl md:text-4xl">
            Let&rsquo;s talk digital twins
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base">
            Visionaize V-Suite platform creates an intelligent 3D digital twin
            of renewable energy assets, enabling immersive visualization and
            smarter operations across solar, wind, hydro, and energy storage
            systems.
          </p>

          <h3 className="mt-8 text-base font-bold text-white sm:mt-9 sm:text-xl">
            Learn how Visionaize can:
          </h3>

          <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
            {BENEFITS_LIST.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
                  style={{ background: "#2E8DC5" }}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3 w-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-white/85 sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right form card */}
        <div id="talk-to-expert-form" className="scroll-mt-24 rounded-xl bg-white p-5 shadow-xl xs:p-6 sm:p-8">
          <h3 className="text-lg font-bold text-brand-navy sm:text-xl">
            Talk to an expert
          </h3>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
            <input
              type="text"
              required
              placeholder="First name*"
              value={form.firstName}
              onChange={handleChange("firstName")}
              className="w-full rounded-md border border-brand-ink/15 px-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-blue focus:outline-none"
            />
            <input
              type="text"
              required
              placeholder="Last name*"
              value={form.lastName}
              onChange={handleChange("lastName")}
              className="w-full rounded-md border border-brand-ink/15 px-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-blue focus:outline-none"
            />
            <input
              type="text"
              required
              placeholder="Company name*"
              value={form.company}
              onChange={handleChange("company")}
              className="w-full rounded-md border border-brand-ink/15 px-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-blue focus:outline-none"
            />
            <input
              type="email"
              required
              placeholder="Business Email*"
              value={form.email}
              onChange={handleChange("email")}
              className="w-full rounded-md border border-brand-ink/15 px-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-blue focus:outline-none"
            />
            <input
              type="tel"
              required
              placeholder="Phone number* (10 digits)"
              value={form.phone}
              onChange={handleChange("phone")}
              maxLength={10}
              className="w-full rounded-md border border-brand-ink/15 px-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-blue focus:outline-none"
            />
            <select
              value={form.howFound}
              onChange={handleChange("howFound")}
              className="w-full rounded-md border border-brand-ink/15 px-4 py-2.5 text-sm text-brand-ink/70 focus:border-brand-blue focus:outline-none"
            >
              <option value="">How did you hear about us?</option>
              {HOW_FOUND_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Message"
              rows={3}
              value={form.message}
              onChange={handleChange("message")}
              className="w-full resize-none rounded-md border border-brand-ink/15 px-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-blue focus:outline-none"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="mx-auto block w-auto rounded-full px-8 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              {status === "sending" ? "Sending..." : "Send request"}
            </button>

            {status === "sent" && (
              <p className="text-center text-sm font-medium text-green-600">
                Thanks! We&rsquo;ve received your request.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm font-medium text-red-600">
                {errorMessage}
              </p>
            )}

            <p className="text-center text-xs text-brand-ink/50">
              We generally respond within 24 hours
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
function WhitepaperCTA() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:gap-12 lg:grid-cols-[minmax(0,400px)_1fr] lg:px-8">
        <div className="mx-auto w-full max-w-[260px] xs:max-w-[320px] sm:max-w-[380px] lg:max-w-none">
          <img
            src="/renewables-energy/Reinventing-Mockup-1024x1024-1-1.png"
            alt="Whitepaper: The Spatial Intelligence Revolution"
            className="h-auto w-full object-contain"
            loading="lazy"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold leading-snug text-brand-navy xs:text-2xl sm:text-3xl md:text-4xl">
            The Spatial Intelligence Revolution: 3D Digital Twins &amp; Agentic
            AI in the Renewable Energy Frontier
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-brand-ink/70 sm:mt-5 sm:text-base">
            The renewable energy sector is evolving with Agentic AI and
            Digital Twin technologies enabling smarter operations, improved
            efficiency, reduced downtime, and optimized asset performance
            through real-time intelligence from Visionaize.
          </p>

          <a
            href="/renewable-energy-whitepaper"
            className="mt-6 inline-flex w-auto items-center justify-center rounded-full border-2 border-brand-navy px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white sm:mt-7"
          >
            Read the Whitepaper
          </a>
        </div>
      </div>
    </section>
  );
}