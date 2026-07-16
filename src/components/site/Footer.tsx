import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Play } from "lucide-react";

const COLS = [
  {
    title: "SOFTWARE",
    links: [
      ["V-Plant", "platform/v-plant"],
      ["Signal Miner", "/platform/signal-miner"],
      ["Intelligent Demand Forecast", "/software/intelligent-demand-forecast"],
      ["Utilities Control Center", "/software/utilities-control-center"],
      ["Solutions", "/solutions"],
      ["Social-Digital", "/social-digital"],
    ],
  },
  {
    title: "COMPANY",
    links: [
      ["About Visionaize", "/about"],
      ["Meet The Team", "/meet-the-team"],
      ["Privacy Policy", "/privacy-policy"],
    ],
  },
  {
    title: "RESOURCES",
    links: [
      ["The Industrial Metaverse", "/theindustrialmetaverse"],
      ["Reinventing Turnarounds In The Metaverse", "/re-inventing-turnarounds-in-the-metaverse"],
      ["Blog", "/blog"],
      ["Contact Sales", "/contact"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="visionaize-footer relative overflow-hidden bg-[#101a2c] text-white">
      <style>{`
        .visionaize-footer::after {
          content: "";
          width: 980px;
          height: 460px;
          background: url('https://visionaize.com/wp-content/uploads/2022/05/footer-bg-2.png') no-repeat;
          position: absolute;
          right: 0;
          z-index: 1;
          bottom: 0;
          background-size: 100%;
        }
        @media (min-width: 1089px) {
          .visionaize-footer::after {
            height: 500px;
            width: 1030px;
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-10 sm:px-10">
        <div className="max-w-sm">
          <h2 className="font-serif text-6xl font-normal leading-none text-white sm:text-7xl">
            Let&rsquo;s Connect
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-white/85">
            Learn how Visionaize can reduce downtime
            <br />
            and increase productivity
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-[#8bc63e] to-[#2a9fb0] px-8 py-4 text-base font-semibold text-[#0d1728] shadow-lg transition-transform hover:scale-[1.02]"
          >
            Talk to an expert
          </Link>
        </div>

        <div className="mt-2 grid gap-y-8 lg:grid-cols-[180px_0.65fr_1.5fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold tracking-wide text-white/90">FOLLOW US</p>
            <div className="mt-2 flex items-center gap-5">
              <a href="#" aria-label="Facebook" className="text-white hover:text-white/70">
                <Facebook className="h-5 w-5" fill="currentColor" />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-5 w-7 items-center justify-center rounded-md bg-white transition-opacity hover:opacity-80"
              >
                <Play className="h-3 w-3 text-[#101a2c]" fill="currentColor" strokeWidth={0} />
              </a>

              <a href="#" aria-label="LinkedIn" className="text-white hover:text-white/70">
                <Linkedin className="h-5 w-5" fill="currentColor" />
              </a>
            </div>
          </div>

          <div aria-hidden="true" className="hidden lg:block" />

          <div className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold tracking-wide text-white/90">
                  {col.title}
                </h4>
                <ul className="mt-3 space-y-2">
                  {col.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        to={href}
                        className="text-[15px] text-white/80 transition-colors hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}