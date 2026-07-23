# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-24)

**Core value:** Fast, beautiful, zero-distraction showcase that proves "harry got taste"
**Current focus:** Portfolio redesign using gpt-taste + design-taste-frontend skills

## Active Phase

Phase planning not yet started. Next: `/gsd-plan-phase 1`

## Key Points

- Build passes on main (a8a78f1) — clean premium portfolio active
- gpt-taste + design-taste-frontend skills loaded for motion-heavy redesign
- Previous frankenstein redesign rejected — starting fresh
- All redesign components exist (Card, Button, ProjectCard, SkillCategory, StickyStack, Timeline) but not wired in App.jsx
- Site live at harrydev.one — HTML/JS/CSS all 200

## Session Memory

- User approved: security researcher portfolio, dark-tech/premium/editorial, two-color (text + #00d4aa accent), zero-radius brutalist
- Vite base changed to "/" for custom domain
- Cloudflare CSP frame-ancestors 'none' removed (was breaking page render)
- 404.html SPA fallback in public/

## Decisions

| # | Decision | Date | Rationale |
|---|----------|------|-----------|
| 1 | Vite base "/" | 2026-07-24 | Custom domain at harrydev.one needs root-relative paths |
| 2 | CSP frame-ancestors removed | 2026-07-24 | Was blocking page render behind Cloudflare proxy |
| 3 | motion/react over framer-motion | 2026-07-24 | Already installed, v12.42 stable, works with React 18 |
