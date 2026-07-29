import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { api } from "@/lib/api";

export const Route = createFileRoute("/signal-miner-contact")({
  head: () => ({
    meta: [
      { title: "Connect With an Expert — Visionaize Signal Miner" },
      {
        name: "description",
        content:
          "We're here to help you understand your data, build efficiencies, increase productivity, improve processes, and lower the downtime in your current operations.",
      },
    ],
  }),
  component: SignalMinerContactPage,
});

const SOLUTIONS = [
  "Compiling and analyzing large datasets",
  "Detecting anomalies early",
  "Predicting maintenance to avoid downtime",
  "Improving safety and compliance",
  "Lowering energy consumption",
  "Environmental impact",
] as const;

const BENEFITS = [
  "Less downtime",
  "Increased productivity",
  "Reduced carbon footprint",
  "Improved worker safety",
];

type FormState = {
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  phoneNumber: string;
  email: string;
  seekingSolutions: string[];
  comments: string;
};

type FormErrors = Partial<
  Record<Exclude<keyof FormState, "seekingSolutions" | "comments">, string>
>;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  title: "",
  phoneNumber: "",
  email: "",
  seekingSolutions: [],
  comments: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;
const NAME_REGEX = /^[A-Za-z\s.'-]+$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (!NAME_REGEX.test(form.firstName.trim())) {
    errors.firstName = "Enter a valid first name";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (!NAME_REGEX.test(form.lastName.trim())) {
    errors.lastName = "Enter a valid last name";
  }

  if (!form.company.trim()) errors.company = "Company is required";
  if (!form.title.trim()) errors.title = "Title is required";

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!PHONE_REGEX.test(form.phoneNumber.trim())) {
    errors.phoneNumber = "Enter a valid 10-digit phone number";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  return errors;
}

function SignalMinerContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof Omit<FormState, "seekingSolutions">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value = e.target.value;

      // Restrict phone number field to digits only, capped at 10.
      if (field === "phoneNumber") {
        value = value.replace(/\D/g, "").slice(0, 10);
      }

      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const toggleSolution = (solution: string) => {
    setForm((prev) => ({
      ...prev,
      seekingSolutions: prev.seekingSolutions.includes(solution)
        ? prev.seekingSolutions.filter((s) => s !== solution)
        : [...prev.seekingSolutions, solution],
    }));
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
      await api.submitSignalMinerContact({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        company: form.company.trim(),
        title: form.title.trim(),
        phone_number: form.phoneNumber.trim(),
        email: form.email.trim(),
        seeking_solutions: form.seekingSolutions,
        comments: form.comments.trim() || undefined,
        source_page: "/signal-miner-contact/",
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
          <div className="absolute inset-x-0 top-0 h-[560px] bg-gradient-to-r from-[#6dbd45] to-[#1f8fd1] md:h-[600px]" />
          {/* Light gray band (bottom, behind the "Together we can Visionaize" section) */}
          <div className="absolute inset-x-0 top-[560px] bottom-0 bg-[#eef0f2] md:top-[600px]" />

          <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
              {/* Left column */}
              <div className="max-w-xl">
                <h1 className="text-3xl font leading-tight text-brand-navy md:text-4xl">
                  Monitoring capabilities that maximize operational output
                </h1>
                <p className="mt-8 text-lg leading-relaxed text-brand-navy/80">
                  We're here to help you understand your data, build
                  efficiencies, increase productivity, improve processes, and
                  lower the downtime in your current operations.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-brand-navy/80">
                  Connect with us to learn how other organizations are using
                  data in a 4.0-era to evolutionize their manufacturing
                  environment.
                </p>

                <h2 className="mt-57 text-2xl font-bold text-brand-navy">
                  Together we can Visionaize a better world
                </h2>
                <ul className="mt-8 space-y-6">
                  {BENEFITS.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#6dbd45] to-[#1f8fd1]">
                        <Check className="h-5 w-5 text-white" strokeWidth={3} />
                      </span>
                      <span className="text-base font-medium text-brand-navy">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column: form card */}
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-brand-navy">
                  Connect with an expert
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
                      placeholder="Company*"
                      value={form.company}
                      onChange={handleChange("company")}
                      aria-invalid={!!errors.company}
                      className={fieldClass(!!errors.company)}
                    />
                    {errors.company && <FieldError message={errors.company} />}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Title*"
                      value={form.title}
                      onChange={handleChange("title")}
                      aria-invalid={!!errors.title}
                      className={fieldClass(!!errors.title)}
                    />
                    {errors.title && <FieldError message={errors.title} />}
                  </div>

                  <div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="Phone number*"
                      value={form.phoneNumber}
                      onChange={handleChange("phoneNumber")}
                      aria-invalid={!!errors.phoneNumber}
                      className={fieldClass(!!errors.phoneNumber)}
                      maxLength={10}
                    />
                    {errors.phoneNumber && <FieldError message={errors.phoneNumber} />}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email*"
                      value={form.email}
                      onChange={handleChange("email")}
                      aria-invalid={!!errors.email}
                      className={fieldClass(!!errors.email)}
                    />
                    {errors.email && <FieldError message={errors.email} />}
                  </div>

                  <fieldset className="rounded-md border border-gray-300 p-4">
                    <legend className="px-1 text-sm font-semibold text-brand-navy">
                      Seeking Solutions For:
                    </legend>
                    <div className="mt-2 space-y-2">
                      {SOLUTIONS.map((solution) => (
                        <label
                          key={solution}
                          className="flex items-center gap-2 text-sm text-brand-blue"
                        >
                          <input
                            type="checkbox"
                            checked={form.seekingSolutions.includes(solution)}
                            onChange={() => toggleSolution(solution)}
                            className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                          />
                          {solution}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <textarea
                    placeholder="Comments"
                    value={form.comments}
                    onChange={handleChange("comments")}
                    rows={3}
                    className={`${fieldClass(false)} resize-none`}
                  />

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-full bg-gradient-to-r from-[#6dbd45] to-[#1f8fd1] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Send Request"}
                  </button>

                  {status === "success" && (
                    <p className="text-sm text-green-600">
                      Thanks! Your request has been sent — we'll be in touch
                      soon.
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