import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { api } from "@/lib/api";
import { FloatingInput } from "@/components/ui/floating-field";

export const Route = createFileRoute("/Talk-to-an-expert")({
  head: () => ({
    meta: [
      { title: "Contact — Talk to an Expert — Visionaize" },
      {
        name: "description",
        content:
          "Connect with us to learn how leading industrial companies around the globe are leveraging cutting edge AI, Gen AI, and Digital Twin technology to unlock hidden and lost value.",
      },
      { property: "og:title", content: "Contact — Visionaize" },
      {
        property: "og:description",
        content:
          "Connect with us to learn how leading industrial companies around the globe are leveraging cutting edge AI, Gen AI, and Digital Twin technology to unlock hidden and lost value.",
      },
    ],
  }),
  component: RouteComponent,
});

const MESSAGE_MAX_LEN = 500;

function RouteComponent() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

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
        message: message,
        source_page: "/Talk-to-an-expert",
      });
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("err");
      setErrorMsg(err instanceof Error ? err.message : "Unable to submit. Please try again.");
    }
  };

  const OUTCOMES = [
    "More productivity",
    "Reduced downtime",
    "Accelerated sustainability",
    "Improved worker safety",
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero: height is driven only by the left text column; form floats above via absolute positioning */}
        <section
          className="relative overflow-visible px-6 pb-8 pt-8 md:pb-10 md:pt-10"
          style={{
            background:
              "linear-gradient(120deg, #A6E04A 0%, #7FC46B 25%, #5BAE7E 50%, #2E8FB1 75%, #1E7EC8 100%)",
          }}
        >
          <div className="relative mx-auto max-w-7xl">
            <div className="text-brand-navy max-w-lg">
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                Let's talk Digital Twins &amp; Immersive Industrial AI + Gen AI
              </h1>
              <p className="mt-5 text-base leading-relaxed text-brand-navy/90">
                Connect with us to learn how leading industrial companies around the globe are leveraging cutting edge AI, Gen AI, and Digital Twin technology to unlock hidden and lost value.
              </p>
            </div>

            {/* Form card: absolutely positioned so it floats independent of hero height and spills into the section below */}
            <form
              onSubmit={onSubmit}
              className="relative z-10 mt-10 w-full rounded-2xl bg-white p-10 shadow-2xl lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:w-[450px]"
            >
              <h2 className="text-2xl font-semibold text-brand-navy">Connect with us</h2>
              <div className="mt-7 space-y-4">
                <FloatingInput name="first_name" label="First name*" required />
                <FloatingInput name="last_name" label="Last name*" required />
                <FloatingInput name="company" label="Company name*" required />
                <FloatingInput
                  name="email"
                  label="Business Email*"
                  type="email"
                  required
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  title="Please enter a valid email address containing @"
                />
                <FloatingInput
                  name="phone"
                  label="Phone number*"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                  title="Please enter exactly 10 digits"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                />
                <select
                  name="referral"
                  defaultValue=""
                  required
                  className="block h-[46px] w-full rounded-lg border border-gray-700 bg-white px-4 text-[14px] font-medium text-brand-navy focus:border-brand-blue focus:outline-none"
                >
                  <option value="" disabled>How did you first hear about us?</option>
                  <option>Search engine</option>
                  <option>Social media</option>
                  <option>Referral</option>
                  <option>Event / Webinar</option>
                  <option>Other</option>
                </select>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={2}
                    maxLength={MESSAGE_MAX_LEN}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ color: "#0B2545", WebkitTextFillColor: "#0B2545", opacity: 1 }}
                    className="block w-full resize-none rounded-lg border border-gray-700 bg-white px-4 py-3 text-[14px] font-medium placeholder:text-gray-500 focus:border-brand-blue focus:outline-none"
                  />
                  <p className="mt-1 text-right text-xs text-brand-navy/50">
                    {message.length}/{MESSAGE_MAX_LEN}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg transition-opacity disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #1E7EC8 100%)",
                }}
              >
                {status === "sending" ? "Sending…" : "Send request"}
              </button>
              <p className="mt-3 text-center text-xs text-brand-navy/70">
                We generally respond within 24 hours
              </p>
              {status === "ok" && (
                <p className="mt-4 text-center text-sm text-green-600">
                  Thanks — we received your message and will respond shortly.
                </p>
              )}
              {status === "err" && (
                <p className="mt-4 text-center text-sm text-red-600">{errorMsg}</p>
              )}
            </form>
          </div>
        </section>

        {/* Outcomes: starts immediately below the short hero; form floats on top of this section's right side */}
        <section className="bg-[#F5F7FA] pb-16 pt-14 md:pb-20 md:pt-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-semibold leading-tight text-brand-navy md:text-4xl">
              The outcomes we focus on<br /> each and every day
            </h2>
            <ul className="mt-10 grid max-w-2xl grid-cols-1 gap-5">
              {OUTCOMES.map((o) => (
                <li key={o} className="flex items-center gap-4 text-lg text-brand-ink">
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