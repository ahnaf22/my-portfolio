"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { scrollToId } from "@/lib/scroll";
import { profile } from "@/lib/data";
import { useReady } from "./ready";
import { LiveClock } from "./LiveClock";
import { EASE, Magnetic, Mask } from "./motion";

/** Rotating circular text sticker */
function Sticker() {
  return (
    <div className="relative grid size-full place-items-center">
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 size-full" aria-hidden>
        <defs>
          <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-ink font-mono text-[13px] uppercase">
          <textPath href="#circ" textLength="488" lengthAdjust="spacing">
            5+ years · PHP · Laravel · Flutter · Linux ·{" "}
          </textPath>
        </text>
      </svg>
      <span className="font-mono text-3xl font-bold leading-none tracking-tighter text-ember">&lt;/&gt;</span>
    </div>
  );
}

function PillAsterisk() {
  return (
    <span className="mx-[0.12em] inline-flex h-[0.74em] w-[1.45em] translate-y-[0.02em] items-center justify-center overflow-hidden rounded-full bg-ember align-middle text-paper">
      <span className="font-mono text-[0.3em] font-bold leading-none tracking-tighter">&lt;/&gt;</span>
    </span>
  );
}

function PillTerminal() {
  return (
    <span className="mx-[0.12em] inline-flex h-[0.74em] w-[1.9em] translate-y-[0.02em] items-center overflow-hidden rounded-full bg-ink pl-[0.3em] align-middle">
      {/* em units above belong to the headline; the text gets its own smaller size */}
      <span className="flex items-center gap-[0.35em] font-mono text-[0.28em] font-medium leading-none text-lime">
        <span>$&nbsp;sudo</span>
        <span className="blink inline-block h-[1em] w-[0.55em] bg-lime" />
      </span>
    </span>
  );
}

export function Hero() {
  const ready = useReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const stickerY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // sticker drifts a little toward the pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden gutter pb-8 pt-28 md:pt-32"
      onPointerMove={(e) => {
        mx.set((e.clientX / window.innerWidth - 0.5) * 40);
        my.set((e.clientY / window.innerHeight - 0.5) * 40);
      }}
    >
      {/* meta row */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-widest text-mute md:text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span className="flex items-center gap-2.5 text-ink">
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 rounded-full bg-ember" style={{ animation: "ping-dot 1.8s ease-out infinite" }} />
            <span className="relative size-2.5 rounded-full bg-ember" />
          </span>
          Open to new roles
        </span>
        <span>
          {profile.location} · <LiveClock /> <span className="text-ink">UTC+6</span>
        </span>
        <span className="hidden sm:inline">Portfolio — 2026</span>
      </motion.div>

      {/* headline */}
      <motion.h1
        style={{ y: headY, opacity: fade }}
        className="my-10 font-display text-[clamp(2.7rem,min(9.4vw,16.5vh),10.5rem)] font-semibold leading-[0.88] tracking-[-0.035em] md:my-0"
      >
        <Mask play={ready} delay={0.05}>
          I build <PillAsterisk />
          <span className="whitespace-nowrap">e-commerce</span>
        </Mask>
        <Mask play={ready} delay={0.15}>
          platforms &amp; <span className="font-serif font-normal italic tracking-[-0.03em] text-ember">run</span>
        </Mask>
        <Mask play={ready} delay={0.25}>
          the <PillTerminal /> servers
        </Mask>
        <Mask play={ready} delay={0.35}>
          underneath them.
        </Mask>
      </motion.h1>

      {/* lower row */}
      <div className="grid items-end gap-8 md:grid-cols-12">
        <motion.p
          className="font-mono text-xs uppercase leading-relaxed tracking-widest text-mute md:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
        >
          <span className="text-ink">{profile.name}</span>
          <br />
          {profile.role}
          <br />
          PHP · Laravel · OpenCart · Flutter · Linux
        </motion.p>

        <motion.p
          className="max-w-md text-base leading-snug text-ink/80 md:col-span-5 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
        >
          Five years of shipping storefronts, payment flows and a multi-tenant SaaS, then staying on the hook when
          traffic spikes. I like systems that are boring at 3&nbsp;a.m.
        </motion.p>

        <motion.div
          className="flex items-center gap-3 md:col-span-4 md:justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
        >
          <Magnetic>
            <button
              onClick={() => scrollToId("work")}
              data-cursor="Go"
              className="rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:bg-ember"
            >
              Selected work ↓
            </button>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.cv}
              download
              className="inline-block rounded-full border border-ink px-6 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
            >
              CV ↗
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* sticker */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[6vw] top-[48vh] hidden size-40 lg:block xl:size-48"
        style={{ x: sx, y: sy }}
        initial={{ scale: 0, rotate: -90 }}
        animate={ready ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: 1, duration: 1.2, ease: EASE }}
      >
        <motion.div className="size-full" style={{ y: stickerY }}>
          <Sticker />
        </motion.div>
      </motion.div>
    </section>
  );
}
