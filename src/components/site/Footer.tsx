/* eslint-disable prettier/prettier */
import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin } from "lucide-react";

const COLS = [
  {
    title: "SOFTWARE",
    links: [
      ["V-Plant", "/platform/v-plant"],
      ["Signal Miner", "/platform/signal-miner"],
      ["Intelligent Demand Forecast", "/intelligent-demand-forecast"],
      ["Utilities Control Center", "/utilities-control-center"],
      ["Solutions", "/solutions"],
      ["Social-Digital", "/social-digital"],
    ],
  },
  {
    title: "COMPANY",
    links: [
      ["About Visionaize", "/company"],
      ["Meet The Team", "/company#team"],
      ["Privacy Policy", "/privacy-policy"],
    ],
  },
  {
    title: "RESOURCES",
    links: [
      ["The Industrial Metaverse", "/theindustrialmetaverse"],
      ["Reinventing Turnarounds In The Metaverse", "/re-inventing-turnarounds-in-the-metaverse"],
      ["Blog", "/blog"],
      // ["Partner Portal", "/partner-portal"],
      ["Contact Sales", "/contact"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="visionaize-footer relative overflow-hidden bg-[#192737] text-white">
      <style>{`
        .visionaize-footer::after {
          content: "";
          width: 980px;
          height: 460px;
          background: url('/head-footer/footer-bg-2.png') no-repeat;
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
        .social-icon:hover {
          color: #61ce70;
        }
        .social-icon:hover svg {
          fill: #61ce70;
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-10 sm:px-10">
        {/* Heading block — kept narrow so it never reaches into the area
            where the curves run. */}
        <div className="max-w-md ">
          <h2 className="font-serif text-5xl font-normal leading-none text-white sm:text-6xl" style={{ fontFamily: "'Fira Sans', sans-serif" }}>
            Let&rsquo;s Connect
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-white">
            Learn how Visionaize can reduce downtime
            <br />
            and increase productivity
          </p>

          <Link
            to="/talk-to-an-expert"
            className="mt-8 gradient-cta inline-block rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-[1.02]"
          >
            Talk to an expert
          </Link>
        </div>

        {/* Bottom row: [ Follow us ] [ empty spacer for the curves ] [ link columns ]
            - grid-cols widened so the spacer proportionally matches the screenshot
              (columns now start further right, roughly the same ratio as the reference)
            - items-end so "FOLLOW US" sits low, level with the lower link rows,
              instead of pinned to the top of the row */}
        <div className="my-4 grid gap-y-8 lg:grid-cols-[180px_0.65fr_1.5fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">FOLLOW US</p>
            <div className="mt-2 flex items-center gap-4">
              <a href="https://www.facebook.com/VisionaizeInc" aria-label="Facebook" className="social-icon text-white transition-colors">
                <Facebook className="h-5 w-5" fill="currentColor" />
              </a>
              <a href="https://www.youtube.com/channel/UCYUh54m1vPWfoqC7VhkdNHA" aria-label="YouTube" className="social-icon text-white bg-white w-6 h-5 text-center rounded-md justify-center items-center transition-colors hover:bg-[#61ce70] ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" className="lucide text-center align-center m-auto mt-1 lucide-play h-3 w-3 text-[#101a2c]" aria-hidden="true"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
              </a>
              <a href="https://www.linkedin.com/company/visionaize/" aria-label="LinkedIn" className="social-icon text-white transition-colors">
                <Linkedin className="h-5 w-5" fill="currentColor" />
              </a>
            </div>
          </div>

          {/* empty spacer — intentionally blank, this is the lane the curves travel through */}
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="grid grid-cols-2 gap-x-1 gap-y-2 sm:grid-cols-3 lg:ml-20 sm:ml-2 footer-rightside-menu">
            {COLS.map((col) => (
              <div key={col.title} className="mb-3">
                <h4 className="text-sm font-semibold tracking-wide text-white tracking-wider">
                  {col.title}
                </h4>
                <ul className="mt-3 space-y-2">
                  {col.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        to={href}
                        className="text-[14px] text-white fontWeight-[200] transition-colors hover:text-white"
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