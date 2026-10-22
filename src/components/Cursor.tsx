"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Mode = "idle" | "link" | "label";

/**
 * Dot + trailing ring. Elements opt in to a labelled cursor with data-cursor="View".
 * Anything else interactive (a, button, input) just grows the ring.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const [mode, setMode] = useState<Mode>("idle");
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setLabel(tagged.dataset.cursor ?? "");
        setMode("label");
      } else if (t?.closest("a, button, input, [role='button']")) {
        setMode("link");
      } else {
        setMode("idle");
      }
    };
    const leave = () => setVisible(false);
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  const size = mode === "label" ? 92 : mode === "link" ? 54 : 30;

  return (
    <div aria-hidden className="cursor-layer pointer-events-none fixed inset-0 z-[100]">
      {/* ring */}
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full font-mono text-[11px] uppercase tracking-wider"
          animate={{
            width: size,
            height: size,
            opacity: visible ? 1 : 0,
            scale: down ? 0.85 : 1,
            backgroundColor: mode === "label" ? "#ff4a1c" : "rgba(255,74,28,0)",
            borderColor: mode === "label" ? "#ff4a1c" : "#ff4a1c",
            color: "#15140f",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          style={{ borderWidth: 1.5, borderStyle: "solid" }}
        >
          <motion.span animate={{ opacity: mode === "label" ? 1 : 0 }}>{label}</motion.span>
        </motion.div>
      </motion.div>
      {/* dot */}
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-ember"
          animate={{ width: 6, height: 6, opacity: visible && mode !== "label" ? 1 : 0 }}
        />
      </motion.div>
    </div>
  );
}
