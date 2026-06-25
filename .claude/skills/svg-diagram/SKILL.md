---
name: svg-diagram
description: Create clean, on-brand architecture / flow / data-model diagrams as hand-authored SVG, then render them to crisp 2x PNGs for blog posts and docs. Use when a post or page needs a diagram (system architecture, request/message flow, ER/data model, pipeline) and Mermaid is unavailable or too auto-generated-looking. Renders via the system Chrome (Playwright on the fly) because next/image blocks raw SVG.
---

# SVG diagrams → PNG

Author diagrams **by hand as SVG** (boxes, text, arrows) and rasterize them to
**2x PNG**. This gives a designed-looking result with full control, versionable
in git, and editable as plain text — no Mermaid, Figma, or external service.

## When to use

- A blog post (`content/blog/**`) or page needs an architecture, message/data
  flow, pipeline, or ER/data-model diagram.
- You want it to look intentionally designed and match the site palette.

Not for: photos/screenshots (just capture those), or charts from real data
(use a charting lib).

## Workflow

1. **Plan the boxes and arrows.** List the components/steps and how they connect
   before drawing. For a request flow, trace one path end to end.

2. **Copy the template.** Start from `assets/template.svg`. Key rules:
   - Everything lives inside the `viewBox` (e.g. `0 0 920 560`); place boxes with
     absolute coords.
   - Style with the **CSS classes** in `<defs><style>`, not inline attributes —
     that's what keeps colors/radii consistent.
   - Use **one accent color + grays**. Pills/section labels in uppercase with
     `letter-spacing`. Rounded corners (`rx="12"`), thin borders.
   - Arrows are a reusable `<marker>` + `<path d="M x1,y1 L x2,y2" marker-end="url(#arr)"/>`.
   - Give the diagram its **own light backdrop** (`.bg` rect) so it reads in both
     light and dark site themes.
   - **Escape `&` as `&amp;`** inside `<text>` — a bare `&` breaks XML parsing.

3. **Render to PNG (2x):**
   ```bash
   node .claude/skills/svg-diagram/scripts/svg-to-png.mjs path/to/diagram.svg
   # or a whole folder:
   node .claude/skills/svg-diagram/scripts/svg-to-png.mjs public/images/<project>
   ```
   The script reads each SVG's `viewBox`, renders at 2x (override with `--scale 3`),
   and writes `<name>.png` beside the `.svg`. It warns on bare `&`.

4. **Eyeball every PNG.** Open the rendered PNG and check for overlaps, clipping,
   readability, and arrow targets. Iterate **edit → render → look → fix** — this
   pass is what makes it look polished. (If a render shows an XML error banner,
   it's almost always an unescaped `&`.)

5. **Embed the PNG, not the SVG.** `next/image` blocks raw SVG, so reference the
   PNG. In MDX posts use `ImageBox` with the SVG's viewBox dims:
   ```mdx
   <ImageBox src="/images/<project>/diagram.png" alt="..." width={920} height={560}>
     Caption explaining what the diagram shows.
   </ImageBox>
   ```

6. **Commit both** the `.svg` (editable source) and the `.png` (what's served).

## Conventions for this repo

- Put assets under `public/images/<project>/` (e.g. `public/images/plixiq/`).
- Reference the example diagrams already in the repo for style:
  `public/images/plixiq/{architecture,message-flow,data-model}.svg`.
- Diagrams keep a fixed light backdrop (don't theme them); reusable data
  components like `StackList` use the CSS theme variables instead.

## Files in this skill

- `assets/template.svg` — starter with the palette, classes, and arrow marker.
- `scripts/svg-to-png.mjs` — SVG → 2x PNG renderer (system Chrome via Playwright).
