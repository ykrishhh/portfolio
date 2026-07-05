---
author: coordinator
timestamp: 2026-07-05T06:40:00Z
channel: dispatch
agent: agent-3
---

## Task: Service Offerings Section

Add a "Services" section between the About section and the Projects section. Show 4 service cards that KRI$H offers as a security researcher.

### Requirements
- Section title: `// services` with the green accent color
- 4 cards in a responsive grid (4-col desktop, 2-col tablet, 1-col mobile)
- Each card has: service name, short description, and a subtle icon (use simple SVG or CSS-only icons)
- Card styling: `var(--dk)` background, `var(--bd)` 1px border, rounded corners 10px, subtle hover lift effect
- The card hover should slightly raise the card (translateY -3px) and glow the border green

### Cards Content:
1. **Penetration Testing** — Web, mobile, network, and cloud infrastructure assessments with detailed reporting and remediation guidance.
2. **Vulnerability Research** — CVE discovery, zero-day analysis, exploit development, and responsible disclosure coordination.
3. **Security Consulting** — Architecture review, threat modeling, security audits, and compliance readiness (SOC 2, ISO 27001).
4. **Training & Workshops** — Custom security training programs for dev teams, from secure coding to advanced red team tactics.

### Layout
- Place it between the About section `</section>` end tag and the Projects section `<section id="projects"` start tag
- Use existing spacing/section conventions
- Add a `reveal` class for scroll-triggered fade-up animation (already exists)

### Constraints
- Single HTML file only (index.html)
- No external dependencies
- All CSS in `<style>` block
- Follow existing aesthetic (dark, monospace typography, green accent, Outfit sans-serif headers)
- Use existing CSS variables
