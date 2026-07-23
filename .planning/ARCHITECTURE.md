# Hero Motion Site Architecture — Foldcraft Portfolio

**Date:** 2026-07-24
**Based on:** DESIGN-AUDIT.md findings + RESEARCH.md patterns + gpt-taste + design-taste-frontend

---

## 1. Section Map: What Stays, What Changes, What's New

### Proposed New Section Layout (AIDA structure)

```
┌─────────────────────────────────────────────┐
│ 1. NAVBAR (refactor)     ← AIDA: Attention │
│ 2. HERO (replace)        ← AIDA: Attention │
│ 3. SIGNAL STRIP (new)    ← AIDA: Interest  │
│ 4. ABOUT (replace)       ← AIDA: Interest  │
│ 5. SKILLS (new — wire)   ← AIDA: Interest  │
│ 6. PROJECTS (new — wire) ← AIDA: Desire    │
│ 7. TIMELINE (new — wire) ← AIDA: Desire    │
│ 8. METRICS (keep/refine) ← AIDA: Desire    │
│ 9. CONTACT (replace)     ← AIDA: Action    │
│10. FOOTER (replace)      ← AIDA: Action    │
└─────────────────────────────────────────────┘
```

### Section Details

| # | Section | Status | Source | Motion Pattern |
|---|---------|--------|--------|----------------|
| 1 | **NavBar** | REFACTOR | Navbar.jsx | GSAP show/hide on scroll direction (keep existing) |
| 2 | **Hero** | REPLACE | New Hero.jsx — v2 plan | Editorial manifesto hero, stagger reveal, scroll-responsive title shrink |
| 3 | **Signal Strip** | NEW | New HeroSignalStrip.jsx | GSAP count-up on IntersectionObserver |
| 4 | **About** | REPLACE | New About.jsx | Scroll-triggered reveal (keep clip animation, replace content) |
| 5 | **Skills** | NEW (wire) | SkillCategory.jsx (exists) | Motion `whileInView` stagger (design-taste 5.C) |
| 6 | **Projects** | NEW (wire) | ProjectCard.jsx (exists) + data | Motion stagger grid, hover physics |
| 7 | **Timeline** | NEW (wire) | Timeline.jsx (exists) | IntersectionObserver line-draw + Motion reveals |
| 8 | **Metrics** | REFINE | Metrics.jsx | Keep existing GSAP staggers, fix color palette |
| 9 | **Contact** | REPLACE | New Contact.jsx | GSAP fade-up with button |
| 10 | **Footer** | REPLACE | New Footer.jsx | Motion fade-up, color-correct |

### Sections to REMOVE
- **Features.jsx** — Entirely Zentry IP, replace with Projects section
- **Story.jsx** — Entirely Zentry narrative, replace content into About/Timeline
- **World.jsx** — MotionZ content irrelevant, replace with Skills section

---

## 2. Hero Section Architecture (Detailed)

### 2.1 Hero Layout: Editorial Manifesto (gpt-taste Option 3)
- **Style:** Ultra-wide text, left-aligned, full-bleed void background
- **Container:** `w-full min-h-[100dvh] relative overflow-hidden`
- **Grid:** 2-column on desktop (text: 8fr, canvas/decorative: 4fr), single column mobile

### 2.2 Hero Element Hierarchy

```
hero-shell (relative, isolation: isolate)
├── hero-backdrop (fixed, z-0)
│   └── Canvas element (hero-canvas) — ambient node network
│       ├── Nodes (96+ particles)
│       ├── Links (varied distance, teal glow)
│       └── Sonar pulse (top-right origin, 3s loop, 660px radius)
├── hero-content (relative, z-10, container max-w-[1500px] mx-auto px-6 md:px-12)
│   ├── hero-eyebrow — "Building in public since 2022"
│   ├── hero-headline
│   │   ├── hero-line 1 — "Breaking systems."
│   │   └── hero-line 2 — "Building them safer."
│   ├── hero-sub — "Six CVEs disclosed. Forty open-source tools. One relentless loop: red-team, dissect, ship."
│   └── hero-ctas (flex row, gap-4)
│       ├── CTA primary — "View selected work" (teal pill)
│       └── CTA secondary — "Read field notes" (ghost)
├── hero-portal (absolute right-0, hairline gradient)
└── hero-cue — "SCROLL" mono (bottom center, pulse animation)
```

### 2.3 Hero Motion Choreography

| Element | Event | Animation | Duration | Delay | Easing |
|---------|-------|-----------|----------|-------|--------|
| Eyebrow | Page load | `.hero-rise` (y: 28px → 0, opacity: 0 → 1) | 800ms | 0ms | `cubic-bezier(0.16,1,0.3,1)` |
| H1 line 1 | Page load | `.hero-rise` | 800ms | 90ms | same |
| H1 line 2 | Page load | `.hero-rise` | 800ms | 180ms | same |
| Subtitle | Page load | `.hero-rise` | 900ms | 270ms | same |
| CTAs | Page load | `.hero-rise` | 900ms | 360ms | same |
| Scroll cue | Page load | `.hero-fade` | 1100ms | 480ms | same |
| Canvas nodes | Page load | Spring physics emerge | 1500ms | 200ms | spring |
| Title shrink | Scroll 0→400 | GSAP scale: 1 → 0.85 | scrub | — | `none` |
| Sonar pulse | Continuous | Radial expand loop | 3s loop | — | ease-out |

### 2.4 Reduced Motion Fallback
- No stagger: all text visible immediately
- No sonar, no canvas
- Static poster (fallback-poster.svg) if canvas is hidden
- Fallback background: teal radial gradients on void

### 2.5 Hero Copy (Locked)

| Element | Copy | Rationale |
|---------|------|-----------|
| Eyebrow | `Building in public since 2022` | Mono caps, establishes timeline |
| H1 line 1 | `Breaking systems.` | Active verb, security context |
| H1 line 2 | `Building them safer.` | Parallel construction (Verb+Object / Verb+Object+safer) |
| Sub | `Six CVEs disclosed. Forty open-source tools. One relentless loop: red-team, dissect, ship.` | 13 words, 3 clauses, establishes credentials |
| CTA 1 | `View selected work` | Portfolio intent |
| CTA 2 | `Read field notes` | Content intent |

---

## 3. Section-by-Section Architecture

### 3.1 Signal Strip (new component)
- **File:** `src/components/HeroSignalStrip.jsx`
- **Data:** Static, 5 cells
- **Cells:** `6` CVEs, `40+` tools, `∞` systems, `2022 —` since, `1` researcher
- **Layout:** 5-column grid, border-top/bottom hairline, vertical hairline dividers
- **Motion:** GSAP count-up tween on IntersectionObserver entry
- **CSS:** `.signal-strip`, `.signal-cell`, `.signal-cell__value`, `.signal-cell__label` (already in index.css)

### 3.2 About (content replacement)
- **File:** `src/components/About.jsx` (rewrite content, keep clip animation)
- **Content:** Real bio about the researcher
  - Title: Something like "`Red-team. <br/> Rebuild. <b>R</b>epeat.`"
  - Bio: 2 paragraphs about approach to security research
  - Keep the clip-path reveal image, change image source to authentic photo
- **Motion:** Keep existing GSAP clip-path expansion
- **Fix:** Change `bg-white` to dark void theme

### 3.3 Skills (wire existing component)
- **File:** Wire `SkillCategory.jsx` + `src/data/skills.js` (already exists, real content)
- **Categories:** Offensive Security, Systems & Firmware, Cloud & DevOps, Mobile Security, AI & Tooling, Low-Level
- **Layout:** `skills-grid` CSS grid (auto-fill, minmax 280px)
- **Motion:** `motion` `whileInView` stagger (design-taste 5.C)
- **Section title:** "Toolchain" or "Capabilities" (plain, no eyebrow)

### 3.4 Projects (wire existing component)
- **File:** Wire `ProjectCard.jsx` in App.jsx
- **Data:** Create `src/data/projects.js` with real project data
- **Layout:** Grid of ProjectCard components, 2-3 cols
- **Motion:** Hover physics on cards, stagger reveal on scroll
- **Section title:** "Selected work" (matches CTA intent)

### 3.5 Timeline (wire existing component)
- **File:** Wire `Timeline.jsx` in App.jsx
- **Data:** Create `src/data/timeline.js` with real career timeline
- **Layout:** Central line with alternating cards, dot bezels
- **Motion:** IntersectionObserver line-draw, Motion item reveals
- **Section title:** "Field notes" (or "History" — functional, not poetic)

### 3.6 Metrics (refine existing)
- **File:** `Metrics.jsx` — keep structure, fix colors
- **Changes:**
  - Remove `bg-blue-600`, `bg-violet-300`, `bg-white`
  - Use `bg-surface`, `bg-surface-elevated`, `bg-void-elevated`
  - Keep real GitHub data (repos, stars, PRs)
  - Keep top repos and contributions (authentic data)
  - Remove hand-rolled star SVG, use Phosphor `Star` icon
- **Motion:** Keep existing GSAP staggers

### 3.7 Contact (replace)
- **File:** Rewrite Contact.jsx
- **CTAs:** "Get in touch" / "Start a conversation" — single intent
- **Remove:** swordman images, "design together" copy
- **Content:** Security-relevant CTA (e.g., "Have a finding? Want to collaborate?")
- **Motion:** GSAP fade-up

### 3.8 Footer (replace)
- **File:** Rewrite Footer.jsx
- **Color:** Use `bg-void border-t border-hairline` (remove `#5542ff`)
- **Links:** Real social profiles (GitHub, LinkedIn, Twitter/X, maybe blog)
- **Icons:** Phosphor icons (GitHubLogo, LinkedinLogo, TwitterLogo)
- **Content:** "Krish — Security Researcher. Building in public since 2022."
- **Motion:** Minimal fade-up

### 3.9 NavBar (refactor)
- **Changes:**
  - Remove audio toggle (decorative, AI tell)
  - Remove `font-zentry` from logo, use Geist (in @theme)
  - Replace GitHub button in nav OR hero CTA (deduplicate — choose one)
  - Consolidate icons to Phosphor
  - Fix `TiLocationArrow` → Phosphor `ArrowRight`
  - Fix theme toggle icons (use Phosphor `Sun`/`Moon`)
  - Keep theme toggle, keep glass-nav styling

---

## 4. Component Dependency Graph

```
App.jsx
├── ThemeProvider (from context/ThemeContext)
│
├── NavBar
│   ├── Button (new Button component, not OldButton)
│   ├── useTheme()
│   └── Phosphor icons
│
├── Hero (NEW v2 — editorial manifesto)
│   ├── HeroCanvas (ambient node network)
│   ├── useHeroChoreography (from animations.js)
│   └── Hero copy (inline)
│
├── HeroSignalStrip
│   └── useSignalStripScroll (from animations.js)
│
├── About (rewritten)
│   ├── AnimatedTitle
│   └── GSAP clip-path reveal
│
├── Skills
│   ├── SkillCategory (from components/SkillCategory.jsx)
│   └── skills data (from data/skills.js)
│
├── Projects
│   ├── ProjectCard (from components/ProjectCard.jsx)
│   └── projects data (new: data/projects.js)
│
├── Timeline
│   └── Timeline + Stack (from components/Timeline.jsx)
│
├── Metrics (refined)
│   ├── GitHub data (from data/github.js)
│   └── Phosphor icons
│
├── Contact (rewritten)
│   └── Button
│
└── Footer (rewritten)
    ├── Phosphor icons
    └── Real social links
```

### Cross-Cutting Concerns
- **GSAP** registered once in App.jsx, used in Hero, About, Metrics, Contact
- **Motion/react** used in Skills, Timeline, Footer (leaf components only — per design-taste no-mixing rule)
- **Lenis** initialized in App.jsx, GSAP ticker wired to it
- **prefers-reduced-motion** handled at App level (gsap.matchMedia) + per component

---

## 5. Build Order

### Phase 1: Content Replacement + Critical Fixes
**Goal:** Eliminate Zentry IP, wire existing components

```
Order: Data → Content → Wire → Nav
```

| Step | Action | Files | Est. |
|------|--------|-------|------|
| 1.1 | Create `data/projects.js` with real project data | `src/data/projects.js` | 20min |
| 1.2 | Create `data/timeline.js` with real timeline | `src/data/timeline.js` | 15min |
| 1.3 | Rewrite About.jsx with real content | `src/components/About.jsx` | 30min |
| 1.4 | Wire Skills section in App.jsx | `src/App.jsx` | 15min |
| 1.5 | Wire Projects section in App.jsx | `src/App.jsx` | 15min |
| 1.6 | Wire Timeline section in App.jsx | `src/App.jsx` | 15min |
| 1.7 | Rewrite Contact.jsx with security CTA | `src/components/Contact.jsx` | 20min |
| 1.8 | Rewrite Footer.jsx (fix color, real links) | `src/components/Footer.jsx` | 20min |
| 1.9 | Refactor NavBar (remove audio, fix fonts, icons) | `src/components/Navbar.jsx` | 25min |
| 1.10 | Remove old sections from App.jsx (Features, Story, World) | `src/App.jsx` | 5min |
| | **Total Phase 1** | | **~3h** |

### Phase 2: Hero v2 Implementation
**Goal:** New editorial manifesto hero with motion choreography

```
Order: Hero.jsx → HeroCanvas → animations → CSS
```

| Step | Action | Files | Est. |
|------|--------|-------|------|
| 2.1 | Create new Hero.jsx (v2 editorial manifesto) | `src/components/Hero.jsx` | 45min |
| 2.2 | Create HeroCanvas component (node network) | `src/components/HeroCanvas.jsx` | 45min |
| 2.3 | Create HeroSignalStrip component | `src/components/HeroSignalStrip.jsx` | 20min |
| 2.4 | Write `useHeroChoreography` (stagger entrance) | `src/components/animations.js` | 15min |
| 2.5 | Write `useSignalStripScroll` (count-up) | `src/components/animations.js` | 15min |
| 2.6 | Create fallback-poster.svg (static hero image) | `public/fallback-poster.svg` | 15min |
| 2.7 | Verify all hero CSS classes in index.css | `src/index.css` | 10min |
| | **Total Phase 2** | | **~2.5h** |

### Phase 3: Polish + Consistency
**Goal:** Fix all cross-cutting issues from audit

```
Order: Colors → Shapes → Typography → Motion → Performance
```

| Step | Action | Files | Est. |
|------|--------|-------|------|
| 3.1 | Fix Metrics colors (remove blue/violet/purple) | `src/components/Metrics.jsx` | 15min |
| 3.2 | Eliminate non-zero radii across components | `src/components/*.jsx` | 20min |
| 3.3 | Audit font references (remove zentry, circular, general) | All components + index.css | 20min |
| 3.4 | Consolidate eyebrow usage (max 3 across page) | All components | 10min |
| 3.5 | Consolidate CTAs (no duplicate intent) | NavBar + Hero + Contact | 10min |
| 3.6 | Migrate remaining react-icons → Phosphor | Navbar, Footer, Features | 20min |
| 3.7 | Add skip-link, ensure focus visible everywhere | index.css (already exists) | 5min |
| 3.8 | Run build, check console errors | — | 10min |
| 3.9 | Lighthouse audit (LCP, CLS, a11y) | — | 15min |
| | **Total Phase 3** | | **~2h** |

### Total Estimated Implementation: ~7.5h

---

## 6. File Change Summary

### New Files
| File | Phase | Purpose |
|------|-------|---------|
| `src/data/projects.js` | 1 | Project card data |
| `src/data/timeline.js` | 1 | Timeline data |
| `src/components/HeroSignalStrip.jsx` | 2 | 5-stat strip below hero |
| `src/components/HeroCanvas.jsx` | 2 | Node network canvas |
| `public/fallback-poster.svg` | 2 | Static hero fallback |

### Rewritten Files
| File | Phase | Changes |
|------|-------|---------|
| `src/components/Hero.jsx` | 2 | New editorial manifesto hero v2 |
| `src/components/About.jsx` | 1 | Real bio + content |
| `src/components/Contact.jsx` | 1 | Security CTA |
| `src/components/Footer.jsx` | 1 | Color fix, real links |
| `src/components/Navbar.jsx` | 1 | Remove audio, fix fonts/icons |

### Modified Files
| File | Phase | Changes |
|------|-------|---------|
| `src/App.jsx` | 1,2 | New section wiring, remove old sections |
| `src/components/Metrics.jsx` | 3 | Color palette fix |
| `src/components/animations.js` | 2 | Add hero + signal strip hooks |
| `src/index.css` | 2,3 | Verify v2 classes, remove unused Zentry styles |
| `src/components/Features.jsx` | 3 | Fix radii (or remove if replaced by Projects) |

### Removed Content (no file deletion, just App.jsx unwiring)
| Section | Replaced By |
|---------|-------------|
| Features (Zentry cards) | Projects (ProjectCard) |
| Story (Zentry narrative) | About + Timeline |
| World (MotionZ) | Skills |

---

## 7. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Content not available (bio text, project data) | HIGH — blocks Phase 1 | Placeholder content marked with `<!-- TODO -->` tags, ask user for copy |
| Canvas performance on mobile | MEDIUM | Disable HeroCanvas on mobile via `window.matchMedia("(max-width: 768px)")` |
| GSAP + Motion conflict in same tree | MEDIUM | Isolate Motion to leaf components only (design-taste 5.D rule) |
| Build breaks after deleting old sections | LOW | Test `bun run build` after each phase; keep Features.jsx as file (just unwire) |
| Hero scroll-responsive title shrink conflicts with Lenis | MEDIUM | Use GSAP ScrollTrigger scrub on a wrapper, not Lenis callbacks |
| User hasn't provided real project/writeup data | HIGH | Default to GitHub API data where possible (Metrics already does this) |
