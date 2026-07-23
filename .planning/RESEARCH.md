# Web Research — Motion Hero & Dark-Tech Portfolio Patterns

**Date:** 2026-07-24
**Purpose:** Research motion hero patterns suitable for a brutalist dark-tech security researcher portfolio

---

## 1. Awwwards Dark Theme Portfolio Patterns

### Key Takeaway
The current Awwwards "dark mode" collection shows a shift toward **editorial minimalism with motion accents** rather than full 3D/WebGL overload. The trend for 2026 security/dev portfolios is:
- Dark void backgrounds with single accent colors
- **Kinetic typography** as the primary visual (no hero image needed)
- **Scroll-driven reveals** (text scrubbing, staggered line entries)
- **Video/Canvas as atmosphere**, not as content
- **Data authenticity** — real metrics displayed with restrained animation

### Reference Patterns
| Pattern | Source | Applicability |
|---------|--------|---------------|
| **Dark editorial manifesto** — giant type, no asset, poster-like | Awwwards dark mode collection | High — fits security researcher brand |
| **Lusion.co mouse interaction** — dark/light mode with canvas | labs.lusion.co | High — canvas particle systems |
| **Monochromatic dark interface** — pure void + accent | justblack.mx | High — matches existing design tokens |
| **Hero animations** — staggered text with video underlay | lvng.io | Medium — similar to current hero intent |

---

## 2. GSAP ScrollTrigger Hero Patterns (CodePen / FreeFrontend)

### Key Takeaway
The most effective GSAP hero patterns for 2026 combine **ScrollTrigger pinning** with **SplitText-style word reveals** and **clip-path transitions**.

### Specific Patterns Suitable for This Project

#### 2.1 Pinned Split-Screen Mask Reveal
- **Pattern:** Split-screen with image mask that peels away on scroll
- **Stack:** GSAP + ScrollTrigger + Lenis
- **Why fits:** Can adapt to show "before/after" security concept (vulnerability → fix)
- **Implementation cost:** Medium
- **Reference:** FreeFrontend "Pinned Split-Screen Mask Reveal" (gridmorphic)

#### 2.2 GSAP Staggered Blinds Reveal
- **Pattern:** Horizontal bars peeling in wave motion to reveal content
- **Stack:** GSAP + ScrollTrigger + 3D transforms
- **Why fits:** The "venetian blind" effect has a natural security/scanline aesthetic
- **Implementation cost:** Medium-High
- **Reference:** FreeFrontend "GSAP Staggered Blinds Reveal"

#### 2.3 Terminal/Matrix-Style Text Scramble
- **Pattern:** Text decodes from random characters to readable text on scroll
- **Stack:** GSAP + custom text split logic
- **Why fits:** Perfect for security researcher — terminal aesthetic
- **Implementation cost:** Low-Medium (custom hook needed)
- **Note:** Must avoid cliché Matrix-green; use teal accent instead

#### 2.4 Curtain-Reveal Hero (design-taste vocabulary)
- **Pattern:** Hero parts on scroll like a curtain — upper content slides up, lower content slides down
- **Stack:** GSAP + ScrollTrigger scrub
- **Why fits:** Natural scroll-driven storytelling, dramatic reveal
- **Implementation cost:** Low (GSAP `.fromTo` with scrub)
- **Already partially implemented** in current Hero.jsx (clip-path frame expansion)

#### 2.5 Scroll-Driven Dynamic Marquee Frame
- **Pattern:** Four-sided marquee border that updates section titles as user scrolls
- **Stack:** GSAP + ScrollTrigger + CSS dynamic theming
- **Why fits:** Unique navigation device for portfolio, shows current section
- **Implementation cost:** Medium
- **Reference:** FreeFrontend "Scroll-Driven Dynamic Marquee Frame" (Ryan Mulligan)

---

## 3. Security Researcher Portfolio Design References

### Pattern Analysis

#### Terminal-First Design
- **Approach:** Hero section mimics a terminal window with typed commands
- **Why works for this project:** Security researcher identity, commands like `whoami`, `--version`, `skills --list` can introduce the person
- **Risk:** Cliché if overdone — must be subtle, not a literal terminal emulator
- **Inspiration:** hak3r GitHub template (React/TypeScript/Flowbite)

#### Dark Editorial with Metrics
- **Approach:** Hero has large typography, floating anonymized data points (CVEs, tools, years) as atmospheric decoration
- **Why works:** Shows credentials without shouting; data as design
- **Implementation:** Use the Signal Strip concept already planned — move metrics BELOW hero, not in it

#### Video/Canvas Background + Clean Foreground
- **Approach:** Dark ambient canvas (particle network, sonar ping visualization) behind clean editorial text
- **Why works:** Tech credibility without being gimmicky
- **Already partially exists:** The planned HeroCanvas with network nodes
- **Refinement:** Keep node alpha subtle (0.3-0.5), teal accent glow, link density varied

### 3.1 Motion Pattern: Stack Ticker (gpt-taste inspired)
- **Pattern:** Hero headline letters or words ticker through on load, each with a slight random stagger
- **Stack:** GSAP timeline with `.from()` and `stagger: { each: 0.04, from: "random" }`
- **Why fits:** Adds the gpt-taste "Python randomization" concept without literal Python
- **Implementation:** Simple GSAP stagger, already supported by project stack

### 3.2 Motion Pattern: Scroll-Responsive Type Scale
- **Pattern:** Hero headline starts at `clamp(3rem, 6vw, 7rem)` and shrinks as user scrolls down (via ScrollTrigger scrub)
- **Stack:** GSAP `.to()` with scrollTrigger scrub on font-size or scale
- **Why fits:** Smooth transition from hero to content, keeps text readable
- **Implementation:** GSAP animates `scale` on `.hero-title` from 1 → 0.6 as scrollY 0 → 400

### 3.3 Motion Pattern: Signal Strip Count-Up
- **Pattern:** Stats in the signal strip count from 0 to final value on scroll enter
- **Stack:** GSAP with `snap: { value: 1 }` or custom plain-number tween
- **Why fits:** Verified data (real CVEs, real tools), scroll-triggered engagement
- **Implementation cost:** Low (GSAP can tween a plain object `{val: 0}` to `{val: 6}`)

### 3.4 Motion Pattern: Staggered Section Entry
- **Pattern:** Each section title/header uses `useGSAP` stagger reveal on scroll enter
- **Stack:** GSAP `.from()` with scrollTrigger
- **Why fits:** Already partially implemented, just needs consistency pass
- **Implementation:** Standardize all section entry animations to use `ease: "power3.out"`, same stagger pattern

---

## 4. Recommended Hero Architecture (Synthesized)

### Primary Choice: Editorial Manifesto Hero (gpt-taste Hero Option 3)
- **Layout:** Ultra-wide text, left-aligned (not centered), full-bleed dark void background
- **Motion:** Stack ticker stagger on load, scroll-responsive scale shrink, signal strip below
- **Canvas:** Ambient node network (HeroCanvas) at low alpha, full width
- **Why:** Fits security researcher "manifesto" vibe, avoids cliché video hero

### Motion Budget
| Element | Technique | Priority |
|---------|-----------|----------|
| H1 stagger entry | GSAP `.from()` with stagger 0.04 | P0 |
| Eyebrow → H1 → Sub → CTAs cascade | CSS `.hero-rise` keyframes (already in index.css) | P0 |
| Scroll-responsive title shrink | GSAP ScrollTrigger scrub | P1 |
| Canvas node network | Custom canvas render | P1 |
| Signal strip count-up | GSAP tween on IntersectionObserver | P1 |
| Terminal cursor blink (optional) | CSS keyframes on accent element | P2 |

---

## 5. URL References

### Design Galleries
- Awwwards dark mode collection: https://www.awwwards.com/awwwards/collections/dark-mode/
- Awwwards portfolios: https://www.awwwards.com/websites/portfolio/
- Dark Mode Design showcase: https://www.darkmodedesign.com/
- Wall of Portfolios (dark theme): https://www.wallofportfolios.in/dark-theme

### GSAP Patterns
- GSAP ScrollTrigger demos: https://demos.gsap.com/plugin/scrolltrigger/
- 60+ GSAP ScrollTrigger examples: https://freefrontend.com/scroll-trigger-js/
- ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Design-taste 5.A Sticky-Stack skeleton (in skill file)

### Security Portfolio References
- hak3r template: https://github.com/Dan-Duran/hak3r
- GSAP scroll experience: https://github.com/tomd0627/gsap-scroll-experience
