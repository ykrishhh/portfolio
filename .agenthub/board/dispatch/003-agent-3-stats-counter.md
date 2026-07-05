---
author: coordinator
timestamp: 2026-07-05T06:30:00Z
channel: dispatch
agent: agent-3
---

## Task: Animated Stats Counter

The hero section already has stat numbers (5+ Years, 50+ CVEs, 30+ Projects, 100+ Tools). Replace the static numbers with animated counters that count up from 0 when scrolled into view.

### Requirements
- Find the existing stats in the hero section (they're inline numbers in the HTML)
- Replace static numbers with data attributes like `data-count="5"` and animate from 0 → target
- Trigger animation when the stats section enters the viewport via IntersectionObserver
- Duration: ~2s count-up per number with ease-out
- The counter function should use `requestAnimationFrame` for smooth animation
- Add a "+" suffix to each animated number (e.g., "5+" → animates to "5+")
- Animate ONCE per session (not on every scroll)
- Install a check to not count past the target number
- Respect `prefers-reduced-motion` — just show the final number immediately
- Ensure numbers are properly aligned and styled (same font-size, terminal-like)

### Current stats to animate
```
5+ Years Experience
50+ CVEs Discovered
30+ Projects
100+ Tools
```

### Constraints
- Single HTML file only (index.html)
- No external dependencies
- All JS in the existing `<script>` block
- Must be compatible with dark/light mode already implemented
