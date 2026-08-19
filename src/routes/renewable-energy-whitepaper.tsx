import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput } from "@/components/ui/floating-field";
import { api } from "@/lib/api";

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

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  contactMe: false,
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function RenewableHero() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage(null);

    try {
      await api.submitRenewableEnergyWhitepaper({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        contact_me: form.contactMe,
        source_page: "/renewable-energy-whitepaper",
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your request. Please try again."
      );
    }
  }

  const submitting = status === "submitting";

  return (
    <section id="problem-content">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-8 sm:px-6 md:pt-10 md:pb-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center lg:gap-9">
          {/* Left: headline + copy */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold leading-tight text-brand-navy sm:text-3xl md:text-4xl">
              The Renewable Energy Revolution with 3D Digital Twins &amp; Agentic AI
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-ink/70 sm:mt-6 lg:mx-0">
              The renewable energy sector is evolving with AI-driven operations, immersive
              visualization, and smarter asset management.
            </p>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-ink/70 lg:mx-0">
              Discover how Visionaize enables predictive maintenance, autonomous workflows, and
              intelligent renewable energy operations.
            </p>

            <a
              href="#whitepaper-form"
              className="group mt-7 inline-flex items-center gap-3 sm:mt-8"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition group-hover:shadow-lg sm:h-14 sm:w-14">
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
              <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-lg font-semibold text-transparent sm:text-xl">
                Dive in!
              </span>
            </a>
          </div>

          {/* Right: mockup image with the form. Overlapping "tilted card"
              treatment only kicks in at lg+; on mobile/tablet the two
              stack in normal document flow so nothing clips or overlaps. */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-5xl">
            <div className="mx-auto w-[70%] max-w-xs sm:w-[55%] sm:max-w-sm lg:absolute lg:left-0 lg:top-1/2 lg:mx-0 lg:w-[62%] lg:max-w-none lg:-translate-y-1/2 lg:-rotate-6">
              <img
                src="/white-paper/Group-1171277152-1-768x758.png"
                alt="Renewable Energy Whitepaper — cover"
                className="w-full rounded-md object-contain shadow-lg lg:shadow-none"
                loading="eager"
              />
            </div>

            <div
              id="whitepaper-form"
              className="relative z-10 mt-6 w-full rounded-2xl bg-white p-4 shadow-2xl scroll-mt-24 sm:p-6 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[52%] lg:-translate-y-1/2"
            >
              <h2 className="text-xl font-bold text-brand-navy md:text-2xl">
                Access the whitepaper
              </h2>

              {status === "success" ? (
                <div
                  role="status"
                  className="mt-6 rounded-lg bg-brand-mist/60 p-6 text-brand-ink/80"
                >
                  Thanks! Your whitepaper access request has been received — check your inbox
                  for the download link.
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
                  <div className="grid gap-3">
                    <FloatingInput
                      type="text"
                      name="first_name"
                      label="First name*"
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                      className="border-brand-navy/20 focus:border-brand-blue"
                    />
                    <FloatingInput
                      type="text"
                      name="last_name"
                      label="Last name*"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                      className="border-brand-navy/20 focus:border-brand-blue"
                    />
                  </div>
                  <FloatingInput
                    type="text"
                    name="company"
                    label="Company name*"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    className="border-brand-navy/20 focus:border-brand-blue"
                  />
                  <FloatingInput
                    type="email"
                    name="email"
                    label="Business Email*"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="border-brand-navy/20 focus:border-brand-blue"
                  />

                  <label className="flex items-start gap-3 text-sm text-brand-ink/70">
                    <input
                      type="checkbox"
                      checked={form.contactMe}
                      onChange={(e) => setForm((f) => ({ ...f, contactMe: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-navy/30"
                    />
                    Please have a Visionaize Digital Twin expert contact me
                  </label>

                  {status === "error" && (
                    <p role="alert" className="text-sm font-medium text-red-600">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 w-full rounded-full bg-gradient-to-r from-brand-lime to-brand-blue py-3 text-base font-semibold text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : "Access Now"}
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
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-10 sm:px-6 md:pt-12 md:pb-14">
        <h2 className="text-lg font-bold text-brand-navy md:text-2xl">Problem</h2>
        <div className="mt-3 space-y-4 text-base leading-relaxed text-brand-ink/80">
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

        <h2 className="mt-10 text-lg font-bold text-brand-navy md:text-2xl">Solution</h2>
        <div className="mt-3 space-y-4 text-base leading-relaxed text-brand-ink/80">
          <p>
            Visionaize delivers an immersive AI-powered Digital Twin platform that combines
            high-fidelity 3D visualization, real-time IoT telemetry, enterprise asset management,
            and Agentic AI to transform renewable energy operations.
          </p>
          <p>Our solutions help renewable energy operators to:</p>
        </div>
        <ul className="mt-4 grid gap-x-8 gap-y-2 text-base leading-relaxed text-brand-ink/70 sm:grid-cols-2">
          {[
            "Enable immersive 3D visualization of renewable assets",
            "Predict equipment failures before outages occur",
            "Improve wind and solar asset reliability",
            "Optimize renewable energy generation and efficiency",
            "Reduce maintenance costs and inspection time",
            "Enable remote inspections and safer maintenance planning",
            "Automate maintenance workflows using Agentic AI",
            "Improve ESG reporting and digital transparency",
            "Extend asset lifespan through predictive intelligence",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-lg font-bold text-brand-navy md:text-xl">
          The Future of Renewable Energy Operations
        </h2>
        <p className="mt-3 text-base leading-relaxed text-brand-ink/70">
          AI and Digital Twin technologies are transforming conventional power plants into
          intelligent, self-optimizing energy ecosystems that improve efficiency, reliability, and
          sustainability.
        </p>

        <h2 className="mt-10 text-lg font-bold text-brand-navy md:text-xl">Access the Whitepaper</h2>
        <p className="mt-3 text-base leading-relaxed text-brand-ink/70">
          Learn how Visionaize is helping renewable energy leaders accelerate digital
          transformation through AI-powered 3D Digital Twins and intelligent asset management
          solutions built for the future of sustainable energy operations.
        </p>

        <a
          id="main-inner-contact-post1"
          href="#whitepaper-form"
          className="mt-4 inline-block text-base font-bold text-brand-blue hover:underline"
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
      <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 md:py-20">
        <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
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
      <main className="overflow-x-hidden bg-white text-brand-ink">{children}</main>
      <Footer />
    </>
  );
}