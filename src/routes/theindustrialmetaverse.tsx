import { createFileRoute } from "@tanstack/react-router";
import { useState, type ChangeEvent } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput } from "@/components/ui/floating-field";
import { api } from "@/lib/api";

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

function MetaverseHero() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange =
    (field: keyof Omit<FormState, "contactMe">) =>
    (e: ChangeEvent<HTMLInputElement>) => {
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
      await api.submitMetaverseWhitepaper({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        contact_me: form.contactMe,
        source_page: "/theindustrialmetaverse",
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
      <div className="mx-auto max-w-6xl px-4 pt-2 pb-4 sm:px-6 md:pt-10 md:pb-8">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center">
          {/* Left: headline + copy */}
          <div>
            <h1 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl md:text-4xl">
              A deep dive into the industrial metaverse
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-brand-ink/70 sm:text-base">
              A data deluge is underway in heavy industrial sectors, thanks to the proliferation
              of IIoT sensors and the adoption of Industry 4.0.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-ink/70 sm:text-base">
              Learn how to harness the power of data with 3D Digital Twin technology for
              Enterprise Asset Management (EAM).
            </p>

            <p className="mt-6 max-w-xl text-base font-semibold text-brand-navy">
              Welcome to the Industrial Metaverse.
            </p>

            
            <a  href="#whitepaper-form"
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

          {/* Right: mockup + form. On mobile/tablet these stack normally in
              document flow (image, then form below it) so the form never
              overflows a container sized only for the image. At lg and up,
              where the 2-column grid gives room, the form overlaps the
              image's right edge and is vertically centered on it. */}
          <div className="mx-auto w-full max-w-2xl py-6 lg:relative lg:py-10">
          <div className="mx-auto w-[78%] -rotate-6 sm:w-[60%] lg:mr-auto lg:ml-0 lg:w-[52%] lg:-translate-x-4">
              <img
                src="/white-paper/IndustrialMetaverse-Cover-Mockup-1-1.png"
                alt="The Industrial Metaverse — whitepaper cover"
                className="w-full rounded-md object-contain "
                loading="eager"
              />
            </div>

            <div
              id="whitepaper-form"
              className="relative z-10 mx-auto mt-8 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[58%] lg:max-w-none lg:-translate-y-1/2"
            >
              <h2 className="text-xl font-bold text-brand-navy md:text-2xl">
                Get the white paper
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
                      className={errors.firstName ? "border-red-400 focus:border-red-400" : ""}
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
                      className={errors.lastName ? "border-red-400 focus:border-red-400" : ""}
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
                      className={errors.company ? "border-red-400 focus:border-red-400" : ""}
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
                      className={errors.email ? "border-red-400 focus:border-red-400" : ""}
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
                    className="mt-2 w-full rounded-full bg-gradient-to-r from-brand-lime to-brand-blue py-4 text-base font-semibold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60"
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
    "w-full rounded-md border px-4 py-3 text-brand-ink placeholder:text-brand-ink/50",
    "focus:outline-none focus:ring-1",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-brand-navy/20 focus:border-brand-blue focus:ring-brand-blue",
  ].join(" ");
}

function FieldError({ message }: { message: string }) {
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function ProblemSection() {
  return (
    <section className="bg-[#f3f5f7]">
      <div className="mx-auto max-w-6xl px-4 pt-2 pb-10 sm:px-6 md:pt-4 md:pb-14">
        <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">Problem</h2>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-brand-ink/80 sm:text-base md:text-lg">
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
      </div>
    </section>
  );
}

function DigitalTwinCTA() {
  return (
    <section className="bg-gradient-to-r from-brand-lime via-teal-500 to-brand-blue">
      <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 md:py-20">
        <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
          3D Digital Twins provide a framework to address this challenge. Find out how.
        </h2>

        
        <a  href="#whitepaper-form"
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