import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { api } from "@/lib/api";

export const Route = createFileRoute("/vr-tour-request")({
  head: () => ({
    meta: [
      { title: "Request Your VR Tour — Visionaize" },
      {
        name: "description",
        content:
          "Take a stroll with Vizi through a complex industrial asset and get a feel for the Virtual Reality experience.",
      },
    ],
  }),
  component: VrTourRequestPage,
});

type FormState = {
  firstName: string;
  lastName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  companyName: "",
  businessEmail: "",
  phoneNumber: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Exactly 10 digits, no spaces/dashes/plus — matches what the backend expects.
const PHONE_REGEX = /^\d{10}$/;
const MESSAGE_MAX_LENGTH = 1000;

// Common free/personal email providers — rejected for a "Business Email" field.
// Keep this in sync with the FREE_EMAIL_DOMAINS set in the backend route.
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

function isBusinessEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return !!domain && !FREE_EMAIL_DOMAINS.has(domain);
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  const firstName = form.firstName.trim();
  const lastName = form.lastName.trim();
  const companyName = form.companyName.trim();
  const businessEmail = form.businessEmail.trim();
  const phoneDigits = form.phoneNumber.replace(/\D/g, "");
  const message = form.message.trim();

  if (!firstName) {
    errors.firstName = "First name is required";
  } else if (firstName.length > 100) {
    errors.firstName = "First name is too long";
  }

  if (!lastName) {
    errors.lastName = "Last name is required";
  } else if (lastName.length > 100) {
    errors.lastName = "Last name is too long";
  }

  if (!companyName) {
    errors.companyName = "Company name is required";
  } else if (companyName.length > 150) {
    errors.companyName = "Company name is too long";
  }

  if (!businessEmail) {
    errors.businessEmail = "Business email is required";
  } else if (!EMAIL_REGEX.test(businessEmail)) {
    errors.businessEmail = "Enter a valid email address";
  } else if (!isBusinessEmail(businessEmail)) {
    errors.businessEmail =
      "Please use your business email address, not a personal one (e.g. Gmail, Yahoo)";
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!PHONE_REGEX.test(phoneDigits)) {
    errors.phoneNumber = "Enter a valid 10-digit phone number";
  }

  if (message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer`;
  }

  return errors;
}

function VrTourRequestPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await api.submitVrTourRequest({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        company_name: form.companyName.trim(),
        business_email: form.businessEmail.trim(),
        phone_number: form.phoneNumber.replace(/\D/g, ""),
        message: form.message.trim() || undefined,
        source_page: "/vr-tour-request/",
      });

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your request. Please try again."
      );
    }
  };

  return (
    <>
      <Header />
      <main className="bg-[#eef0f2] overflow-x-hidden">
        <div className="relative">
          {/* Gradient hero band (top) */}
          <div className="absolute inset-x-0 top-0 h-[560px] sm:h-[480px] md:h-[420px] lg:h-[400px] bg-gradient-to-r from-[#6dbd45] to-[#1f8fd1]" />
          {/* Light gray band (bottom) */}
          <div className="absolute inset-x-0 top-[560px] sm:top-[480px] md:top-[420px] lg:top-[400px] bottom-0 bg-[#eef0f2]" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-20">
            <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 md:items-start">
              {/* Left column */}
              <div className="max-w-xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-brand-navy">
                  Experience an industrial site in the virtual world
                </h1>

                <img
                  src="https://visionaize.in/wp-content/uploads/2023/01/New-Project-1.png"
                  alt="Tablet showing a 3D industrial digital twin next to a VR headset"
                  className="mt-6 sm:mt-8 md:mt-10 w-full max-w-lg"
                />

                <p className="mt-5 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg leading-relaxed text-brand-navy/80">
                  Take a stroll with Vizi through a complex industrial asset
                  and get a feel for the Virtual Reality experience.
                </p>
              </div>

              {/* Right column: form card */}
              <div className="rounded-lg bg-white p-5 sm:p-6 md:p-8 shadow-sm">
                <h2 className="text-lg sm:text-xl font-semibold text-brand-navy">
                  Request your VR tour!
                </h2>

                <form onSubmit={handleSubmit} noValidate className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First name*"
                      value={form.firstName}
                      onChange={handleChange("firstName")}
                      aria-invalid={!!errors.firstName}
                      maxLength={100}
                      className={fieldClass(!!errors.firstName)}
                    />
                    {errors.firstName && <FieldError message={errors.firstName} />}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Last name*"
                      value={form.lastName}
                      onChange={handleChange("lastName")}
                      aria-invalid={!!errors.lastName}
                      maxLength={100}
                      className={fieldClass(!!errors.lastName)}
                    />
                    {errors.lastName && <FieldError message={errors.lastName} />}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Company name*"
                      value={form.companyName}
                      onChange={handleChange("companyName")}
                      aria-invalid={!!errors.companyName}
                      maxLength={150}
                      className={fieldClass(!!errors.companyName)}
                    />
                    {errors.companyName && (
                      <FieldError message={errors.companyName} />
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Business Email*"
                      value={form.businessEmail}
                      onChange={handleChange("businessEmail")}
                      aria-invalid={!!errors.businessEmail}
                      className={fieldClass(!!errors.businessEmail)}
                    />
                    {errors.businessEmail && (
                      <FieldError message={errors.businessEmail} />
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone number*"
                      value={form.phoneNumber}
                      onChange={handlePhoneChange}
                      aria-invalid={!!errors.phoneNumber}
                      inputMode="numeric"
                      maxLength={10}
                      className={fieldClass(!!errors.phoneNumber)}
                    />
                    {errors.phoneNumber && (
                      <FieldError message={errors.phoneNumber} />
                    )}
                  </div>

                  <div>
                    <textarea
                      placeholder="Message"
                      value={form.message}
                      onChange={handleChange("message")}
                      rows={3}
                      aria-invalid={!!errors.message}
                      maxLength={MESSAGE_MAX_LENGTH}
                      className={`${fieldClass(!!errors.message)} resize-none`}
                    />
                    <div className="mt-1 flex items-center justify-between">
                      {errors.message ? (
                        <FieldError message={errors.message} />
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-brand-navy/50">
                        {form.message.length}/{MESSAGE_MAX_LENGTH}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-full bg-gradient-to-r from-[#6dbd45] to-[#1f8fd1] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Send request"}
                  </button>

                  {status === "success" && (
                    <p className="text-sm text-green-600">
                      Thanks! We'll be in touch to set up your VR tour.
                    </p>
                  )}
                  {status === "error" && errorMessage && (
                    <p className="text-sm text-red-600">{errorMessage}</p>
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
    "w-full rounded-md border px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-brand-navy placeholder:text-brand-blue/70",
    "focus:outline-none focus:ring-1",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue",
  ].join(" ");
}

function FieldError({ message }: { message: string }) {
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}