# Spec — Writeups Trending/Starred + Portfolio Redesign

**Date:** 2026-07-19
**Owner:** ykrishhh
**Status:** Approved, executing

## 1. Goal

- Make `writeups.harrydev.one` a resource hub: external **Trending** repos (web-searched)
  plus your **Most-Starred** repos (GitHub API at build time). Improves reach/SEO.
- Full redesign pass on the `harrydev.one` portfolio: adopt writeups' font, fix the
  black-page bug in About/Journey/Projects, normalize boxes, dry-copy rewrite. Keep hero video.
- All in the established dry, anti-slop voice (no em-dashes, no badge walls, no fake terminals).

## 2. Writeups changes (`ykrishhh/writeups`, Astro 5 static)

### 2.1 Data layer

- **`src/data/trending.ts`** (new, committed):
  `export const trending = [{ name, url, desc, topic, source }]`.
  Curated via web search across: offensive security, AI-pentest agents, ESP32/IoT security,
  awesome-security topic lists. 8–10 entries, deduplicated, dry descriptions, no em-dashes.
  No runtime fetch.
- **`scripts/fetch-repos.mjs`** (new): Node script.
  `GET https://api.github.com/users/ykrishhh/repos?sort=stargazers&per_page=100&type=owner`.
  Filter `fork:false` and `archived:false`. Map to `src/data/starred.ts`
  = `[{ name, url, desc, stars, language }]`. No token (public). On failure, keep existing
  `starred.ts` (graceful).
- **`src/data/starred.ts`** (new, committed): generated output, committed so build never
  breaks offline.
- **`package.json`** `build` script → `"node scripts/fetch-repos.mjs && astro build"`.

### 2.2 Homepage (`src/pages/index.astro`)

- Remove the hardcoded `trendingRepos` frontmatter array.
- Replace the single "Repos" section with two sections:
  - **Trending** — maps `trending` (from `trending.ts`); cards show a `topic` tag using the
    existing `.tags li` style.
  - **Most-Starred** — maps `starred` (from `starred.ts`).
- Section order: Hero → Latest → Tutorials → Methods → Trending → Most-Starred → Quick links.
- Reuse `.repo-grid` / `.repo-card` styles. `.section-head` pattern (`<h2>` + "All on GitHub →").
  Headings: "Trending", "Most-Starred". Dry copy, no em-dashes.

## 3. Portfolio changes (`foldcraft/` — local, Vite + React 19 + Tailwind v4)

### 3.1 Keep

- Hero background `<video>` (Mux/Cloudfront) — unchanged.

### 3.2 Font unification (adopt writeups' system)

- `index.html`: replace Geist `<link>` with writeups' Inter + Instrument Serif URL:
  `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap`
- `src/index.css` `@theme`: replace `--font-geist` with
  `--font-sans: "Inter", system-ui, sans-serif;` and add
  `--font-display: "Instrument Serif", Georgia, serif;`.
- `App.jsx`: body text → `font-sans`; major headings (About "Krishna", section `<h2>`s, CTA
  "something useful.") → `font-display` (italic where writeups uses it). Maintain one
  consistent type system across both sites.

### 3.3 Fix black page (About / Journey / Projects)

- At execution: run `npm run dev` / inspect built DOM, reproduce the black/blank render,
  identify root cause (suspected: hero `h-screen` + fixed-nav overlap, mobile-menu overlay
  `absolute inset-0 h-screen` state glitch, or an opacity/animation trap in those sections).
  Fix precisely; do not blanket-restyle. Verify all three sections render with correct
  bg/text and are scroll-reachable.

### 3.4 Box / card normalization

- Single radius token (e.g. `rounded-2xl`) across project cards, writeup cards, contact
  buttons. Unify border opacity (`border-white/10`) and hover transitions (existing
  accent-gradient border on hover is fine to keep). Preserve dark glass aesthetic.

### 3.5 Stats bar

- **Cut** (residual slop; not dry). Revert on request.

### 3.6 Text rewrite

- Scan all section copy (hero sub, About, Journey, Projects, Writeups, CTA, Contact, Footer).
  Remove buzzwords/em-dashes. Align voice with profile README. Hero stays
  "Security work across hardware and software."

## 4. Skills bundled (execution)

- **websearch** — curate `trending.ts`
- **Composio GitHub** — verify starred shape + commit/push files
- **frontend-design** + **design-taste-frontend** — portfolio redesign quality gate
- **proofreader** + **stop-slop** — copy pass, both sites
- Deploy via Composio GitHub (`GITHUB_COMMIT_MULTIPLE_FILES` / push)

## 5. Verification

- Writeups: `astro build` succeeds; Trending + Most-Starred render with real star counts;
  no em-dashes; `writeups.harrydev.one` serves correct HTML.
- Portfolio: `npm run build` succeeds; fonts = Inter + Instrument Serif; black-page fixed;
  boxes unified; copy dry; redeploy `dist` → `gh-pages`; `harrydev.one` resolves after the
  Cloudflare DNS fix.
- Cross-check: voice consistent across profile README / writeups / portfolio.

## 6. Out of scope

- Cloudflare DNS fix (user, dashboard). New writeup MDX articles. Backend/CMS/runtime search.
  Layout restructure beyond font/box/black-page/text.
