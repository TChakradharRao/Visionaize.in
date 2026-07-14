import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/platform/vizi-copilot")({
  beforeLoad: () => {
    throw redirect({ to: "/platform/vizi-copilot-gen-ai" });
  },
});
