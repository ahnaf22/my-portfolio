"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { lockScroll, scrollToId } from "@/lib/scroll";
import { useReady } from "./ready";
import { Magnetic } from "./motion";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
];

export function Nav() {
  const ready = useReady();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  // while the menu is open: freeze the page behind it and let Esc close it
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open]);

  // slide away on the way down so it never sits on top of content, come back on the way up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
  });

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // let the menu start closing before the page starts moving
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-ember"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference"
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? "-110%" : 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: hidden ? 0 : 0.1 }}
      >
        <nav className="gutter flex items-center justify-between py-5" aria-label="Primary">
          <a href="#top" onClick={go("top")} className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
            <span className="font-mono text-sm font-bold leading-none tracking-tighter">&lt;/&gt;</span>
            Ahnaf<span className="font-serif font-normal italic">.</span>
          </a>

          <ul className="hidden items-center gap-9 font-mono text-xs uppercase tracking-widest md:flex">
            {links.map((l, i) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={go(l.id)} className="group relative inline-block overflow-hidden py-1">
                  <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
                    <span className="mr-1.5 opacity-50">0{i + 1}</span>
                    {l.label}
                  </span>
                  <span className="absolute inset-0 block translate-y-full py-1 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
                    <span className="mr-1.5 opacity-50">0{i + 1}</span>
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Magnetic strength={0.25}>
                <a
                  href="#contact"
                  onClick={go("contact")}
                  className="rounded-full border border-white px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
                >
                  Let&apos;s talk
                </a>
              </Magnetic>
            </div>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
            >
              <span className={`h-[2px] w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-ink text-paper gutter pb-10 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-[clamp(1.25rem,4vw,3.5rem)] top-5 flex h-10 items-center gap-3 font-mono text-xs uppercase tracking-widest"
            >
              Close
              <span className="grid size-10 place-items-center rounded-full border border-paper/40 text-2xl leading-none">×</span>
            </button>
            <ul className="flex flex-col gap-2">
              {[...links, { id: "contact", label: "Contact" }].map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a href={`#${l.id}`} onClick={go(l.id)} className="font-display text-6xl font-semibold tracking-tight">
                    <span className="mr-3 align-top font-mono text-sm text-ember">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">Dhaka, Bangladesh — UTC+6</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
