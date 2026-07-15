import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
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

function RequestDemoPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    if (!/^\d{10}$/.test(phone)) {
      setStatus("err");
      setErrorMsg("Please enter a valid 10-digit phone number.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      await api.submitContact({
        name: `${f.get("first_name") || ""} ${f.get("last_name") || ""}`.trim(),
        email: String(f.get("email") || ""),
        company: String(f.get("company") || "") || undefined,
        phone,
        message: interest,
        source_page: "/request-a-demo",
      });
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
      setPhone("");
      setInterest("");
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
              className="relative z-10 mt-10 w-full rounded-2xl bg-white p-10 shadow-2xl lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:w-[450px]"
            >
              <h2 className="text-2xl font-semibold text-brand-navy">Request a demo</h2>
              <div className="mt-7 space-y-4">
                <Input name="first_name" placeholder="First name*" required />
                <Input name="last_name" placeholder="Last name*" required />
                <Input name="company" placeholder="Company name*" required />
                <Input
                  name="email"
                  placeholder="Business Email*"
                  type="email"
                  required
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  title="Please enter a valid email address containing @"
                />
                <Input
                  name="phone"
                  placeholder="Phone number*"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                  title="Please enter exactly 10 digits"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                />
                <textarea
                  name="interest"
                  placeholder="Your specific areas of interest."
                  rows={2}
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="block w-full rounded-lg border border-gray-700 bg-white px-4 py-3 text-[14px] font-medium text-brand-navy placeholder:text-brand-navy focus:border-brand-blue focus:outline-none"
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
              {status === "err" && (
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
  name,
  placeholder,
  type = "text",
  required = false,
  pattern,
  title,
  maxLength,
  inputMode,
  value,
  onChange,
}: {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  pattern?: string;
  title?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      name={name}
      type={type}
      required={required}
      pattern={pattern}
      title={title}
      maxLength={maxLength}
      inputMode={inputMode}
      placeholder={placeholder}
      {...(value !== undefined ? { value, onChange } : {})}
      className="block h-[46px] w-full rounded-lg border border-gray-700 bg-white px-4 text-[14px] font-medium text-brand-navy placeholder:text-brand-navy focus:border-brand-blue focus:outline-none"
    />
  );
}