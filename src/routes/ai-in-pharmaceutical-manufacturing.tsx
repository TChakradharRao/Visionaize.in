import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { api } from "@/lib/api";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-field";

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

const MESSAGE_MAX_LEN = 500;

// Smooth-scrolls to the whitepaper form, regardless of default anchor jump
// behavior, and keeps focus predictable across breakpoints.
function scrollToWhitepaperForm(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const target = document.getElementById("whitepaper-form");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function PharmaHero() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contactMe, setContactMe] = useState(false);

  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await api.submitPharmaWhitepaper({
        first_name: firstName,
        last_name: lastName,
        company,
        email,
        message,
        contact_me: contactMe,
        source_page: "/ai-in-pharmaceutical-manufacturing",
      });
      setStatus("ok");
      setFirstName("");
      setLastName("");
      setCompany("");
      setEmail("");
      setMessage("");
      setContactMe(false);
    } catch (err) {
      setStatus("err");
      setErrorMsg(err instanceof Error ? err.message : "Unable to submit. Please try again.");
    }
  }

  return (
    // overflow-x-hidden guards against the rotated mockup image's bounding
    // box bleeding past the viewport edge on narrow phones.
    <section className="overflow-x-hidden bg-[#f3f5f7]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 pb-10 md:pt-8 md:pb-12 lg:pt-10 lg:pb-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center lg:gap-7">
          {/* Left: headline + copy */}
          <div>
            <h1 className="text-[22px] xs:text-[27px] sm:text-[34px] md:text-[41px] lg:text-[54px] font-bold leading-tight text-brand-navy">
              Stronger compliance. Smarter quality. Lower risk.
            </h1>

            <p className="mt-4 sm:mt-5 max-w-xl text-[15px] xs:text-[17px] sm:text-[19px] leading-relaxed text-brand-ink/70">
              In a highly regulated industry, AI empowers pharmaceutical manufacturers to detect
              deviations early, ensure consistency, and stay audit-ready at all times.
            </p>

            <p className="mt-4 sm:mt-5 max-w-xl text-[15px] xs:text-[17px] sm:text-[19px] font-semibold text-brand-navy">
              Step into a new era of intelligent, compliant manufacturing.
            </p>

            
            <a  href="#whitepaper-form"
              onClick={scrollToWhitepaperForm}
              className="mt-6 inline-flex items-center gap-3 group"
            >
              <span className="flex h-10 w-10 xs:h-11 xs:w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition group-hover:shadow-lg">
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4">
                  <defs>
                    <linearGradient id="diveInArrowGradientPharma" x1="0" y1="0" x2="16" y2="16">
                      <stop offset="0%" stopColor="#8CC63F" />
                      <stop offset="100%" stopColor="#1B75BC" />
                    </linearGradient>
                  </defs>
                  <path d="M1 2 L15 2 L8 13 Z" fill="url(#diveInArrowGradientPharma)" />
                </svg>
              </span>
              <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-[17px] xs:text-[19px] sm:text-[22px] md:text-[27px] font-semibold text-transparent">
                Dive in!
              </span>
            </a>
          </div>

          {/* Right: whitepaper mockup + form.
              Below `lg`, the image and form card sit in normal document
              flow, stacked, so nothing overlaps on narrow/medium screens.
              At `lg` and up we switch to the reference layout: a tilted
              image with the form card absolutely positioned to overlap
              its right edge, vertically centered (with an added top-gap
              offset), inside a taller container so it never overflows
              the bottom of the section. */}
          <div className="mx-auto w-full max-w-xs xs:max-w-sm sm:max-w-md py-1 lg:relative lg:mx-0 lg:max-w-2xl lg:min-h-[620px] lg:py-6">
            <div className="mx-auto w-[70%] -rotate-6 overflow-hidden rounded-md xs:w-[68%] sm:w-[58%] lg:mr-auto lg:ml-0 lg:w-[52%] lg:-translate-x-4">
              <img
                src="/white-paper/ai-Pharmaceutical.png"
                alt="AI in Pharmaceutical Manufacturing — whitepaper cover"
                className="aspect-[3/4] w-full object-cover"
                loading="eager"
              />
            </div>

            <div
              id="whitepaper-form"
              className="relative z-10 mx-auto -mt-8 w-full max-w-sm scroll-mt-24 rounded-2xl bg-white p-4 xs:p-5 shadow-2xl sm:-mt-10 sm:w-[85%] sm:max-w-none sm:p-7 lg:absolute lg:right-0 lg:top-1/2 lg:mt-8 lg:w-[58%] lg:-translate-y-1/2"
            >
              <h2 className="text-[17px] xs:text-[19px] sm:text-[22px] md:text-[27px] lg:text-[34px] font-bold text-brand-navy">
                Get the white paper
              </h2>

              {status === "ok" ? (
                <div className="mt-4 rounded-lg bg-brand-mist/60 p-4 xs:p-5 text-[15px] sm:text-[17px] text-brand-ink/80">
                  Thanks! Your whitepaper access request has been received.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <FloatingInput
                    name="first_name"
                    label="First name*"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <FloatingInput
                    name="last_name"
                    label="Last name*"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <FloatingInput
                    name="company"
                    label="Company name*"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <FloatingInput
                    name="email"
                    label="Business Email*"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div>
                    <FloatingTextarea
                      name="message"
                      label="Message (optional)"
                      rows={2}
                      maxLength={MESSAGE_MAX_LEN}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <p className="mt-1 text-right text-[13px] text-brand-navy/50">
                      {message.length}/{MESSAGE_MAX_LEN}
                    </p>
                  </div>

                  <label className="flex items-start gap-3 pt-1 text-[13px] xs:text-[15px] sm:text-[17px] text-brand-ink/70">
                    <input
                      type="checkbox"
                      checked={contactMe}
                      onChange={(e) => setContactMe(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-navy/30"
                    />
                    Please have a Visionaize Digital Twin expert contact me
                  </label>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-2 w-full rounded-full bg-gradient-to-r from-brand-lime to-brand-blue py-3 xs:py-3.5 sm:py-4 text-[15px] xs:text-[17px] sm:text-[19px] font-semibold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Access Now"}
                  </button>

                  {status === "err" && (
                    <p className="mt-2 text-center text-[15px] text-red-600">{errorMsg}</p>
                  )}
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-2 pb-6 md:pt-2 md:pb-8">
        <div className="space-y-3 text-[15px] xs:text-[17px] sm:text-[19px] leading-relaxed text-brand-ink/70">
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

        <h2 className="mt-6 text-[19px] sm:text-[22px] md:text-[27px] font-bold text-brand-navy">What You'll Learn</h2>
        <ul className="mt-2 space-y-1.5 text-[15px] xs:text-[17px] sm:text-[19px] leading-relaxed text-brand-ink/70">
          <li className="flex gap-2">
            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>
              How AI improves <span className="font-semibold text-brand-navy">yield, quality, and uptime</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            <span>
              Key use cases across{" "}
              <span className="font-semibold text-brand-navy">production, quality, and supply chain</span>
            </span>
          </li>
          <li>
            <div className="flex gap-2">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
              <span>Real-world results including:</span>
            </div>
            <ul className="mt-1.5 space-y-1 pl-5">
              <li className="flex gap-2">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-ink/40" />
                +20% yield improvement
              </li>
              <li className="flex gap-2">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-ink/40" />
                -30% downtime reduction
              </li>
              <li className="flex gap-2">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-ink/40" />
                -25% cost savings
              </li>
            </ul>
          </li>
        </ul>

        <h2 className="mt-6 text-[19px] sm:text-[22px] md:text-[27px] font-bold text-brand-navy">Why It Matters</h2>
        <p className="mt-2 text-[15px] xs:text-[17px] sm:text-[19px] leading-relaxed text-brand-ink/70">AI helps pharma companies:</p>
        <ul className="mt-2 space-y-1.5 text-[15px] xs:text-[17px] sm:text-[19px] leading-relaxed text-brand-ink/70">
          <li className="flex gap-2">
            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            Reduce batch failures
          </li>
          <li className="flex gap-2">
            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            Ensure continuous compliance
          </li>
          <li className="flex gap-2">
            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-ink/50" />
            Optimize processes in real time
          </li>
        </ul>

        <p className="mt-4 text-[15px] xs:text-[17px] sm:text-[19px] leading-relaxed text-brand-ink/70">
          Move from reactive manufacturing to a{" "}
          <span className="font-semibold text-brand-navy">Smart Pharma Plant</span>.
        </p>

        <h2 className="mt-4 text-[19px] sm:text-[22px] md:text-[27px] font-bold text-brand-navy">Access the Whitepaper</h2>
        <p className="mt-2 text-[15px] xs:text-[17px] sm:text-[19px] leading-relaxed text-brand-ink/70">
          The future of pharma manufacturing is predictive, intelligent, and autonomous.
        </p>

        <a
          href="#whitepaper-form"
          onClick={scrollToWhitepaperForm}
          className="mt-3 inline-block text-[15px] sm:text-[17px] font-bold text-brand-blue hover:underline"
        >
          Download the Whitepaper &gt;&gt;
        </a>
      </div>
    </section>
  );
}

function PharmaCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 45%,#2BA8C7 100%)" }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 xs:py-10 sm:py-12 md:py-14 text-center">
        <h2 className="text-[22px] xs:text-[27px] sm:text-[34px] md:text-[41px] font-bold leading-tight text-white">
          From Batch to Intelligent: Discover how AI is transforming pharma operations.
        </h2>

        <div className="mt-6 flex justify-center">
          <a
            href="#whitepaper-form"
            onClick={scrollToWhitepaperForm}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 xs:px-7 sm:px-8 py-3 sm:py-4 text-center text-[15px] xs:text-[17px] sm:text-[19px] font-bold text-brand-ink shadow-md transition hover:brightness-95"
          >
            Download the white paper
          </a>
        </div>
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