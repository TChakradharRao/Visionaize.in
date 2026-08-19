import { createFileRoute } from "@tanstack/react-router";
import { useState, type ChangeEvent } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-field";
import { api } from "@/lib/api";

export const Route = createFileRoute("/social-digital-contact")({
  head: () => ({
    meta: [
      {
        title: "Let Us Talk About Your Requirements — Visionaize",
      },
      {
        name: "description",
        content:
          "Have questions about our AI-driven solutions, need a demo, or want to explore how Visionaize can partner with you on Digital Transformation and AI enabled technology? Connect with our team.",
      },
    ],
  }),
  component: SocialDigitalContactPage,
});

type FormState = {
  firstName: string;
  lastName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  hearAboutUs: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  companyName: "",
  businessEmail: "",
  phoneNumber: "",
  hearAboutUs: "",
  message: "",
};

const HEAR_ABOUT_US_OPTIONS = [
  "Search engine (Google, Bing, etc.)",
  "LinkedIn",
  "Referral",
  "Industry event / conference",
  "Webinar",
  "Existing customer",
  "Other",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.lastName.trim()) errors.lastName = "Last name is required";
  if (!form.companyName.trim()) errors.companyName = "Company name is required";

  if (!form.businessEmail.trim()) {
    errors.businessEmail = "Business email is required";
  } else if (!EMAIL_REGEX.test(form.businessEmail.trim())) {
    errors.businessEmail = "Enter a valid email address";
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!PHONE_REGEX.test(form.phoneNumber.trim())) {
    errors.phoneNumber = "Enter a valid 10-digit phone number";
  }

  return errors;
}

function SocialDigitalContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep only digits, cap at 10.
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, phoneNumber: digitsOnly }));
    setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const combinedMessage = [
      form.hearAboutUs ? `How they heard about us: ${form.hearAboutUs}` : null,
      form.message.trim() ? form.message.trim() : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await api.submitContact({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        email: form.businessEmail.trim(),
        company: form.companyName.trim(),
        phone: form.phoneNumber.trim(),
        message: combinedMessage || "(no message provided)",
        source_page: "/social-digital-contact/",
      });

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your request. Please try again."
      );
    }
  };

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-[#eef0f2]">
        {/* Gradient overlay — bounded to the hero-copy height only, so the
            form card (which is taller) visually spans past it into the
            gray section below, matching the reference layout. */}
        <div
          className="absolute inset-x-0 top-0 h-70 md:h-90"
          style={{ background: "linear-gradient(130deg, #94C11F 13%, #078ED1 87%)" }}
          aria-hidden="true"
        />

        <div className="relative px-6 pb-20 pt-16 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 md:items-start">
              {/* Left column: hero copy, then the secondary heading further down */}
              <div className="flex flex-col">
                <div className="max-w-md">
                  <h1 className="text-3xl font-bold leading-tight  md:text-4xl">
                    Let us talk about your requirements
                  </h1>
                  <p className="mt-6 text-medium leading-relaxed text-black/90">
                    We'd love to hear from you! Whether you have questions
                    about our AI-driven solutions, need a demo, or want to
                    explore how Visionaize can partner to deliver on Digital
                    Transformation and AI enabled technology requirements, our
                    team is here to help.
                  </p>
                </div>

                <h2 className="mt-16 max-w-xl text-2xl font-bold leading-snug text-brand-navy md:mt-24 md:text-3xl">
                  Agents of Positive Change, We Partner to Address Complex
                  Challenges
                </h2>
              </div>

              {/* Right column: form card — sits on top of both the gradient
                  and the gray background, so it naturally overlaps the seam */}
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <h2 className="text-xl font-semibold text-brand-navy">
                  Connect with us
                </h2>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  <div>
                    <FloatingInput
                      type="text"
                      name="firstName"
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
                      name="lastName"
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
                      name="companyName"
                      label="Company name*"
                      value={form.companyName}
                      onChange={handleChange("companyName")}
                      aria-invalid={!!errors.companyName}
                      className={errors.companyName ? "border-red-400 focus:border-red-400" : ""}
                    />
                    {errors.companyName && (
                      <FieldError message={errors.companyName} />
                    )}
                  </div>

                  <div>
                    <FloatingInput
                      type="email"
                      name="businessEmail"
                      label="Business Email*"
                      value={form.businessEmail}
                      onChange={handleChange("businessEmail")}
                      aria-invalid={!!errors.businessEmail}
                      className={errors.businessEmail ? "border-red-400 focus:border-red-400" : ""}
                    />
                    {errors.businessEmail && (
                      <FieldError message={errors.businessEmail} />
                    )}
                  </div>

                  <div>
                    <FloatingInput
                      type="tel"
                      name="phoneNumber"
                      label="Phone number*"
                      inputMode="numeric"
                      value={form.phoneNumber}
                      onChange={handlePhoneChange}
                      maxLength={10}
                      aria-invalid={!!errors.phoneNumber}
                      className={errors.phoneNumber ? "border-red-400 focus:border-red-400" : ""}
                    />
                    {errors.phoneNumber && (
                      <FieldError message={errors.phoneNumber} />
                    )}
                  </div>

                  <div>
                    <select
                      value={form.hearAboutUs}
                      onChange={handleChange("hearAboutUs")}
                      className={`${fieldClass(false)} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27><path d=%27M1 1l5 5 5-5%27 stroke=%27%2314263A%27 stroke-width=%271.5%27 fill=%27none%27/></svg>')] bg-no-repeat bg-[right_16px_center] pr-10 ${
                        form.hearAboutUs ? "text-brand-navy" : "text-brand-blue/70"
                      }`}
                    >
                      <option value="" disabled>
                        How did you first hear about us?
                      </option>
                      {HEAR_ABOUT_US_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="text-brand-navy">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <FloatingTextarea
                      name="message"
                      label="Message"
                      value={form.message}
                      onChange={handleChange("message")}
                      rows={3}
                      aria-invalid={!!errors.message}
                      className={errors.message ? "border-red-400 focus:border-red-400" : ""}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    style={{ background: "linear-gradient(130deg, #94C11F 13%, #078ED1 87%)" }}
                    className="w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Send request"}
                  </button>

                  <p className="text-center text-xs text-brand-blue">
                    We generally respond within 24 hours
                  </p>

                  {status === "success" && (
                    <p className="text-center text-sm text-green-600">
                      Thanks! Your request has been sent — we'll be in touch
                      soon.
                    </p>
                  )}
                  {status === "error" && errorMessage && (
                    <p className="text-center text-sm text-red-600">
                      {errorMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function fieldClass(hasError: boolean) {
  return [
    "w-full rounded-md border px-4 py-3 text-sm text-brand-navy placeholder:text-brand-blue/70",
    "focus:outline-none focus:ring-1",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue",
  ].join(" ");
}

function FieldError({ message }: { message: string }) {
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}