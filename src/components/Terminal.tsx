"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { profile, projects } from "@/lib/data";
import { Reveal } from "./motion";
import { SectionLabel } from "./About";

type Line = { kind: "in" | "out" | "dim"; text: string };

const intro: Line[] = [
  { kind: "dim", text: "ssh ahnaf@storola-prod  # Ubuntu, Nginx, PHP-FPM, MySQL" },
  { kind: "out", text: "Last login: just now. 0 failed units, backups green." },
  { kind: "out", text: "Type 'help' to see what this shell knows." },
];

function monthsInProduction() {
  const start = new Date(2020, 10, 1);
  const now = new Date();
  return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
}

function run(cmd: string): { lines: string[]; clear?: boolean; mail?: boolean } {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "":
      return { lines: [] };
    case "help":
      return {
        lines: [
          "whoami     who is on the other end",
          "stack      what runs here",
          "projects   things shipped",
          "uptime     how long on the pager",
          "ai         how I use coding agents",
          "contact    ways to reach me",
          "clear      wipe the screen",
        ],
      };
    case "whoami":
      return { lines: ["ahnaf: senior software engineer, Dhaka (UTC+6). PHP, Laravel, OpenCart, Flutter, Linux."] };
    case "stack":
      return { lines: ["php8 · laravel · opencart3/4 · mysql · nginx · php-fpm · linux · flutter · bash"] };
    case "projects":
      return { lines: projects.map((p) => `${p.id.padEnd(11)} ${p.kind}`) };
    case "uptime": {
      const m = monthsInProduction();
      return { lines: [`up ${Math.floor(m / 12)} years, ${m % 12} months in production · 0 hand-offs · load average: calm`] };
    }
    case "ai":
      return { lines: ["claude code · codex · gemini · mcp", "every diff is read by a human before it ships."] };
    case "contact":
      return { lines: [profile.email, profile.phone, profile.location] };
    case "clear":
      return { lines: [], clear: true };
    case "sudo hire-me":
    case "sudo hire me":
      return { lines: ["[sudo] password for recruiter: ********", "permission granted. opening your mail client…"], mail: true };
    default:
      return { lines: [`command not found: ${c}. try 'help'`] };
  }
}

export function Terminal() {
  const boxRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef, { once: true, margin: "0px 0px -20% 0px" });
  const [shown, setShown] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const hIdx = useRef(-1);

  // type the intro in line by line once the window is visible
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setShown((s) => {
        if (s >= intro.length) {
          clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, 650);
    return () => clearInterval(id);
  }, [inView]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, shown]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = value;
    const res = run(raw);
    history.current.unshift(raw);
    hIdx.current = -1;
    setValue("");
    if (res.clear) {
      setLines([]);
      return;
    }
    setLines((l) => [
      ...l,
      { kind: "in", text: raw },
      ...res.lines.map((t): Line => ({ kind: "out", text: t })),
    ]);
    if (res.mail) setTimeout(() => (window.location.href = `mailto:${profile.email}?subject=Let's talk`), 1200);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" && history.current.length) {
      e.preventDefault();
      hIdx.current = Math.min(hIdx.current + 1, history.current.length - 1);
      setValue(history.current[hIdx.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hIdx.current = Math.max(hIdx.current - 1, -1);
      setValue(hIdx.current === -1 ? "" : history.current[hIdx.current]);
    }
  };

  return (
    <section className="gutter pb-24 md:pb-36">
      <div className="grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionLabel n="05">Under the hood</SectionLabel>
          <Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
              Yes, I also run the <span className="font-serif font-normal italic text-ember">servers</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-ink/70">
              Provisioning, hardening, deploys, backups and incident response for the platforms I build. Poke around the
              shell, it&apos;s live.
            </p>
          </Reveal>
        </div>

        <Reveal className="md:col-span-7" delay={0.1}>
          <div
            ref={boxRef}
            className="overflow-hidden rounded-2xl border-2 border-ink bg-ink text-paper shadow-[10px_10px_0_0_var(--color-ember)]"
            onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement | null)?.focus()}
          >
            <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-3">
              <span className="size-3 rounded-full bg-ember" />
              <span className="size-3 rounded-full bg-lime" />
              <span className="size-3 rounded-full bg-paper/30" />
              <span className="ml-3 font-mono text-[11px] uppercase tracking-widest text-paper/40">ahnaf@storola-prod: ~</span>
            </div>

            <div ref={scrollRef} className="h-[22rem] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed md:text-sm">
              {intro.slice(0, shown).map((l, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={l.kind === "dim" ? "text-paper/40" : "text-paper/80"}
                >
                  {l.kind === "dim" && <span className="mr-2 text-lime">$</span>}
                  {l.text}
                </motion.p>
              ))}
              {lines.map((l, i) => (
                <p key={i} className={`whitespace-pre-wrap ${l.kind === "in" ? "text-paper" : "text-paper/70"}`}>
                  {l.kind === "in" && <span className="mr-2 text-lime">$</span>}
                  {l.text}
                </p>
              ))}
              <form onSubmit={submit} className="mt-1 flex items-center">
                <span className="mr-2 text-lime">$</span>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal input"
                  placeholder={shown >= intro.length ? "help" : ""}
                  className="w-full bg-transparent text-paper caret-ember outline-none placeholder:text-paper/25"
                />
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
