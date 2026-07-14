import { Link } from "@tanstack/react-router";

// Right-edge floating quick-link rail (matches visionaize.com)
const RAIL = [
  {
    to: "/platform/v-smart-docx",
    label: "V-Smart DocX",
    img: "https://visionaize.com/wp-content/uploads/2024/10/280fe858-3ffb-429f-9f1e-3dd6210ad7b2.png",
  },
  {
    to: "/platform/v-plant",
    label: "V-Plant",
    img: "https://visionaize.com/wp-content/uploads/2024/10/99769f4d-7c7c-42fc-8bd3-4bad12e2e352.png",
  },
  {
    to: "/solutions/remote-performance-monitoring",
    label: "Remote Performance Monitoring",
    img: "https://visionaize.com/wp-content/uploads/2024/10/e2154971-0d06-4b27-be8c-991075b14a8e.png",
  },
  {
    to: "/platform/vizi-copilot-gen-ai",
    label: "VIZI CoPilot",
    img: "https://visionaize.com/wp-content/uploads/2024/10/6696e1dcd0d97179d019c6c79f2a95e0.png",
  },
  {
    to: "/platform/signal-miner",
    label: "Signal Miner",
    img: "https://visionaize.com/wp-content/uploads/2024/10/b473a13b-7db2-4ded-9e38-8be0d52bba9f.png",
  },
];

export function FloatingRail() {
  return (
    <div className="pointer-events-none fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {RAIL.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          title={item.label}
          aria-label={item.label}
          className="pointer-events-auto block h-[60px] w-[60px] overflow-hidden rounded-full shadow-lg transition-transform hover:scale-110"
        >
          <img src={item.img} alt={item.label} className="h-full w-full object-cover" />
        </Link>
      ))}
    </div>
  );
}
