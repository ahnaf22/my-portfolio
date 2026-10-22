# CLAUDE.md

Personal portfolio for **Ahnaf Ahmad Shoumik**, a senior software engineer (PHP / Laravel / OpenCart / Flutter / Linux). A single-page Next.js site built to land a new job. Every visual and motion decision is meant to look hand-made, not template- or AI-generated.

@AGENTS.md

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · `motion` (import from `motion/react`) · `lenis` for smooth scroll.

Next 16 differs from older versions. Before using a Next API you are unsure about, read the matching guide in `node_modules/next/dist/docs/`. Known specifics:
- `cacheComponents` is on (see `next.config.ts`). Don't call `new Date()` / `Math.random()` while rendering a server component. Time-dependent UI is client-side and filled in inside an effect (see `LiveClock.tsx`).
- `LayoutProps<"/">` is a global type used by `src/app/layout.tsx`. Don't import it.
- Tailwind is wired through a custom Turbopack CSS rule in `next.config.ts`. Leave it.

## Commands

```bash
npm run dev          # http://localhost:3000 (falls back to 3001 if the port is taken)
npm run build        # production build; run before pushing
npx tsc --noEmit     # typecheck
npx eslint src       # lint (must be clean)
```

There is no test suite. Verify changes by running the three checks above, then looking at the page in a real browser at **1440px and 390px** wide.

## Architecture

- `src/app/page.tsx` is a server component that only composes sections inside `<Shell>`. Everything interactive is a client component in `src/components/`.
- `Shell.tsx` mounts `SmoothScroll` (Lenis), `Cursor`, and `Preloader`, and provides `ReadyProvider`. Hero entrance animations wait on `useReady()` so they play after the preloader exits. New above-the-fold animation should do the same.
- `src/lib/scroll.ts` is the only place that touches the Lenis instance (`scrollToId`, `scrollToTop`, `lockScroll`). Don't call `window.scrollTo` for user navigation, and don't create a second Lenis.
- `src/components/motion.tsx` holds the shared primitives: `Reveal`, `Mask`, `SplitWords`, `ScrollFill`, `CountUp`, `Magnetic`, `VelocityMarquee`, and the `EASE` curve. Reuse them before writing a new animation.
- `src/lib/data.ts` is the **single source of content**: profile, stats, projects, experience, stack. Edit copy there, not inside components.
- `CoverArt.tsx` draws one animated SVG cover per project. `ArtId` in `data.ts`, `coverBg`, and the `arts` map must stay in sync. Adding a project means updating all three.
- Section order: Hero → Band (marquee) → About + stats → Work → Experience → Stack → Terminal → Contact (footer). Nav anchors use the section `id`s (`about`, `work`, `experience`, `stack`, `contact`, `top`).

## Design rules

- **Palette** (tokens in `globals.css`): `paper` / `ink` base, **one** accent `ember`. `lime`, `cobalt`, `sand` appear only in project covers and the terminal. Don't add new colors, purple gradients, glassmorphism, or generic card grids.
- **Type:** Bricolage Grotesque (`font-display` / default) for headlines and UI, Instrument Serif italic for single accent words, JetBrains Mono (`font-mono`) for labels. Poppins is used **only** for the Stack lists, to match the reference site (sawad.framer.website).
- **Large display tracking:** keep it at `-0.04em` or looser. Tighter makes letters collide at this font's optical size.
- **Icons:** never use the `✺` asterisk glyph. It reads as the Claude logo, and the owner asked for it to be removed. Use code marks: `</>` for the brand, `//` as separators.
- Prefer editorial moves (big type, hairline rules, hover fills, staggered reveals) over decoration.

## Motion rules

- Use `motion/react`, never `framer-motion` directly. Default ease is `EASE` from `motion.tsx`.
- Reveals play once (`viewport={{ once: true }}`) and rise from below. Lists stagger their children.
- Respect `prefers-reduced-motion` (preloader and Lenis already skip; keep CSS animations short-circuited in `globals.css`).
- The custom cursor only exists for `pointer: fine`. Opt an element into a labelled cursor with `data-cursor="Label"`.
- The nav is `mix-blend-difference` and hides on scroll-down. The mobile menu overlay sits **above** the header, so its close button lives inside the overlay. Don't move it back into the header.

## Tailwind v4 gotchas (all hit in this project)

- Unlayered CSS beats utilities. Global element rules (e.g. `:focus-visible`) must go in `@layer base`, or `outline-none` stops working.
- `em` inside an arbitrary value is relative to **that element's own** font-size. For inline pills in the hero headline, size the pill at the headline's size and put smaller text in an inner span.
- A theme var named after a `next/font` variable (`--font-x: var(--font-x)`) did not generate a usable `font-x` class. Use `font-[family-name:var(--font-poppins-face)]` instead.
- Number sizes that must fit a column are sized from the column with container query units (`@container` + `cqw`), not `vw`. See the stats in `About.tsx`.
- The editor's `suggestCanonicalClasses` hints are style-only. Ignore them.

## Content rules

- Facts come from the CV (`public/Ahnaf_Ahmad_Shoumik_CV.pdf`). Don't invent employers, dates, clients, or metrics. Current stats: 5+ years, 10,000+ concurrent users, 9+ products, 1 engineer on Storola.
- Profile URLs in `data.ts` were taken from the CV's own links. Keep them in sync with the CV.
- The terminal's `status`, `deploy` and `logs` output is **illustrative demo data**. `status` says so on screen. Keep any new fake output clearly in character and never present it as a real incident or real numbers.
- Lead with Storola (SaaS) and custom e-commerce work. OpenCart is one tool among several, not the headline.

## Working in this repo

- **Windows / PowerShell 5.1:** do not bulk-edit source with `Get-Content -Raw` + `Set-Content`/`WriteAllText`. It re-encodes UTF-8 and corrupts characters like `·`, `→`, `✓` (this happened once and had to be repaired). Use the Edit tool, or pass `-Encoding UTF8` explicitly.
- Keep files UTF-8 without BOM. Many UI strings contain non-ASCII characters on purpose.
- Mobile first-check: no horizontal overflow at 390px. `body` has `overflow-x: clip`, so check `document.documentElement.scrollWidth` rather than trusting the eye.
- Don't commit `.next/`, `node_modules/`, or `*.tsbuildinfo` (already in `.gitignore`).

## Git

- Commit under the repo's configured identity. **Do not add Claude as author or co-author** (no `Co-Authored-By` trailer, no "Generated with Claude Code" line) in commits or PR text.
- Only push when asked. Run `npm run build` first.
