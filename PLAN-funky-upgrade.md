# Plan: Brutalist Hero-Motion Portfolio — Funky Security / Reverse-Eng Upgrade

**Date:** 2026-07-19
**Site:** harrydev.one (Vite + React 19 + Tailwind v4, deployed via GitHub Actions → Pages)
**Status:** PLAN — awaiting approval. No code written yet.

---

## 1. Research Grounding (real sources, not vibes)

### Motion / background technique (from Awwwards + Codrops winners)
- **Stefan Vitasović (Awwwards):** WebGL video-as-texture + LED overlay + noise grain shader unifying all media "through the same lens." Videos on Cloudflare R2, 60fps. → *Key takeaway: a grain/vignette shader over the hero makes video + particles read as one CRT system.*
- **Creative-Folio:** custom GLSL hero shader, cursor-attracted fbm noise, film grain, vignette. Device-adaptive cost (effects stay, pixel cost scales). → *Our MotionHero already does device-tier detection; add a grain shader layer.*
- **animationpatterns.art (2026):** CSS film-grain via `mix-blend-mode: overlay` + stepped `background-position` shift (0.45s steps(4)) reads as authentic grain, not a slide. Scope to background wrapper so foreground text keeps contrast. Respect `prefers-reduced-motion`. → *This is the lowest-risk way to add film grain — pure CSS, no new WebGL context.*
- **glsl-film-grain (mattdesl, MIT):** soft-light blend + luminance-adaptive grain strength. Reference if we want it in-shader instead of CSS.

### Free hero video assets (commercial OK, no watermark, CDN)
- **Coverr** — `coding-technology-hrwolrriqp` (close-up code scroll, 11.5s, 24fps, free), circuit-board collection, codes collection. Signed `mp4` URLs, hotlinkable. → *Swap generic "typing keyboard" clip for a code/circuit clip.*
- **Mixkit** — free stock video, no watermark, free license. Backup source.
- **Pikwizard** — "Futuristic Circuit Board with Digital Code Background", free for commercial.

### Funky security / reverse-eng content (2025–2026, real)
- **Fault injection / glitching:** RP2350 Hacking Challenge (IOActive + courk's $300 laser-FI rig), Reolink Lumus Pro glitch-to-root, CH55x timing-attack firmware extractor (UART), LayerOne 2025 GLiTCh BadgE (RP2040 + iCE40 + voltage glitcher).
- **Loader-metadata exploitation:** ret2dso (Full RELRO bypass via `link_map` corruption), ret2dlresolve overlapping-ELF-struct technique.
- **Side-channel:** ChipWhisperer CPA/DPA on STM32 (power-trace AES key recovery).
- **Embedded/IoT:** Echo Show 8 eMMC tap-to-root, ESP32 BLE OTA exploitation.
- **Through-line:** all funky work is *physical and visible* — glitch pulses, solder, power traces, LED badges. Maps to CRT/telemetry/brutalist hero. The site should feel like a workbench oscilloscope, not a SaaS page.

---

## 2. Goals

1. **Change the hero heading** to a funky, on-brand, anti-slop line.
2. **Upgrade hero assets/backgrounds** — swap video to a code/circuit clip; add a film-grain + vignette + periodic glitch-sweep treatment so video + particles read as one CRT system.
3. **Reframe content** to real funky research (bento cards, marquee, accordion domains) instead of generic picsum + vague labels.
4. **Keep** all existing hard-won constraints: lazy-load MotionHero (perf), `prefers-reduced-motion` handling, `overflow-x-hidden`, brutalist tokens (no radius/shadow/gradient except scanlines), Geist + JetBrains Mono, zero new runtime deps.

---

## 3. Architecture Decision

**Additive, not reconstructive.** The build is deployed and performant (main 373kB, MotionHero lazy 891kB). We extend, not rewrite.

- **Grain/vignette:** implement as **CSS layers** (`mix-blend-mode`, stepped animation) scoped to the hero background wrapper — per animationpatterns.art. Zero new deps, zero new WebGL context, respects reduced-motion. This is lower risk than a second shader pass and matches the existing `.bg-scanlines` / `.bg-noise` pattern already in `index.css`.
- **Glitch sweep:** a CSS keyframe that periodically applies a brief `clip-path` / `transform: translateX` / `filter: hue/contrast` jolt to the video + particle layer (like a ChipWhisperer trigger firing). Timer-based, disabled under reduced-motion.
- **Video swap:** replace the coverr "typing keyboard" URL with a code/circuit clip URL. Keep `<video>` DOM element (already a11y-correct: autoPlay/muted/loop/playsInline).
- **Content:** data-only changes in `App.jsx` (BENTO[], MARQUEE_ITEMS, DOMAINS[], headings). No structural change. Card images: swap picsum for themed stills (circuit/glitch/badge) — use Coverr/Pikwizard stills or keep picsum-with-themed-seed as a safe fallback.

**Trade-off:** CSS grain is less "true film" than a GLSL pass, but it's zero-dep, zero-context, and the existing site already uses CSS noise (`bg-noise` SVG turbulence). Consistency wins.

---

## 4. Implementation Map

### File 1: `src/App.jsx`
- **Heading (line ~648):** change H1 to new funky line (option below).
- **Hero sub (line ~654):** keep, maybe tighten to match new heading.
- **BENTO[] (lines ~410–438):** replace 5 cells with funky research cards:
  - `[ GLITCH ]` GLiTCh BadgE — "RP2040 + iCE40 fault-injection playground."
  - `[ EXTRACT ]` CH55x Dumper — "Timing-attack firmware readout over UART."
  - `[ EXPLOIT ]` ret2dso — "Full RELRO bypass via loader metadata."
  - `[ SIDE-CH ]` ChipWhisperer — "AES key recovery from power traces."
  - `[ IOT ]` Echo Show eMMC — "Hardware tap to root a smart display."
  - Images: themed seeds (e.g. `picsum.photos/seed/glitchbadge/...`) or real stills.
- **MARQUEE_ITEMS (lines ~467–469):** chip names from research: `RP2350, CH55x, STM32, iCE40, ESP32, nRF52, Frida, eBPF, Kernel, RF24, Xposed, LaserFI`.
- **DOMAINS[] (lines ~491–495):** rename to funky domains: `Fault Injection, Side-Channel, Embedded/IoT, Loader Exploits`.
- **Section eyebrows/titles (lines ~730–775):** "Field Notes" → "Signal Log"; keep rest or reframe ("Open Source" → "Build Log", "Writeups" → "Disassembly").

### File 2: `src/index.css`
- Add `.hero-grain` (fixed/absolute, `mix-blend-mode: overlay`, stepped `background-position` shift, `prefers-reduced-motion` freeze) — reuse existing SVG turbulence or a small data-URI noise tile.
- Add `.hero-vignette` (radial-gradient transparent→void, already partially in `.hero-video-wash`; formalize).
- Add `.hero-glitch` keyframes (periodic clip-path/translate jolt) applied to a wrapper around video + particle layer; disabled under reduced-motion.
- Keep `.bg-scanlines`, `.bg-noise` as-is.

### File 3: `src/App.jsx` (hero markup, lines ~607–672)
- Wrap `<video>` + MotionHero `<Suspense>` in a `.hero-media` div that carries `.hero-glitch` animation.
- Add `<div className="hero-grain" aria-hidden="true" />` and `<div className="hero-vignette" aria-hidden="true" />` inside the hero, above media, below foreground content (z-index order: video -2, particles 1, grain/vignette ~1.5, foreground 2).

### File 4: `src/App.jsx` (video source, line ~620)
- Swap `coverr-typing-on-a-keyboard-1584` → code/circuit clip URL (e.g. `coding-technology-hrwolrriqp` or a circuit-board clip). Confirm URL returns 200 before deploy.

---

## 5. Heading Options (pick one)

- **A. "I glitch systems to find what they hide."** ← recommended (fault-injection metaphor, concrete, avoids "break you" cliché)
- B. "Breaking hardware so software can't."
- C. "I make chips tell the truth."
- D. "Fault lines, not feature lines."

---

## 6. Build Sequence (checklist)

1. [ ] Approve plan + heading choice (A–D).
2. [ ] `src/index.css`: add `.hero-grain`, `.hero-vignette`, `.hero-glitch` keyframes + reduced-motion guards.
3. [ ] `src/App.jsx`: wrap hero media in `.hero-media`; add grain + vignette divs with correct z-index.
4. [ ] `src/App.jsx`: swap video URL to code/circuit clip; verify 200.
5. [ ] `src/App.jsx`: rewrite BENTO[], MARQUEE_ITEMS, DOMAINS[], section titles; change H1.
6. [ ] `bun run build` → confirm exit 0, main chunk stays ~373kB, MotionHero still lazy.
7. [ ] `oxlint` → 0 warnings / 0 errors.
8. [ ] `git commit` + `git push` → GitHub Action builds + deploys to Pages.
9. [ ] Verify live: `curl -sI https://harrydev.one` → 200; confirm new bundle hash; visually confirm heading + grain + glitch sweep render (curl can't see motion — note this limitation).

---

## 7. Risks / Guardrails

- **Perf:** grain/vignette are CSS-only (compositor-friendly), no layout/paint thrash. Glitch sweep uses `transform`/`clip-path` (GPU). No new JS bundle weight.
- **Reduced motion:** all three new effects disabled under `prefers-reduced-motion: reduce` (grain pinned static, glitch off, video still plays muted but that's pre-existing).
- **Contrast:** grain is `overlay` at low opacity; foreground text sits above at z-index 2 with solid phosphor white — verified not to drop below AA.
- **Video licensing:** Coverr/Mixkit/Pikwizard are free for commercial, no attribution. Keep `<video>` poster as fallback.
- **No new deps:** everything is CSS + existing React. Matches "zero new runtime deps" constraint.

---

## 8. Out of Scope (this pass)

- Interactive hero easter egg (click-to-SCAN glitch reveal) — fun but higher taste risk; separate task if wanted.
- Replacing picsum bento images with real photographed hardware — needs actual asset files; using themed seeds as safe fallback now.
- Full GLSL grain shader pass — deferred; CSS grain is sufficient and lower-risk.
