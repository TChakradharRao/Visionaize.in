import { createFileRoute } from "@tanstack/react-router";
import { useState, type ChangeEvent } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-field";
import { api } from "@/lib/api";

export const Route = createFileRoute("/request-a-demo")({
  head: () => ({
    meta: [
      { title: "Request a Demo — Visionaize" },
      {
        name: "description",
        content:
          "Thank you for your interest in seeing Visionaize solutions. Please complete the form to request a demo.",
      },
    ],
  }),
  component: RequestDemoPage,
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
const PHONE_REGEX = /^\d{10}$/;

type FormState = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
};

type FormErrors = Partial<Record<Exclude<keyof FormState, "interest">, string>>;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  interest: "",
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

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!PHONE_REGEX.test(form.phone.trim())) {
    errors.phone = "Enter a valid 10-digit phone number";
  }

  return errors;
}

function RequestDemoPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value = e.target.value;
      if (field === "phone") value = value.replace(/\D/g, "").slice(0, 10);

      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      await api.submitRequestDemo({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        email: form.email.trim(),
        company: form.company.trim() || undefined,
        phone: form.phone.trim(),
        message: form.interest.trim() || undefined,
        source_page: "/request-a-demo",
      });
      setStatus("ok");
      setForm(initialState);
    } catch (err) {
      setStatus("err");
      setErrorMsg(err instanceof Error ? err.message : "Unable to submit. Please try again.");
    }
  };

  const OUTCOMES = [
    "Less downtime",
    "Increased productivity",
    "Reduced carbon footprint",
    "Improved worker safety",
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero: height driven only by the left text column; form floats above via absolute positioning */}
        <section
          className="relative overflow-visible px-6 pb-16 pt-16 md:pb-20 md:pt-20"
          style={{
            background:
              "linear-gradient(120deg, #A6E04A 0%, #7FC46B 25%, #5BAE7E 50%, #2E8FB1 75%, #1E7EC8 100%)",
          }}
        >
          <div className="relative mx-auto max-w-7xl">
            <div className="text-brand-navy max-w-lg">
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                Visionaize the possibilities
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-brand-navy/90">
                Thank you for your interest in seeing Visionaize solutions. Please complete the form to request a demo.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-brand-navy/90">
                Visionaize is a leader in AI-powered, operational Digital Twin software.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-brand-navy/90">
                Our solutions enable global leaders to realize massive operational efficiencies by helping see their operations in unprecedented ways.
              </p>
            </div>

            {/* Form card: absolutely positioned so it floats independent of hero height and spills into the section below */}
            <form
              onSubmit={onSubmit}
              noValidate
              className="relative z-10 mt-10 w-full rounded-2xl bg-white p-10 shadow-2xl lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:w-[450px]"
            >
              <h2 className="text-2xl font-semibold text-brand-navy">Request a demo</h2>
              <div className="mt-7 space-y-4">
                <div>
                  <FloatingInput
                    name="firstName"
                    label="First name*"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    className={errors.firstName ? "border-red-400 focus:border-red-400" : ""}
                  />
                  {errors.firstName && <FieldError message={errors.firstName} />}
                </div>

                <div>
                  <FloatingInput
                    name="lastName"
                    label="Last name*"
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    className={errors.lastName ? "border-red-400 focus:border-red-400" : ""}
                  />
                  {errors.lastName && <FieldError message={errors.lastName} />}
                </div>

                <div>
                  <FloatingInput
                    name="company"
                    label="Company name*"
                    value={form.company}
                    onChange={handleChange("company")}
                    className={errors.company ? "border-red-400 focus:border-red-400" : ""}
                  />
                  {errors.company && <FieldError message={errors.company} />}
                </div>

                <div>
                  <FloatingInput
                    name="email"
                    label="Business Email*"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    className={errors.email ? "border-red-400 focus:border-red-400" : ""}
                  />
                  {errors.email && <FieldError message={errors.email} />}
                </div>

                <div>
                  <FloatingInput
                    name="phone"
                    label="Phone number*"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className={errors.phone ? "border-red-400 focus:border-red-400" : ""}
                  />
                  {errors.phone && <FieldError message={errors.phone} />}
                </div>

                <FloatingTextarea
                  name="interest"
                  label="Your specific areas of interest"
                  rows={2}
                  value={form.interest}
                  onChange={handleChange("interest")}
                  className="resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg transition-opacity disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #1E7EC8 100%)",
                }}
              >
                {status === "sending" ? "Sending…" : "Request demo"}
              </button>
              {status === "ok" && (
                <p className="mt-4 text-center text-sm text-green-600">
                  Thanks — we received your request and will be in touch shortly.
                </p>
              )}
              {status === "err" && errorMsg && (
                <p className="mt-4 text-center text-sm text-red-600">{errorMsg}</p>
              )}
            </form>
          </div>
        </section>

        {/* Outcomes: starts immediately below the hero; form floats on top of this section's right side */}
        <section className="bg-[#F5F7FA] pb-16 pt-14 md:pb-20 md:pt-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-semibold leading-tight text-brand-navy md:text-4xl">
              Together we can Visionaize a<br /> better world
            </h2>
            <ul className="mt-10 grid max-w-2xl grid-cols-1 gap-5">
              {OUTCOMES.map((o) => (
                <li key={o} className="flex items-center gap-4 text-lg text-brand-blue">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#A6E04A] to-[#1E7EC8] text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Input({
  placeholder,
  type = "text",
  maxLength,
  inputMode,
  value,
  onChange,
  hasError,
}: {
  placeholder: string;
  type?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
}) {
  return (
    <input
      type={type}
      maxLength={maxLength}
      inputMode={inputMode}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-invalid={!!hasError}
      className={[
        "block h-[46px] w-full rounded-lg border bg-white px-4 text-[14px] font-medium text-brand-navy placeholder:text-brand-navy focus:outline-none",
        hasError
          ? "border-red-400 focus:border-red-400"
          : "border-gray-700 focus:border-brand-blue",
      ].join(" ")}
    />
  );
}

function FieldError({ message }: { message: string }) {
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}