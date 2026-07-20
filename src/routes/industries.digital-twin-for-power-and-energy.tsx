import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSeedContentItem } from "@/lib/seed-content";

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

// const CASE_STUDIES = [
//   {
//     eyebrow: "CASE STUDY",
//     title: "Combined-Cycle Gas Plant: Reducing Forced Outages with Predictive AI",
//     tabs: {
//       Challenge:
//         "A large independent power producer was suffering recurring forced outages on its combined-cycle units, driving costly merchant replacement power and missed capacity commitments. Operators lacked early warning of degradation across HRSG, gas turbine and steam turbine systems.",
//       Solution:
//         "Visionaize deployed AI-driven anomaly detection and a hybrid first-principles + data-driven digital twin across the units, unifying historian, vibration and process data into one operational picture with prescriptive actions for control-room and reliability teams.",
//       Results:
//         "Forced outage rate dropped, heat-rate held steady through the run, and the operator avoided several seven-figure replacement-power events in the first year.",
//     },
//     img: "https://visionaize.com/wp-content/uploads/2022/07/iStock-1369468534-1024x683-1.jpg",
//   },
//   {
//     eyebrow: "CASE STUDY",
//     title: "Wind Fleet: Boosting Availability with Remote Performance Monitoring",
//     tabs: {
//       Challenge:
//         "A renewables operator with hundreds of turbines across multiple sites struggled to convert SCADA data into action. Underperformance and gearbox issues were detected too late, eroding capacity factor and warranty recoveries.",
//       Solution:
//         "Visionaize centralized SCADA, CMS and weather data into a remote performance monitoring solution with AI-driven KPI diagnostics and what-if analysis tuned for wind assets.",
//       Results:
//         "Fleet availability improved, mean time to detect dropped from days to hours, and warranty claims were backed by stronger evidence packs.",
//     },
//     img: "https://visionaize.com/wp-content/uploads/2023/12/iStock-514620986-1536x1024.jpg",
//   },
//   {
//     eyebrow: "CASE STUDY",
//     title: "Nuclear Operator: Inspection Optimization with 3D Digital Twin",
//     tabs: {
//       Challenge:
//         "A nuclear utility needed to compress outage windows and reduce dose exposure during inspection campaigns while maintaining the highest safety standards across complex containment areas.",
//       Solution:
//         "A photorealistic 3D digital twin of the plant was built from laser scans and integrated with inspection records, isometric drawings and procedure libraries — enabling virtual walk-downs, dose planning and remote expert support.",
//       Results:
//         "Outage duration shrank, dose exposure dropped, and engineering teams onboarded contractors faster using the twin instead of physical site visits.",
//     },
//     img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1202781474.webp",
//   },
// ];

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
      className="relative h-[640px] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('${heroImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto flex h-full max-w-[1280px] items-center px-6">
        <div className="w-full max-w-[570px] bg-white p-12">
          <h1
            className="text-[32px] font-light leading-[1.05] tracking-tight"
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
            <p key={index} className="mt-6 text-[18px] leading-relaxed text-[#0F1B2D]">
              {paragraph}
            </p>
          ))}
          <button
            className="mt-8 rounded-full px-8 py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(90deg, #8DC63F 0%, #2E8DC5 100%)",
            }}
          >
            Download the Whitepaper
          </button>
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
            <p className="mt-4 max-w-[280px] text-[17px] leading-relaxed text-white/80">
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
      <span className="text-[16px] leading-relaxed text-[#3a4658]">{text}</span>
    </li>
  );
}

function ChallengeSolution() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_1.1fr_1fr]">
        {/* Industry Challenge */}
        <div>
          <p className="text-[13px] font-semibold tracking-wide text-[#2E8DC5]">
            INDUSTRY CHALLENGE
          </p>
          <h2 className="mt-3 text-[28px] font-bold leading-tight text-[#0F1B2D]">
            The Power &amp; Energy Industry is at a Turning Point
          </h2>
          <p className="mt-5 text-[16px] leading-[1.8] text-[#3a4658]">
            Utilities today are under constant pressure to deliver reliable,
            sustainable, and cost efficient energy while managing increasingly
            complex infrastructure.
          </p>
          <p className="mt-6 text-[16px] font-semibold text-[#0F1B2D]">
            Key challenges include:
          </p>
          <ul className="mt-4 space-y-3">
            {industryChallenges.map((item) => (
              <CheckItem key={item} text={item} />
            ))}
          </ul>
        </div>

        {/* Center diagram */}
        <div className="flex justify-center">
          <img
            src="https://visionaize.in/wp-content/uploads/2026/05/Group-1410138697.svg"
            alt="Power and energy ecosystem: generation, transmission, distribution, substations, SCADA/GIS enterprise systems, renewables"
            className="w-full max-w-[460px]"
            loading="lazy"
          />
        </div>

        {/* Solution */}
        <div>
          <p className="text-[13px] font-semibold tracking-wide text-[#2E8DC5]">
            SOLUTION
          </p>
          <h2 className="mt-3 text-[28px] font-bold leading-tight text-[#0F1B2D]">
            A Unified Digital Twin for Power &amp; Energy Assets
          </h2>
          <p className="mt-5 text-[16px] leading-[1.8] text-[#3a4658]">
            Visionaize brings your entire power ecosystem into a single,
            intelligent 3D digital twin environment. From turbines and
            substations to transmission networks, visualize and interact with
            your assets in real time.
          </p>
          <p className="mt-6 text-[16px] font-semibold text-[#0F1B2D]">
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
    <section className="bg-white pb-20 pt-0">
      <div className="mx-auto max-w-[1040px] px-6">
        <h2 className="text-center text-[42px] font-normal text-[#0F1B2D]">
          Business Impact
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {businessImpact.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-2xl border border-[#E5E9EF] p-6 text-center shadow-sm"
            >
              <img src={item.icon} alt="" className="h-16 w-16" loading="lazy" />
              <p className="mt-4 text-[32px] font-bold text-[#2E8DC5]">
                {item.stat}
              </p>
              <p className="mt-2 text-[15px] font-semibold text-[#1A2733]">
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
      <div className="mx-auto max-w-[1400px] px-6">
        <h2 className="text-center text-[40px] font-semibold text-white">
          Key Capabilities
        </h2>
      </div>

      <div className="mt-8 bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {keyCapabilities.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col items-center px-8 py-12 text-center ${
                index !== keyCapabilities.length - 1
                  ? "lg:border-r lg:border-[#E5E9EF]"
                  : ""
              }`}
            >
              <img src={item.icon} alt="" className="h-20 w-20" loading="lazy" />
              <h3 className="mt-5 text-[17px] font-bold leading-snug text-[#0F1B2D]">
                {item.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[#3a4658]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-16" />
    </section>
  );
}

function UseCases() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        <h2 className="text-center text-[42px] font-normal text-[#0F1B2D]">
          Use Cases
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
                <h3 className="text-[18px] font-bold leading-snug text-[#0F1B2D]">
                  {item.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0F1B2D]" />
                      <span className="text-[16px] leading-relaxed text-[#5a6472]">
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
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-6 px-6 text-center sm:flex-row">
        <h2 className="text-[26px] font-semibold text-white">
          Connect with a Digital Twin specialist
        </h2>
        
          <a href="#connect"
          className="flex-shrink-0 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#1591D8] transition-opacity hover:opacity-90"
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
    <section className="relative bg-white py-20">
      <div className="mx-auto max-w-[1400px] px-6">
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

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left: text + tabs, wrapped in one bordered card */}
          <div>
            <p className="text-[13px] font-bold tracking-wide text-[#8DC63F]">
              {current.label}
            </p>
            <h2 className="mt-3 text-[34px] font-bold leading-tight text-[#0F1B2D]">
              {current.title}
            </h2>

            <div className="mt-8 rounded-md border border-[#E5E9EF]">
              <div className="flex gap-8 border-b border-[#E5E9EF] px-6 pt-6">
                {tabNames.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-[16px] font-semibold transition-colors ${
                      activeTab === tab
                        ? "border-b-2 border-[#2E8DC5] text-[#2E8DC5]"
                        : "text-[#0F1B2D] hover:text-[#2E8DC5]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="px-6 pb-8 pt-6">
                <p className="max-w-[500px] text-[16px] leading-[1.8] text-[#3a4658]">
                  {current.tabs[activeTab]}
                </p>

                
                <a  href="#read-more"
                  className="mt-8 inline-flex items-center rounded-full px-8 py-3.5 text-[15px] font-semibold text-white shadow-md transition hover:shadow-lg"
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
              className="h-[420px] w-full object-cover"
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
    <section className="relative overflow-hidden bg-white pb-20 pt-4">
      {/* Decorative quote-mark background image: large, right side, vertically centered on the quote */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 hidden h-[400px] w-[800px] -translate-y-1/2 bg-contain bg-right bg-no-repeat opacity-90 lg:block"
        style={{
          backgroundImage:
            "url('https://visionaize.in/wp-content/uploads/2022/05/home-quote-min.png')",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1280px] px-6">
        <div className="relative max-w-[900px]">
          <blockquote className="text-[24px] font-medium leading-[1.35] text-[#0F1B2D]">
            &ldquo;It is astounding how this platform is able to integrate data
            from complex systems like SCADA, AMI Meter, and GIS Systems to
            provide accurate 3D visualizations. I see a tremendous
            opportunity to reduce our operating costs. We can never go back
            to doing inspection and maintenance the way we did&rdquo;
          </blockquote>

          <div className="mt-8">
            <p className="text-[18px] font-semibold text-[#0F1B2D]">
              Bill Andrew
            </p>
            <p className="mt-1 text-[18px] text-[#5a6472]">
              President, Delaware Electric Cooperative
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TalkToExpert() {
  return (
    <section className="relative z-10 my-16 bg-[#0F1B2D] py-16">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch lg:grid-cols-2">
        {/* Left: dark panel */}
        <div className="flex flex-col justify-center px-8 py-16 lg:px-20">
          <h2 className="text-[42px] font-normal text-white">
            Let&rsquo;s talk digital twins
          </h2>

          <p className="mt-6 max-w-[560px] text-[18px] leading-[1.8] text-white/70">
            Visionaize V-Plant creates a 3D view of your power grid or
            generation plans, enabling an immersive visualization experience
            of power generation, transmission and distribution assets in an
            intelligent, 3D digital twin.
          </p>

          <h3 className="mt-14 text-[26px] font-semibold text-white">
            Learn how Visionaize can:
          </h3>

          <ul className="mt-6 space-y-5">
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
                <span className="text-[17px] text-white">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: white form panel */}
  {/* Right: white form panel */}
<div className="mx-auto flex w-full max-w-[440px] flex-col items-center bg-white px-8 py-16">
  <div className="w-full">
    <h2 className="text-[36px] font-normal text-[#0F1B2D]">
      Talk to an expert
    </h2>

    <form className="mt-10 space-y-5">
      <input
        type="text"
        placeholder="First name*"
        required
        className="w-full rounded-md border border-[#D5DAE1] px-5 py-4 text-[15px] text-[#0F1B2D] placeholder:text-[#0F1B2D] focus:border-[#2E8DC5] focus:outline-none"
      />
      <input
        type="text"
        placeholder="Last name*"
        required
        className="w-full rounded-md border border-[#D5DAE1] px-5 py-4 text-[15px] text-[#0F1B2D] placeholder:text-[#0F1B2D] focus:border-[#2E8DC5] focus:outline-none"
      />
      <input
        type="text"
        placeholder="Company name*"
        required
        className="w-full rounded-md border border-[#D5DAE1] px-5 py-4 text-[15px] text-[#0F1B2D] placeholder:text-[#0F1B2D] focus:border-[#2E8DC5] focus:outline-none"
      />
      <input
        type="email"
        placeholder="Business Email*"
        required
        className="w-full rounded-md border border-[#D5DAE1] px-5 py-4 text-[15px] text-[#0F1B2D] placeholder:text-[#0F1B2D] focus:border-[#2E8DC5] focus:outline-none"
      />
      <input
        type="tel"
        placeholder="Phone number*"
        required
        className="w-full rounded-md border border-[#D5DAE1] px-5 py-4 text-[15px] text-[#0F1B2D] placeholder:text-[#0F1B2D] focus:border-[#2E8DC5] focus:outline-none"
      />
      <select
        defaultValue=""
        className="w-full rounded-md border border-[#D5DAE1] px-5 py-4 text-[15px] text-[#0F1B2D] focus:border-[#2E8DC5] focus:outline-none"
      >
        <option value="" disabled>
          How did you first hear about us?
        </option>
        <option value="search">Search engine</option>
        <option value="social">Social media</option>
        <option value="referral">Referral</option>
        <option value="event">Event / conference</option>
        <option value="other">Other</option>
      </select>
      <textarea
        placeholder="Message"
        rows={4}
        className="w-full resize-none rounded-md border border-[#D5DAE1] px-5 py-4 text-[15px] text-[#0F1B2D] placeholder:text-[#0F1B2D] focus:border-[#2E8DC5] focus:outline-none"
      />

      <button
        type="submit"
        className="w-full rounded-full py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
        style={{
          background: "linear-gradient(90deg, #8DC63F 0%, #2E8DC5 100%)",
        }}
      >
        Send request
      </button>
    </form>
  </div>
</div>
      </div>
    </section>
  );
}
function Whitepaper() {
  return (
    <section className="bg-white pb-24 pt-0">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[420px_1fr]">
        <div className="flex justify-center">
          <img
            src="https://visionaize.in/wp-content/uploads/2026/05/Group-1171277152-1.png"
            alt="The Digital Frontier of Indian Power: Orchestrating Efficiency through Agentic AI and Digital Twins — whitepaper cover"
            className="w-full max-w-[420px]"
            loading="lazy"
          />
        </div>

        <div>
          <h2 className="text-[34px] font-semibold leading-tight text-[#0F1B2D]">
            The Digital Frontier of Indian Power: Orchestrating Efficiency
            through Agentic AI and Digital Twins
          </h2>

          <p className="mt-6 text-[17px] leading-[1.8] text-[#5a6472]">
            India&rsquo;s power sector is rapidly evolving with Agentic AI and
            Digital Twin technologies. This whitepaper explores how
            intelligent, real-time operations can improve efficiency, reduce
            downtime, optimize energy usage, and accelerate smarter, more
            sustainable power generation with solutions from Visionaize.
          </p>

          
           <a href="#read-whitepaper"
            className="mt-10 inline-flex items-center rounded-full border-2 border-[#0F1B2D] px-8 py-4 text-[15px] font-bold text-[#0F1B2D] transition-colors hover:bg-[#0F1B2D] hover:text-white"
          >
            Read the Whitepaper
          </a>
        </div>
      </div>
    </section>
  );
}








