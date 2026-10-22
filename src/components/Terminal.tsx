"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { profile, projects } from "@/lib/data";
import { Reveal } from "./motion";
import { SectionLabel } from "./About";

type Kind = "in" | "out" | "dim" | "head";
type Line = { kind: Kind; text: string };
/** One line of streamed output. `replace` overwrites the previous line (progress bars). */
type Step = { text: string; kind?: Kind; delay?: number; replace?: boolean };
type Result = { steps: Step[]; clear?: boolean; action?: "mail" | "cv" };

const intro: Line[] = [
  { kind: "dim", text: "ssh ahnaf@storola-prod  # Ubuntu, Nginx, PHP-FPM, MySQL" },
  { kind: "out", text: "Last login: just now. Click a command below, or type one." },
];

const chips = ["status", "deploy", "logs", "whoami", "stack", "projects", "uptime", "ai", "cv"];
const commandList = [...chips, "help", "contact", "clear", "sudo hire-me"];

const bar = (pct: number, label: string) => {
  const n = Math.round(pct / 10);
  return `[${"#".repeat(n)}${"·".repeat(10 - n)}] ${String(pct).padStart(3)}%  ${label}`;
};

const progress = (label: string): Step[] =>
  [0, 30, 60, 85, 100].map((p, i) => ({ text: bar(p, label), delay: i === 0 ? 220 : 170, replace: i > 0 }));

function monthsInProduction() {
  const start = new Date(2020, 10, 1);
  const now = new Date();
  return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
}

function run(cmd: string): Result {
  const c = cmd.trim().toLowerCase().replace(/\s+/g, " ");
  const plain = (...lines: string[]): Result => ({ steps: lines.map((text) => ({ text, delay: 60 })) });

  switch (c) {
    case "":
      return { steps: [] };
    case "help":
      return plain(
        "status     health check on the production box",
        "deploy     a zero-downtime release, start to finish",
        "logs       tail the payment webhook log",
        "whoami     who is on the other end",
        "stack      what runs here",
        "projects   things shipped",
        "uptime     how long on the pager",
        "ai         how I use coding agents",
        "cv         download my CV",
        "contact    ways to reach me",
        "clear      wipe the screen"
      );
    case "status":
      return {
        steps: [
          { text: "checking storola-prod…", kind: "dim", delay: 120 },
          { text: "✓ nginx           active   1.24", delay: 380 },
          { text: "✓ php-fpm         active   8.3, 24 workers", delay: 300 },
          { text: "✓ mysql           active   0 slow queries / 15 min", delay: 300 },
          { text: "✓ queue workers   4 running, 0 failed jobs", delay: 300 },
          { text: "✓ backups         last run 03:00, restore verified", delay: 300 },
          { text: "✓ ssl             valid, auto-renews in 58 days", delay: 300 },
          { text: "req/s  ▁▂▃▅▆▅▃▂▃▅▇▆▄▃▂▃▄▅", kind: "head", delay: 400 },
          { text: "all systems nominal. (demo data)", kind: "dim", delay: 250 },
        ],
      };
    case "deploy":
      return {
        steps: [
          { text: "→ ./deploy.sh --env=production", kind: "head", delay: 80 },
          { text: "→ git pull origin main   a3f9c21", delay: 420 },
          ...progress("composer install --no-dev"),
          { text: "→ php artisan migrate --force", delay: 450 },
          { text: "✓ 3 migrations applied across tenant schemas", delay: 450 },
          { text: "→ reloading php-fpm (no dropped requests)", delay: 500 },
          { text: "→ health check https://storola.com", delay: 450 },
          { text: "✓ 200 OK in 142ms", delay: 450 },
          { text: "✓ released in 18s. 0 errors. rollback ready.", kind: "head", delay: 300 },
        ],
      };
    case "logs":
      return {
        steps: [
          { text: "tail -f /var/log/payments/webhook.log", kind: "dim", delay: 80 },
          { text: "14:02:11  POST /webhooks/pay    signature ok     order #48213 → paid", delay: 520 },
          { text: "14:02:11  shipping.create       202 accepted     courier handoff queued", delay: 460 },
          { text: "14:02:14  POST /webhooks/pay    signature ok     order #48214 → paid", delay: 520 },
          { text: "14:02:15  POST /webhooks/pay    duplicate key    ignored (idempotent)", delay: 520 },
          { text: "14:02:19  POST /webhooks/pay    bad signature    rejected, logged, 401", delay: 520 },
          { text: "14:02:22  reconcile             12 orders        0 mismatches", delay: 520 },
          { text: "^C", kind: "dim", delay: 650 },
        ],
      };
    case "whoami":
      return plain("ahnaf: senior software engineer, Dhaka (UTC+6).", "PHP · Laravel · OpenCart · Flutter · Linux. Owns systems end to end.");
    case "stack":
      return plain("php8 · laravel · opencart3/4 · mysql · nginx · php-fpm · linux · flutter · bash");
    case "projects":
      return plain(...projects.map((p) => `${p.id.padEnd(11)} ${p.kind}`));
    case "uptime": {
      const m = monthsInProduction();
      return plain(`up ${Math.floor(m / 12)} years, ${m % 12} months in production · 0 hand-offs · load average: calm`);
    }
    case "ai":
      return plain("claude code · codex · gemini · mcp", "every diff is read by a human before it ships.");
    case "contact":
      return plain(profile.email, profile.phone, profile.location);
    case "cv":
      return { steps: [{ text: "↓ Ahnaf_Ahmad_Shoumik_CV.pdf", delay: 120 }, { text: "✓ download started", delay: 400 }], action: "cv" };
    case "clear":
      return { steps: [], clear: true };
    case "sudo hire-me":
    case "sudo hire me":
      return {
        steps: [
          { text: "[sudo] password for recruiter: ********", delay: 150 },
          { text: "✓ permission granted. opening your mail client…", delay: 700 },
        ],
        action: "mail",
      };
    case "rm -rf /":
    case "sudo rm -rf /":
      return plain("nice try. permission denied (and the backups are green).");
    case "ls":
      return plain("projects/  stack/  logs/  deploy.sh  cv.pdf");
    default:
      return plain(`command not found: ${c}. try 'help'`);
  }
}

function LineView({ line }: { line: Line }) {
  const first = line.text[0];
  const marked = first === "✓" || first === "→" || first === "↓";
  const color =
    line.kind === "in" ? "text-paper" : line.kind === "dim" ? "text-paper/40" : line.kind === "head" ? "text-paper" : "text-paper/70";
  return (
    <p className={`whitespace-pre-wrap ${color} ${line.kind === "head" ? "font-semibold" : ""}`}>
      {line.kind === "in" && <span className="mr-2 text-lime">$</span>}
      {line.text.startsWith("req/s") ? (
        <>
          req/s <span className="text-lime">{line.text.slice(6)}</span>
        </>
      ) : marked ? (
        <>
          <span className={first === "✓" ? "text-lime" : "text-ember"}>{first}</span>
          {line.text.slice(1)}
        </>
      ) : (
        line.text
      )}
    </p>
  );
}

export function Terminal() {
  const boxRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inView = useInView(boxRef, { once: true, margin: "0px 0px -20% 0px" });
  const [shown, setShown] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const history = useRef<string[]>([]);
  const hIdx = useRef(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const touched = useRef(false);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  // reveal the intro lines once the window is on screen
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
    }, 600);
    return () => clearInterval(id);
  }, [inView]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, shown]);

  const exec = useCallback((raw: string) => {
    const res = run(raw);
    history.current.unshift(raw);
    hIdx.current = -1;
    setValue("");
    if (res.clear) {
      setLines([]);
      return;
    }
    setLines((l) => [...l, { kind: "in", text: raw }]);
    if (!res.steps.length) return;

    setBusy(true);
    let t = 0;
    res.steps.forEach((s, i) => {
      t += s.delay ?? 80;
      timers.current.push(
        setTimeout(() => {
          const line: Line = { kind: s.kind ?? "out", text: s.text };
          setLines((l) => (s.replace ? [...l.slice(0, -1), line] : [...l, line]));
          if (i === res.steps.length - 1) {
            setBusy(false);
            if (res.action === "cv") {
              const a = document.createElement("a");
              a.href = profile.cv;
              a.download = "";
              a.click();
            }
            if (res.action === "mail") window.location.href = `mailto:${profile.email}?subject=Let's talk`;
          }
        }, t)
      );
    });
  }, []);

  // type a first command by itself so the window looks alive, unless the visitor gets there first
  const execRef = useRef(exec);
  useEffect(() => {
    execRef.current = exec;
  });
  useEffect(() => {
    if (shown < intro.length) return;
    const word = "status";
    let i = 0;
    let typing: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      typing = setInterval(() => {
        if (touched.current) return clearInterval(typing);
        i += 1;
        setValue(word.slice(0, i));
        if (i === word.length) {
          clearInterval(typing);
          timers.current.push(setTimeout(() => !touched.current && execRef.current(word), 450));
        }
      }, 120);
    }, 900);
    return () => {
      clearTimeout(start);
      clearInterval(typing);
    };
  }, [shown]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    exec(value);
  };

  const onKey = (e: React.KeyboardEvent) => {
    touched.current = true;
    if (e.key === "ArrowUp" && history.current.length) {
      e.preventDefault();
      hIdx.current = Math.min(hIdx.current + 1, history.current.length - 1);
      setValue(history.current[hIdx.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hIdx.current = Math.max(hIdx.current - 1, -1);
      setValue(hIdx.current === -1 ? "" : history.current[hIdx.current]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const hit = commandList.filter((c) => c.startsWith(value.trim().toLowerCase()));
      if (value && hit.length) setValue(hit[0]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const chip = (c: string) => {
    if (busy) return;
    touched.current = true;
    exec(c);
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
              Provisioning, hardening, deploys, backups and incident response for the platforms I build. This shell is
              live: tap a command, or type <span className="font-mono text-sm text-ink">help</span>.
            </p>
          </Reveal>
        </div>

        <Reveal className="md:col-span-7" delay={0.1}>
          <div
            ref={boxRef}
            className="overflow-hidden rounded-2xl border-2 border-ink bg-ink text-paper shadow-[10px_10px_0_0_var(--color-ember)]"
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
          >
            <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-3">
              <span className="size-3 rounded-full bg-ember" />
              <span className="size-3 rounded-full bg-lime" />
              <span className="size-3 rounded-full bg-paper/30" />
              <span className="ml-3 font-mono text-[11px] uppercase tracking-widest text-paper/40">ahnaf@storola-prod: ~</span>
              <span className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-lime">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 rounded-full bg-lime" style={{ animation: "ping-dot 1.8s ease-out infinite" }} />
                  <span className="relative size-1.5 rounded-full bg-lime" />
                </span>
                connected
              </span>
            </div>

            <div ref={scrollRef} className="h-[22rem] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed md:h-[25rem] md:text-sm">
              {intro.slice(0, shown).map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                  {l.kind === "dim" ? (
                    <p className="text-paper/40">
                      <span className="mr-2 text-lime">$</span>
                      {l.text}
                    </p>
                  ) : (
                    <p className="text-paper/80">{l.text}</p>
                  )}
                </motion.div>
              ))}
              {lines.map((l, i) => (
                <LineView key={i} line={l} />
              ))}
              <form onSubmit={submit} className="mt-1 flex items-center">
                <span className="mr-2 text-lime">$</span>
                <input
                  ref={inputRef}
                  value={value}
                  readOnly={busy}
                  onChange={(e) => {
                    touched.current = true;
                    setValue(e.target.value);
                  }}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal input"
                  placeholder={shown >= intro.length && !busy ? "type a command…" : ""}
                  className="w-full bg-transparent text-paper caret-ember outline-none placeholder:text-paper/25"
                />
              </form>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-paper/10 px-4 py-3">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-paper/35">try</span>
              {chips.map((c) => (
                <button
                  key={c}
                  onClick={(e) => {
                    e.stopPropagation();
                    chip(c);
                  }}
                  disabled={busy}
                  className="rounded-full border border-paper/20 px-3 py-1 font-mono text-[11px] text-paper/70 transition-colors hover:border-ember hover:bg-ember hover:text-ink disabled:opacity-40 disabled:hover:border-paper/20 disabled:hover:bg-transparent disabled:hover:text-paper/70"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
