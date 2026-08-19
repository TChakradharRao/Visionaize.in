import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput } from "@/components/ui/floating-field";
import { api } from "@/lib/api";

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

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mail.com",
  "protonmail.com",
  "proton.me",
  "yandex.com",
  "gmx.com",
  "zoho.com",
  "rediffmail.com",
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  contactMe: boolean;
}

type FormErrors = Partial<Record<Exclude<keyof FormState, "contactMe">, string>>;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  contactMe: false,
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.lastName.trim()) errors.lastName = "Last name is required";
  if (!form.company.trim()) errors.company = "Company name is required";

  if (!form.email.trim()) {
    errors.email = "Business email is required";
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = "Enter a valid email address";
  } else {
    const domain = form.email.trim().split("@")[1]?.toLowerCase();
    if (domain && FREE_EMAIL_DOMAINS.has(domain)) {
      errors.email = "Please use your business email, not a personal one (e.g. Gmail, Yahoo)";
    }
  }

  return errors;
}

// Smooth-scrolls to the content section below the hero.
function scrollToContentSection(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  const target = document.getElementById("content-section");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Smooth-scrolls to the whitepaper form section, regardless of whether the
// browser's default hash-anchor behavior is intercepted elsewhere (e.g. by
// router click handling) or produces an abrupt jump instead of a smooth one.
function scrollToWhitepaperForm(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  e.preventDefault();
  const target = document.getElementById("whitepaper-form");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function WhitepaperHero() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange =
    (field: keyof Omit<FormState, "contactMe">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("err");
      setErrorMsg("Please fix the highlighted fields below.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    setErrors({});

    try {
      await api.submitTurnaroundsWhitepaper({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        contact_me: form.contactMe,
        source_page: "/re-inventing-turnarounds-in-the-metaverse",
      });
      setStatus("ok");
      setForm(initialState);
    } catch (err) {
      setStatus("err");
      setErrorMsg(err instanceof Error ? err.message : "Unable to submit. Please try again.");
    }
  }

  return (
    <section className="bg-[#f3f5f7]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 pb-8 md:pt-10 md:pb-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center lg:gap-9">
          {/* Left: headline + copy */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-tight text-brand-navy">
              The modern approach to Turnarounds that reduce costs by more than 10%
            </h1>

           <p className="mt-5 sm:mt-6 flex flex-wrap items-end gap-2 text-lg sm:text-xl font-bold italic text-brand-ink/100">
  <span>In Collaboration with</span>
  <img
    src="/white-paper/PricewaterhouseCoopers_Logo.svg-1.png"
    alt="PwC"
    className="h-10 sm:h-12 w-auto block"
  />
</p>

            <p className="mt-5 sm:mt-6 max-w-xl text-[15px] sm:text-base leading-relaxed text-brand-ink/70">
              The Industrial Metaverse is in the infancy of adoption, but already has the
              potential to drive step change improvements across process industries.
            </p>
            <p className="mt-4 max-w-xl text-[15px] sm:text-base leading-relaxed text-brand-ink/70">
              Dive into the Industrial Metaverse and learn how to make dramatic impacts on your
              bottom line.
            </p>

            <button
              type="button"
              onClick={scrollToContentSection}
              className="mt-8 inline-flex items-center gap-3 group"
            >
              <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition group-hover:shadow-lg">
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
              <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-xl sm:text-2xl font-semibold text-transparent">
                Dive in!
              </span>
            </button>
          </div>

          {/* Right: whitepaper mockup + form.
              Below `lg`, the image and form card sit in normal document
              flow, stacked, so nothing overlaps on narrow screens.
              At `lg` and up we switch to the reference layout: a tilted
              image with the form card absolutely positioned to overlap
              its right edge, vertically centered. */}
          <div className="mx-auto w-full max-w-md py-2 lg:relative lg:mx-0 lg:max-w-2xl lg:py-10">
            <div className="mx-auto w-[78%] overflow-hidden rounded-md sm:w-[58%] lg:mr-auto lg:ml-0 lg:w-[52%] lg:-translate-x-4 lg:-rotate-6">
              <img
                src="/white-paper/Reinventing-Mockup-768x768.png"
                alt="Reinventing Turnarounds in the Metaverse — whitepaper cover"
                className="aspect-[3/4] w-full object-cover"
                loading="eager"
              />
            </div>

            <div
              id="whitepaper-form"
              className="relative z-10 mx-auto -mt-8 w-[92%] scroll-mt-24 rounded-2xl bg-white p-5 shadow-2xl sm:-mt-10 sm:w-[85%] sm:p-8 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[58%] lg:-translate-y-1/2"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-brand-navy">
                Access the whitepaper
              </h2>

              {status === "ok" ? (
                <div className="mt-6 rounded-lg bg-brand-mist/60 p-6 text-brand-ink/80">
                  Thanks! Your whitepaper access request has been received — check your
                  inbox for a confirmation email.
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  <div>
                    <FloatingInput
                      type="text"
                      name="first_name"
                      label="First name*"
                      value={form.firstName}
                      onChange={handleChange("firstName")}
                      aria-invalid={!!errors.firstName}
                      className={fieldClass(!!errors.firstName)}
                    />
                    {errors.firstName && <FieldError message={errors.firstName} />}
                  </div>

                  <div>
                    <FloatingInput
                      type="text"
                      name="last_name"
                      label="Last name*"
                      value={form.lastName}
                      onChange={handleChange("lastName")}
                      aria-invalid={!!errors.lastName}
                      className={fieldClass(!!errors.lastName)}
                    />
                    {errors.lastName && <FieldError message={errors.lastName} />}
                  </div>

                  <div>
                    <FloatingInput
                      type="text"
                      name="company"
                      label="Company name*"
                      value={form.company}
                      onChange={handleChange("company")}
                      aria-invalid={!!errors.company}
                      className={fieldClass(!!errors.company)}
                    />
                    {errors.company && <FieldError message={errors.company} />}
                  </div>

                  <div>
                    <FloatingInput
                      type="email"
                      name="email"
                      label="Business Email*"
                      value={form.email}
                      onChange={handleChange("email")}
                      aria-invalid={!!errors.email}
                      className={fieldClass(!!errors.email)}
                    />
                    {errors.email && <FieldError message={errors.email} />}
                  </div>

                  <label className="flex items-start gap-3 pt-1 text-sm text-brand-ink/70">
                    <input
                      type="checkbox"
                      checked={form.contactMe}
                      onChange={(e) => setForm((f) => ({ ...f, contactMe: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-navy/30"
                    />
                    Please have a Visionaize Digital Twin expert contact me
                  </label>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-2 w-full rounded-full bg-gradient-to-r from-brand-lime to-brand-blue py-3.5 sm:py-4 text-base font-semibold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Access Now"}
                  </button>

                  {status === "err" && errorMsg && (
                    <p className="text-sm text-red-600">{errorMsg}</p>
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

function fieldClass(hasError: boolean) {
  return [
    "w-full rounded-md border px-4 py-2.5 sm:py-3 text-brand-ink placeholder:text-brand-ink/50",
    "focus:outline-none focus:ring-1",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-brand-navy/20 focus:border-brand-blue focus:ring-brand-blue",
  ].join(" ");
}

function FieldError({ message }: { message: string }) {
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function ContentSection() {
  return (
    <section id="content-section" className="scroll-mt-24 bg-[#f3f5f7]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-4 pb-10 md:pt-4 md:pb-14">
        <div className="space-y-5 sm:space-y-6 text-[15px] sm:text-base leading-relaxed text-brand-ink/80 md:text-lg">
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
          onClick={scrollToWhitepaperForm}
          className="mt-8 inline-block text-[15px] sm:text-base font-bold text-brand-blue hover:underline"
        >
          Access the full Whitepaper &gt;&gt;
        </a>
      </div>
    </section>
  );
}

function WhitepaperCtaBand() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 45%,#2BA8C7 100%)" }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center md:py-20">
        <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
          A Metaverse-driven Turnaround: What is it and how does it drive value?
        </h2>
        <div className="mt-8 flex justify-center">
          <a
            href="#whitepaper-form"
            onClick={scrollToWhitepaperForm}
            className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-slate-900 shadow-md transition hover:bg-white/90 sm:text-base"
          >
            Download the white paper
          </a>
        </div>
      </div>
    </section>
  );
}

function TurnaroundsPage() {
  return (
    <HeaderFooterWrapper>
      <WhitepaperHero />
      <ContentSection />
      <WhitepaperCtaBand />
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