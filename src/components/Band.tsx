"use client";

import { VelocityMarquee } from "./motion";

const words = ["OpenCart 4", "Laravel", "Payments", "Flutter", "Linux", "MySQL", "MCP", "Multi-tenant"];

export function Band() {
  return (
    <div className="overflow-x-clip py-3" aria-hidden>
      <div className="relative z-10 -rotate-[1.2deg] scale-[1.02] border-y-2 border-ink bg-ember py-4 text-ink md:py-5">
        <VelocityMarquee>
        {words.map((w) => (
          <span
            key={w}
            className="flex items-center font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold uppercase leading-none tracking-tight"
          >
            <span className="px-6 md:px-10">{w}</span>
            <span className="font-mono text-[0.55em] font-bold">{"//"}</span>
          </span>
        ))}
        </VelocityMarquee>
      </div>
    </div>
  );
}
