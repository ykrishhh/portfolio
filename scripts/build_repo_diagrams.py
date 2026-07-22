#!/usr/bin/env python3
"""Generate interactive architecture diagrams for all top-starred repos."""

import json
import pathlib
import shutil

WORK = pathlib.Path("/tmp")
DIAGRAM_SVG_TEMPLATES = """
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{title} – Architecture</title>
  <style>
    :root{{ --paper:#050510; --paper-2:#0d0d1a; --ink:#eaeaea; --muted:#8a8a9e;
      --rule:rgba(234,234,234,0.12); --accent:#00d4aa; --link:#6a95d8; }}
    *{{ box-sizing:border-box; margin:0; padding:0; }}
    body{{ background:var(--paper); color:var(--ink);
      font-family:'Geist',system-ui,-apple-system,sans-serif;
      padding:2rem; line-height:1.5; }}
    h1{{ font-family:'Instrument Serif',serif; font-size:2rem;
      letter-spacing:-0.02em; margin-bottom:.5rem; }}
    .meta{{ font-family:'Geist Mono',monospace; font-size:11px;
      color:var(--muted); margin-bottom:1rem; }}
    .grid{{ display:grid; grid-template-columns:repeat(auto-fit,minmax(360px,1fr));
      gap:1.2rem; margin-top:1.5rem; }}
    .card{{ background:var(--paper-2); border:1px solid var(--rule);
      border-radius:4px; padding:1rem; }}
    .card h2{{ font-size:1rem; margin-bottom:.75rem; color:var(--accent);
      font-family:'Geist Mono',monospace; text-transform:uppercase;
      letter-spacing:.1em; }}
    .card svg{{ width:100%; height:auto; }}
    dialog{{ background:var(--paper-2); color:var(--ink);
      border:1px solid var(--accent); border-radius:6px;
      padding:1.5rem; max-width:480px; }}
    dialog::backdrop{{ background:rgba(0,0,0,0.7); }}
    dialog h3{{ color:var(--accent); margin-bottom:.5rem;
      font-family:'Geist Mono',monospace; }}
    dialog p{{ font-size:14px; color:var(--muted); }}
    dialog button{{ background:var(--accent); color:var(--paper);
      border:0; padding:.5rem 1rem; border-radius:3px;
      font-family:'Geist Mono',monospace; margin-top:1rem; cursor:pointer; }}
    a.back{{ color:var(--muted); text-decoration:none;
      font-family:'Geist Mono',monospace; font-size:11px; }}
    .node{{ cursor:pointer; transition:filter .2s ease; }}
    .node:hover{{ filter:drop-shadow(0 0 8px var(--accent)); }}
    .node text{{ font-family:'Geist',sans-serif; fill:var(--ink); }}
    .node-label{{ font-family:'Geist Mono',monospace; font-size:9px;
      fill:var(--muted); }}
  </style>
</head>
<body>
  <a class="back" href="../../README.md">← Back to README</a>
  <h1>{title} – Architecture</h1>
  <div class="meta">★ {stars} · {langs} · created {created} · updated {updated}</div>
  <p>{desc}</p>
  <div class="grid">
    <div class="card"><h2>Architecture</h2>{svg_arch}</div>
    <div class="card"><h2>Components</h2>{svg_comp}</div>
    <div class="card"><h2>Data Flow</h2>{svg_flow}</div>
    <div class="card"><h2>Hybrid</h2>{svg_hybrid}</div>
  </div>
  <dialog id="node-modal"><h3 id="modal-title"></h3><p id="modal-desc"></p><button onclick="document.getElementById('node-modal').close()">Close</button></dialog>
  <script>
    function showNode(title, desc){{
      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-desc').textContent = desc;
      document.getElementById('node-modal').showModal();
    }}
    document.querySelectorAll('[data-node]').forEach(n=>{{
      n.addEventListener('click', ()=>showNode(n.dataset.title, n.dataset.desc));
    }});
  </script>
</body>
</html>
"""


def make_nodes(layers, width=320, height=70):
    """Generate a list of node dicts from layers."""
    nodes = []
    y = 20
    gap_y = 110
    for i, layer in enumerate(layers):
        n = len(layer)
        total_w = n * width + (n - 1) * 20
        start_x = (940 - total_w) // 2
        for j, (title, desc) in enumerate(layer):
            x = start_x + j * (width + 20)
            nodes.append(
                {
                    "id": f"n{i}{j}",
                    "title": title,
                    "desc": desc,
                    "x": x,
                    "y": y + i * gap_y,
                    "width": width,
                    "height": 70,
                }
            )
    return nodes


def svg_from_nodes(nodes, title):
    parts = [
        f'<svg viewBox="0 0 940 460" xmlns="http://www.w3.org/2000/svg">',
        f"<title>{title}</title>",
        '<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">'
        '<path d="M0 0 L10 5 L0 10 Z" fill="rgba(234,234,234,0.45)"/></marker></defs>',
        '<rect width="940" height="460" fill="transparent"/>',
    ]
    colors = ["#00d4aa", "#6a95d8", "#d3ad7a"]
    # Draw arrows first
    for i, n in enumerate(nodes):
        for j, m in enumerate(nodes):
            if n["y"] < m["y"] and abs(n["x"] - m["x"]) < 200:
                parts.append(
                    f'<line x1="{n["x"] + n["width"] // 2}" y1="{n["y"] + n["height"]}" '
                    f'x2="{m["x"] + m["width"] // 2}" y2="{m["y"]}" '
                    f'stroke="rgba(234,234,234,0.25)" stroke-width="1" marker-end="url(#arr)"/>'
                )
    # Draw nodes
    for i, n in enumerate(nodes):
        idx = i // max(1, len(nodes) // 3)
        stroke = colors[min(idx, 2)]
        parts.append(
            f'<g class="node" data-node data-title="{n["title"]}" data-desc="{n["desc"]}">'
            f'<rect x="{n["x"]}" y="{n["y"]}" width="{n["width"]}" height="{n["height"]}" '
            f'rx="4" ry="4" fill="rgba(0,212,170,0.06)" stroke="{stroke}" stroke-width="1.2"/>'
            f'<text x="{n["x"] + n["width"] // 2}" y="{n["y"] + 28}" text-anchor="middle" '
            f'font-size="13" font-weight="600" fill="#eaeaea">{n["title"]}</text>'
            f'<text x="{n["x"] + n["width"] // 2}" y="{n["y"] + 48}" text-anchor="middle" '
            f'font-size="10" fill="#8a8a9e" class="node-label">{n["desc"]}</text>'
            f"</g>"
        )
    parts.append("</svg>")
    return "\n".join(parts)


def make_diagrams(name, desc, langs):
    arch = make_nodes(
        [
            [("Input", "User / API Entry")],
            [("Core Engine", f"{name} logic")],
            [("Output", "Reports / Artifacts")],
        ]
    )
    comp = make_nodes(
        [
            [("CLI", "Entry"), ("Config", "YAML/JSON")],
            [("Parser", "Load input"), ("Logic", desc[:25])],
            [("Storage", "Cache/DB"), ("Logger", "Audit trail")],
        ]
    )
    flow = make_nodes(
        [
            [("Start", "Init")],
            [("Read", "Input"), ("Process", f"{name} {langs[0] if langs else 'core'}")],
            [("Emit", "Result")],
        ]
    )
    hybrid = make_nodes(
        [
            [("User", "Operator")],
            [("Auth", "Session"), ("Logic", "Main"), ("DB", "State")],
            [("Report", "Output"), ("Audit", "Log")],
        ]
    )
    return (
        svg_from_nodes(arch, "Architecture"),
        svg_from_nodes(comp, "Components"),
        svg_from_nodes(flow, "Data Flow"),
        svg_from_nodes(hybrid, "Hybrid"),
    )


def main():
    repo_meta = []
    meta_path = (
        "/tmp/all_repo_meta.jsonl"
        if pathlib.Path("/tmp/all_repo_meta.jsonl").exists()
        else "/tmp/repo_meta.jsonl"
    )
    with open(meta_path) as fh:
        for line in fh:
            line = line.strip()
            if not line:
                continue
            try:
                r = json.loads(line)
                if "name" in r:
                    repo_meta.append(r)
            except:
                pass

    results = []
    for r in repo_meta:
        name = r["name"]
        path = WORK / name
        if not path.exists():
            continue
        docs = path / "docs" / "diagrams"
        docs.mkdir(parents=True, exist_ok=True)
        langs = [l["node"]["name"] for l in r.get("languages", [])]
        desc = r.get("description", "Architecture overview")
        svg_arch, svg_comp, svg_flow, svg_hybrid = make_diagrams(name, desc, langs)
        html = DIAGRAM_SVG_TEMPLATES.format(
            title=name,
            stars=r.get("stargazerCount", 0),
            langs=", ".join(langs) or "—",
            created=r.get("createdAt", "")[:10],
            updated=r.get("updatedAt", "")[:10],
            desc=desc,
            svg_arch=svg_arch,
            svg_comp=svg_comp,
            svg_flow=svg_flow,
            svg_hybrid=svg_hybrid,
        )
        out = path / "docs" / "architecture.html"
        out.write_text(html)
        results.append(f"{name}: {out}")
    print("\n".join(results))


if __name__ == "__main__":
    main()
