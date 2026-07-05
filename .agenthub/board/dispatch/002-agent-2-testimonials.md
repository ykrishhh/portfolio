---
author: coordinator
timestamp: 2026-07-05T06:50:00Z
channel: dispatch
agent: agent-2
---

## Task: Testimonials / Recommendations Section

Add a testimonial section between the Services section and the Projects section.

### Requirements
- Section with tag "// recommendations" and title "Trusted by" or similar
- 3-4 testimonial cards in a responsive grid (2-col desktop, 1-col mobile)
- Each card: quote text, author name, author title/role, subtle avatar placeholder (use first-letter circle if no image)
- Card styling: `var(--dk)` bg, `var(--bd)` border, 10px radius, quote style (bigger font, italic or leading)
- Green left border accent on each card (3px left border in var(--g))
- A subtle "ripple" or fade animation on scroll reveal (use existing `reveal` class)

### Testimonial Content:
1. *"KRI$H's vulnerability research methodology is thorough and professional. Their CVE discoveries demonstrate deep kernel expertise."* — **Alex M.**, Security Engineer at a Fortune 500
2. *"Working with KRI$H on our infrastructure audit was eye-opening. They found critical gaps our previous team missed for years."* — **Sarah K.**, CTO, SaaS Platform
3. *"The ESP32 security training KRI$H delivered transformed how our IoT team thinks about firmware security. Highly recommended."* — **David L.**, Head of IoT Security
4. *"KRI$H's Android RE skills are exceptional. They helped us identify and patch several critical vulnerabilities in our mobile SDK."* — **Priya R.**, Mobile Security Lead

### Layout
- Insert between Services `</section>` closing tag and Projects `<section id="projects"` opening tag
- Use existing section patterns (section-header, reveal classes, section-title)
- Responsive grid: 2 columns on desktop, 1 column on mobile

### Constraints
- Single HTML file only (index.html)
- No external dependencies
- All CSS in `<style>` block
- Follow existing dark aesthetic, use existing CSS vars
