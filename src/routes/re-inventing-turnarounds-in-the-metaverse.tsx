import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/re-inventing-turnarounds-in-the-metaverse")({
  head: () => ({
    meta: [
      { title: "Reinventing Turnarounds in the Metaverse — Visionaize" },
      {
        name: "description",
        content:
          "A practical view of how industrial metaverse strategies and digital twins help operators reduce turnaround cost and downtime.",
      },
    ],
  }),
  component: TurnaroundsPage,
});

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  contactMe: boolean;
}

function WhitepaperHero() {
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
      <div className="mx-auto max-w-8xl px-6 pt-2 pb-4 md:pt-10 md:pb-8">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center">
          {/* Left: headline + copy */}
          <div>
            <h1 className="text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              The modern approach to Turnarounds that reduce costs by more than 10%
            </h1>

            <p className="mt-6 text-sm font-semibold italic text-brand-ink/80">
              In Collaboration with{" "}
              <span className="not-italic font-bold text-brand-navy">pwc</span>
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-ink/70">
              The Industrial Metaverse is in the infancy of adoption, but already has the
              potential to drive step change improvements across process industries.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-ink/70">
              Dive into the Industrial Metaverse and learn how to make dramatic impacts on your
              bottom line.
            </p>

            <a
              href="#whitepaper-form"
              className="mt-8 inline-flex items-center gap-3 group"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition group-hover:shadow-lg">
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-5 w-5"
                >
                  <defs>
                    <linearGradient id="diveInArrowGradient" x1="0" y1="0" x2="18" y2="18">
                      <stop offset="0%" stopColor="#8CC63F" />
                      <stop offset="100%" stopColor="#1B75BC" />
                    </linearGradient>
                  </defs>
                  <path d="M1 2 L15 2 L8 13 Z" fill="url(#diveInArrowGradient)" />
                </svg>
              </span>
              <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-2xl font-semibold text-transparent">
                Dive in!
              </span>
            </a>
          </div>

          {/* Right: tilted whitepaper mockup with the form card overlapping
              its right edge, vertically centered — matches the reference
              layout where the two elements sit side-by-side rather than
              stacked. Uses relative/absolute positioning within a fixed-
              height wrapper so it stays predictable across breakpoints. */}
          <div className="relative mx-auto w-full max-w-2xl py-6 lg:mx-0 lg:py-10">
            <div className="mr-auto ml-0 w-[68%] -rotate-6 overflow-hidden rounded-md  sm:w-[58%] lg:w-[52%] lg:-translate-x-4">
              <img
                src="https://visionaize.in/wp-content/uploads/2023/12/Reinventing-Mockup-768x768.png"
                alt="Reinventing Turnarounds in the Metaverse — whitepaper cover"
                className="aspect-[3/4] w-full object-cover"
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

function ContentSection() {
  return (
    <section className="bg-[#f3f5f7]">
      <div className="mx-auto max-w-5xl px-6 pt-2 pb-10 md:pt-4 md:pb-14">
        <div className="space-y-6 text-base leading-relaxed text-brand-ink/80 md:text-lg">
          <p>
            A Turnaround is a planned event wherein the process unit(s) of an industrial plant is
            taken offline for a scheduled period for maintenance and renewal. A Turnaround is
            critical to ongoing operations and accounts for ~50% of a planned maintenance budget.
          </p>
          <p>
            Today's turnarounds are large, complex, and expansive. They involve interactions with
            numerous processing, work management, and scheduling systems across operations,
            reliability, maintenance, engineering, project management, safety, supply chain,
            emergency response teams. The event consists of five phases: scoping, planning,
            procurement, onboarding, execution, and post-turnaround management. Documented costs
            of turnaround overruns have exceeded over $1MM per day.
          </p>
          <p>
            As the industrial Metaverse develops, operational digital twins are emerging as a tool
            to help facilities execute turnarounds more efficiently. Digital twins are 3D
            visualizations of industrial plants, linked to piping and instrumentation diagrams,
            maintenance systems, process data, analytics software, and data visualization tools.
          </p>
          <p>
            Access the Whitepaper to learn more about a Metaverse-driven Turnaround and how 3D
            Digital Twin technology can save operators of complex facilities significant sums of
            money, time and energy, while substantially increasing overall productivity.
          </p>
        </div>

        <a
          href="#whitepaper-form"
          className="mt-8 inline-block text-base font-bold text-brand-blue hover:underline"
        >
          Access the full Whitepaper &gt;&gt;
        </a>
      </div>
    </section>
  );
}

function TurnaroundsPage() {
  return (
    <HeaderFooterWrapper>
      <WhitepaperHero />
      <ContentSection />
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