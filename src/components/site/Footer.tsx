/* eslint-disable prettier/prettier */
import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Linkedin } from "lucide-react";

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
          background: url('https://visionaize.com/wp-content/uploads/2022/05/footer-bg-2.png') no-repeat;
          position: absolute;
          right: 0;
          z-index: 1;
          bottom: 0;
          background-size: 100%;
          opacity: 1;
        }
        @media (max-width: 1024px) {
          .visionaize-footer::after {
            width: 600px;
            height: 300px;
            opacity: 0.5;
          }
        }
        @media (max-width: 640px) {
          .visionaize-footer::after {
            width: 380px;
            height: 200px;
            opacity: 0.35;
          }
        }
        @media (min-width: 1089px) {
          .visionaize-footer::after {
            height: 500px;
            width: 1030px;
            opacity: 1;
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pt-16 md:px-10 md:pt-20">
        {/* Heading block — kept narrow so it never reaches into the area
            where the curves run. */}
        <div className="max-w-md">
          <h2
            className="font-serif text-4xl font-normal leading-none text-white xs:text-5xl sm:text-6xl"
            style={{ fontFamily: "'Fira Sans', sans-serif" }}
          >
            Let&rsquo;s Connect
          </h2>

          <p className="mt-5 text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg">
            Learn how Visionaize can reduce downtime and increase productivity
          </p>

          <Link
            to="/contact"
            className="mt-7 inline-block rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02] sm:mt-8 sm:px-8 sm:py-4 sm:text-base"
            style={{
              background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
            }}
          >
            Talk to an expert
          </Link>
        </div>

        {/* Bottom row: [ Follow us ] [ empty spacer for the curves ] [ link columns ] */}
        <div className="mt-10 grid gap-y-8 sm:mt-2 lg:grid-cols-[180px_0.65fr_1.5fr] lg:items-end">
          <div>
            <p className="text-lg font-semibold tracking-wide text-white/90">FOLLOW US</p>
            <div className="mt-2 flex items-center gap-4">
              
             <a   href="https://www.facebook.com/VisionaizeInc"
                aria-label="Facebook"
                className="text-white hover:text-white/70"
              >
                <Facebook className="h-5 w-5" fill="currentColor" />
              </a>
              
               <a href="https://www.youtube.com/channel/UCYUh54m1vPWfoqC7VhkdNHA"
                aria-label="YouTube"
                className="h-5 w-6 items-center justify-center rounded-md bg-white text-center text-white hover:bg-white/70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  className="lucide lucide-play m-auto mt-1 h-3 w-3 text-center align-center text-[#101a2c]"
                  aria-hidden="true"
                >
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>
                </svg>
              </a>
              
             <a   href="https://www.linkedin.com/company/visionaize/"
                aria-label="LinkedIn"
                className="text-white hover:text-white/70"
              >
                <Linkedin className="h-5 w-5" fill="currentColor" />
              </a>
            </div>
          </div>

          {/* empty spacer — intentionally blank, this is the lane the curves travel through */}
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="footer-rightside-menu grid grid-cols-1 gap-x-6 gap-y-6 xs:grid-cols-2 sm:grid-cols-3 lg:ml-20">
            {COLS.map((col) => (
              <div key={col.title} className="mb-3">
                <h4 className="text-sm font-semibold tracking-wide text-white/90">
                  {col.title}
                </h4>
                <ul className="mt-3 space-y-2">
                  {col.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        to={href}
                        className="text-sm text-white/80 transition-colors hover:text-white"
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