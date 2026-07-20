import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/theindustrialmetaverse")({
  head: () => ({
    meta: [
      { title: "The Industrial Metaverse — Visionaize" },
      {
        name: "description",
        content:
          "A deep dive into how the industrial metaverse helps organizations harness IIoT data with 3D Digital Twin technology for Enterprise Asset Management.",
      },
    ],
  }),
  component: IndustrialMetaversePage,
});

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  contactMe: boolean;
}

function MetaverseHero() {
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
              A deep dive into the industrial metaverse
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-ink/70">
              A data deluge is underway in heavy industrial sectors, thanks to the proliferation
              of IIoT sensors and the adoption of Industry 4.0.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-ink/70">
              Learn how to harness the power of data with 3D Digital Twin technology for
              Enterprise Asset Management (EAM).
            </p>

            <p className="mt-6 max-w-xl text-base font-semibold text-brand-navy">
              Welcome to the Industrial Metaverse.
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
                    <linearGradient id="diveInArrowGradientMetaverse" x1="0" y1="0" x2="16" y2="16">
                      <stop offset="0%" stopColor="#8CC63F" />
                      <stop offset="100%" stopColor="#1B75BC" />
                    </linearGradient>
                  </defs>
                  <path d="M1 2 L15 2 L8 13 Z" fill="url(#diveInArrowGradientMetaverse)" />
                </svg>
              </span>
              <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-lg font-semibold text-transparent">
                Dive in!
              </span>
            </a>
          </div>

          {/* Right: tilted mockup with the form card overlapping its right
              edge, vertically centered — same layout pattern as the
              Turnarounds page. Uses relative/absolute positioning within a
              fixed-height wrapper so it stays predictable across
              breakpoints. */}
          <div className="relative mx-auto w-full max-w-2xl py-6 lg:mx-0 lg:py-10">
            <div className="mr-auto ml-0 w-[68%] -rotate-6 overflow-hidden rounded-md sm:w-[58%] lg:w-[52%] lg:-translate-x-4">
              <img
                src="https://visionaize.in/wp-content/uploads/2022/07/IndustrialMetaverse-Cover-Mockup-1-1.png"
                alt="The Industrial Metaverse — whitepaper cover"
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

function ProblemSection() {
  return (
    <section className="bg-[#f3f5f7]">
      <div className="mx-auto max-w-5xl px-6 pt-2 pb-10 md:pt-4 md:pb-14">
        <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">Problem</h2>

        <div className="mt-6 space-y-6 text-base leading-relaxed text-brand-ink/80 md:text-lg">
          <p>
            As the industrial world moves toward the "autonomous factory" and Industry 4.0,
            modernization of existing facilities requires the ability to process and
            contextualize massive amounts of data that continue to grow exponentially. Many
            companies are already struggling with data overload as more devices are connected,
            system generated data accelerates, and Industrial (IIOT) sensors are increasingly
            deployed. And yet, we are still in the early stages with significant digital
            transformation to come over the next decade and beyond.
          </p>
          <p>
            The promise of Industry 4.0 provides unprecedented levels of automation and control,
            but this will not happen overnight – rather, it will be a step-by-step journey with
            immense benefits to be realized along the way. Throughout this journey, humans will
            remain the most critical and yet the most unpredictable link in the control systems
            of these facilities, potentially leading to undesirable results if each step is not
            carefully planned and executed.
          </p>
          <p>
            With mountains of data as the necessary fuel to make the autonomous factory run, it's
            essential this data be organized and presented in an intuitive way so that humans can
            quickly understand, plan, and simulate each step of the journey before it's put into
            production. Furthermore, the data visualizations that are intuitive for the business
            analyst, using increasingly sophisticated cloud and analytics technologies, are
            vastly different from what will allow the operations worker to make practical use of
            the data to take action on the shop floor, within the refinery, construction site and
            other operational settings.
          </p>
          <p>
            The IT personas have a different focus and need from the OT (Operations Technology)
            personas—the so-called IT-OT gap. Without this understanding of the need for humans
            to interact and engage meaningfully with the data in a manner more suited to their
            role, guiding them to take data-driven action, the investment in digital
            transformation will not provide the expected benefits of extracting huge value in
            operational efficiencies and improving safety.
          </p>
        </div>

        {/* <a
          href="#whitepaper-form"
          className="mt-8 inline-block text-base font-bold text-brand-blue hover:underline"
        >
          Get the White Paper &gt;&gt;
        </a> */}
      </div>
    </section>
  );
}

function DigitalTwinCTA() {
  return (
    <section className="bg-gradient-to-r from-brand-lime via-teal-500 to-brand-blue">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">
        <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
          3D Digital Twins provide a framework to address this challenge. Find out how.
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

function IndustrialMetaversePage() {
  return (
    <HeaderFooterWrapper>
      <MetaverseHero />
      <ProblemSection />
      <DigitalTwinCTA />
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