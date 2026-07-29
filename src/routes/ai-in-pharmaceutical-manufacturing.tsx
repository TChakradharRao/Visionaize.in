import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/ai-in-pharmaceutical-manufacturing")({
  head: () => ({
    meta: [
      { title: "AI in Pharmaceutical Manufacturing — Visionaize" },
      {
        name: "description",
        content:
          "See how AI, digital twins, and smart apps are helping pharmaceutical manufacturers improve operations, compliance, and visibility.",
      },
    ],
  }),
  component: PharmaceuticalManufacturingPage,
});

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  contactMe: boolean;
}

function PharmaHero() {
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
    <section className="bg-[#f3f5f7]">
      <div className="mx-auto max-w-6xl px-6 pt-2 pb-4 md:pt-10 md:pb-8">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center">
          {/* Left: headline + copy */}
          <div>
            <h1 className="text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              Stronger compliance. Smarter quality. Lower risk.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-ink/70">
              In a highly regulated industry, AI empowers pharmaceutical manufacturers to detect
              deviations early, ensure consistency, and stay audit-ready at all times.
            </p>

            <p className="mt-6 max-w-xl text-base font-semibold text-brand-navy">
              Step into a new era of intelligent, compliant manufacturing.
            </p>

            <a
              href="#whitepaper-form"
              className="mt-8 inline-flex items-center gap-3 group"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition group-hover:shadow-lg">
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                >
                  <defs>
                    <linearGradient id="diveInArrowGradientPharma" x1="0" y1="0" x2="16" y2="16">
                      <stop offset="0%" stopColor="#8CC63F" />
                      <stop offset="100%" stopColor="#1B75BC" />
                    </linearGradient>
                  </defs>
                  <path d="M1 2 L15 2 L8 13 Z" fill="url(#diveInArrowGradientPharma)" />
                </svg>
              </span>
              <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-lg font-semibold text-transparent">
                Dive in!
              </span>
            </a>
          </div>

          {/* Right: tilted mockup with the form card overlapping its right
              edge, vertically centered — same layout pattern used across
              the whitepaper landing pages. Uses relative/absolute
              positioning within a fixed-height wrapper so it stays
              predictable across breakpoints. */}
          <div className="relative mx-auto w-full max-w-2xl py-6 lg:mx-0 lg:py-10">
            <div className="mr-auto ml-0 w-[68%] -rotate-6 overflow-hidden rounded-md sm:w-[58%] lg:w-[52%] lg:-translate-x-4">
              <img
                src="https://visionaize.in/wp-content/uploads/2026/03/IndustrialMetaverse-Cover-Mockup-1.png"
                alt="AI in Pharmaceutical Manufacturing — whitepaper cover"
                className="aspect-[3/4] w-full object-cover"
                loading="eager"
              />
            </div>

            <div
              id="whitepaper-form"
              className="absolute right-0 top-1/2 z-10 w-[88%] -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl sm:w-[62%] sm:p-8 lg:w-[58%]"
            >
              <h2 className="text-xl font-bold text-brand-navy md:text-2xl">
                Get the white paper
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
      <div className="mx-auto max-w-4xl px-6 pt-2 pb-10 md:pt-4 md:pb-14">
        <div className="space-y-4 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          <p>
            Pharmaceutical manufacturing is facing rising complexity, strict regulations, and
            increasing cost pressures, while large volumes of operational data remain
            underutilized. AI addresses this gap by connecting fragmented systems and
            transforming raw data into actionable insights, enabling better visibility, faster
            decision-making, and improved operational efficiency across the value chain.
          </p>
          <p>
            By enabling predictive maintenance, real-time monitoring, and early detection of
            process deviations, AI helps reduce downtime, improve yield, and ensure consistent
            product quality. It also strengthens compliance and supports a shift from reactive to
            intelligent, data-driven manufacturing, making pharma operations more resilient,
            efficient, and future-ready.
          </p>
        </div>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-xl">What You'll Learn</h2>
        <ul className="mt-3 space-y-2 text-medium  leading-relaxed text-brand-ink/70 md:text-base">
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>
              How AI improves <span className="font-semibold text-brand-navy">yield, quality, and uptime</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>
              Key use cases across{" "}
              <span className="font-semibold text-brand-navy">production, quality, and supply chain</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>
              Real-world results including:
              <ul className="mt-2 space-y-1.5">
                <li className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/40" />
                  +20% yield improvement
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/40" />
                  -30% downtime reduction
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/40" />
                  -25% cost savings
                </li>
              </ul>
            </span>
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-xl">Why It Matters</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-ink/70 md:text-base">
          AI helps pharma companies:
        </p>
        <ul className="mt-3 space-y-2 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            Reduce batch failures
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            Ensure continuous compliance
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            Optimize processes in real time
          </li>
        </ul>

        <p className="mt-6 text-sm leading-relaxed text-brand-ink/70 md:text-base">
          Move from reactive manufacturing to a{" "}
          <span className="font-semibold text-brand-navy">Smart Pharma Plant</span>.
        </p>

        <h2 className="mt-6 text-lg font-bold text-brand-navy md:text-xl">Access the Whitepaper</h2>
        <p className="mt-3 text-medium  leading-relaxed text-brand-ink/70 md:text-base">
          The future of pharma manufacturing is predictive, intelligent, and autonomous.
        </p>

        <a
          href="#whitepaper-form"
          className="mt-4 inline-block text-medium font-bold text-brand-blue hover:underline md:text-base"
        >
          Download the Whitepaper &gt;&gt;
        </a>
      </div>
    </section>
  );
}

function PharmaCTA() {
  return (
    <section className="bg-gradient-to-r from-brand-lime via-teal-500 to-brand-blue">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
        <h2 className="text-3xl font-bold leading-tight text-white md:text-3xl">
          From Batch to Intelligent: Discover how AI is transforming pharma operations.
        </h2>

        <a
          href="#whitepaper-form"
          className="mt-8 inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold text-brand-ink shadow-md transition hover:brightness-95"
        >
          Download the white paper
        </a>
      </div>
    </section>
  );
}

function PharmaceuticalManufacturingPage() {
  return (
    <HeaderFooterWrapper>
      <PharmaHero />
      <OverviewSection />
      <PharmaCTA />
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