export type Tier = {
  slug: string;
  name: string;
  color: string;
  intro: string;
  bullets: string[];
  shot: string;
  short: string;
};

export const TIERS: Tier[] = [
  {
    slug: "explorer",
    name: "V-Plant Explorer",
    color: "#3EA0A8",
    intro: "For owners & operators that want to:",
    bullets: [
      "Start simple before scaling",
      "Realize fast time-to-value",
      "Leverage 3D scans and images",
      "Use light data integration",
    ],
    shot: "https://visionaize.in/wp-content/uploads/2024/05/side-by-side-desktop-left-v-plant-explorer.png",
    short:
      "Start fast and dip your toes into the Digital Twin waters with V-Plant Explorer – an entry-level foray into asset visualization that can scale as needed.",
  },
  {
    slug: "pro",
    name: "V-Plant Pro",
    color: "#5BAE7E",
    intro: "For owners & operators that want to:",
    bullets: [
      "Integrate mesh and 3D modeling techniques",
      "“Operationalize” rich 3D models",
      "Use deeper data integrations",
      "Scale operational use cases across the plant",
    ],
    shot: "https://visionaize.in/wp-content/uploads/2024/05/side-by-side-desktop-right-1-copy-1.png",
    short:
      "For those that want to scale Digital Twin functionality and operationalize their 3D models. Offers Asset virtualization approaches for both speed and precision.",
  },
  {
    slug: "360",
    name: "V-Plant 360",
    color: "#A6E04A",
    intro: "For owners & operators that want to:",
    bullets: [
      "Manage all plant data",
      "Tap advanced capabilities including VR",
      "Leverage Model Management of Change (MMOC)",
      "Scale operational use cases across the plant",
    ],
    shot: "http://visionaize.in/wp-content/uploads/2024/05/side-by-side-desktop-left-v-plant-360.png",
    short:
      "For those looking for full Digital Transformation, with all available functionality and deep data integrations. Best option for those ready to apply Digital Twin technology across the plant.",
  },
];

export function getTierBySlug(slug: string): Tier | undefined {
  return TIERS.find((t) => t.slug === slug);
}