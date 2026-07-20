import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/renewable-energy-whitepaper")({
  head: () => ({
    meta: [
      { title: "Renewable Energy Whitepaper — Visionaize" },
      {
        name: "description",
        content:
          "Discover how Visionaize enables predictive maintenance, autonomous workflows, and intelligent renewable energy operations through AI-powered 3D Digital Twins and Agentic AI.",
      },
    ],
  }),
  component: RenewableEnergyPage,
});

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  contactMe: boolean;
}

function RenewableHero() {
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
              The Renewable Energy Revolution with 3D Digital Twins &amp; Agentic AI
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-ink/70">
              The renewable energy sector is evolving with AI-driven operations, immersive
              visualization, and smarter asset management.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-ink/70">
              Discover how Visionaize enables predictive maintenance, autonomous workflows, and
              intelligent renewable energy operations.
            </p>

            <a href="#whitepaper-form" className="mt-8 inline-flex items-center gap-3 group">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition group-hover:shadow-lg">
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4">
                  <defs>
                    <linearGradient id="diveInArrowGradientRenewable" x1="0" y1="0" x2="16" y2="16">
                      <stop offset="0%" stopColor="#8CC63F" />
                      <stop offset="100%" stopColor="#1B75BC" />
                    </linearGradient>
                  </defs>
                  <path d="M1 2 L15 2 L8 13 Z" fill="url(#diveInArrowGradientRenewable)" />
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
          <div className="relative mx-auto w-full max-w-5xl overflow-visible px-4 py-6 lg:mx-0 lg:py-12">
            <div className="mr-auto ml-0 w-[80%] -rotate-6 rounded-md sm:w-[68%] lg:w-[62%]">
              <img
                src="https://visionaize.in/wp-content/uploads/2026/05/Group-1171277152-1-768x758.png"
                alt="Renewable Energy Whitepaper — cover"
                className="w-full rounded-md object-contain"
                loading="eager"
              />
            </div>

            <div
              id="whitepaper-form"
              className="absolute right-0 top-1/2 z-10 w-[88%] -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl sm:w-[58%] sm:p-8 lg:w-[52%]"
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
            Renewable energy operators today face growing challenges including intermittency,
            decentralized infrastructure, aging assets, remote inspections, equipment degradation,
            and increasing ESG compliance requirements. Managing thousands of distributed
            renewable assets using traditional systems limits operational visibility and slows
            decision-making.
          </p>
          <p>
            Conventional monitoring platforms often lack real-time spatial context, making it
            difficult to identify structural fatigue, thermal anomalies, and performance
            bottlenecks before they impact generation and reliability.
          </p>
        </div>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-2xl">Solution</h2>
        <div className="mt-3 space-y-4 text-lg leading-relaxed text-brand-ink/80 md:text-base">
          <p>
            Visionaize delivers an immersive AI-powered Digital Twin platform that combines
            high-fidelity 3D visualization, real-time IoT telemetry, enterprise asset management,
            and Agentic AI to transform renewable energy operations.
          </p>
          <p>Our solutions help renewable energy operators to:</p>
        </div>
        <ul className="mt-3 space-y-2 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Enable immersive 3D visualization of renewable assets</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Predict equipment failures before outages occur</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Improve wind and solar asset reliability</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Optimize renewable energy generation and efficiency</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Reduce maintenance costs and inspection time</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Enable remote inspections and safer maintenance planning</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Automate maintenance workflows using Agentic AI</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Improve ESG reporting and digital transparency</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Extend asset lifespan through predictive intelligence</span>
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-xl">
          The Future of Renewable Energy Operations
        </h2>
        <p className="mt-3 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          AI and Digital Twin technologies are transforming conventional power plants into
          intelligent, self-optimizing energy ecosystems that improve efficiency, reliability, and
          sustainability.
        </p>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-xl">Access the Whitepaper</h2>
        <p className="mt-3 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          Learn how Visionaize is helping renewable energy leaders accelerate digital
          transformation through AI-powered 3D Digital Twins and intelligent asset management
          solutions built for the future of sustainable energy operations.
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

function RenewableCTA() {
  return (
    <section className="bg-gradient-to-r from-brand-lime via-teal-500 to-brand-blue">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
        <h2 className="text-3xl font-bold leading-tight text-white md:text-3xl">
          The Next Generation of Intelligent Renewable Operations Starts Now
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

function RenewableEnergyPage() {
  return (
    <HeaderFooterWrapper>
      <RenewableHero />
      <OverviewSection />
      <RenewableCTA />
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