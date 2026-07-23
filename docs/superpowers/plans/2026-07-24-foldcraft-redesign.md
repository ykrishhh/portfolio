# Foldcraft Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full anti-slop redesign of the foldcraft portfolio (harrydev.one) — typography, texture, layout, motion, content upgrades.

**Architecture:** Vite 8 SPA with React 19 + Tailwind v4 + GSAP 3.15. No backend. GitHub API for live stars (client-side fetch). Cloudflare Pages for deployment.

**Tech Stack:** React 19, Vite 8, Tailwind v4, GSAP 3.15, Lenis 1.3, Phosphor React, Motion (framer-motion successor), GitHub REST API.

## Global Constraints

- One accent color (#00d4aa teal), one palette, locked
- Zero corner radius (brutalist — keep existing)
- No serif fonts
- No Lucide icons — use @phosphor-icons/react, bold weight
- No 3-column equal grids — asymmetrical only
- No `window.addEventListener('scroll')` — use Motion or GSAP
- No `useState` for continuous motion values — use `useMotionValue`
- All animations respect `prefers-reduced-motion`
- CTA text fits one line at desktop, max 3 words
- Max 1 eyebrow per 3 sections
- Max 1 marquee per page

---

### Task 1: Install Phosphor Icons + Replace Lucide Usage

**Files:**
- Modify: `foldcraft/src/App.jsx`
- Modify: `foldcraft/src/components/Button.jsx`
- Modify: `foldcraft/src/components/ProjectCard.jsx`
- Modify: `foldcraft/src/components/Card.jsx`
- Modify: `foldcraft/src/components/Timeline.jsx`
- Modify: `foldcraft/src/components/SkillCategory.jsx`

- [ ] **Step 1: Install Phosphor React**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && bun add @phosphor-icons/react`

- [ ] **Step 2: Replace all Lucide imports in App.jsx**

Current: `import { ArrowUpRight, Mail } from "lucide-react";`
New: `import { ArrowUpRight, Envelope } from "@phosphor-icons/react";`

Replace every Lucide icon reference in the file with its Phosphor equivalent (ArrowUpRight → ArrowUpRight, Mail → Envelope, Moon → Moon, Shield → Shield, etc.)

- [ ] **Step 3: Replace Lucide icons in component files**

For each component file, replace `lucide-react` imports with `@phosphor-icons/react` and map icons.

- [ ] **Step 4: Verify no Lucide references remain**

Run: `rg "lucide-react" /home/harry/Documents/Default\ Project/foldcraft/src/` — expect 0 results

- [ ] **Step 5: Commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "feat: swap Lucide for Phosphor icons"`

---

### Task 2: Add CSS Grain Texture Overlay

**Files:**
- Modify: `foldcraft/src/index.css`

- [ ] **Step 1: Add grain overlay CSS to index.css**

```css
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
```

- [ ] **Step 2: Add grain element to App.jsx**

Insert `<div className="grain-overlay" aria-hidden="true" />` inside the `<main>` element, as the first child.

- [ ] **Step 3: Commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "feat: add CSS grain texture overlay"`

---

### Task 3: Add Geist Display for Hero Headlines

**Files:**
- Modify: `foldcraft/index.html`
- Modify: `foldcraft/src/index.css`
- Modify: `foldcraft/src/App.jsx`

- [ ] **Step 1: Add Geist Display font to index.html**

Add preconnect and stylesheet links for Geist Display (static cuts, weight 700-900).

- [ ] **Step 2: Add CSS font-face in index.css**

```css
@font-face {
  font-family: 'Geist Display';
  src: url('https://d8j0ntlcm91z4.cloudfront.net/fonts/GeistDisplay/GeistDisplay-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist Display';
  src: url('https://d8j0ntlcm91z4.cloudfront.net/fonts/GeistDisplay/GeistDisplay-Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}
```

Add to Tailwind theme: `'display': ['Geist Display', 'sans-serif']`

- [ ] **Step 3: Apply display font to hero title in App.jsx**

Find the hero h1 element and add `font-display` alongside existing classes.

- [ ] **Step 4: Commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "feat: add Geist Display for hero headlines"`

---

### Task 4: Add Live GitHub Stars

**Files:**
- Create: `foldcraft/src/hooks/useGitHubStars.js`
- Modify: `foldcraft/src/App.jsx`

- [ ] **Step 1: Create the fetch hook**

```javascript
export function useGitHubStars(repo) {
  const [stars, setStars] = useState(null);
  useEffect(() => {
    const key = `gh-stars-${repo}`;
    const cached = localStorage.getItem(key);
    if (cached) {
      const { value, ts } = JSON.parse(cached);
      if (Date.now() - ts < 3600000) { setStars(value); return; }
    }
    fetch(`https://api.github.com/repos/${repo}`)
      .then(r => r.json())
      .then(d => {
        const s = d.stargazers_count ?? 0;
        localStorage.setItem(key, JSON.stringify({ value: s, ts: Date.now() }));
        setStars(s);
      })
      .catch(() => setStars(null));
  }, [repo]);
  return stars;
}
```

- [ ] **Step 2: Wire stars into PROJECTS data**

Replace hardcoded `stars` values in each project object with `stars: useGitHubStars("ykrishhh/termux-security-toolkit")`, etc. Map repo names: `termux-security-toolkit`, `ESP32-HARNESS`, `ou-hunt-report`, `pypentest-ai`, `HarryPanel`, `android-rooting-masterclass`.

- [ ] **Step 3: Commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "feat: add live GitHub star counts with 1hr cache"`

---

### Task 5: Add KernelSU-Next Guide Project Card

**Files:**
- Modify: `foldcraft/src/App.jsx`

- [ ] **Step 1: Add project entry to PROJECTS array**

```javascript
{
  name: "kernelsu-next-guide",
  desc: "Complete guide to KernelSU-Next: installation, module development, and advanced kernel-level Android customization.",
  stars: useGitHubStars("ykrishhh/kernelsu-next-guide"),
  url: "https://github.com/ykrishhh/kernelsu-next-guide",
  icon: (props) => <Shield {...props} />,
  category: "Android",
  tags: ["kernel", "android", "guide"],
},
```

- [ ] **Step 2: Commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "feat: add KernelSU-Next guide project card"`

---

### Task 6: Fix SPA Routing for Cloudflare Pages

**Files:**
- Create: `foldcraft/public/_redirects`

- [ ] **Step 1: Create Cloudflare Pages redirects file**

Content: `/* /index.html 200`

This tells Cloudflare Pages to serve index.html for all routes (SPA fallback).

- [ ] **Step 2: Verify in vite.config.js**

Ensure the build outputs to `dist/` and the `_redirects` file is copied to `dist/` during build.

Add to vite.config.js if needed:
```javascript
import { viteStaticCopy } from 'vite-plugin-static-copy';
// ...
viteStaticCopy({
  targets: [{ src: 'public/_redirects', dest: '.' }]
})
```

Actually, Cloudflare Pages reads `_redirects` from the output directory root. Vite copies `public/` files to the build root automatically. Verify the file is at `dist/_redirects` after build.

- [ ] **Step 3: Commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "fix: add SPA redirects for Cloudflare Pages routing"`

---

### Task 7: Replace Placeholder Images

**Files:**
- Modify: `foldcraft/src/components/BentoGrid.jsx` (or wherever picsum.photos is used)

- [ ] **Step 1: Find all picsum.photos references**

Run: `rg "picsum" /home/harry/Documents/Default\ Project/foldcraft/src/`

- [ ] **Step 2: Replace with real image paths or remove**

If the images are decorative placeholders with no real alternative, remove them. If the bento grid cells can work without images, replace with solid void-soft background + typography. If real assets exist, use them.

- [ ] **Step 3: Commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "fix: replace placeholder images with real content"`

---

### Task 8: Asymmetric Bento Project Grid

**Files:**
- Modify: `foldcraft/src/App.jsx` (ProjectGrid section)
- Modify: `foldcraft/src/components/ProjectCard.jsx`

- [ ] **Step 1: Replace grid layout classes**

Current: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
New: Use a mix of spans:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
  {projects.map((p, i) => (
    <div key={p.name} className={`${i % 3 === 0 ? 'lg:col-span-2 lg:row-span-2' : i % 2 === 0 ? 'lg:col-span-1' : 'lg:col-span-1'}`}>
      <ProjectCard project={p} />
    </div>
  ))}
</div>
```

- [ ] **Step 2: Update ProjectCard for varied sizes**

Make ProjectCard accept a `size` prop or use the parent grid span to adjust internal layout (larger cards get wider image + more description).

- [ ] **Step 3: Commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "feat: asymmetric bento grid for project cards"`

---

### Task 9: Sticky-Card Stack for Research Domains

**Files:**
- Modify: `foldcraft/src/App.jsx`
- Modify or replace: `foldcraft/src/components/DomainAccordion.jsx`

- [ ] **Step 1: Create StickyStack component**

Use the canonical skeleton from design-taste skill (Section 5.A). Replace the four research domain panels with sticky cards that pin at viewport top, previous card scales back as next arrives.

- [ ] **Step 2: Wire into App.jsx**

Replace `<DomainAccordion />` with `<StickyStack cards={DOMAINS} />`.

- [ ] **Step 3: Commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "feat: sticky-card stack for research domains"`

---

### Task 10: Magnetic CTA on Hero Button

**Files:**
- Modify: `foldcraft/src/App.jsx` or `foldcraft/src/components/Button.jsx`

- [ ] **Step 1: Add magnetic hover to primary CTA**

Use Motion's `useMotionValue` + `useTransform` to pull the button toward the cursor on hover within a 50px radius. No React state involved.

```jsx
const x = useMotionValue(0);
const y = useMotionValue(0);

const handleMouseMove = (e) => {
  const rect = ref.current.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  x.set(dx * 0.15);
  y.set(dy * 0.15);
};
const handleMouseLeave = () => { x.set(0); y.set(0); };
```

- [ ] **Step 2: Commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "feat: magnetic hover effect on hero CTA"`

---

### Task 11: Motion whileInView Scroll Reveals

**Files:**
- Modify: `foldcraft/src/App.jsx`
- Modify: `foldcraft/src/components/animations.jsx`

- [ ] **Step 1: Replace custom IntersectionObserver with Motion**

Find the `useReveal` hook in App.jsx. Replace it with Motion's `whileInView`:
```jsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
```

Apply to sections that currently use `.reveal` classes.

- [ ] **Step 2: Keep GSAP for heavy choreography (hero, sticky stack)**

The hero GSAP choreography and the sticky-card stack remain GSAP-based. Only the simple scroll-reveal sections (about text, project cards, timeline) switch to Motion.

- [ ] **Step 3: Commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "feat: replace IntersectionObserver with Motion whileInView"`

---

### Task 12: Polish — Audit Pass

**Files:**
- Modify: various

- [ ] **Step 1: Eyebrow count check**

Count instances of `uppercase tracking` above section headers. Max 1 per 3 sections. Remove excess.

- [ ] **Step 2: Section-layout-repetition check**

Ensure no two adjacent sections use the same layout family. Break up any repetitions.

- [ ] **Step 3: CTA wrap check**

Verify all button labels fit one line at 1024px+. Fix any wrapping.

- [ ] **Step 4: Copy audit**

Read every visible string. No AI-isms, no fake-precise numbers, one register.

- [ ] **Step 5: Build + verify**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && bun run build`

Check that `dist/` contains `_redirects` and no build errors.

- [ ] **Step 6: Final commit**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && git add -A && git commit -m "polish: audit pass — layout, copy, contrast"`

---

### Task 13: Deploy to Cloudflare Pages

**Files:**
- None (infrastructure)

- [ ] **Step 1: Deploy**

Run: `cd /home/harry/Documents/Default\ Project/foldcraft && bunx wrangler pages deploy dist/ --project-name foldcraft`

- [ ] **Step 2: Verify live site**

Confirm `https://harrydev.one` loads and all routes work.
