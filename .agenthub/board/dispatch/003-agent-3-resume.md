---
author: coordinator
timestamp: 2026-07-05T06:50:00Z
channel: dispatch
agent: agent-3
---

## Task: Resume Download Button + Blog/Writeups Section

Add two things: (1) a resume/CV download button in the nav area and hero CTA, (2) a small "Writeups" section highlighting recent security research publications.

### Part 1: Resume Download Button

Add a download button/link in two places:
- **Nav**: next to the GitHub CTA button, add a small download icon button with aria-label "Download Resume"
- **Hero CTA area**: add a secondary CTA button "↓ Resume" next to the existing primary CTA

Style it to match existing buttons (monospace, green border, hover fill, same sizing as nav-cta).

The download link can just be a placeholder: `href="resume.pdf"` with `download` attribute. No need to create the actual PDF.

### Part 2: Writeups Section

Add a small "Writeups" section between Projects and Tech Stack sections showing recent security research publications/writeups. This is a showcase of blog posts, writeups, or publications.

- Section tag: "// writeups" 
- Title: "Recent <span class="g">Research</span>"
- 3 cards with: title, a brief description, date, and a tag (e.g., "CVE", "Kernel", "Android", "IoT")
- Card styling: same as project cards (bento-style, dark bg, border, hover lift)
- Each card links to "#" placeholder (no real URLs needed)
- Responsive: 3-col desktop, 2-col tablet, 1-col mobile

### Example Writeup Cards:
1. **Linux Kernel Exploitation: From Bug to PoC** — A deep dive into kernel vulnerability discovery and exploit development. *Mar 2026* — `CVE Research`
2. **ESP32 Firmware Reversing: Extracting Secrets** — How to dump, analyze, and extract credentials from ESP32 firmware images. *Jan 2026* — `IoT`
3. **Android Binder Internals: A Hacker's Perspective** — Understanding Android IPC internals for finding privilege escalation paths. *Nov 2025* — `Android RE`

### Layout
- Insert between Projects `</section>` and Tech Stack `<section id="stack"`
- Use existing patterns (reveal class, section-header, projects-grid styling)

### Constraints
- Single HTML file only (index.html)
- No external dependencies
- All CSS in `<style>` block
- Follow existing dark aesthetic, use existing CSS vars
