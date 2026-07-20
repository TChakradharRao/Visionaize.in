import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/power-industry-case-study")({
  head: () => ({
    meta: [
      { title: "Power Industry Case Study — Visionaize" },
      {
        name: "description",
        content:
          "Discover how industries are transforming operations with AI-powered Digital Twins and intelligent automation. Explore how Visionaize helps organizations reduce downtime, optimize energy usage, and improve asset reliability.",
      },
    ],
  }),
  component: PowerCaseStudyPage,
});

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  contactMe: boolean;
}

function CaseStudyHero() {
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
    // or a dedicated case-study-download handler) when the backend is ready.
    setSubmitted(true);
  }

  return (
    <section id="problem-content">
      <div className="mx-auto max-w-7xl px-6 pt-2 pb-6 md:pt-10 md:pb-8">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center">
          {/* Left: headline + copy */}
          <div>
            <h1 className="text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              Transforming Industrial Operations with AI &amp; Digital Twins
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-ink/70">
              Discover how industries are transforming operations with AI-powered Digital Twins
              and intelligent automation. Visionaize helps organizations reduce downtime, optimize
              energy usage, improve asset reliability, and drive smarter decisions through
              real-time operational intelligence.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-ink/70">
              Explore our case studies to see how businesses are accelerating efficiency,
              sustainability, and digital transformation.
            </p>

            <a href="#whitepaper-form" className="mt-8 inline-flex items-center gap-3 group">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition group-hover:shadow-lg">
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4">
                  <defs>
                    <linearGradient id="diveInArrowGradientCaseStudy" x1="0" y1="0" x2="16" y2="16">
                      <stop offset="0%" stopColor="#8CC63F" />
                      <stop offset="100%" stopColor="#1B75BC" />
                    </linearGradient>
                  </defs>
                  <path d="M1 2 L15 2 L8 13 Z" fill="url(#diveInArrowGradientCaseStudy)" />
                </svg>
              </span>
              <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-xl font-semibold text-transparent">
                Dive in!
              </span>
            </a>
          </div>

          {/* Right: tilted mockup with the form card overlapping its right
              edge, vertically centered — same layout pattern used across
              the whitepaper/case-study landing pages. */}
          <div className="relative mx-auto w-full max-w-5xl overflow-visible px-4 py-6 lg:mx-0 lg:py-12">
            <div className="mr-auto ml-0 w-[80%] -rotate-6 rounded-md sm:w-[68%] lg:w-[62%]">
              <img
                src="https://visionaize.in/wp-content/uploads/2026/05/Group-1171277152-1-1.png"
                alt="Power Industry Case Study — cover"
                className="w-full rounded-md object-contain"
                loading="eager"
              />
            </div>

            <div
              id="whitepaper-form"
              className="absolute right-0 top-1/2 z-10 w-[88%] -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl sm:w-[58%] sm:p-8 lg:w-[52%]"
            >
              <h2 className="text-xl font-bold text-brand-navy md:text-2xl">
                Access the Case Study
              </h2>

              {submitted ? (
                <div className="mt-6 rounded-lg bg-brand-mist/60 p-6 text-brand-ink/80">
                  Thanks! Your case study access request has been received.
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
        <h2 className="text-lg font-bold text-brand-navy md:text-2xl">What You'll Discover</h2>
        <ul className="mt-3 space-y-2 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Real-world industrial transformation use cases</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>AI-driven operational optimization strategies</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Predictive maintenance and asset reliability improvements</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Measurable business outcomes and performance gains</span>
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-2xl">Why Visionaize?</h2>
        <div className="mt-3 space-y-4 text-lg leading-relaxed text-brand-ink/80 md:text-base">
          <p>
            Visionaize delivers advanced AI and Digital Twin solutions that empower industries to
            transform complex operations into intelligent, connected, and high-performing
            ecosystems.
          </p>
          <p>Our solutions help organizations to:</p>
        </div>
        <ul className="mt-3 space-y-2 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Improve operational efficiency</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Reduce downtime and maintenance costs</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Enhance asset visibility and monitoring</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Enable predictive and prescriptive decision-making</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>Support sustainability and ESG initiatives</span>
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-bold text-brand-navy md:text-xl">Download the Case Study</h2>
        <p className="mt-3 text-medium leading-relaxed text-brand-ink/70 md:text-base">
          Fill out the form to access the case study and learn how Visionaize is helping
          industries accelerate digital transformation through AI-powered innovation.
        </p>

        <a
          id="main-inner-contact-post1"
          href="#whitepaper-form"
          className="mt-4 inline-block text-medium font-bold text-brand-blue hover:underline md:text-base"
        >
          Access the Case Study Now &gt;&gt;
        </a>
      </div>
    </section>
  );
}

function CaseStudyCTA() {
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
          Download the Case Study
        </a>
      </div>
    </section>
  );
}

function PowerCaseStudyPage() {
  return (
    <HeaderFooterWrapper>
      <CaseStudyHero />
      <OverviewSection />
      <CaseStudyCTA />
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