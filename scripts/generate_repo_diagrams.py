#!/usr/bin/env python3
"""Generate architecture diagrams for selected high‑priority repositories.

Reads /tmp/repo_meta.jsonl (JSON Lines) where each line is the output of:

  gh repo view ykrishhh/<repo> --json name,description,languages,createdAt,updatedAt,stargazerCount,repositoryTopics,defaultBranchRef

and writes a standalone HTML file with an inline‑SVG architecture diagram for each repo
into the target directory.
"""

import json
import pathlib

OUT_DIR = pathlib.Path(
    "/home/harry/Documents/Default Project/foldcraft/public/diagrams"
)
OUT_DIR.mkdir(parents=True, exist_ok=True)

HTML_TEMPLATE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><title>{title</title>
<style>
:root{
  --paper:#050510;--paper-2:#0d0d1a;--ink:#eaeaea;--muted:#8a8a9e;
  --rule:rgba(234,234,234,0.12);--accent:#00d4aa;--link:#6a95d8;
}
body{background:var(--paper);color:var(--ink);
  font-family:'Geist',system-ui,sans-serif;margin:2rem;
  display:flex;flex-direction:column;align-items:center;gap:1rem;
}
h1{font-family:'Instrument Serif',serif;margin:.2em 0 .1em;
  font-size:1.8rem;letter-spacing:-0.02em}
.meta{font-family:'Geist Mono',monospace;font-size:11px;color:var(--muted)}
.box{
  width:1100px;background:var(--paper-2);border:1px solid var(--rule);
  padding:1.2rem;display:flex;flex-direction:column;gap:.8rem;
}
.svg-wrap{width:100%;overflow:hidden}
.desc{max-width:900px;line-height:1.45}
.tags span{background:var(--paper);border:1px solid var(--rule);
  padding:.2rem .5rem;margin:.1rem;display:inline-block;font-size:10px}
</style</head>
<body>
<h1>{title</h1>
<div class="meta">★ {stars} · {langs} · created {created} · last updated {updated</div>
<p class="desc">{desc</p>
<div class="tags">{tags</div>
<div class="box">
  <div class="svg-wrap">{svg</div>
</div>
</body</html>
"""


def make_svg(langs, name):
    """Create a three‑layer architecture diagram based on language mix."""
    core_modules = []
    for l in langs[:5]:
        lang = l["node"]["name"].lower()
        if "python" in lang:
            core_modules.append(("Python Engine", "Core logic & glue"))
        elif "html" in lang:
            core_modules.append(("Web UI", "Static pages"))
        elif "javascript" in lang or "typescript" in lang:
            core_modules.append(("React/JS UI", "Interactive components"))
        elif "c++" in lang:
            core_modules.append(("Native C/C++", "System / firmware layer"))
        elif lang == "c":
            core_modules.append(("C Firmware", "Low-level code"))
        elif "java" in lang or "kotlin" in lang:
            core_modules.append(("Android Module", "Mobile UI / service"))
        elif "markdown" in lang or "mdx" in lang:
            core_modules.append(("Docs Content", "Markdown / MDX"))
        elif "shell" in lang or "bash" in lang:
            core_modules.append(("Shell Scripts", "Automation"))
        elif "jupyter" in lang:
            core_modules.append(("Notebooks", "Data science"))
        else:
            core_modules.append((l["node"]["name"], "Library"))

    if not core_modules:
        core_modules = [("Curated Content", "Markdown list")]

    if "awesome" in name.lower():
        output_label = "Curated README"
    elif "toolkit" in name.lower() or "scanner" in name.lower():
        output_label = "Scan Report"
    elif "loader" in name.lower():
        output_label = "Validated Model"
    elif "writeups" in name.lower():
        output_label = "Blog Posts"
    elif "rooting" in name.lower() or "reverse" in name.lower():
        output_label = "Walkthrough Docs"
    elif "hunting" in name.lower() or name.lower().startswith("ou-"):
        output_label = "Vulnerability PoCs"
    elif "esp32" in name.lower() or "harness" in name.lower():
        output_label = "Firmware Artifact"
    else:
        output_label = "Reports / Output"

    width, height = 1080, 440
    box_w, box_h = 200, 88
    layers = [
        [("Input", "User Input / API"), ("CLI / GUI", f"{name} Entry")],
        [(label, desc) for label, desc in core_modules],
        [(output_label, "Result / Artifact")],
    ]
    layer_y_starts = [40, 180, 340]

    svg_parts = [
        f'<svg viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="architecture diagram">',
        '<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">'
        '<path d="M0 0 L10 5 L0 10 Z" fill="rgba(234,234,234,0.45)</marker</defs>',
        f'<rect width="{width}" height="{height}" fill="transparent"/>',
    ]

    for li, layer in enumerate(layers):
        y = layer_y_starts[li]
        n = len(layer)
        gap = 30
        total_w = n * box_w + (n - 1) * gap
        start_x = (width - total_w) // 2
        for i, (title, desc) in enumerate(layer):
            x = start_x + i * (box_w + gap)
            if li == 0:
                fill = "rgba(0,212,170,0.10)"
                stroke = "#00d4aa"
            elif li == 1:
                fill = "rgba(106,149,216,0.08)"
                stroke = "#6a95d8"
            else:
                fill = "rgba(215,175,92,0.10)"
                stroke = "#d3ad7a"
            svg_parts.append(
                f'<g><rect x="{x}" y="{y}" width="{box_w}" height="{box_h}" rx="4" ry="4" '
                f'fill="{fill}" stroke="{stroke}" stroke-width="1.2"/>'
                f'<text x="{x + box_w // 2}" y="{y + 34}" fill="#eaeaea" font-size="13" '
                f'font-weight="600" text-anchor="middle" font-family="Geist, sans-serif">{title}</text>'
                f'<text x="{x + box_w // 2}" y="{y + 56}" fill="#8a8a9e" font-size="10" '
                f'font-family="Geist Mono, monospace" text-anchor="middle">{desc}</text></g>'
            )
        # arrows to next layer
        if li < len(layers) - 1:
            next_y = layer_y_starts[li + 1]
            nx_n = len(layers[li + 1])
            nx_total = nx_n * box_w + (nx_n - 1) * gap
            nx_start = (width - nx_total) // 2
            for i in range(n):
                cx = start_x + i * (box_w + gap) + box_w // 2
                nearest_i = min(
                    range(nx_n),
                    key=lambda j: abs((nx_start + j * (box_w + gap) + box_w // 2) - cx),
                )
                nx = nx_start + nearest_i * (box_w + gap) + box_w // 2
                svg_parts.append(
                    f'<line x1="{cx}" y1="{y + box_h}" x2="{nx}" y2="{next_y}" '
                    f'stroke="rgba(234,234,234,0.25)" stroke-width="1" marker-end="url(#arrow)"/>'
                )

    svg_parts.append("</svg>")
    return "\n".join(svg_parts)


def main():
    rows = []
    jsonl_path = pathlib.Path("/tmp/repo_meta.jsonl")
    if not jsonl_path.exists():
        print("No metadata file found at /tmp/repo_meta.jsonl")
        return
    with open(jsonl_path) as fh:
        for line in fh:
            line = line.strip()
            if not line:
                continue
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError:
                continue

    rows = [r for r in rows if "name" in r]
    rows.sort(key=lambda r: (-r.get("stargazerCount", 0), r.get("updatedAt", "")))

    for r in rows:
        name = r["name"]
        desc = r.get("description", "(no description)")
        stars = r.get("stargazerCount", 0)
        created = r.get("createdAt", "")[:10]
        updated = r.get("updatedAt", "")[:10]
        langs = r.get("languages", [])
        lang_summary = ", ".join(l["node"]["name"] for l in langs) or "—"
        topics = r.get("repositoryTopics", []) or []
        tags = " ".join(f"<span>{t['name']}</span>" for t in topics)
        svg = make_svg(langs, name)
        html = HTML_TEMPLATE.format(
            title=name,
            stars=stars,
            langs=lang_summary,
            created=created,
            updated=updated,
            desc=desc,
            tags=tags,
            svg=svg,
        )
        out_file = OUT_DIR / f"repo-{name}.html"
        out_file.write_text(html)
        print(f"✓ generated {out_file}")

    print("\nDone.")


if __name__ == "__main__":
    main()
