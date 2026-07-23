# Design Audit — Foldcraft Portfolio

**Auditor:** gpt-taste + design-taste-frontend (combined)
**Date:** 2026-07-24
**Current URL:** harrydev.one
**Commit:** a8a78f1

---

## Design Read

Reading this as: **security researcher portfolio for hiring managers / CTOs / security teams**, with a **dark-tech / brutalist / editorial** language, leaning toward **native Tailwind v4 + GSAP + Lenis + custom typography (Geist + JetBrains Mono) + zero-radius system**.

---

## Dial Setting (Current State)

| Dial | Value | Rationale |
|------|-------|-----------|
| `DESIGN_VARIANCE` | 5 | Mostly symmetrical layouts, centered content, expected Zentry-inspired grid |
| `MOTION_INTENSITY` | 6 | Video hero, stagger reveals, scroll pinning — good base, needs polish |
| `VISUAL_DENSITY` | 4 | Standard web spacing, some sections loose |

**Target for redesign:** `VARIANCE: 7` / `MOTION: 7` / `DENSITY: 3` — more asymmetric layout, more meaningful motion, airier feel.

---

## Section-by-Section Audit

### NAVBAR (Navbar.jsx)
| Check | Status | Notes |
|-------|--------|-------|
| Single line at desktop | ✅ PASS | 3 nav items, GitHub and Writeups buttons, theme toggle, audio toggle |
| Nav height ≤ 80px | ⚠️ WARN | `h-16` with `top-4` offset — functional, but "floating-nav" class adds glass style |
| Nav render on one line | ✅ PASS | Fits at 1024px |
| Duplicate CTA intent | ❌ FAIL | "GitHub" button in nav + "View GitHub" in hero = same intent |
| Font consistency | ❌ FAIL | Uses `font-zentry` for logo — this font is not defined in @theme (only Geist + JetBrains Mono) |
| Icons | ⚠️ WARN | Uses `TiLocationArrow` from `react-icons/ti` and `FaSun`/`FaMoon` from `react-icons/fa` — violates design-taste 3.C (Phosphor preferred, one family per project) |
| Audio toggle | ❌ FAIL | Decorative audio visualization with no clear purpose — AI tell (Section 9.F) |
| Theme toggle | ✅ PASS | Useful, uses `useTheme()` context |

### HERO (Hero.jsx)
| Check | Status | Notes |
|-------|--------|-------|
| Fits initial viewport | ❌ FAIL | Video clip-path frame with loading spinner + complex pin layout risks overflow |
| Headline ≤ 2 lines desktop | ❌ FAIL | "SECURE" / "SYSTEMS" stacked — 2 words each but not communicating the value prop |
| Subtext ≤ 20 words | ❌ FAIL | Subtitle is 18 words, OK, but not meaningful for portfolio ("Krish - Security Researcher & Developer / Digging into Android kernels...") |
| Hero text elements max 4 | ❌ FAIL | Has: background headline (2x), foreground headline (2x), subtitle, CTA = 6+ elements |
| Stats/pills in hero | ✅ PASS | None |
| CTA readability | ✅ PASS | White text on dark bg — OK |
| Button wrap | ✅ PASS | "View GitHub" fits on one line |
| Content authenticity | ❌ CRITICAL | Video uses Zentry's CDN MP4 files — external dependency and completely unrelated IP |
| "SECURE" / "SYSTEMS" copy | ❌ FAIL | Generic, doesn't communicate the actual person's work or value |
| gpt-taste hero layout | ⚠️ PARTIAL | Uses a variant of "Video/Media Mask" but implementation is Zentry-derived |
| Zero-radius consistency | ❌ FAIL | `rounded-3xl` on hero frame, `rounded-full` on CTA button — violates brutalist zero-radius |
| Motion safety | ✅ PASS | Has `prefers-reduced-motion` handling |
| Loading state | ✅ PASS | Has loading spinner |

### ABOUT (About.jsx — named "Repos")
| Check | Status | Notes |
|-------|--------|-------|
| Content relevant | ❌ CRITICAL | "Human life powers AI" has nothing to do with security research |
| Eyebrow | ❌ FAIL | "Welcome to my Portfolio" — Section 4.7 eyebrow count violation |
| About text | ❌ FAIL | "Security research meets practical tooling" is OK but short; second paragraph about mobile pentesting is better |
| Clip-path image | ✅ PASS | Nice cinematic reveal effect |
| Section background | ❌ FAIL | `bg-white text-black` — violates dark mode page theme lock (Section 4.11) |
| Zero-radius | ⚠️ WARN | About section uses default radius, not explicitly zero |
| Animation | ✅ PASS | GSAP scroll-triggered clip-path expansion works well |

### FEATURES (Features.jsx)
| Check | Status | Notes |
|-------|--------|-------|
| Content authenticity | ❌ CRITICAL | ALL video sources and titles are Zentry IP ("radiant", "zigema", "zTerminal", "zAI") — none are this user's projects |
| Bento grid density | ✅ PASS | 2-col grid, 5 cells, varied sizes |
| Mouse tilt effect | ✅ PASS | `BentoTilt` with perspective transforms |
| Bento diversity | ⚠️ WARN | Most cells use video + text overlay — limited visual variety |
| Zero-radius | ❌ FAIL | `rounded-md` on bento cells |
| Coming soon labels | ❌ FAIL | Multiple "isComingSoon" badges — makes site look unfinished |
| Section eyebrow | ❌ FAIL | "Security Research & Tools" eyebrow — eyebrow count violation |
| Font usage | ❌ FAIL | Uses `font-circular-web`, `font-general` — none in @theme |
| Hover states | ✅ PASS | Cards have hover scale + brightness changes |

### STORY (Story.jsx — named "FloatingImage")
| Check | Status | Notes |
|-------|--------|-------|
| Content authenticity | ❌ CRITICAL | "the open ip universe", "the story of a hidden realm" — entirely Zentry narrative, irrelevant |
| Eyebrow | ❌ FAIL | "the open ip universe" — gibberish for security portfolio |
| Button | ❌ FAIL | "discover prologue" — meaningless for researcher portfolio |
| Mouse parallax on image | ✅ PASS | Nice 3D tilt effect on image |
| Section background | ❌ FAIL | `bg-black` mixed with page — but already on dark, so OK for theme |
| Font usage | ❌ FAIL | `font-circular-web` again |
| Image source | ❌ FAIL | Uses `/demos/Zentry_Premium/img/entrance.webp` — local demo asset from clone |

### WORLD (World.jsx)
| Check | Status | Notes |
|-------|--------|-------|
| Content authenticity | ❌ CRITICAL | "MotionZ", "Design Layer", "creative assets and AI-driven design tools" — completely unrelated |
| Eyebrow | ❌ FAIL | "the symbiotic world" — eyebrow #4 |
| Accordion interaction | ✅ PASS | Expandable items work |
| Spinning token graphic | ❌ FAIL | Token image `img/token.png` — fake NFT aesthetic |
| Section background | ❌ FAIL | `bg-white` — breaks dark theme lock |
| Zero-radius | ❌ FAIL | `rounded-full` on floating elements |

### METRICS (Metrics.jsx)
| Check | Status | Notes |
|-------|--------|-------|
| Data authenticity | ✅ PASS | Uses real GitHub API data — this is the most authentic section |
| Layout | ✅ PASS | 8-col/4-col grid with stats + repos + contributions |
| Skills pills | ✅ PASS | Good implementation |
| Section eyebrow | ⚠️ WARN | Not explicit, but "Top Repositories" serves as de facto label |
| Color consistency | ❌ FAIL | Uses `bg-blue-600`, `bg-violet-300`, `bg-white`, `bg-neutral-900` — breaks palette lock |
| Zero-radius | ❌ FAIL | `rounded-3xl` on stat cards |
| Font usage | ❌ FAIL | `font-zentry`, `font-circular-web`, `font-general` |

### CONTACT (Contact.jsx)
| Check | Status | Notes |
|-------|--------|-------|
| Content relevance | ❌ FAIL | "let's build the new era of design together" — this is a design agency CTA, not security research |
| Eyebrow | ❌ FAIL | "Get in Touch" — eyebrow #5 |
| clip-path images | ❌ FAIL | Uses `/img/contact-1.webp`, `/img/swordman.webp` — unclear relevance |
| Button | ✅ PASS | "contact" button works |
| Zero-radius | ❌ FAIL | `rounded-lg` on container |

### FOOTER (Footer.jsx)
| Check | Status | Notes |
|-------|--------|-------|
| Color consistency | ❌ CRITICAL | `bg-[#5542ff]` — purple is completely outside the color system (violates 4.2 Color Consistency Lock) |
| Social links | ❌ FAIL | Discord, Twitter, YouTube, Medium — fake links (all go to homepage), not the user's actual profiles |
| Font | ❌ FAIL | No explicit font-family set, inherits |
| Content | ⚠️ WARN | "Krish 2026. All rights reserved." — functional but minimal |
| Privacy Policy | ❌ FAIL | Links to `#privacy-policy` — not a real page |

---

## Cross-Cutting Violations (Both Skills)

### gpt-taste Priority Violations
1. **No AIDA structure** — current page flows Zentry→Zentry→Zentry→Zentry→Zentry→Metrics→Zentry→Footer. The "Attention" phase doesn't communicate who this is.
2. **2-line iron rule** — not applicable yet (hero is videocentric, not text-centric)
3. **Gapless bento** — Features grid works but needs content replacement
4. **Meta labels** — "Welcome to my Portfolio", "the open ip universe", "the symbiotic world", "Get in Touch" — all banned under Section 7
5. **Zero creative backgrounds** — no radial washes, no mesh gradients, no ambient design beyond grain overlay
6. **No GSAP scroll pinning/stacking** — basic stagger reveals only, no pinned sections or horizontal scroll

### design-taste-frontend Priority Violations
1. **Content authenticity** — ~80% of page content is Zentry clone IP, not the user's actual work. **Blocking issue.**
2. **Page theme lock (4.11)** — light sections (`bg-white`) mixed with dark sections (`bg-black`)
3. **Color consistency lock (4.2)** — purple footer, blue/violet stat cards, multiple accent colors
4. **Shape consistency lock (4.4)** — mixed radii (`rounded-3xl`, `rounded-xl`, `rounded-full`, `rounded-md`) against zero-radius mandate
5. **Eyebrow count (4.7)** — 5+ eyebrows across 8 sections (limit: ceil(8/3) = 3 max)
6. **Font system pollution** — 5+ font families referenced (`font-zentry`, `font-circular-web`, `font-general`, `font-robert-regular`, `font-demo`) that don't exist in @theme. Only Geist + JetBrains Mono are loaded.
7. **Icon family pollution** — Phosphor (in SkillCategory/ProjectCard) mixed with react-icons/ti (Navbar), react-icons/fa (Footer)
8. **CTA deduplication** — "GitHub" appears in nav button + hero CTA + potentially more
9. **Hero stack discipline** — too many text elements in hero

### Design Tokens Correctly Applied
- `--color-void: #050510` ✅
- `--color-accent: #00d4aa` ✅
- `--color-hairline` system ✅
- `--ease-expo` / `--ease-sharp` ✅
- Geist + JetBrains Mono loading ✅
- Zero-radius intent (index.css) ✅
- Grain overlay ✅
- Lenis + GSAP integration ✅

### Unused / Ready-to-Wire Components
These exist in `src/components/` but are **not imported in App.jsx**:
- `Card.jsx` + CardHeader/Title/Description/Content/Footer — well-built, uses correct design tokens
- `ProjectCard.jsx` — complete with Phosphor icons, bezel, tags, star count, architecture link
- `SkillCategory.jsx` — clean grid layout, Phosphor icons
- `StickyStack.jsx` — follows design-taste 5.A canonical skeleton
- `Timeline.jsx` — complete with scroll-driven line draw, IntersectionObserver, magnetic pills, Motion stagger

These represent ~400 lines of ready-to-ship component code that should replace the Zentry-derived content.

### Hero v2 CSS Already Present (in index.css)
- `.hero-shell` — isolate container
- `.hero-eyebrow` — inline mono label
- `.hero-title` — clamp(3rem, 6vw, 7rem)
- `.hero-line` — block span
- `.hero-sub` — max 56ch
- `.hero-cue` — scroll indicator
- `.hero-rise` animation (staggered reveal at 0ms/90ms/180ms/270ms/360ms/480ms)
- `.hero-portal` — right-edge hairline
- `.signal-strip` — 5-column grid
- `.signal-cell` — with value/label substructure

All v2 CSS is ready. Only JSX wiring needed.

---

## Summary

| Category | Items to Fix | Priority |
|----------|-------------|----------|
| **Content authenticity** | Replace ALL Zentry-derived content (About, Features, Story, World, Contact) with real security researcher content | 🔴 BLOCKING |
| **Color consistency** | Fix Footer purple, Metrics colored cards, About white bg, World white bg | 🔴 HIGH |
| **Shape consistency** | Eliminate all non-zero radii to match brutalist mandate | 🔴 HIGH |
| **Font system** | Remove non-existent font references, use only Geist + JetBrains Mono | 🔴 HIGH |
| **Eyebrow overuse** | Cut from 5+ down to max 3 across page | 🟡 MEDIUM |
| **CTA deduplication** | Consolidate GitHub CTAs | 🟡 MEDIUM |
| **Icon consolidation** | Migrate react-icons to Phosphor | 🟡 MEDIUM |
| **Wire redesign components** | Import Card, ProjectCard, SkillCategory, StickyStack, Timeline into App.jsx | 🟢 READY |
| **Deploy hero v2** | Wire Hero.jsx v2 with new copy, signal strip, canvas | 🟢 READY |
| **Audio toggle removal** | Remove decorative audio toggle | 🟢 LOW |
| **Fake social links** | Replace with real profiles or remove | 🟡 MEDIUM |
| **Footer color** | Change `#5542ff` to use color system | 🔴 HIGH |
