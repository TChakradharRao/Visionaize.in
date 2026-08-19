import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-field";
import { api } from "@/lib/api";

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

function CementHero() {
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
      await api.submitCementWhitepaper({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        contact_me: form.contactMe,
        source_page: "/cement-industry-whitepaper",
      });
      setStatus("ok");
      setForm(initialState);
    } catch (err) {
      setStatus("err");
      setErrorMsg(err instanceof Error ? err.message : "Unable to submit. Please try again.");
    }
  }

  const formCard = (
    <>
      <h2 className="text-2xl font-bold text-brand-navy md:text-[28px]">Access the whitepaper</h2>

      {status === "ok" ? (
        <div className="mt-6 rounded-lg bg-brand-mist/60 p-6 text-brand-ink/80">
          Thanks! Your whitepaper access request has been received — check your inbox for a
          confirmation email.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <FloatingInput
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
              label="Business Email*"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              aria-invalid={!!errors.email}
              className={fieldClass(!!errors.email)}
            />
            {errors.email && <FieldError message={errors.email} />}
          </div>

          <label className="flex items-start gap-3 pt-1 text-[15px] text-brand-ink/70">
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
            className="mt-2 w-full rounded-full bg-gradient-to-r from-brand-lime to-brand-blue py-4 text-[17px] font-semibold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Access Now"}
          </button>

          {status === "err" && errorMsg && <p className="text-[15px] text-red-600">{errorMsg}</p>}
        </form>
      )}
    </>
  );

  return (
    <section id="problem-content">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 md:pb-14 md:pt-10 lg:pb-24 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center lg:gap-9">
          {/* Left: headline + copy */}
          <div>
            <h1 className="text-[32px] font-bold leading-tight text-brand-navy sm:text-[36px] md:text-[44px]">
              Driving efficiency, sustainability, and performance forward
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-ink/70 sm:mt-6 sm:text-[17px]">
              Discover how AI-powered Digital Twin technology is helping leading cement
              manufacturers achieve sustainable operations, reduce CO&#8322; emissions, and optimize
              production in real time.
            </p>

            <p className="mt-5 max-w-xl text-base font-semibold text-brand-navy sm:mt-6 sm:text-[17px]">
              Welcome to the AI-Driven Industrial Future of Cement. Access the full whitepaper to
              explore:
            </p>

            <a href="#whitepaper-form" className="group mt-7 inline-flex items-center gap-3 sm:mt-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition group-hover:shadow-lg sm:h-14 sm:w-14">
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
              <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-xl font-semibold text-transparent sm:text-2xl">
                Dive in!
              </span>
            </a>
          </div>

          {/* Right: tilted mockup image. On mobile/tablet the form sits in
              normal flow below the image with its own top/bottom spacing.
              From lg upward, the form becomes an absolutely positioned card
              overlapping the image's right edge, vertically centered. The
              wrapper reserves a min-height at lg so the form never collides
              with the sections above or below it. */}
          <div className="relative mx-auto w-full max-w-4xl overflow-visible px-4 py-2 lg:mx-0 lg:min-h-[480px] lg:py-6">
            <div className="mx-auto w-[62%] -rotate-3 rounded-md sm:w-[52%] lg:mx-0 lg:mr-auto lg:ml-0 lg:w-[51%] lg:-rotate-6">
              <img
                src="/digital-twin-for-cement/Group-1171277152-1.svg"
                alt="Cement Industry Whitepaper — cover"
                className="w-full rounded-md object-contain"
                loading="eager"
              />
            </div>

            <div
              id="whitepaper-form"
              className="relative z-10 mx-auto mt-8 w-full max-w-md scroll-mt-24 rounded-2xl bg-white p-6 shadow-2xl sm:mt-10 sm:p-8 lg:absolute lg:right-0 lg:top-1/2 lg:mx-0 lg:mt-0 lg:w-[58%] lg:max-w-none lg:-translate-y-1/2"
            >
              {formCard}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function fieldClass(hasError: boolean) {
  return [
    "w-full rounded-md border px-4 py-3 text-brand-ink placeholder:text-brand-ink/50",
    "focus:outline-none focus:ring-1",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-brand-navy/20 focus:border-brand-blue focus:ring-brand-blue",
  ].join(" ");
}

function FieldError({ message }: { message: string }) {
  return <p className="mt-1 text-[13px] text-red-600">{message}</p>;
}

function OverviewSection() {
  return (
    <section className="bg-[#f3f5f7]">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 md:pb-14 md:pt-8 lg:pt-10">
        <h2 className="text-xl font-bold text-brand-navy md:text-[28px]">Problem</h2>
        <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-brand-ink/80">
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

        <h2 className="mt-8 text-xl font-bold text-brand-navy md:text-[28px]">Solution</h2>
        <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-brand-ink/80">
          <p>
            Visionaize bridges this gap through AI-powered Digital Twin platforms that combine
            real-time data, process intelligence, and machine learning to help operators make
            smarter, faster decisions.
          </p>
          <p>Our solution empowers cement plants to:</p>
        </div>
        <ul className="mt-3 space-y-2 text-[17px] leading-relaxed text-brand-ink/70">
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

        <h2 className="mt-8 text-xl font-bold text-brand-navy md:text-2xl">
          The Future of Cement Manufacturing
        </h2>
        <p className="mt-3 text-[17px] leading-relaxed text-brand-ink/70">
          AI and Digital Twin technology are transforming cement plants into intelligent,
          self-optimizing systems that drive higher efficiency, lower emissions, and improved
          profitability.
        </p>
        <p className="mt-3 text-[17px] leading-relaxed text-brand-ink/70">
          Access the full whitepaper to explore:
        </p>
        <ul className="mt-3 space-y-2 text-[17px] leading-relaxed text-brand-ink/70">
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

        <h2 className="mt-8 text-xl font-bold text-brand-navy md:text-2xl">Access the Whitepaper</h2>
        <p className="mt-3 text-[17px] leading-relaxed text-brand-ink/70">
          Learn how Visionaize is helping global cement leaders reimagine operations with AI and
          Digital Twin technology — achieving sustainability and performance excellence.
        </p>

        <a
          id="main-inner-contact-post1"
          href="#whitepaper-form"
          className="mt-4 inline-block text-[17px] font-bold text-brand-blue hover:underline"
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
      <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
        <h2 className="text-[30px] font-bold leading-tight text-white sm:text-[34px]">
          Reimagining Cement Production with AI: What it is and how it drives value.
        </h2>

        <a
          href="#whitepaper-form"
          className="mt-7 inline-flex items-center rounded-full bg-white px-7 py-3.5 text-base font-bold text-brand-ink shadow-md transition hover:brightness-95 sm:mt-8 sm:px-8 sm:py-4 sm:text-[17px]"
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