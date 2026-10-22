"use client";

import { aboutText, stats } from "@/lib/data";
import { CountUp, Reveal, ScrollFill } from "./motion";

export function SectionLabel({ n, children, light = false }: { n: string; children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-xs uppercase tracking-widest ${light ? "text-paper/60" : "text-mute"}`}>
      <span className="text-ember">({n})</span>
      {children}
    </p>
  );
}

export function About() {
  return (
    <section id="about" className="gutter pb-24 pt-36 md:pb-36 md:pt-52">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel n="01">About</SectionLabel>
        </div>
        <div className="md:col-span-9">
          <ScrollFill
            text={aboutText}
            className="font-display text-[clamp(1.6rem,3.6vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.025em]"
          />
        </div>
      </div>

      <dl className="mt-24 grid grid-cols-2 border-t border-ink md:mt-36 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="@container border-b border-ink py-8 pr-4 md:border-b-0 md:border-r md:py-10 md:pl-6 md:first:pl-0 md:first:pr-10 md:last:border-r-0">
            <dd className="font-display text-[clamp(2rem,28cqw,6.5rem)] font-semibold leading-none tracking-[-0.035em]">
              <CountUp to={s.value} suffix={s.suffix} />
            </dd>
            <dt className="mt-4 text-base font-medium md:text-lg">{s.label}</dt>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-mute">{s.note}</p>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
