import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/intelligent-demand-forecast")({
  head: () => ({
    meta: [
      { title: "Intelligent Demand Forecast (IDF) — Visionaize" },
      {
        name: "description",
        content:
          "Maximize your capacity and energy value during peak usage periods with intelligent AI forecasting from Visionaize.",
      },
      { property: "og:title", content: "Intelligent Demand Forecast (IDF) — Visionaize" },
      {
        property: "og:description",
        content:
          "Leverage AI-powered forecasting to accurately predict peak events, maximize capacity and value, and maintain affordability.",
      },
    ],
  }),
  component: IntelligentDemandForecastPage,
});

const PILLARS = [
  {
    icon: "/Intelligent/Vector-6.svg",
    label: "Leverage AI-Powered Forecasting",
  },
  {
    icon: "/Intelligent/Group-3.svg",
    label: "Maximize Your Capacity and Value",
  },
  {
    icon: "/Intelligent/Group-4.svg",
    label: "Accurately Predict Peak Events",
  },
  {
    icon: "/Intelligent/Group-544.svg",
    label: "Maintain Affordability",
  },
];

function IntelligentDemandForecastPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#0F1B2D]">
      <Header />
      <Hero />
      <Pillars />
       <CutCosts />
      <EasyToUseSolutions />
     
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-white py-8 sm:py-10 md:py-12 lg:py-14">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-4 sm:px-6 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div>
          <h1 className="text-3xl font-semibold leading-tight text-[#0F1B2D] sm:text-4xl md:text-5xl lg:text-[46px]">
            Intelligent Demand
            <br />
            Forecast (IDF)
          </h1>
          <p className="mt-3 max-w-[460px] text-lg leading-relaxed text-[#3a4658] sm:mt-4 sm:text-xl">
            Maximize your capacity and energy value during peak usage periods
            with intelligent AI forecasting.
          </p>
        </div>

        <div className="overflow-hidden rounded-md shadow-md">
          <img
            src="/Intelligent/image-1.png"
            alt="High-voltage electrical transmission towers against a blue evening sky"
            className="h-[200px] w-full object-cover sm:h-[260px] md:h-[280px] lg:h-[320px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="bg-[#0F1B2D] py-8 sm:py-9 md:py-10">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 md:gap-6">
        {PILLARS.map((p) => (
          <div key={p.label} className="flex flex-col items-center text-center">
            <img src={p.icon} alt="" className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11" loading="lazy" />
            <p className="mt-2 max-w-[170px] text-sm font-bold uppercase tracking-wide text-white sm:mt-3 sm:text-base md:text-[15px]">
              {p.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
function CutCosts() {
  return (
    <section className="bg-white py-8 sm:py-10 md:py-12 lg:py-14">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-6 px-4 sm:px-6 sm:gap-8 lg:grid-cols-2 lg:gap-8">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-[#0F1B2D] sm:text-4xl md:text-5xl">
            Cut Costs by efficiently
            <br />
            managing peak times
          </h2>
          <p className="mt-3 max-w-[500px] text-lg leading-relaxed text-[#3a4658] sm:mt-4 sm:text-xl sm:leading-[1.8]">
            Ensure you have the most accurate and timely data to identify all
            coincident peak (CP) events, while minimizing false peak
            notifications that unnecessarily reduce electric usage. Be
            proactive with AI-powered demand forecasting. Connect with an
            expert and see how it works.
          </p>
          
            <a href="/contact"
            className="mt-5 inline-flex items-center rounded-full px-6 py-3 text-base font-semibold text-white shadow-md transition hover:shadow-lg sm:mt-6 sm:px-7 sm:py-3.5 sm:text-lg"
            style={{
              background: "linear-gradient(90deg, #8DC63F 0%, #1591D8 100%)",
            }}
          >
            Connect with an expert
          </a>
        </div>

        <div className="flex justify-center">
          <img
            src="/Intelligent/Group-523-1.png"
            alt="Visionaize 3D digital twin dashboard on a tablet showing demand forecasting data"
            className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
function EasyToUseSolutions() {
  return (
    <section className="bg-white py-8 sm:py-10 md:py-12 lg:py-14">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-4 sm:px-6 sm:gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-[#0F1B2D] sm:text-4xl md:text-5xl lg:text-[44px]">
            Easy-to-use solutions for
            <br className="hidden sm:block" />
            complex challenges
          </h2>

          <div className="mt-4 space-y-4 text-lg leading-relaxed text-[#5a6472] sm:mt-5 sm:text-xl sm:leading-[1.8]">
            <p>
              IDF users see a very clean and easy to navigate dashboard,
              displaying charts and graphs showing monthly and daily
              comparisons of actual versus predicted load as well as an
              hourly 14-day load forecast. They are also presented with
              precise recommendations on what corrective action to take when
              needed.
            </p>
            <p>
              An Intelligent Demand Forecast AI-enabled solution is used to
              identify the causal patterns in the load data and the impact of
              weather data to develop several AI bots that achieve more
              accurate forecasting to optimize load control for peak
              notifications.
            </p>
            <p>
              Let our experienced consultants map business problems to
              technical solutions and deliver maximum business value. Our
              Solutions offerings come with a framework and toolkit for
              solving challenges in a specific vertical or domain. Build
              custom and analytical systems that enable efficient data
              management and maintenance for cluster infrastructure. Tap
              into a specialized skillset and use our years of experience
              focused on Big Data Analytics and Data Science.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-md shadow-md">
          <img
            src="/Intelligent/image_2022_08_10T10_58_02_635Z.png"
            alt="Wind turbine on a hillside at sunset with mountains in the background"
            className="h-[220px] w-full object-cover sm:h-[300px] md:h-[380px] lg:h-[440px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}