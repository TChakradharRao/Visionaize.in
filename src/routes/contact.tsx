import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { api } from "@/lib/api";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    setErrorMsg("");
    try {
      await api.submitContact({
        name: `${f.get("first_name") || ""} ${f.get("last_name") || ""}`.trim(),
        email: String(f.get("email") || ""),
        company: String(f.get("company") || "") || undefined,
        phone: String(f.get("phone") || "") || undefined,
        message: String(f.get("message") || ""),
        source_page: "/contact",
      });
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
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
        {/* Hero: green-to-blue gradient with heading left + form right */}
        <section
          className="relative overflow-hidden">
          <div className="grid grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24" style={{
            background:
              "linear-gradient(120deg, #A6E04A 0%, #5BAE7E 35%, #2E8FB1 65%, #1E7EC8 100%)",
          }}>
            <div className="text-brand-navy">
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Let's talk Digital Twins &amp; Immersive Industrial AI + Gen AI
              </h1>
              <p className="mt-6 max-w-xl text-lg text-brand-navy/90">
                Connect with us to learn how leading industrial companies around the globe are leveraging cutting edge AI, Gen AI, and Digital Twin technology to unlock hidden and lost value.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-2xl bg-white p-8 shadow-2xl lg:p-10"
            >
              <h2 className="text-2xl font-semibold text-brand-navy">Connect with us</h2>
              <div className="mt-6 space-y-4">
                <Input name="first_name" placeholder="First name*" required />
                <Input name="last_name" placeholder="Last name*" required />
                <Input name="company" placeholder="Company name*" required />
                <Input name="email" placeholder="Business Email*" type="email" required />
                <Input name="phone" placeholder="Phone number*" type="tel" required />
                <select
                  name="referral"
                  defaultValue=""
                  className="block w-full rounded-full border border-border bg-white px-5 py-3 text-sm text-brand-ink/80 focus:border-brand-blue focus:outline-none"
                >
                  <option value="" disabled>How did you first hear about us?</option>
                  <option>Search engine</option>
                  <option>Social media</option>
                  <option>Referral</option>
                  <option>Event / Webinar</option>
                  <option>Other</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={3}
                  className="block w-full rounded-2xl border border-border bg-white px-5 py-3 text-sm text-brand-ink focus:border-brand-blue focus:outline-none"
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
                {status === "sending" ? "Sending…" : "Send request"}
              </button>
              <p className="mt-3 text-center text-xs text-brand-ink/60">
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

        {/* Outcomes */}
        <section className="bg-[#F5F7FA] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-semibold leading-tight text-brand-navy md:text-4xl">
              The outcomes we focus on<br /> each and every day
            </h2>
            <ul className="mt-10 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
              {OUTCOMES.map((o) => (
                <li key={o} className="flex items-center gap-4 text-lg text-brand-ink">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#A6E04A] to-[#1E7EC8] text-white">
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
}: {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="block w-full rounded-full border border-border bg-white px-5 py-3 text-sm text-brand-ink placeholder:text-brand-ink/50 focus:border-brand-blue focus:outline-none"
    />
  );
}
