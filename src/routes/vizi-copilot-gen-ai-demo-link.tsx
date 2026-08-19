import { createFileRoute } from "@tanstack/react-router";
import { useState, type ChangeEvent } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput } from "@/components/ui/floating-field";
import { api } from "@/lib/api";

export const Route = createFileRoute("/vizi-copilot-gen-ai-demo-link")({
  head: () => ({
    meta: [
      {
        title:
          "VIZI CoPilot Drives 20% Efficiency and 25% Productivity Gains — Visionaize",
      },
      {
        name: "description",
        content:
          "Access a live demo clip from our recent webinar, Unlocking the Future of Energy with Gen-AI, led by Chief Innovation & Strategy Officer Nikhil Chauhan, and explore VIZI CoPilot's use cases.",
      },
    ],
  }),
  component: ViziCopilotDemoPage,
});

type FormState = {
  firstName: string;
  lastName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  contactMe: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  companyName: "",
  businessEmail: "",
  phoneNumber: "",
  contactMe: false,
};

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

function ViziCopilotDemoPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = field === "contactMe" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      // Clear the field's error as soon as the person edits it.
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    try {
      await api.submitViziCopilotDemo({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        company_name: form.companyName.trim(),
        business_email: form.businessEmail.trim(),
        phone_number: form.phoneNumber.trim(),
        contact_me: form.contactMe,
        source_page: "/vizi-copilot-gen-ai-demo-link/",
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
      <main className="min-h-screen bg-[#eef0f2]">
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
            {/* Left column: heading + copy */}
            <div className="max-w-xl">
              <h1 className="text-3xl font-bold leading-tight text-brand-navy md:text-3xl">
                VIZI CoPilot Drives 20% Efficiency and 25% Productivity Gains
                in Less Than 6 Months.
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-brand-ink/80">
                Access a live demo clip from our recent webinar,{" "}
                <em>Unlocking the Future of Energy with Gen-AI</em>, led by
                Chief Innovation &amp; Strategy Officer Nikhil Chauhan, and
                explore VIZI CoPilot's use cases.
              </p>
            </div>

            {/* Right column: form card */}
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-brand-navy">
                Access the live demo
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
                    className={errors.firstName ? "border-red-400 focus:border-red-400 focus:ring-red-400" : ""}
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
                    className={errors.lastName ? "border-red-400 focus:border-red-400 focus:ring-red-400" : ""}
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
                    className={errors.companyName ? "border-red-400 focus:border-red-400 focus:ring-red-400" : ""}
                  />
                  {errors.companyName && <FieldError message={errors.companyName} />}
                </div>

                <div>
                  <FloatingInput
                    type="email"
                    name="businessEmail"
                    label="Business Email*"
                    value={form.businessEmail}
                    onChange={handleChange("businessEmail")}
                    aria-invalid={!!errors.businessEmail}
                    className={errors.businessEmail ? "border-red-400 focus:border-red-400 focus:ring-red-400" : ""}
                  />
                  {errors.businessEmail && (
                    <FieldError message={errors.businessEmail} />
                  )}
                </div>

                <div>
                  <FloatingInput
                    type="tel"
                    name="phoneNumber"
                    label="Phone number* (10 digits)"
                    inputMode="numeric"
                    value={form.phoneNumber}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    aria-invalid={!!errors.phoneNumber}
                    className={errors.phoneNumber ? "border-red-400 focus:border-red-400 focus:ring-red-400" : ""}
                  />
                  {errors.phoneNumber && <FieldError message={errors.phoneNumber} />}
                </div>

                <label className="flex items-center gap-2 text-sm text-brand-ink/70">
                  <input
                    type="checkbox"
                    checked={form.contactMe}
                    onChange={handleChange("contactMe")}
                    className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                  />
                  Please have a VIZI CoPilot Expert contact me
                </label>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full bg-gradient-to-r from-[#6dbd45] to-[#1f8fd1] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "submitting" ? "Submitting…" : "Access Now"}
                </button>

                {status === "success" && (
                  <p className="text-sm text-green-600">
                    Thanks! Check your email for the demo link.
                  </p>
                )}
                {status === "error" && errorMessage && (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>
        </section>
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