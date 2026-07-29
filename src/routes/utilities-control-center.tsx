import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/utilities-control-center")({
  head: () => ({
    meta: [
      { title: "Utilities Control Center — Visionaize" },
      {
        name: "description",
        content:
          "A real-time, customizable dashboard designed specifically for the Utilities Industry.",
      },
      { property: "og:title", content: "Utilities Control Center — Visionaize" },
      {
        property: "og:description",
        content:
          "Hyperspecialized for utilities: make informed decisions in real-time, integrate with your existing systems, get started in weeks not months, and use AI/ML powered predictive analytics.",
      },
    ],
  }),
  component: UtilitiesControlCenterPage,
});

const PILLARS = [
  {
    icon: "https://visionaize.in/wp-content/uploads/2022/05/Group-3.svg",
    label: "Make informed decisions in real-time",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2022/05/Group-4.svg",
    label: "Integrate with your existing systems",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2022/05/Group-544.svg",
    label: "Get started in weeks not months",
  },
  {
    icon: "https://visionaize.in/wp-content/uploads/2022/05/Group-3.svg",
    label: "AI/ML powered predictive analytics",
  },
];

function UtilitiesControlCenterPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F1B2D]">
      <Header />
      <Hero />
      <Pillars />
      <DoAwayWithSpreadsheets />
      <CustomizedFeatures />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-white py-8 sm:py-10 md:py-12 lg:py-14">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-6 px-4 sm:px-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <h1 className="text-2xl font-semibold leading-tight text-[#0F1B2D] sm:text-3xl md:text-4xl">
            Utilities Control Center
          </h1>
          <p className="mt-3 max-w-[420px] text-base leading-relaxed text-[#3a4658] sm:mt-4 sm:text-lg">
            A real-time, customizable dashboard designed specifically for the{" "}
            <span className="text-[#E0562A]">Utilities</span> Industry
          </p>
        </div>

        <div className="overflow-hidden rounded-md shadow-md">
          <img
            src="https://visionaize.in/wp-content/uploads/2022/09/image_2022_09_13T10_20_43_491Z-2.png"
            alt="Hands typing on a laptop showing real-time utilities data charts"
            className="h-[180px] w-full object-cover sm:h-[240px] md:h-[280px] lg:h-[300px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="bg-[#1A1E29] py-8 sm:py-10 md:py-12 lg:py-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <h2 className="text-center text-xl font-bold text-white sm:text-2xl md:text-[28px]">
          Hyperspecialized for Utilities
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:mt-10 md:grid-cols-4 md:gap-6">
          {PILLARS.map((p) => (
            <div key={p.label} className="flex flex-col items-center text-center">
              <img src={p.icon} alt="" className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11" loading="lazy" />
              <p className="mt-3 max-w-[160px] text-sm font-semibold text-white sm:mt-4 sm:text-base">
                {p.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  ["CEO Dashboard", "Finance", "Stategic initiatives", "Purchasing & Stores"],
  ["System Control", "Information Technology", "Member Services", "Property & Fleet"],
  ["Operations", "Metering", "Engineering", "Safety"],
];

function CheckIcon() {
  return (
    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#1A9E4E]">
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
  );
}

function CustomizedFeatures() {
  return (
    <section className="bg-[#F4F7FC]">
      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 sm:py-10 md:py-12">
        <h2 className="text-center text-lg font-bold leading-snug text-[#0F1B2D] sm:text-xl md:text-2xl">
          Customized features to drive a competitive advantage
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 sm:mt-10 sm:grid-cols-3 sm:gap-y-5">
          {FEATURES.map((column, i) => (
            <ul key={i} className="space-y-4 sm:space-y-5">
              {column.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-base font-medium text-[#0F1B2D] sm:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-4 pb-8 sm:px-6 sm:pb-10 md:pb-12">
        <p className="text-base leading-relaxed sm:text-lg sm:leading-[1.8]">
          This product can take you way beyond the simple dashboard! Not only
          does the Utilities Control Center display real-time data in many
          formats and maps leading and lagging indicators; it can apply data
          technologies such as predictive analytics and artificial
          intelligence which leads to increased operational efficiencies and
          creates a huge competitive advantage within your Utilities business.
        </p>
        <p className="mt-4 text-base font-semibold  sm:mt-5 sm:text-lg">
          Bill Andrew, President, Delaware Electric Cooperative
        </p>
      </div>
    </section>
  );
}

function DoAwayWithSpreadsheets() {
  return (
    <section className="bg-white py-8 sm:py-10 md:py-12 lg:py-14">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <h2 className="text-2xl font-semibold leading-tight text-[#0F1B2D] sm:text-3xl md:text-4xl">
          Do away with spreadsheets
        </h2>

        <p className="mt-4 text-base leading-relaxed  sm:mt-5 sm:text-lg sm:leading-[1.8]">
          Relying on disparate data sources for critical information is a
          recipe for disaster. It&rsquo;s difficult to go through tons of
          spreadsheets, emails, applications, portals and reports to make a
          decision. Also, it is generally a time-consuming task for staff to
          aggregate, compile and generate reports on basic{" "}
          <span className="text-[#E0562A]">KPIs and metrics</span>.
        </p>

        <p className="mt-4 text-base leading-relaxed  sm:mt-5 sm:text-lg sm:leading-[1.8]">
          With Visionaize Utilities Control Center, optimize key functions and
          processes on the fly. Get real-time information about all aspects
          directly integrated from your data sources in a single place.{" "}
          <span className="font-bold text-[#0F1B2D]">
            Drastically improve operational and financial performance.
          </span>
        </p>

        <div className="mt-8 flex justify-center sm:mt-10">
          <img
            src="https://visionaize.in/wp-content/uploads/2022/09/Desktop-36-768x294.jpg"
            alt="Data integration diagram: customer information, automated meter reading, HR, outage management and work order systems flowing into a central Data Integration hub, out to interactive data visualization, powerful insights, data exports and recommendations"
            className="w-full max-w-[800px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}