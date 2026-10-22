"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { lockScroll } from "@/lib/scroll";

const hellos = ["Hello", "হ্যালো", "Hola", "Bonjour", "こんにちは", "Hello"];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);
  const [done, setDone] = useState(false);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = setTimeout(() => {
        setDone(true);
        doneRef.current();
      }, 0);
      return () => clearTimeout(t);
    }

    lockScroll(true);
    const duration = 2200;
    const start = performance.now();
    let raf = 0;
    let finish: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      setWord(Math.min(hellos.length - 1, Math.floor(p * hellos.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        finish = setTimeout(() => {
          lockScroll(false);
          setDone(true);
          doneRef.current();
        }, 300);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(finish);
      lockScroll(false);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[95] flex flex-col justify-between bg-ink text-paper gutter py-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-paper/60">
            <span>Portfolio ©2026</span>
            <span>Dhaka · BD</span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <span className="size-3 rounded-full bg-ember md:size-4" />
            <AnimatePresence mode="wait">
              <motion.span
                key={word}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="font-display text-[clamp(2.5rem,8vw,7rem)] font-medium leading-none tracking-tight"
              >
                {hellos[word]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-display text-[clamp(5rem,22vw,20rem)] font-bold leading-[0.8] tracking-tighter tabular-nums">
              {String(count).padStart(2, "0")}
            </span>
            <span className="mb-2 max-w-[10rem] text-right font-mono text-xs uppercase tracking-widest text-paper/60">
              Booting up the portfolio
            </span>
          </div>

          {/* curved trailing edge, makes the exit feel like a curtain */}
          <div className="absolute inset-x-0 top-full h-[12vh] overflow-hidden">
            <div className="h-[24vh] w-full rounded-b-[50%] bg-ink" style={{ marginTop: "-12vh" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
