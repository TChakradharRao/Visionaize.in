import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSeedContentItem } from "@/lib/seed-content";
import { api } from "@/lib/api";

export const Route = createFileRoute("/industries/digital-twin-for-power-and-energy")({
  head: () => ({
    meta: [
      { title: "Digital Twin for Power & Energy — Visionaize" },
      {
        name: "description",
        content:
          "Improve plant availability, reduce emissions and accelerate the energy transition with 3D Digital Twin technology for Power & Energy.",
      },
      { property: "og:title", content: "Digital Twin for Power & Energy — Visionaize" },
      {
        property: "og:description",
        content:
          "Maximize uptime, optimize generation, and accelerate decarbonization across the power & energy value chain.",
      },
      {
        property: "og:image",
        content:
          "https://visionaize.com/wp-content/uploads/2022/07/iStock-1369468534-1024x683-1.jpg",
      },
    ],
  }),
  component: PowerEnergyPage,
});

const seedItem = getSeedContentItem("page", "digital-twin-for-power-and-energy");
const seedSections = seedItem?.content_json?.sections ?? [];

const FALLBACK_HERO_IMAGE =
  "https://visionaize.in/wp-content/uploads/2026/05/ChatGPT-Image-May-14-2026-02_53_14-PM-1.svg";

// Hero section — match by the actual banner heading, not array position
const heroSection = seedSections.find(
  (section) => section.heading?.toLowerCase() === "power & energy"
);

const heroParagraphs = heroSection?.paragraphs?.length
  ? heroSection.paragraphs
  : [
      "Transform how you manage generation, transmission, and distribution with real-time visibility, predictive intelligence, and immersive 3D insights.",
    ];

// Only use heroSection's own image — don't fall back to a random image
// scraped from an unrelated section elsewhere on the page.
const heroImage = heroSection?.images?.[0]?.src ?? FALLBACK_HERO_IMAGE;

const introSection = seedSections.find(
  (section) => section.heading?.toLowerCase() === "greater reliability and resiliency"
);

const introParagraphs = introSection?.paragraphs?.length
  ? introSection.paragraphs
  : [
      "Combine AI, AR and VR technologies with advanced 3D data visualization to give control room, reliability and engineering teams a single, real-time view of every plant in your fleet.",
      "Connect with a Digital Twin expert to learn how this technology applies to thermal, renewable, hydro and nuclear assets.",
    ];

const PILLARS = [
  {
    title: "Smart Planning",
    body: "Real-time insights for optimized plant decisions",
    icon: "https://visionaize.in/wp-content/uploads/2026/05/Mask-group.svg",
  },
  {
    title: "Efficient Operations",
    body: "Boost reliability, productivity, and energy efficiency",
    icon: "https://visionaize.in/wp-content/uploads/2022/05/Group-3.svg",
  },
  {
    title: "Failure Prevention",
    body: "AI-powered real-time alerts for early issue detection and faster response",
    icon: "https://visionaize.in/wp-content/uploads/2026/05/Mask-group-1.svg",
  },
];

const industryChallenges = [
  "Aging assets and rising maintenance costs",
  "Unplanned downtime and grid instability",
  "Data silos across SCADA, GIS, and enterprise systems",
  "Increasing demand and decarbonization targets",
  "Safety risks in hazardous environments",
];

const solutionPoints = [
  "Integrate in Real Time - SCADA, AMI, GIS & enterprise systems",
  "Immersive 3D visualization of complex infrastructure",
  "AI driven predictive maintenance",
  "Centralized operational intelligence",
];

const businessImpact = [
  {
    icon: "https://visionaize.in/wp-content/uploads/2026/05/Mask-group-7.svg",
    stat: "50–60%",
    label: "Reduction in Financial Losses",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2026/05/Mask-group-3.svg",
    stat: "₹80 Cr+",
    label: "Annual Savings",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2026/05/Mask-group-4.svg",
    stat: "6–9",
    label: "Month Payback Period",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2026/05/Mask-group-5.svg",
    stat: "10X",
    label: "Up to ROI",
  },
];

const keyCapabilities = [
  {
    icon: "https://visionaize.in/wp-content/uploads/2026/05/Group-1410138691-1.svg",
    title: "Predictive Maintenance",
    body: "Detect anomalies early using AI and real-time data to prevent costly breakdowns and extend asset life.",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2026/05/Group-1410138692.svg",
    title: "Remote Operations & Monitoring",
    body: "Reduce field visits with virtual inspections and centralized monitoring.",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2026/05/Group-1410138693.svg",
    title: "Grid Reliability & Performance Optimization",
    body: "Gain a complete view of grid performance and ensure uninterrupted power delivery.",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2026/05/Group-1410138694.svg",
    title: "Data Contextualization in 3D",
    body: "Convert fragmented data into actionable insights through intuitive visualization.",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2026/05/Group-1410138695.svg",
    title: "AI Powered Decision Support",
    body: "Empower teams with faster, smarter decision-making using advanced analytics.",
  },
];

const useCases = [
  {
    image:
      "https://visionaize.in/wp-content/uploads/2026/05/Torrefactie-fabriek-Perpetual_Next2-1536x1024-1-1.jpg",
    icon: "https://visionaize.in/wp-content/uploads/2026/05/image-142.svg",
    iconBg: "#2E8DC5",
    title: "Power Generation",
    points: [
      "Monitor turbines, boilers, and critical equipment in real time",
      "Improve plant efficiency and reduce downtime",
    ],
  },
  {
    image: "https://visionaize.in/wp-content/uploads/2026/05/energy-power.jpg",
    icon: "https://visionaize.in/wp-content/uploads/2026/05/image-143.svg",
    iconBg: "#0F6B5C",
    title: "Transmission & Distribution",
    points: [
      "Visualize grid networks and detect faults faster",
      "Optimize load management and prevent outages",
    ],
  },
  {
    image:
      "https://visionaize.in/wp-content/uploads/2026/05/Untitled-683-%C3%97-1024px-1024-%C3%97-683px-2023-07-12T154605.688.jpg",
    icon: "https://visionaize.in/wp-content/uploads/2026/05/image-144.svg",
    iconBg: "#8DC63F",
    title: "Renewables & Energy Transition",
    points: [
      "Manage solar, wind, and hybrid assets efficiently",
      "Simulate demand scenarios and improve resilience",
    ],
  },
  {
    image:
      "https://visionaize.in/wp-content/uploads/2026/05/360_F_1574567161_MigKoY8EY0jFpdNz4gNzISWGev3HhrFb.jpg",
    icon: "https://visionaize.in/wp-content/uploads/2026/05/image-145.svg",
    iconBg: "#7B4FE0",
    title: "Maintenance & Asset Management",
    points: [
      "Improve shutdown planning and reduce downtime",
      "Identify equipment issues early before they impact operations",
    ],
  },
  {
    image:
      "https://visionaize.in/wp-content/uploads/2026/05/futuristic-logistics-center-automated-precision_153608-19355.jpg",
    icon: "https://visionaize.in/wp-content/uploads/2026/05/1843544-1.svg",
    iconBg: "#E0851F",
    title: "Boiler Thermal Stress Prediction",
    points: [
      "Monitor fatigue and creep stress in real time",
      "Predict remaining life of critical components",
    ],
  },
];

const CASE_STUDIES = [
  {
    label: "CASE STUDY (01 of 03)",
    title: "AI-Based Condenser Back Pressure Optimization in Thermal Power Plant",
    image:
      "https://visionaize.in/wp-content/uploads/2026/05/image-1-1.png",
    tabs: {
      Challenge:
        "Power plants face high condenser back pressure due to fluctuating loads and seasonal variations, leading to poor heat rate, increased fuel consumption, and reduced efficiency. Even small deviations can cause significant financial losses.",
      Solution:
        "Visionaize deployed an AI-based digital twin that continuously models condenser performance against real-time load, ambient, and cooling water conditions, flagging deviations and recommending corrective actions before losses accumulate.",
      Results:
        "The plant achieved measurable heat-rate improvement, reduced fuel consumption, and faster detection of abnormal back-pressure trends across seasonal load swings.",
    },
  },
  {
    label: "CASE STUDY (02 of 03)",
    title: "AI-Based Boiler Combustion Optimization for Efficiency & Emission Control",
    image: "https://visionaize.in/wp-content/uploads/2026/05/image.png",
    tabs: {
      Challenge:
        "Traditional combustion systems fail to adapt to dynamic operating conditions, leading to inefficient fuel usage, high emissions (NOx, CO), and unstable steam temperatures.",
      Solution:
        "An AI-driven combustion optimization model was integrated with the plant's control system, continuously tuning air-fuel ratios and firing patterns in real time to stabilize steam temperature and reduce emissions.",
      Results:
        "The plant saw improved combustion efficiency, lower NOx and CO emissions, and more stable steam temperatures across varying loads.",
    },
  },
  {
    label: "CASE STUDY (03 of 03)",
    title: "AI-Based Thermal Stress & Asset Life Prediction for Boilers",
    image:
      "https://visionaize.in/wp-content/uploads/2026/05/Steam-Condenser-_-Shell-and-Tube-Condenser-for-Power-Plants-and____.png",
    tabs: {
      Challenge:
        "Frequent load cycling and flexible operations cause thermal fatigue and creep stress in boiler components, increasing the risk of failures and reducing asset life.",
      Solution:
        "Visionaize applied physics-informed AI models to continuously monitor fatigue and creep stress across critical boiler components, giving operators early warning of accumulating thermal damage.",
      Results:
        "The utility gained accurate remaining-life estimates for critical components, enabling proactive maintenance planning and avoiding unplanned failures.",
    },
  },
];

const learnPoints = [
  "Reduce time in field with remote maintenance",
  "Increase power plant yield by cutting down time",
  "Improve grid reliability and worker safety",
  "Drive sustainability by reducing your carbon footprint",
];


function PowerEnergyPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F1B2D]">
      <Header />
      <Hero />
      <Pillars />
      <ChallengeSolution />
      <BusinessImpact/>
      <KeyCapabilities/>
      <UseCases/>
      <ConnectBanner/>
      <CaseStudyCarousel/>
      <GridReimagined/>
      <TalkToExpert/>
      <Whitepaper/>
      <Footer />

    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative min-h-[500px] w-full bg-cover bg-center py-10 sm:min-h-[560px] sm:py-16 lg:h-[640px] lg:py-0"
      style={{
        backgroundImage: `url('${heroImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto flex h-full max-w-[1280px] items-center px-4 sm:px-6">
        <div className="w-full max-w-[570px] bg-white p-5 sm:p-10 lg:p-12">
          <h1
            className="text-[22px] font-light leading-[1.15] tracking-tight sm:text-[30px] lg:text-[32px] lg:leading-[1.05]"
            style={{
              background:
                "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Reimagine Power & Energy Operations with 3D Digital Twins
          </h1>
          {heroParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-sm leading-relaxed text-[#0F1B2D] sm:mt-6 sm:text-[18px]">
              {paragraph}
            </p>
          ))}
         <Link
  to="/power-industry-whitepaper"
  className="mt-5 inline-flex items-center rounded-full px-5 py-3 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:mt-8 sm:px-8 sm:py-4 sm:text-[15px]"
  style={{
    background: "linear-gradient(90deg, #8DC63F 0%, #2E8DC5 100%)",
  }}
>
  Download the Whitepaper
</Link>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="bg-[#0F1B2D] py-12 sm:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 sm:gap-12 sm:px-6 md:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="flex flex-col items-center text-center">
            <img src={p.icon} alt="" className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20" loading="lazy" />
            <h3 className="mt-5 text-lg font-semibold text-white sm:mt-6 sm:text-[24px]">{p.title}</h3>
            <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-[17px]">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, #8DC63F 0%, #2E8DC5 100%)",
        }}
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
          <path
            d="M2.5 6.5L4.5 8.5L9.5 3.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm leading-relaxed text-[#3a4658] sm:text-[16px]">{text}</span>
    </li>
  );
}

function ChallengeSolution() {
  return (
    <section className="bg-white py-14 sm:py-24">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[1fr_1.1fr_1fr]">
        {/* Industry Challenge */}
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#2E8DC5]">
            INDUSTRY CHALLENGE
          </p>
          <h2 className="mt-3 text-xl font-bold leading-tight text-[#0F1B2D] sm:text-[28px]">
            The Power &amp; Energy Industry is at a Turning Point
          </h2>
          <p className="mt-5 text-sm leading-[1.8] text-[#3a4658] sm:text-[16px]">
            Utilities today are under constant pressure to deliver reliable,
            sustainable, and cost efficient energy while managing increasingly
            complex infrastructure.
          </p>
          <p className="mt-6 text-base font-semibold text-[#0F1B2D]">
            Key challenges include:
          </p>
          <ul className="mt-4 space-y-3">
            {industryChallenges.map((item) => (
              <CheckItem key={item} text={item} />
            ))}
          </ul>
        </div>

        {/* Center diagram */}
        <div className="order-first flex justify-center lg:order-none">
          <img
            src="https://visionaize.in/wp-content/uploads/2026/05/Group-1410138697.svg"
            alt="Power and energy ecosystem: generation, transmission, distribution, substations, SCADA/GIS enterprise systems, renewables"
            className="w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[460px]"
            loading="lazy"
          />
        </div>

        {/* Solution */}
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#2E8DC5]">
            SOLUTION
          </p>
          <h2 className="mt-3 text-xl font-bold leading-tight text-[#0F1B2D] sm:text-[28px]">
            A Unified Digital Twin for Power &amp; Energy Assets
          </h2>
          <p className="mt-5 text-sm leading-[1.8] text-[#3a4658] sm:text-[16px]">
            Visionaize brings your entire power ecosystem into a single,
            intelligent 3D digital twin environment. From turbines and
            substations to transmission networks, visualize and interact with
            your assets in real time.
          </p>
          <p className="mt-6 text-base font-semibold text-[#0F1B2D]">
            What Makes It Powerful
          </p>
          <ul className="mt-4 space-y-3">
            {solutionPoints.map((item) => (
              <CheckItem key={item} text={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BusinessImpact() {
  return (
    <section className="bg-white pb-14 pt-0 sm:pb-20">
      <div className="mx-auto max-w-[1040px] px-4 sm:px-6">
        <h2 className="text-center text-2xl font-normal text-[#0F1B2D] sm:text-[36px] lg:text-[42px]">
          Business Impact
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {businessImpact.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-2xl border border-[#E5E9EF] p-6 text-center shadow-sm"
            >
              <img src={item.icon} alt="" className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16" loading="lazy" />
              <p className="mt-4 text-2xl font-bold text-[#2E8DC5] sm:text-[32px]">
                {item.stat}
              </p>
              <p className="mt-2 text-sm font-semibold text-[#1A2733] sm:text-[15px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function KeyCapabilities() {
  return (
    <section className="bg-[#8DC63F] pt-5">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-white sm:text-[34px] lg:text-[40px]">
          Key Capabilities
        </h2>
      </div>

      <div className="mt-8 bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {keyCapabilities.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col items-center border-b border-[#E5E9EF] px-6 py-10 text-center last:border-b-0 sm:px-8 sm:py-12 lg:border-b-0 ${
                index !== keyCapabilities.length - 1
                  ? "lg:border-r lg:border-[#E5E9EF]"
                  : ""
              }`}
            >
              <img src={item.icon} alt="" className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20" loading="lazy" />
              <h3 className="mt-5 text-base font-bold leading-snug text-[#0F1B2D] sm:text-[17px]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#3a4658] sm:text-[15px]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-10 sm:h-16" />
    </section>
  );
}

function UseCases() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <h2 className="text-center text-2xl font-normal text-[#0F1B2D] sm:text-[36px] lg:text-[42px]">
          Use Cases
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {useCases.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-xl border border-[#E5E9EF] bg-white shadow-sm"
            >
              <div className="relative h-[140px] w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute -bottom-5 left-6 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <img src={item.icon} alt="" className="h-5 w-5" loading="lazy" />
                </div>
              </div>

              <div className="px-6 pb-6 pt-8">
                <h3 className="text-base font-bold leading-snug text-[#0F1B2D] sm:text-[18px]">
                  {item.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0F1B2D]" />
                      <span className="text-sm leading-relaxed text-[#5a6472] sm:text-[16px]">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConnectBanner() {
  return (
    <section className="bg-[#1591D8] py-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-5 px-4 text-center sm:gap-6 sm:px-6 sm:flex-row">
        <h2 className="text-lg font-semibold text-white sm:text-[26px]">
          Connect with a Digital Twin specialist
        </h2>
        
          <a href="#connect"
          className="flex-shrink-0 rounded-full bg-white px-6 py-3 text-xs font-bold text-[#1591D8] transition-opacity hover:opacity-90 sm:px-8 sm:py-4 sm:text-[15px]"
        >
          Connect with us
        </a>
      </div>
    </section>
  );
}
function CaseStudyCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<"Challenge" | "Solution" | "Results">(
    "Challenge"
  );

  const current = CASE_STUDIES[activeSlide];
  const tabNames: Array<"Challenge" | "Solution" | "Results"> = [
    "Challenge",
    "Solution",
    "Results",
  ];

  const goTo = (index: number) => {
    const next = (index + CASE_STUDIES.length) % CASE_STUDIES.length;
    setActiveSlide(next);
    setActiveTab("Challenge");
  };

  return (
    <section className="relative bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        {/* Prev arrow */}
        <button
          onClick={() => goTo(activeSlide - 1)}
          aria-label="Previous case study"
          className="absolute left-0 top-1/2 hidden -translate-y-1/2 text-[#2E8DC5] hover:opacity-70 lg:block"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6L9 12L15 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={() => goTo(activeSlide + 1)}
          aria-label="Next case study"
          className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-[#2E8DC5] hover:opacity-70 lg:block"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6L15 12L9 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-2">
          {/* Left: text + tabs, wrapped in one bordered card */}
          <div>
            <p className="text-xs font-bold tracking-wide text-[#8DC63F]">
              {current.label}
            </p>
            <h2 className="mt-3 text-xl font-bold leading-tight text-[#0F1B2D] sm:text-[30px] lg:text-[34px]">
              {current.title}
            </h2>

            <div className="mt-6 rounded-md border border-[#E5E9EF] sm:mt-8">
              <div className="flex gap-4 overflow-x-auto border-b border-[#E5E9EF] px-4 pt-6 sm:gap-8 sm:px-6">
                {tabNames.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 whitespace-nowrap pb-4 text-sm font-semibold transition-colors sm:text-[16px] ${
                      activeTab === tab
                        ? "border-b-2 border-[#2E8DC5] text-[#2E8DC5]"
                        : "text-[#0F1B2D] hover:text-[#2E8DC5]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="px-4 pb-8 pt-6 sm:px-6">
                <p className="max-w-[500px] text-sm leading-[1.8] text-[#3a4658] sm:text-[16px]">
                  {current.tabs[activeTab]}
                </p>

                
                <a  href="#read-more"
                  className="mt-8 inline-flex items-center rounded-full px-6 py-3 text-xs font-semibold text-white shadow-md transition hover:shadow-lg sm:px-8 sm:py-3.5 sm:text-[15px]"
                  style={{
                    background:
                      "linear-gradient(90deg, #8DC63F 0%, #2E8DC5 100%)",
                  }}
                >
                  Read more
                </a>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={current.image}
              alt={current.title}
              className="h-[220px] w-full object-cover sm:h-[340px] lg:h-[420px]"
              loading="lazy"
            />
          </div>
        </div>

        {/* Mobile arrows */}
        <div className="mt-8 flex justify-center gap-6 lg:hidden">
          <button
            onClick={() => goTo(activeSlide - 1)}
            aria-label="Previous case study"
            className="text-[#2E8DC5]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 6L9 12L15 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => goTo(activeSlide + 1)}
            aria-label="Next case study"
            className="text-[#2E8DC5]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function GridReimagined() {
  return (
    <section className="relative overflow-hidden bg-white pb-14 pt-4 sm:pb-20">
      {/* Decorative quote-mark background image: large, right side, vertically centered on the quote */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 hidden h-[400px] w-[800px] -translate-y-1/2 bg-contain bg-right bg-no-repeat opacity-90 lg:block"
        style={{
          backgroundImage:
            "url('https://visionaize.in/wp-content/uploads/2022/05/home-quote-min.png')",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="relative max-w-[900px]">
          <blockquote className="text-base font-medium leading-[1.5] text-[#0F1B2D] sm:text-[22px] lg:text-[24px] lg:leading-[1.35]">
            &ldquo;It is astounding how this platform is able to integrate data
            from complex systems like SCADA, AMI Meter, and GIS Systems to
            provide accurate 3D visualizations. I see a tremendous
            opportunity to reduce our operating costs. We can never go back
            to doing inspection and maintenance the way we did&rdquo;
          </blockquote>

          <div className="mt-8">
            <p className="text-sm font-semibold text-[#0F1B2D] sm:text-[18px]">
              Bill Andrew
            </p>
            <p className="mt-1 text-sm text-[#5a6472] sm:text-[18px]">
              President, Delaware Electric Cooperative
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Talk to an Expert: form state, validation & submission ---------- */

type TalkFormState = {
  firstName: string;
  lastName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  hearAboutUs: string;
  message: string;
};

type TalkFormErrors = Partial<Record<keyof TalkFormState, string>>;

const initialTalkFormState: TalkFormState = {
  firstName: "",
  lastName: "",
  companyName: "",
  businessEmail: "",
  phoneNumber: "",
  hearAboutUs: "",
  message: "",
};

const TALK_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Exactly 10 digits — matches the backend's phone validation.
const TALK_PHONE_REGEX = /^\d{10}$/;
const TALK_MESSAGE_MAX_LENGTH = 1000;

// Common free/personal email providers — rejected for a "Business Email" field.
const TALK_FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mail.com",
  "protonmail.com",
  "proton.me",
  "yandex.com",
  "gmx.com",
  "zoho.com",
  "rediffmail.com",
]);

function isTalkBusinessEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return !!domain && !TALK_FREE_EMAIL_DOMAINS.has(domain);
}

function validateTalkForm(form: TalkFormState): TalkFormErrors {
  const errors: TalkFormErrors = {};

  const firstName = form.firstName.trim();
  const lastName = form.lastName.trim();
  const companyName = form.companyName.trim();
  const businessEmail = form.businessEmail.trim();
  const phoneDigits = form.phoneNumber.replace(/\D/g, "");
  const message = form.message.trim();

  if (!firstName) {
    errors.firstName = "First name is required";
  } else if (firstName.length > 100) {
    errors.firstName = "First name is too long";
  }

  if (!lastName) {
    errors.lastName = "Last name is required";
  } else if (lastName.length > 100) {
    errors.lastName = "Last name is too long";
  }

  if (!companyName) {
    errors.companyName = "Company name is required";
  } else if (companyName.length > 150) {
    errors.companyName = "Company name is too long";
  }

  if (!businessEmail) {
    errors.businessEmail = "Business email is required";
  } else if (!TALK_EMAIL_REGEX.test(businessEmail)) {
    errors.businessEmail = "Enter a valid email address";
  } else if (!isTalkBusinessEmail(businessEmail)) {
    errors.businessEmail =
      "Please use your business email address, not a personal one (e.g. Gmail, Yahoo)";
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!TALK_PHONE_REGEX.test(phoneDigits)) {
    errors.phoneNumber = "Enter a valid 10-digit phone number";
  }

  if (message.length > TALK_MESSAGE_MAX_LENGTH) {
    errors.message = `Message must be ${TALK_MESSAGE_MAX_LENGTH} characters or fewer`;
  }

  return errors;
}

function talkFieldClass(hasError: boolean) {
  return [
    "w-full rounded-md border px-5 py-4 text-[15px] text-[#0F1B2D] placeholder:text-[#0F1B2D]/60",
    "focus:outline-none focus:ring-1",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-[#D5DAE1] focus:border-[#2E8DC5] focus:ring-[#2E8DC5]",
  ].join(" ");
}

function TalkFieldError({ message }: { message: string }) {
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function TalkToExpert() {
  const [form, setForm] = useState<TalkFormState>(initialTalkFormState);
  const [errors, setErrors] = useState<TalkFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof TalkFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, phoneNumber: digitsOnly }));
    setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateTalkForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      await api.submitCompanyLeadForm({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        company_name: form.companyName.trim(),
        business_email: form.businessEmail.trim(),
        phone_number: form.phoneNumber.replace(/\D/g, ""),
        hear_about_us: form.hearAboutUs.trim() || undefined,
        message: form.message.trim() || undefined,
        source_page: "/industries/digital-twin-for-power-and-energy",
      });

      setStatus("success");
      setForm(initialTalkFormState);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your request. Please try again."
      );
    }
  };

  return (
    <section className="relative z-10 my-12 bg-[#0F1B2D] py-12 sm:my-16 sm:py-16">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch lg:grid-cols-2">
        {/* Left: dark panel */}
        <div className="flex flex-col justify-center px-4 py-10 sm:px-8 sm:py-16 lg:px-20">
          <h2 className="text-2xl font-normal text-white sm:text-[36px] lg:text-[42px]">
            Let&rsquo;s talk digital twins
          </h2>

          <p className="mt-5 max-w-[560px] text-sm leading-[1.8] text-white/70 sm:mt-6 sm:text-[18px]">
            Visionaize V-Plant creates a 3D view of your power grid or
            generation plans, enabling an immersive visualization experience
            of power generation, transmission and distribution assets in an
            intelligent, 3D digital twin.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-white sm:mt-14 sm:text-[26px]">
            Learn how Visionaize can:
          </h3>

          <ul className="mt-6 space-y-4 sm:space-y-5">
            {learnPoints.map((point) => (
              <li key={point} className="flex items-center gap-4">
                <span
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #8DC63F 0%, #2E8DC5 100%)",
                  }}
                >
                  <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none">
                    <path
                      d="M2.5 6.5L4.5 8.5L9.5 3.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm text-white sm:text-[17px]">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: white form panel */}
        <div className="mx-auto flex w-full max-w-[440px] flex-col items-center bg-white px-4 py-10 sm:px-8 sm:py-16">
          <div className="w-full">
            <h2 className="text-2xl font-normal text-[#0F1B2D] sm:text-[36px]">
              Talk to an expert
            </h2>

            {status === "success" ? (
              <div className="mt-8 rounded-md bg-[#EEF7E7] p-6 text-[#0F1B2D]">
                Thanks! A Visionaize Digital Twin expert will be in touch shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4 sm:mt-10 sm:space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="First name*"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    aria-invalid={!!errors.firstName}
                    maxLength={100}
                    className={talkFieldClass(!!errors.firstName)}
                  />
                  {errors.firstName && <TalkFieldError message={errors.firstName} />}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Last name*"
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    aria-invalid={!!errors.lastName}
                    maxLength={100}
                    className={talkFieldClass(!!errors.lastName)}
                  />
                  {errors.lastName && <TalkFieldError message={errors.lastName} />}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Company name*"
                    value={form.companyName}
                    onChange={handleChange("companyName")}
                    aria-invalid={!!errors.companyName}
                    maxLength={150}
                    className={talkFieldClass(!!errors.companyName)}
                  />
                  {errors.companyName && <TalkFieldError message={errors.companyName} />}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Business Email*"
                    value={form.businessEmail}
                    onChange={handleChange("businessEmail")}
                    aria-invalid={!!errors.businessEmail}
                    className={talkFieldClass(!!errors.businessEmail)}
                  />
                  {errors.businessEmail && <TalkFieldError message={errors.businessEmail} />}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone number*"
                    value={form.phoneNumber}
                    onChange={handlePhoneChange}
                    aria-invalid={!!errors.phoneNumber}
                    inputMode="numeric"
                    maxLength={10}
                    className={talkFieldClass(!!errors.phoneNumber)}
                  />
                  {errors.phoneNumber && <TalkFieldError message={errors.phoneNumber} />}
                </div>

                <select
                  value={form.hearAboutUs}
                  onChange={handleChange("hearAboutUs")}
                  className="w-full rounded-md border border-[#D5DAE1] px-5 py-4 text-[15px] text-[#0F1B2D] focus:border-[#2E8DC5] focus:outline-none"
                >
                  <option value="">How did you first hear about us?</option>
                  <option value="search">Search engine</option>
                  <option value="social">Social media</option>
                  <option value="referral">Referral</option>
                  <option value="event">Event / conference</option>
                  <option value="other">Other</option>
                </select>

                <div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange("message")}
                    aria-invalid={!!errors.message}
                    maxLength={TALK_MESSAGE_MAX_LENGTH}
                    className={`resize-none ${talkFieldClass(!!errors.message)}`}
                  />
                  <div className="mt-1 flex items-center justify-between">
                    {errors.message ? <TalkFieldError message={errors.message} /> : <span />}
                    <span className="text-xs text-[#5a6472]">
                      {form.message.length}/{TALK_MESSAGE_MAX_LENGTH}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{
                    background: "linear-gradient(90deg, #8DC63F 0%, #2E8DC5 100%)",
                  }}
                >
                  {status === "submitting" ? "Sending…" : "Send request"}
                </button>

                {status === "error" && errorMessage && (
                  <p className="text-center text-sm text-red-600">{errorMessage}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
function Whitepaper() {
  return (
    <section className="bg-white pb-14 pt-0 sm:pb-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[420px_1fr] lg:gap-16">
        <div className="flex justify-center">
          <img
            src="https://visionaize.in/wp-content/uploads/2026/05/Group-1171277152-1.png"
            alt="The Digital Frontier of Indian Power: Orchestrating Efficiency through Agentic AI and Digital Twins — whitepaper cover"
            className="w-full max-w-[240px] sm:max-w-[360px] lg:max-w-[420px]"
            loading="lazy"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold leading-tight text-[#0F1B2D] sm:text-[30px] lg:text-[34px]">
            The Digital Frontier of Indian Power: Orchestrating Efficiency
            through Agentic AI and Digital Twins
          </h2>

          <p className="mt-5 text-sm leading-[1.8] text-[#5a6472] sm:mt-6 sm:text-[17px]">
            India&rsquo;s power sector is rapidly evolving with Agentic AI and
            Digital Twin technologies. This whitepaper explores how
            intelligent, real-time operations can improve efficiency, reduce
            downtime, optimize energy usage, and accelerate smarter, more
            sustainable power generation with solutions from Visionaize.
          </p>

          
           <a href="#read-whitepaper"
            className="mt-6 inline-flex items-center rounded-full border-2 border-[#0F1B2D] px-6 py-3 text-xs font-bold text-[#0F1B2D] transition-colors hover:bg-[#0F1B2D] hover:text-white sm:mt-10 sm:px-8 sm:py-4 sm:text-[15px]"
          >
            Read the Whitepaper
          </a>
        </div>
      </div>
    </section>
  );
}