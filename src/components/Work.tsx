"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { projects, type ArtId } from "@/lib/data";
import { CoverArt } from "./CoverArt";
import { EASE, Reveal } from "./motion";
import { SectionLabel } from "./About";

export function Work() {
  const [open, setOpen] = useState<ArtId | null>("storola");
  const [hover, setHover] = useState<ArtId | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const tilt = useSpring(0, { stiffness: 200, damping: 20 });

  const showFollower = hover !== null && hover !== open;

  return (
    <section
      id="work"
      className="gutter py-24 md:py-36"
      onPointerMove={(e) => {
        const dx = e.clientX + 230 - x.get();
        tilt.set(Math.max(-8, Math.min(8, dx * 0.06)));
        // sit beside the pointer instead of on top of the row title
        x.set(Math.min(e.clientX + 230, window.innerWidth - 190));
        y.set(e.clientY);
      }}
    >
      <div className="mb-14 grid gap-6 md:mb-24 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel n="02">Selected work</SectionLabel>
        </div>
        <Reveal className="md:col-span-9">
          <h2 className="font-display text-[clamp(2.6rem,8.5vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.035em]">
            Things I&apos;ve <span className="font-serif font-normal italic text-ember">shipped</span>
            <sup className="ml-2 align-super font-mono text-base font-normal tracking-normal text-mute md:text-xl">
              ({String(projects.length).padStart(2, "0")})
            </sup>
          </h2>
        </Reveal>
      </div>

      <ul className="border-t border-ink" onPointerLeave={() => setHover(null)}>
        {projects.map((p, i) => {
          const isOpen = open === p.id;
          return (
            <li key={p.id} className="border-b border-ink" onPointerEnter={() => setHover(p.id)}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.06 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  data-cursor={isOpen ? "Close" : "Open"}
                  className={`group relative isolate grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 overflow-hidden px-1 py-6 text-left transition-colors duration-500 before:absolute before:inset-0 before:-z-10 before:origin-bottom before:bg-ink before:transition-transform before:duration-500 before:ease-[var(--ease-in-out-quart)] md:grid-cols-[4rem_1fr_16rem_3rem] md:py-9 ${
                    isOpen ? "before:scale-y-0" : "before:scale-y-0 hover:text-paper hover:before:scale-y-100"
                  }`}
                >
                  <span className="font-mono text-xs tracking-widest text-mute transition-colors group-hover:text-ember md:text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(1.9rem,5.2vw,4.8rem)] font-semibold leading-none tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 md:group-hover:translate-x-6">
                    {p.title}
                  </span>
                  <span className="hidden font-mono text-xs uppercase leading-snug tracking-widest opacity-70 md:block">
                    {p.kind}
                  </span>
                  <span
                    className={`relative grid size-9 place-items-center justify-self-end rounded-full border border-current transition-transform duration-500 ease-[var(--ease-out-expo)] md:size-11 ${
                      isOpen ? "rotate-45 bg-ember text-ink border-ember" : "group-hover:rotate-90"
                    }`}
                    aria-hidden
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current" />
                  </span>
                </button>
              </motion.div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-10 pt-2 md:grid-cols-12 md:gap-12 md:pb-14 md:pl-[4rem]">
                      <CoverArt id={p.id} className="aspect-[4/3] w-full rounded-2xl md:col-span-5" />
                      <div className="md:col-span-7">
                        <p className="font-display text-xl font-medium leading-snug tracking-tight md:text-3xl">
                          {p.summary}
                        </p>
                        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink/75 md:text-base">
                          {p.points.map((pt) => (
                            <li key={pt} className="flex gap-3">
                              <span className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-ember" />
                              {pt}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-7 flex flex-wrap items-center gap-2">
                          {p.stack.map((s) => (
                            <span key={s} className="rounded-full border border-ink/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider">
                              {s}
                            </span>
                          ))}
                          {p.href && (
                            <a
                              href={p.href}
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="Visit"
                              className="ml-auto rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:bg-ember hover:text-ink"
                            >
                              Visit live ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* cursor-following preview, desktop only */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          style={{ rotate: tilt }}
          animate={{ scale: showFollower ? 1 : 0.4, opacity: showFollower ? 1 : 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="relative h-[15rem] w-[20rem] overflow-hidden rounded-2xl border-2 border-ink shadow-[8px_8px_0_0_var(--color-ink)]">
            <AnimatePresence mode="popLayout">
              {hover && (
                <motion.div
                  key={hover}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  <CoverArt id={hover} className="size-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
