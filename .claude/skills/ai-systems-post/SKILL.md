---
name: ai-systems-post
description: Write a high-impact, long-form (20+ minute) post for asanchezyali.com on AI systems or software engineering — rigorous, sourced, with an original measurement, diagrams and interactive MDX figures. Use when the user asks for a deep website post, an "AI system architecture" post, a post "de alto impacto", or the next entry of the AI-systems series. Not for LinkedIn PDFs (linkedin-post) or Instagram (instagram-carousel).
---

# Long-form AI-systems posts for asanchezyali.com

The bar: a post an AI engineer bookmarks and links to as *the* reference on its question.
The structure below comes from studying the posts that reached that bar (benchmarks at the end).
Two findings drive everything:

- **Length does not create reach; a reusable framework does.** Long posts spread when they
  become reference documents: one system map, one repeated section template, headings that are claims.
- **Original data or a mechanism-level insight is what gets shared**, more than polish.
  Every post carries at least one measurement the author ran.

## Inputs this skill relies on

| Need | Where |
|---|---|
| Truth discipline (claims ledger, verification gate) | `../writer/references/sourcing-and-verification.md` (path from `Own/`: `writer/references/...`) |
| Author voice and facts | `writer/references/author-profile.md`, `technical-resume/data/resume-master.json` |
| Static diagrams (SVG → 2x PNG) | `.claude/skills/svg-diagram` in this repo |
| Final prose pass | `humanize-writing-es` (Spanish) / `humanize-writing-en` (English) |
| Research workspace | `Own/writer/articles/<slug>/` (brief, research ledger, `codes/` with measurement scripts) |

Honesty rules that always apply: his products are **built and deployed, no real users yet** —
never "in production" or "serving customers". Never name the confidential consulting client.

## Workflow (gates in bold)

1. **Brief** → `writer/articles/<slug>/brief.md`: the question, the one-sentence thesis, the
   audience (AI/software engineers), the original measurement you will run. **No thesis, no draft.**
2. **Research** → `research.md` claims ledger. Delegate primary-source verification to a subagent
   (exact quotes, URLs, BibTeX-grade metadata). Vendor numbers are labelled "self-reported" in prose.
   **Every number has a primary source and a date.**
3. **Measure** → a dependency-free script in `codes/`, run it, paste the real output into the ledger.
   Good sources: his own repos (Plixiq, talking-avatar), a seeded simulation, a benchmark he runs.
4. **Outline** against the structure below. Show it if the user is around; otherwise proceed.
5. **Components** → reuse the kit; build a new interactive only when it teaches one cause→effect
   the prose cannot. New code is fully English; Spanish text enters through `labels` props.
6. **Draft** at `content/blog/<lang>/ai-systems/<YYYYMMDD><PascalSlug>.mdx` with `draft: true`.
7. **Verify**: `yarn build` passes; open the page (light, dark, ~390 px mobile); every figure numbered
   and referenced; every footnote resolves.
8. **Humanize** with the language's skill, then **run `kairos/bin/spanish-marks <post.mdx>` (Spanish)
   until it prints ✓**. Every question opens with ¿ and every exclamation with ¡, including questions
   used as labels or lead-ins: write `**¿Qué necesitas saber?** Qué es un LLM…`, never
   `**Qué necesitas saber:** …`. If a phrase starting with Qué/Cómo/Cuándo/Dónde/Cuánto/Cuál/Por qué is
   a question, it gets ¿ … ?, not a colon. For labels that are not questions (table headers, captions),
   use a noun instead of an interrogative: "Solución", not "Qué hacer". He has flagged this more than once (3-oct and 11-nov-2026).
9. **User review** → he flips `draft: false`. Then adapt (not translate) to the other language and
   write a short LinkedIn teaser (caption voice: study notes, ~90 words, 5 hashtags).

## The structure (4,000–5,000 words of prose ≈ 20+ min with figures)

0. **Frontmatter** — title states a claim or a stake; `series: { title, order }`; `summary` = thesis;
   `tags`; `layout: PostLayout`; `draft: true`.
1. **Hook (150–250 words)** — a concrete stake: a number from his own system, a cost, a failure.
   Never a definition. Never "In today's fast-paced world".
2. **Thesis + map** — the thesis in one sentence; `<SystemMap />` of the whole system (it is the
   table of contents); prerequisites; what the reader can do after.
3. **The ladder (5–7 H2 sections)** — start from the simplest version (a demo that calls a model) and
   add one component per section *because the previous version visibly broke*. Same template each time:
   - **Heading = a claim** someone could quote alone ("Un fallback es otro modelo").
   - **The failure** of the previous version (figure or interactive).
   - **The mechanism**, intuition → diagram → numbers/math → short code.
   - **Trade-offs and when NOT to use it.**
   - **`<Aside>`** with the sceptical reader's objection, answered.
   - **`<SystemMap highlight="…" />`** again, so the reader knows where they are (not every section).
4. **One request, end to end** — trace a single request with a latency/cost budget
   (`<LatencyBudget />` or a post-specific interactive). Synchronous vs async, stateful vs stateless.
5. **Failure modes** — table: symptom | cause | fix.
6. **The reusable framework** — a checklist or decision rule. This is what people share.
7. **Limits and methodology** — how the measurement was taken, what it does not show, what was left out.
8. **References** — GFM footnotes `[^key]` (numbered, back-linked, styled by `.footnotes`).
   Primary sources first: papers, official docs, specs, repos. 10–20 per post.
9. **CTA** — the series' next post, `/consultoria`, newsletter.

## Visual budget per post

- 1 `SystemMap`, repeated 3–4 times with `highlight`.
- 4–6 diagrams (svg-diagram skill → `ImageBox`) or interactives.
- **2–4 interactives** that obey: the reader manipulates data, not code; one figure = one idea;
  good presets + a reset; predict-before-reveal where possible (`CodeShare`); a static reading still
  makes sense on mobile.
- 1–2 tables, 3–6 short code blocks (the full scripts live in `writer/articles/<slug>/codes/`, run).
- Wrap every figure in `<Figure n={k} label="Figura" caption="…">` and cite it as "la figura k".

## Component kit (registered in `src/shared/mdx/components/index.tsx`)

| Component | Use |
|---|---|
| `<Figure n label caption>` | Numbered caption around any diagram/interactive |
| `<Aside title tone="note"/"warn">` | Reader objection or trap, inline |
| `<SystemMap highlight layers side narrow labels>` | Layered system map; click a layer for details. Pass Spanish `layers`/`side` |
| `<CodeShare buckets answer exactLines labels>` | Predict-then-reveal bar chart of where code (or time, or cost) lives |
| `<LatencyBudget labels>` | Waterfall of one chat request: guards, retrieval, prefill, decode, cache, fallback |
| `ImageBox`, `MathBox`, `Reference`, `KVCacheCost`, `ScalingLaw`, … | Existing kit |

Styles live at the end of `styles/pages.css` (`.fig`, `.smap`, `.cshare`, `.lbud`), using the site
tokens (`--vp-a…d`, `--g-*`, `--fg`), so light/dark work for free.

## Rigor checklist (the draft does not leave `draft: true` without it)

- [ ] Thesis in one sentence, stated in the first 300 words.
- [ ] One original measurement, with method and script.
- [ ] Every number: primary source + date; vendor numbers marked self-reported.
- [ ] Every quote exact; every paper cited by its venue, not a blog summary.
- [ ] Trade-offs and "when not to" in every ladder section.
- [ ] Failure-mode table and reusable checklist present.
- [ ] Code runs; output pasted is the real output.
- [ ] `yarn build` passes; page checked in light, dark and mobile.
- [ ] Humanizer pass done; `kairos/bin/spanish-marks` prints ✓ (¿ ¡ everywhere, including question-labels).

## Benchmarks (verified 2026-11-11; HN = Hacker News points)

- Anthropic, *Building effective agents* (2024) — 763 HN; patterns simple → complex, one diagram each, "when not to".
- Eugene Yan, *Patterns for Building LLM-based Systems & Products* (2023) — 436 HN; same template per pattern.
- Chip Huyen, *Building A Generative AI Platform* (2024) — the system diagram grows one component per step.
- Simon Willison, *Things we learned about LLMs in 2024* — 984 HN; every heading a claim, 268 links.
- Sam Rose, *Load Balancing* (2023) — 1,143 HN; each algorithm exists because the last failed on screen.
- Sam Rose, *Prompt caching* (ngrok, 2025) — 306 HN; cost hook, recurring "you are here" diagram.
- Bartosz Ciechanowski, *GPS* (2022) — 2,900 HN; ~40 interactives, a ladder where each step fixes the last.
- Discord, *How Discord Stores Trillions of Messages* (2023) — 435 HN; before/after production numbers.
- Distill, *Communicating with Interactive Articles* (2020) — rules for interactives (predict, then reveal; not everything needs interaction).

## Series: AI system architecture (Spanish first)

1. *El modelo es la caja más pequeña* — layers, Sculley measured on Plixiq, latency budget, fallback tails.
2. *Un mensaje de chat, de punta a punta* — gateway, RAG, session state, async telemetry; fallback-chain simulator.
3. *Los guardrails son arquitectura* — evals as canaries, deploy gates, agent limits; cache-threshold interactive.
