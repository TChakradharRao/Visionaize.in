import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/power-industry-whitepaper")({
  head: () => ({
    meta: [
      { title: "Power Industry Whitepaper — Visionaize" },
      {
        name: "description",
        content:
          "Discover how AI-powered Digital Twins and Agentic AI are enabling smarter operations through predictive intelligence, real-time monitoring, and optimized performance in the Power & Energy sector.",
      },
    ],
  }),
  component: PowerIndustryPage,
});

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  contactMe: boolean;
}

function PowerHero() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    contactMe: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire this up to your actual lead-capture endpoint (e.g. api.submitContact
    // or a dedicated whitepaper-download handler) when the backend is ready.
    setSubmitted(true);
  }

  return (
    <section id="problem-content">
      <div className="mx-auto max-w-7xl px-6 pt-2 pb-6 md:pt-10 md:pb-8">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center">
          {/* Left: headline + copy */}
          <div>
            <h1 className="text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              The Digital Frontier of Power &amp; Energy
            </h1>

            <p className="mt-4 max-w-2xl text-base font-semibold text-brand-navy">
              Orchestrating Efficiency through AI, Digital Twins, and Intelligent Operations
            </p>

            <p className="mt-6 max-w-xl text-medium leading-relaxed text-brand-ink/70">
              India's Power &amp; Energy sector is rapidly evolving, demanding smarter, efficient,
              and sustainable operations.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-ink/70">
              Discover how AI-powered Digital Twins and Agentic AI are enabling smarter operations
              through predictive intelligence, real-time monitoring, and optimized performance.
            </p>

            <p className="mt-6 max-w-xl text-base font-semibold text-brand-navy">
              Welcome to the Future of Intelligent Power Operations.
            </p>

            <a href="#whitepaper-form" className="mt-8 inline-flex items-center gap-3 group">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition group-hover:shadow-lg">
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4">
                  <defs>
                    <linearGradient id="diveInArrowGradientPower" x1="0" y1="0" x2="16" y2="16">
                      <stop offset="0%" stopColor="#8CC63F" />
                      <stop offset="100%" stopColor="#1B75BC" />
                    </linearGradient>
                  </defs>
                  <path d="M1 2 L15 2 L8 13 Z" fill="url(#diveInArrowGradientPower)" />
                </svg>
              </span>
              <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-xl font-semibold text-transparent">
                Dive in!
              </span>
            </a>
          </div>

          {/* Right: tilted mockup with the form card overlapping its right
              edge, vertically centered — same layout pattern used across
              the whitepaper landing pages. */}
          <div className="relative mx-auto w-full max-w-4xl overflow-visible px-4 py-6 lg:mx-0 lg:py-10">
            <div className="mr-auto ml-0 w-[70%] -rotate-6 rounded-md sm:w-[58%] lg:w-[51%]">
              <img
                src="https://visionaize.in/wp-content/uploads/2026/05/Group-1171277152-1-768x758.png"
                alt="Power Industry Whitepaper — cover"
                className="w-full rounded-md object-contain"
                loading="eager"
              />
            </div>

            <div
              id="whitepaper-form"
              className="absolute right-0 top-1/2 z-10 w-[88%] -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl sm:w-[62%] sm:p-8 lg:w-[58%]"
            >
              <h2 className="text-xl font-bold text-brand-navy md:text-2xl">
                Access the whitepaper
              </h2>

              {submitted ? (
                <div className="mt-6 rounded-lg bg-brand-mist/60 p-6 text-brand-ink/80">
                  Thanks! Your whitepaper access request has been received.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="First name*"
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    className="w-full rounded-md border border-brand-navy/20 px-4 py-3 text-brand-ink placeholder:text-brand-ink/50 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last name*"
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    className="w-full rounded-md border border-brand-navy/20 px-4 py-3 text-brand-ink placeholder:text-brand-ink/50 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Company name*"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    className="w-full rounded-md border border-brand-navy/20 px-4 py-3 text-brand-ink placeholder:text-brand-ink/50 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Business Email*"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-md border border-brand-navy/20 px-4 py-3 text-brand-ink placeholder:text-brand-ink/50 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />

                  <label className="flex items-start gap-3 pt-1 text-sm text-brand-ink/70">
                    <input
                      type="checkbox"
                      checked={form.contactMe}
                      onChange={(e) => setForm((f) => ({ ...f, contactMe: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 rounded border-brand-navy/30"
                    />
                    Please have a Visionaize Digital Twin expert contact me
                  </label>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-full bg-gradient-to-r from-brand-lime to-brand-blue py-4 text-base font-semibold text-white shadow-sm transition hover:brightness-95"
                  >
                    Access Now
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <section className="bg-[#f3f5f7]">
      <div className="mx-auto max-w-6xl px-6 pt-4 pb-10 md:pt-5 md:pb-14">
        <h2 className="text-lg font-bold text-brand-navy md:text-2xl">Problem</h2>
        <div className="mt-3 space-y-4 text-lg leading-relaxed text-brand-ink/80 md:text-base">
          <p>
            Power utilities and thermal plants face major operational challenges including
            unplanned outages, fluctuating coal quality, rising fuel costs, equipment degradation,
            and stricter ESG regulations. Traditional monitoring and maintenance approaches are
            often reactive, limiting operational visibility and increasing inefficiencies.
          </p>
          <p>
            Even small heat rate deviations and equipment failures can lead to significant
            financial losses, impacting plant profitability and reliability.
          </p>
        </div>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-2xl">Solution</h2>
        <div className="mt-3 space-y-4 text-lg leading-relaxed text-brand-ink/80 md:text-base">
          <p>
            Visionaize enables intelligent power operations through AI-driven Digital Twin
            platforms that combine real-time plant data, physics-based models, and predictive
            analytics to improve operational performance and asset reliability.
          </p>
          <p>Our solutions help power plants to:</p>
        </div>
        <ul className="mt-3 space-y-2 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Optimize heat rate and fuel efficiency</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Predict equipment failures before downtime occurs</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Improve turbine and boiler reliability</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Reduce operational and maintenance costs</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Monitor emissions and support ESG initiatives</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Enable centralized visibility across plant operations</span>
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-xl">
          The Future of Power Generation
        </h2>
        <p className="mt-3 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          AI and Digital Twin technologies are transforming conventional power plants into
          intelligent, self-optimizing energy ecosystems that improve efficiency, reliability, and
          sustainability.
        </p>
        <p className="mt-3 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          Access the full whitepaper to explore:
        </p>
        <ul className="mt-3 space-y-2 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>How Agentic AI enables predictive and prescriptive operations</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>How Digital Twins improve asset performance and plant efficiency</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Real-world operational benefits including reduced outages and fuel savings</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>The roadmap for building next-generation smart power plants</span>
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-xl">Access the Whitepaper</h2>
        <p className="mt-3 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          Learn how Visionaize is helping power and energy leaders accelerate digital
          transformation with AI-powered Digital Twin solutions built for the evolving energy
          landscape.
        </p>

        <a
          id="main-inner-contact-post1"
          href="#whitepaper-form"
          className="mt-4 inline-block text-medium font-bold text-brand-blue hover:underline md:text-base"
        >
          Download the whitepaper now &gt;&gt;
        </a>
      </div>
    </section>
  );
}

function PowerCTA() {
  return (
    <section className="bg-gradient-to-r from-brand-lime via-teal-500 to-brand-blue">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
        <h2 className="text-3xl font-bold leading-tight text-white md:text-3xl">
          The Next Generation of Intelligent Power Operations Starts Now
        </h2>

        <a
          href="#whitepaper-form"
          className="mt-8 inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold text-brand-ink shadow-md transition hover:brightness-95"
        >
          Download the Whitepaper
        </a>
      </div>
    </section>
  );
}

function PowerIndustryPage() {
  return (
    <HeaderFooterWrapper>
      <PowerHero />
      <OverviewSection />
      <PowerCTA />
    </HeaderFooterWrapper>
  );
}

function HeaderFooterWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="bg-white text-brand-ink">{children}</main>
      <Footer />
    </>
  );
}