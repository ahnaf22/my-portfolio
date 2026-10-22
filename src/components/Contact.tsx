"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/lib/data";
import { scrollToTop } from "@/lib/scroll";
import { EASE, Magnetic, Mask, VelocityMarquee } from "./motion";
import { LiveClock } from "./LiveClock";
import { SectionLabel } from "./About";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-paper">
      <div className="gutter pb-10 pt-24 md:pt-36">
        <SectionLabel n="06" light>
          Contact
        </SectionLabel>

        <motion.h2
          className="mt-8 font-display text-[clamp(3rem,11vw,12rem)] font-semibold leading-[0.88] tracking-[-0.04em]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        >
          {[
            <>Let&apos;s build</>,
            <>something that</>,
            <>
              <span className="font-serif font-normal italic text-ember">holds up.</span>
            </>,
          ].map((line, i) => (
            <Mask key={i} play delay={0}>
              <motion.span
                className="block"
                variants={{ hidden: { y: "115%" }, show: { y: "0%" } }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </Mask>
          ))}
        </motion.h2>

        <div className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">Email</p>
            <Magnetic strength={0.15}>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="Write"
                className="group relative mt-2 inline-block font-display text-[clamp(1.4rem,3.6vw,3.2rem)] font-medium tracking-tight"
              >
                {profile.email}
                <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-100 bg-ember transition-transform duration-500 ease-[var(--ease-in-out-quart)] group-hover:origin-right group-hover:scale-x-0" />
              </a>
            </Magnetic>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={copy}
                className="rounded-full bg-ember px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-paper"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
              <a
                href={profile.cv}
                download
                className="rounded-full border border-paper/50 px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-paper hover:text-ink"
              >
                Download CV ↗
              </a>
              <span className="font-mono text-xs uppercase tracking-widest text-paper/50">{profile.phone}</span>
            </div>
          </div>

          <ul className="flex flex-col gap-1 font-display text-2xl font-medium md:items-end md:text-3xl">
            {profile.links.map((l, i) => (
              // each link is clipped and rises from below, one after another
              <li key={l.label} className="overflow-hidden pb-1">
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                >
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 transition-colors hover:text-ember"
                  >
                    {l.label}
                    <span className="inline-block -translate-x-2 text-lg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">↗</span>
                  </a>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 border-y border-paper/15 py-3 text-paper/20" aria-hidden>
        <VelocityMarquee base={1.4}>
          <span className="px-6 font-display text-[clamp(3rem,9vw,8rem)] font-bold uppercase leading-none tracking-tighter">
            Available for new roles <span className="font-mono text-ember">&lt;/&gt;</span>
          </span>
        </VelocityMarquee>
      </div>

      <div className="gutter flex flex-wrap items-center justify-between gap-4 py-6 font-mono text-[11px] uppercase tracking-widest text-paper/50">
        <span>© 2026 {profile.name}</span>
        <span>
          Dhaka <LiveClock withSeconds /> UTC+6
        </span>
        <button onClick={scrollToTop} data-cursor="Top" className="transition-colors hover:text-ember">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
