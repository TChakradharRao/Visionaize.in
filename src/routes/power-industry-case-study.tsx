import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput } from "@/components/ui/floating-field";

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

/**
 * A text/email input with a floating label: the label sits over the input
 * like a placeholder until the field is focused or has a value, then it
 * animates up and shrinks to sit above the input border.
 *
 * Relies on the `peer` + `peer-focus`/`peer-[:not(:placeholder-shown)]`
 * Tailwind pattern, which needs the input's placeholder to be a single
 * space (rather than empty) so `:placeholder-shown` behaves correctly
 * when the field is empty and unfocused.
 */
function FloatingLabelInput({
  id,
  label,
  type = "text",
  required = true,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        required={required}
        placeholder=" "
        value={value}
        onChange={onChange}
        className="peer w-full rounded-md border border-brand-navy/20 px-4 pb-2.5 pt-5 text-brand-ink placeholder-transparent focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/50 transition-all duration-150 ease-out peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-brand-blue peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-brand-ink/60"
      >
        {label}
      </label>
    </div>
  );
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
    <section id="problem-content" className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-6">
          {/* Left: headline + copy */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold leading-tight text-brand-navy sm:text-3xl md:text-4xl">
              Transforming Industrial Operations with AI &amp; Digital Twins
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-brand-ink/70 sm:mt-6 sm:text-base lg:mx-0">
              Discover how industries are transforming operations with AI-powered Digital Twins
              and intelligent automation. Visionaize helps organizations reduce downtime, optimize
              energy usage, improve asset reliability, and drive smarter decisions through
              real-time operational intelligence.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-ink/70 sm:mt-4 sm:text-base lg:mx-0">
              Explore our case studies to see how businesses are accelerating efficiency,
              sustainability, and digital transformation.
            </p>

            <a href="#whitepaper-form" className="mt-6 inline-flex items-center gap-3 group sm:mt-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition group-hover:shadow-lg sm:h-14 sm:w-14">
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
              <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-lg font-semibold text-transparent sm:text-xl">
                Dive in!
              </span>
            </a>
          </div>

          {/* Right: tilted mockup with the form card overlapping its right
              edge, vertically centered on large screens and stacked on small screens. */}
          <div className="relative mx-auto w-full max-w-5xl px-0 py-2 sm:px-2 lg:px-4 lg:py-8">
            <div className="mx-auto w-full max-w-[80%] sm:max-w-[70%] lg:mr-auto lg:ml-0 lg:w-[62%] lg:-rotate-6">
              <img
                src="/white-paper/power-industry-case-study.png"
                alt="Power Industry Case Study — cover"
                className="w-full rounded-md object-contain"
                loading="eager"
              />
            </div>

            <div
              id="whitepaper-form"
              className="relative z-10 mx-auto mt-6 w-full max-w-xl rounded-2xl bg-white p-4 shadow-2xl sm:p-6 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[52%] lg:-translate-y-1/2 lg:p-8"
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
                  <FloatingLabelInput
                    id="firstName"
                    label="First name*"
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  />
                  <FloatingLabelInput
                    id="lastName"
                    label="Last name*"
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  />
                  <FloatingLabelInput
                    id="company"
                    label="Company name*"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  />
                  <FloatingLabelInput
                    id="email"
                    label="Business Email*"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
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
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:pt-5 md:pb-14">
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

        
       <a   id="main-inner-contact-post1"
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
      <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
        <h2 className="text-3xl font-bold leading-tight text-white md:text-3xl">
          The Next Generation of Intelligent Power Operations Starts Now
        </h2>

        
        <a  href="#whitepaper-form"
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