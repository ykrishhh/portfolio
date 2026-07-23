# Foldcraft Portfolio Redesign

## Design Read

Portfolio for a security researcher. Audience: recruiters + security peers. Dark-tech/premium/editorial language. Tailwind v4 + Geist + JetBrains Mono + GSAP.

## Dials

| Dial | Value | Rationale |
|---|---|---|
| DESIGN_VARIANCE | 8 | Asymmetric, offset, anti-template |
| MOTION_INTENSITY | 7 | Cinematic hero, scroll reveals, scrub text |
| VISUAL_DENSITY | 4 | Airy — let content breathe |

## Visual Identity

**Colors (keep existing palette):**
- Void: `#050510` (background)
- Void-soft: `#0a0a1a` (elevated surfaces)
- Accent: `#00d4aa` (teal — single accent, locked)
- Text: `#e8e8ed` (primary), `#8a8a9a` (muted), `#4a4a5a` (faint)
- Hairline: `rgba(255,255,255,0.06)`
- Success (Konami): `#4af626`
- One palette. No second accent.

**Typography:**
- Headings + UI: Geist Display (static display cuts for hero), Geist (body)
- Code/stats/metrics: JetBrains Mono (already imported)
- No serif — security portfolio ≠ editorial

**Texture:**
- Full-page CSS grain overlay: `fixed inset-0 z-[60] pointer-events-none` with SVG noise filter pseudo-element
- Teal accent glow via `drop-shadow` on hero emphasis text

**Icons:**
- Replace Lucide with `@phosphor-icons/react`
- Global weight: bold or fill
- One family, locked

## Layout Architecture

**Hero:**
- Keep existing GSAP choreography (video fallback, staggered text, scroll cue)
- Refine headline: "Breaking systems. **Building** them safer." — teal pop on "Building"
- Stats strip directly below (already done)
- Max 2 headline lines + 20-word subtext + 2 CTAs

**Project Grid:**
- Replace 3-column equal grid with asymmetric bento
- Alternating 2fr+1fr / 1fr+2fr rows
- Varied aspect ratios: 16:9 (tools), 4:3 (writeups)
- No two adjacent cells the same size

**Section Diversity:**
- Max 1 eyebrow per 3 sections (hero counts)
- Bento gets eyebrow "Selected Work", rest get clean headers

**Research Domains:**
- Replace horizontal accordion with GSAP sticky-card stack
- Each card pins at `top top`, previous card shrinks as next arrives
- Canonical skeleton from design-taste (Section 5.A)

**Timeline + Skills:**
- Keep as-is. Reorder: timeline first, then skills grid

## Motion Choreography

**Hero:** Keep current GSAP stagger. Add magnetic pull on primary CTA via Motion `useMotionValue`/`useTransform` (no React re-renders).

**Scroll Reveals:** Replace custom IntersectionObserver with Motion's `whileInView`. Keep stagger chain via `staggerChildren`.

**Sticky Stack (Domains):** GSAP ScrollTrigger pin + scrub. Every card except last pins at `top top`, previous scales to 0.92/0.55 opacity as next arrives.

**Project Bentos:** Simple `whileInView` fade-up with staggered children. No pinning.

**Marquee:** Keep existing. Max one per page.

**Reduced Motion:** Already handled — `prefers-reduced-motion` checks in codebase. Keep.

**Banned:** `window.addEventListener('scroll')`, React `useState` for continuous values, `requestAnimationFrame` touching state.

## Content Upgrades

**KernelSU-Next Guide:** Add project card (category: Android) linking to guide. If public repo exists, link it. If not, self-host or link locally.

**Live GitHub Stars:** Replace hardcoded `stars` with GitHub API calls. Client-side fetch + localStorage cache (1hr TTL). GitHub API is public for public repos.

**SPA Routing:** Add Cloudflare Pages SPA fallback (`_redirects` or `_routes.json`) so `/blog/*` serves `index.html`.

**Placeholder Images:** Swap picsum.photos URLs with real generated assets, or remove bento image slots.

**Writeups:** `/blog/*` URLs need content or redirect to actual hosted posts.

## Style Guide

- Corner radius: zero (brutalist — keep existing)
- Shadows: tinted to background hue, no pure-black
- Cards: minimal border + hairline, elevation only for hierarchy
- Buttons: primary (teal fill), secondary (ghost + border)
- Forms: label above input, error below, no placeholder-as-label

## Implementation Order

1. Infrastructure: SPA routing fix, live GitHub stars (client-side fetch + cache)
2. Content: KernelSU-Next card, writeup blog route handling, placeholder image swap
3. Visual identity: CSS grain texture, Phosphor icon swap, Geist Display for hero
4. Layout: Asymmetric bento project grid, sticky-card stack for domains
5. Motion: magic mouse on CTA, Motion `whileInView` scroll reveals
6. Polish: color audit, eyebrow count check, section-layout-repetition audit, WCAG contrast check

## Verification

- Lighthouse: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Reduced motion: all animations collapse to static
- Dark mode: only dark (existing), verify no light-mode leaks
- Contrast: WCAG AA minimum, AAA for hero
- CTA wrap: all button labels fit one line at desktop
- Copy audit: no AI-isms, no fake-precise numbers, one register per page
