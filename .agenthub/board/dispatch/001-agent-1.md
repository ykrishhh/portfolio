---
author: coordinator
timestamp: 2026-07-05T06:13:16Z
channel: dispatch
parent: null
agent: 1
---

## Task: Add Dark/Light Mode Toggle

**File**: `index.html`

### What to do
Add complete dark/light mode support to the portfolio:
1. Define light-mode CSS variables in a `[data-theme="light"]` block — light background, dark text, adjusted accent colors
2. Add a small toggle button in the nav bar (next to GitHub CTA) that switches `data-theme` on `<html>`
3. Respect `prefers-color-scheme: dark` media query to default to system preference
4. Persist the user's choice in `localStorage`
5. All sections must work in both modes — hero, projects, terminal, stats, contact, footer
6. Use CSS variables — swap the values, don't override every class

### Acceptance
- Toggle renders in nav as a small icon button (sun/moon)
- Clicking it switches all sections between dark and light
- Refresh preserves choice via localStorage
- No broken contrast in either mode

### Constraints
- Keep the hacker/dark-tech vibe in dark mode
- Light mode should feel clean, professional, not fully white — use warm off-white like `#f5f2ed`
- Single file only — everything stays in `index.html`
