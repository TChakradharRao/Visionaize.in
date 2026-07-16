import { ArrowUp } from "lucide-react";
import type { Tier } from "@/lib/v-plant-tiers";

export function TierDetailSection({ tier }: { tier: Tier }) {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <style>{`
          @keyframes floatUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .floaty {
            animation: floatUpDown 2.2s ease-in-out infinite;
          }
        `}</style>

        <h2 className="text-center text-4xl font-semibold text-brand-navy md:text-4xl">
          Digital Twin Technology Built to Scale
        </h2>

        <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <div className="relative mx-auto max-w-xl rounded-t-xl border-x-8 border-t-8 border-brand-ink/15 bg-white">
              <img
                src={tier.shot}
                alt={`${tier.name} screenshot`}
                className="block aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mx-auto h-3 max-w-2xl rounded-b-2xl bg-brand-ink/15" />
          </div>

          <div className="md:pl-8">
            <div className="flex items-center gap-3">
              <h3 className="text-4xl font-bold text-brand-navy">{tier.name}</h3>
              <ArrowUp className="floaty h-9 w-9" style={{ color: tier.color }} />
            </div>
            <p className="mt-5 text-lg text-brand-ink/85">{tier.intro}</p>
            <ul className="mt-5 space-y-3">
              {tier.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-lg text-brand-ink/85">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full"
                    style={{ background: tier.color }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}