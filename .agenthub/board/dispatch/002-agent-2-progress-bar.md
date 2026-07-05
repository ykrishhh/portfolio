---
author: coordinator
timestamp: 2026-07-05T06:40:00Z
channel: dispatch
agent: agent-2
---

## Task: Reading Progress Bar

Add a thin reading progress bar fixed at the very top of the viewport that fills from left to right as the user scrolls down the page.

### Requirements
- Fixed at top: `position:fixed;top:0;left:0;z-index:1001` (above the nav bar)
- Height: 3px
- Color: gradient from `var(--g)` (#00e639) to `var(--cy)` (#00d4ff)
- Width tracks scroll progress: `(scrollY / (docHeight - viewportHeight)) * 100%`
- Smooth transition on width changes (or use requestAnimationFrame)
- Not visible when at 0% scroll (width 0)
- Use `transform:translateZ(0)` or `will-change:width` for GPU acceleration
- Works in dark and light mode (the bar already uses --g/--cy vars)

### Technical approach
- Create a `<div id="progress-bar">` at the top of the `<body>` (first child)
- CSS: fixed, top:0, left:0, height:3px, z-index:1001, background: linear-gradient
- JS: scroll listener (passive, rAF-throttled) updates width percentage
- On load and resize, recalc document height

### Constraints
- Single HTML file only (index.html)  
- No external dependencies
- All CSS in `<style>` block, all JS in `<script>` block
