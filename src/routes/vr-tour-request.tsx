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

type FormErrors = Partial<
  Record<Exclude<keyof FormState, "phoneNumber" | "message">, string>
>;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  companyName: "",
  businessEmail: "",
  phoneNumber: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        phone_number: form.phoneNumber.trim() || undefined,
        message: form.message.trim() || undefined,
        source_page: "/vr-tour-request/",
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
      <main className="bg-[#eef0f2]">
        <div className="relative">
          {/* Gradient hero band (top) */}
          <div className="absolute inset-x-0 top-0 h-[460px] bg-gradient-to-r from-[#6dbd45] to-[#1f8fd1] md:h-[400px]" />
          {/* Light gray band (bottom) */}
          <div className="absolute inset-x-0 top-[460px] bottom-0 bg-[#eef0f2] md:top-[500px]" />

          <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
              {/* Left column */}
              <div className="max-w-xl">
                <h1 className="text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
                  Experience an industrial site in the virtual world
                </h1>

                <img
                  src="https://visionaize.in/wp-content/uploads/2023/01/New-Project-1.png"
                  alt="Tablet showing a 3D industrial digital twin next to a VR headset"
                  className="mt-10 w-full max-w-lg"
                />

                <p className="mt-8 text-lg leading-relaxed text-brand-navy/80">
                  Take a stroll with Vizi through a complex industrial asset
                  and get a feel for the Virtual Reality experience.
                </p>
              </div>

              {/* Right column: form card */}
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-brand-navy">
                  Request your VR tour!
                </h2>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First name*"
                      value={form.firstName}
                      onChange={handleChange("firstName")}
                      aria-invalid={!!errors.firstName}
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
                      placeholder="Phone number"
                      value={form.phoneNumber}
                      onChange={handleChange("phoneNumber")}
                      className={fieldClass(false)}
                    />
                  </div>

                  <textarea
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange("message")}
                    rows={3}
                    className={`${fieldClass(false)} resize-none`}
                  />

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