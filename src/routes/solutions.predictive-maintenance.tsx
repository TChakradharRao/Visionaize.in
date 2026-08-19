import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute('/solutions/predictive-maintenance')({
  component: RouteComponent,
})

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<"challenge" | "solution" | "results">("challenge");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    {
      question: "What are some of the key benefits of Predictive Maintenance?",
      answer:
        "Predictive Maintenance solutions from Visionaize tap into an array of tools and capabilities that, together, minimize a plant's downtime, and maximizing productivity. In addition to maximizing output, costs for parts and labor can be reduced, while also minimizing carbon emissions.",
    },
    {
      question: "What are the problems that Predictive Maintenance solve?",
      answer: "Content coming soon.",
    },
    {
      question: "What makes Predictive Maintenance unique?",
      answer: "Content coming soon.",
    },
    {
      question: "How can I learn more about Predictive Maintenance?",
      answer: "Content coming soon.",
    },
  ];

  const caseTabs = [
    { key: "challenge" as const, label: "Challenge" },
    { key: "solution" as const, label: "Solution" },
    { key: "results" as const, label: "Results" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-4 pb-4 sm:px-6 md:pt-6 md:pb-6">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          {/* Left: copy */}
          <div>
            <h1 className="text-[28px] font-light leading-tight text-[#7CB342] sm:text-4xl md:text-5xl lg:text-6xl">
              Predictive
              <br />
              Maintenance (PdM)
            </h1>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#1B3B6F] sm:text-base md:mt-6 md:space-y-5 lg:text-lg">
              <p>
                Over time equipment&apos;s performance and health get affected
                because of mechanical wear &amp; tear and the impact of
                upstream operations. When these problems are not detected
                early enough, costly shutdowns can occur, as a result.
              </p>
              <p>
                With Visionaize&apos;s Predictive Maintenance solution,
                facility owners have the tools to detect anomalies, diagnose
                the root causes and take corrective actions early enough to
                avoid unplanned shutdowns.
              </p>
              <p>Request a demo to see how it works.</p>
            </div>

            <Link
              to="/request-a-demo"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#8DC63F] to-[#1B8DC9] px-6 py-2.5 text-xs font-semibold text-white shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg sm:px-8 sm:py-3 sm:text-sm lg:text-base"
            >
              Request a demo
            </Link>
          </div>

          {/* Right: image */}
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img
              src="/predictive-maintenance/iStock-1421664619-2048x1365.jpg"
              alt="Facility technician using a tablet to monitor equipment for predictive maintenance"
              className="aspect-[4/3] h-auto w-full object-cover md:aspect-auto md:h-full"
            />
          </div>
        </div>
      </section>

      {/* Bottom accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#8DC63F] via-[#3AA8A0] to-[#1B8DC9] sm:h-2" />

      {/* Common Problems, Unique Solutions */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
        <h2 className="text-center text-xl font-light text-[#0A0A0A] sm:text-3xl md:text-4xl lg:text-5xl">
          Common Problems, Unique Solutions
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:mt-10 md:grid-cols-4 md:gap-6">
          {/* Advanced ML */}
          <div className="text-center">
            <h3 className="text-base font-semibold text-[#1B3B6F] sm:text-lg lg:text-xl">Advanced ML</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#1B3B6F] sm:text-base lg:text-[17px]">
              Detect the smallest anomalies, avoid{" "}
              <span className="text-[#3AA8A0]">false positives/negatives</span>{" "}
              using advanced ML models.
            </p>
          </div>

          {/* Root Cause Analysis */}
          <div className="text-center">
            <h3 className="text-base font-semibold text-[#1B3B6F] sm:text-lg lg:text-xl">
              Root Cause Analysis
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#1B3B6F] sm:text-base lg:text-[17px]">
              FMEA and GenAI-based approach to detecting failure mode and{" "}
              <span className="text-[#1B8DC9]">providing recommendations</span>.
            </p>
          </div>

          {/* What-If Analysis */}
          <div className="text-center">
            <h3 className="text-base font-semibold text-[#1B3B6F] sm:text-lg lg:text-xl">
              What-If Analysis
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#1B3B6F] sm:text-base lg:text-[17px]">
              Simulate varying conditions based on AI and domain expertise to
              avoid <span className="text-[#3AA8A0]">unplanned shutdown</span>.
            </p>
          </div>

          {/* Integrated */}
          <div className="text-center">
            <h3 className="text-base font-semibold text-[#1B3B6F] sm:text-lg lg:text-xl">Integrated</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#1B3B6F] sm:text-base lg:text-[17px]">
              Insight, simulations, prescriptive actions{" "}
              <span className="text-[#1B8DC9]">rolled into a single solution</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Move from Reactive to Proactive */}
      <section className="bg-[#C7ECF5] px-4 py-12 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-xl font-light text-[#0A0A0A] sm:text-3xl md:text-4xl lg:text-5xl">
            Move from Reactive to Proactive
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-[#1B3B6F] sm:text-base md:mt-6 lg:text-lg">
            Unplanned downtime is a large impediment to a facility&apos;s
            productivity. With Visionaize&apos;s Predictive Maintenance
            solution, Maintenance teams have the tools to get ahead of
            problems before they occur. The result is less downtime,
            smoother operations and more continuous output.
          </p>
        </div>
      </section>

      {/* Avoid Unplanned Shutdowns with Early Detection */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Left: image */}
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img
              src="/predictive-maintenance/woman-hard-hat-sits-computer-factory-with-computer-screen-showing-model-blueprint_861143-193-1-1-1-3-2048x1620.jpg"
              alt="Technician monitoring equipment health and anomaly detection dashboards"
              className="aspect-[4/3] h-auto w-full object-cover md:aspect-auto md:h-full"
            />
          </div>

          {/* Right: copy */}
          <div>
            <h2 className="text-xl font-light leading-tight text-[#0A0A0A] sm:text-3xl md:text-4xl lg:text-5xl">
              Avoid Unplanned Shutdowns
              <br className="hidden sm:block" />
              with Early Detection
            </h2>

            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[#1B3B6F] sm:text-base md:mt-8 md:space-y-4 lg:text-lg">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1B3B6F]" />
                Avoid production loss, increase uptime
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1B3B6F]" />
                Reduce OPEX of spare parts and labor
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1B3B6F]" />
                Increase device lifespans
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1B3B6F]" />
                Minimize energy consumption and carbon emissions
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Case Study: Tackling Unplanned Shutdowns of the Compressor Unit */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
          {/* Left: copy + tabs */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#7CB342] lg:text-sm">
              Case Study
            </p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-[#0A0A0A] sm:text-2xl md:text-3xl lg:text-4xl">
              Tackling Unplanned Shutdowns of the Compressor Unit
            </h2>

            {/* Tabs — horizontally scrollable so they never wrap unevenly on narrow screens */}
            <div className="mt-5 flex gap-4 overflow-x-auto border-b border-gray-200 sm:mt-6 sm:gap-6">
              {caseTabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActiveTab(t.key)}
                  className={`shrink-0 whitespace-nowrap pb-3 text-xs font-semibold transition-colors sm:text-sm lg:text-base ${
                    activeTab === t.key
                      ? "border-b-2 border-[#1B8DC9] text-[#1B8DC9]"
                      : "text-[#0A0A0A] hover:text-[#1B8DC9]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="mt-5 rounded-lg border border-gray-200 p-4 sm:mt-6 sm:p-5">
              {activeTab === "challenge" && (
                <p className="text-sm leading-relaxed text-[#1B3B6F] sm:text-base lg:text-[17px]">
                  A midstream operator was experiencing shutdowns of the
                  compressor in their gas compression system, leading to
                  substantial losses in production. Out of 5 shutdowns, 4
                  were unplanned, costing up to $210,000 per hour and 1.5
                  days per shutdown.
                </p>
              )}
              {activeTab === "solution" && (
                <p className="text-sm leading-relaxed text-[#1B3B6F] sm:text-base lg:text-[17px]">
                  Solution content coming soon.
                </p>
              )}
              {activeTab === "results" && (
                <p className="text-sm leading-relaxed text-[#1B3B6F] sm:text-base lg:text-[17px]">
                  Results content coming soon.
                </p>
              )}
            </div>
          </div>

          {/* Right: image */}
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img
              src="/predictive-maintenance/the-area-of-the-equipment-to-cool-the-oil-product-equipment-for-primary-oil-refining-SBI-300930065-scaled.jpg"
              alt="Gas compression system pipework and valves at an industrial facility"
              className="aspect-[4/3] h-auto w-full object-cover md:aspect-auto md:h-full"
            />
          </div>
        </div>
      </section>

      {/* Connect with a Solution Specialist */}
      <section className="bg-[#8DC63F] px-4 py-5 sm:px-6 md:py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-6">
          <h2 className="text-base font-medium text-[#0A0A0A] sm:text-lg md:text-xl lg:text-2xl">
            Connect with a Solution Specialist
          </h2>

          <Link
            to="/contact"
            className="flex-shrink-0 rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#1B8DC9] shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg sm:px-6 sm:py-2.5 sm:text-sm lg:text-base"
          >
            Connect with us
          </Link>
        </div>
      </section>

      {/* Learn More about Predictive Maintenance - FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20">
        <h2 className="text-xl font-light text-[#0A0A0A] sm:text-3xl md:text-4xl lg:text-5xl">
          Learn More about Predictive Maintenance
        </h2>

        <div className="mt-6 divide-y divide-gray-200 border-t border-gray-200">
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full items-start gap-3 py-4 text-left sm:items-center"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center text-base font-semibold text-[#0A0A0A] sm:mt-0 sm:text-lg lg:text-xl">
                  {openFaq === index ? "−" : "+"}
                </span>
                <span className="text-sm font-semibold text-[#1B3B6F] sm:text-base lg:text-lg">
                  {item.question}
                </span>
              </button>

              {openFaq === index && (
                <p className="pb-5 pl-8 pr-2 text-sm leading-relaxed text-[#8A8A8A] sm:text-base lg:text-[17px]">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            to="/request-a-demo"
            className="rounded-full bg-gradient-to-r from-[#8DC63F] to-[#1B8DC9] px-6 py-2.5 text-xs font-semibold text-white shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg sm:px-8 sm:py-3 sm:text-sm lg:text-base"
          >
            Connect with us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}