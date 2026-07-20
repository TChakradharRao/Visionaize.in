import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/cement-industry-whitepaper")({
  head: () => ({
    meta: [
      { title: "Cement Industry Whitepaper — Visionaize" },
      {
        name: "description",
        content:
          "Discover how AI-powered Digital Twin technology is helping leading cement manufacturers achieve sustainable operations, reduce CO2 emissions, and optimize production in real time.",
      },
    ],
  }),
  component: CementIndustryPage,
});

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  contactMe: boolean;
}

function CementHero() {
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
              Driving efficiency, sustainability, and performance forward
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-ink/70">
              Discover how AI-powered Digital Twin technology is helping leading cement
              manufacturers achieve sustainable operations, reduce CO&#8322; emissions, and optimize
              production in real time.
            </p>

            <p className="mt-6 max-w-xl text-base font-semibold text-brand-navy">
              Welcome to the AI-Driven Industrial Future of Cement. Access the full whitepaper to
              explore:
            </p>

            <a href="#whitepaper-form" className="mt-8 inline-flex items-center gap-3 group">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition group-hover:shadow-lg">
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4">
                  <defs>
                    <linearGradient id="diveInArrowGradientCement" x1="0" y1="0" x2="16" y2="16">
                      <stop offset="0%" stopColor="#8CC63F" />
                      <stop offset="100%" stopColor="#1B75BC" />
                    </linearGradient>
                  </defs>
                  <path d="M1 2 L15 2 L8 13 Z" fill="url(#diveInArrowGradientCement)" />
                </svg>
              </span>
              <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-xl font-semibold text-transparent">
                Dive in!
              </span>
            </a>
          </div>

          {/* Right: tilted mockup with the form card overlapping its right
              edge, vertically centered — same layout pattern used across
              the whitepaper landing pages.

              Fix for image getting cropped at the top-left corner:
              - object-contain instead of object-cover (SVGs shouldn't be
                force-cropped to an aspect ratio the way photos can be)
              - removed the negative translate-x that pushed the rotated
                box outside its own container's bounds
              - added horizontal padding + overflow-visible on the wrapper
                so the rotated corners have room and don't get clipped by
                any ancestor's overflow-hidden */}
          <div className="relative mx-auto w-full max-w-4xl overflow-visible px-4 py-6 lg:mx-0 lg:py-10">
            <div className="mr-auto ml-0 w-[68%] -rotate-6 rounded-md sm:w-[58%] lg:w-[51%]">
              <img
                src="https://visionaize.in/wp-content/uploads/2025/10/Group-1171277152-1.svg"
                alt="Cement Industry Whitepaper — cover"
                className="w-full rounded-md object-contain "
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
            The cement industry contributes nearly 7% of global CO&#8322; emissions and faces
            increasing scrutiny from regulators and investors. Traditional process control
            methods, dependent on manual intervention and static models, struggle to adapt to
            dynamic kiln operations, variable fuel quality, and rising efficiency demands.
          </p>
          <p>
            While data streams from sensors and automation systems are growing, much of this
            information remains fragmented and underutilized — limiting operators' ability to
            take timely, data-driven actions for performance improvement and sustainability.
          </p>
        </div>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-2xl">Solution</h2>
        <div className="mt-3 space-y-4 text-lg leading-relaxed text-brand-ink/80 md:text-base">
          <p>
            Visionaize bridges this gap through AI-powered Digital Twin platforms that combine
            real-time data, process intelligence, and machine learning to help operators make
            smarter, faster decisions.
          </p>
          <p>Our solution empowers cement plants to:</p>
        </div>
        <ul className="mt-3 space-y-2 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Optimize kiln and grinding operations to reduce energy consumption</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Predict failures early to minimize downtime and maintenance costs</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Monitor emissions and fuel mix in real time to support ESG targets</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Enhance operational visibility across the entire production line</span>
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-xl">
          The Future of Cement Manufacturing
        </h2>
        <p className="mt-3 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          AI and Digital Twin technology are transforming cement plants into intelligent,
          self-optimizing systems that drive higher efficiency, lower emissions, and improved
          profitability.
        </p>
        <p className="mt-3 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          Access the full whitepaper to explore:
        </p>
        <ul className="mt-3 space-y-2 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>
              How Visionaize's AI-driven optimization enhances clinker quality and fuel efficiency
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>
              How hybrid models combining first-principles and machine learning deliver accuracy
              and reliability
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>
              Real-world results showing fuel savings, emission reduction, and longer equipment
              life
            </span>
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-xl">Access the Whitepaper</h2>
        <p className="mt-3 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          Learn how Visionaize is helping global cement leaders reimagine operations with AI and
          Digital Twin technology — achieving sustainability and performance excellence.
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

function CementCTA() {
  return (
    <section className="bg-gradient-to-r from-brand-lime via-teal-500 to-brand-blue">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
        <h2 className="text-3xl font-bold leading-tight text-white md:text-3xl">
          Reimagining Cement Production with AI: What it is and how it drives value.
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

function CementIndustryPage() {
  return (
    <HeaderFooterWrapper>
      <CementHero />
      <OverviewSection />
      <CementCTA />
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