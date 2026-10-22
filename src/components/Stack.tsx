"use client";

import { motion } from "motion/react";
import { stack } from "@/lib/data";
import { EASE, Reveal } from "./motion";
import { SectionLabel } from "./About";

export function Stack() {
  return (
    <section id="stack" className="gutter py-24 md:py-36">
      <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel n="04">Toolbox</SectionLabel>
        </div>
        <Reveal className="md:col-span-9">
          <h2 className="font-display text-[clamp(2.6rem,7.5vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.035em]">
            What I reach for, <span className="font-serif font-normal italic text-ember">daily</span>.
          </h2>
        </Reveal>
      </div>

      <ul className="border-t border-ink">
        {stack.map((g, i) => (
          <motion.li
            key={g.group}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.03 * i }}
            className="group relative isolate grid gap-3 border-b border-ink px-1 py-6 transition-colors duration-300 hover:bg-ink hover:text-paper md:grid-cols-12 md:gap-8 md:py-8"
          >
            <div className="flex items-baseline gap-4 md:col-span-3">
              <span className="font-mono text-xs text-mute transition-colors group-hover:text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{g.group}</h3>
            </div>
            <p className="font-[family-name:var(--font-poppins-face)] text-xl font-medium leading-[1.4] tracking-[-0.02em] md:col-span-9 md:text-[1.75rem]">
              {g.items.map((it, k) => (
                <span key={it} className="inline-block">
                  <span className="inline-block transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:text-ember">
                    {it}
                  </span>
                  {k < g.items.length - 1 && <span className="mx-2 font-normal text-ember md:mx-3">/</span>}
                </span>
              ))}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
