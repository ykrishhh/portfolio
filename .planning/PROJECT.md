# Foldcraft Portfolio

## What This Is

A premium security researcher portfolio at harrydev.one showcasing the user's work, skills, and philosophy through a motion-heavy dark-tech editorial experience. Built with React 18 + Vite 8 + Tailwind v4 + GSAP + Lenis + Phosphor icons.

## Core Value

Fast, beautiful, zero-distraction showcase that proves "harry got taste" — every scroll, animation, and layout decision must serve credibility, not flash.

## Requirements

### Validated

- ✓ Lightning loading with video hero — existing
- ✓ Smooth Lenis scroll — existing
- ✓ GSAP ScrollTrigger animations throughout — existing
- ✓ Dark theme with grain overlay texture — existing
- ✓ Responsive layout (mobile-first) — existing
- ✓ Live at harrydev.one via GitHub Pages + Cloudflare — existing
- ✓ Tailwind v4 + @theme system — existing
- ✓ Phosphor icon integration — existing

### Active

- [ ] Hero motion section redesign using gpt-taste patterns (3D/GLSL/ticker-text)
- [ ] Skill showcase with categories (Security, Dev, Research, Blockchain)
- [ ] Timeline section for professional history
- [ ] Project cards with GitHub star counts
- [ ] StickyStack section for certifications/achievements
- [ ] Contact form with validation
- [ ] Button/Card component library for consistency
- [ ] Accessibility compliance audit
- [ ] Performance budget (LCP < 2.5s, CLS < 0.1)

### Out of Scope

- CMS or blog system — not needed for single-page portfolio
- Authentication — no user accounts
- Database — all data is static/fetched from GitHub API
- Multi-language i18n — English only
- E-commerce or payment processing

## Context

Built from the Zentry clone foundation (Awwwards-style hero with video ken burns + clip-path frame expansion). Previous redesign attempt created a frankenstein mashup that was rejected. Current `main` is clean premium portfolio with Hero/About/Features/Story/World/Metrics/Contact/Footer sections. gpt-taste + design-taste-frontend skills loaded for the next redesign pass. Tailwind v4 installed with @theme custom tokens. motion/react v12.42 and Phosphor icons available.

## Constraints

- **Tech Stack**: React 18, Vite 8, Tailwind v4, GSAP, Lenis, motion 12.42, Phosphor icons — must use existing stack
- **Hosting**: GitHub Pages behind Cloudflare DNS proxy — no SSR, no server
- **SPA Routing**: _redirects file in public/ for Cloudflare Pages compatibility
- **Design**: Zero-radius brutalist, two-color (text + #00d4aa accent), dark-tech/premium/editorial — approved by user
- **Build**: Must stay green (npm run build passes) after every change
- **Motion**: Must respect prefers-reduced-motion

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Tailwind v4 over styled-components | Zero-runtime CSS, native cascade layers, @theme tokens | ✓ Good |
| GSAP + Lenis over Framer Motion | Awwwards-grade scroll-triggered animations, scrub control | ✓ Good |
| Phosphor over Heroicons/Lucide | Consistent 6-weight icon system, security-themed icons available | ✓ Good |
| Zero-radius brutalist | Differentiates from rounded-corner trend, fits security researcher brand | ✓ Good |
| #00d4aa accent | Teal-green suggests security/terminal without being cliché matrix green | ✓ Good |

---
*Last updated: 2026-07-24 after GSD init*
