"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { experience } from "@/lib/data";
import { Reveal } from "./motion";
import { SectionLabel } from "./About";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="relative bg-ink text-paper">
      <div className="gutter py-24 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <SectionLabel n="03" light>
                Experience
              </SectionLabel>
              <Reveal>
                <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.035em]">
                  Five years on the <span className="font-serif font-normal italic text-ember">hook</span> for production.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-sm text-paper/60">
                  From requirement call to deploy to the incident channel, with no hand-offs in between.
                </p>
              </Reveal>
            </div>
          </div>

          <ol ref={ref} className="relative md:col-span-7 md:pl-14">
            {/* track + progress line */}
            <span aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-paper/15 md:left-[7px]" />
            <motion.span
              aria-hidden
              className="absolute left-[7px] top-2 bottom-0 w-px origin-top bg-ember"
              style={{ scaleY: line }}
            />

            {experience.map((e, i) => (
              <li key={e.role + e.place} className="relative pb-16 pl-10 last:pb-0 md:pl-0">
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-ember bg-ink md:-left-14"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1, backgroundColor: "#ff4a1c" }}
                  viewport={{ once: true, margin: "0px 0px -35% 0px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 16 }}
                />
                <Reveal delay={0.05}>
                  <p className="font-mono text-xs uppercase tracking-widest text-ember">{e.when}</p>
                  <h3 className={`mt-3 font-display font-semibold leading-[1] tracking-[-0.025em] ${i < 2 ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"}`}>
                    {e.role}
                  </h3>
                  <p className="mt-2 font-serif text-2xl italic text-paper/70 md:text-3xl">
                    {e.place} <span className="font-mono text-xs not-italic uppercase tracking-widest text-paper/40">· {e.where}</span>
                  </p>
                  <ul className="mt-6 space-y-3 text-paper/70">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3 leading-relaxed">
                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-paper/40" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
