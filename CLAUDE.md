# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual (English/Spanish) personal blog and portfolio built with Next.js 15 App Router. Content is authored in MDX and processed by Velite. The site lives at asanchezyali.com.

## Commands

```bash
yarn dev          # Start dev server (Velite watches content automatically)
yarn build        # Production build (Velite + Next.js + RSS post-build)
yarn serve        # Start production server
yarn lint         # ESLint with auto-fix
yarn format       # Prettier formatting
yarn analyze      # Bundle size analysis
```

**Package manager:** Yarn 4.0.2 (do not use npm). Node >= 20.

## Architecture

### Content Pipeline

1. MDX files live in `data/blog/{en,es}/` and `data/authors/{en,es}/`
2. **Velite** (`velite.config.ts`) processes MDX at build time, applying remark/rehype plugins (math/KaTeX, GFM, Prism syntax highlighting, citations)
3. Output goes to `.velite/` directory — imported in code via the `#site/content` path alias
4. Post-build script (`scripts/postbuild.mjs`) generates RSS feeds per locale and per tag
5. Tag counts are written to `app/[locale]/tag-data.json` during Velite's `prepare` phase

### Internationalization (i18n)

- Two locales: `en` (default/fallback), `es`
- URL structure: `/blog/...` (English, no prefix), `/es/blog/...` (Spanish)
- `middleware.ts` handles locale detection — redirects `/en/...` to `/...` and rewrites unprefixed URLs to `/en/...` internally
- All pages are under `app/[locale]/`
- Translation JSON files: `app/[locale]/i18n/locales/{en,es}/*.json`
- i18n settings: `app/[locale]/i18n/settings.ts`

### Key Path Aliases (tsconfig.json)

- `@/components/*`, `@/data/*`, `@/layouts/*`, `@/css/*`, `@/lib/*` — standard imports
- `#site/content` — Velite-generated content (posts, authors)

### Blog Post Frontmatter

Required fields: `title`, `date`, `language` (`en`|`es`), `authors` (slug array). Optional: `tags`, `summary`, `draft`, `featured`, `series` ({title, order}), `headerImage`, `layout` (PostLayout|PostSimple|PostBanner), `bibliography`, `canonicalUrl`.

### Page Layouts

Layout components in `layouts/`: `PostLayout` (default blog post), `PostSimple`, `PostBanner`, `ListLayout` (blog listing with tag filtering and pagination), `HomeLayout`, `AuthorLayout`. Blog posts specify their layout in frontmatter.

### Search

KBar-based command palette. Reads from `search.json` generated at build time. Configuration in `data/siteMetadata.js`.

### Styling & Component System

Tailwind CSS 3 with class-based dark mode. Custom theme colors defined in `tailwind.config.js`. Typography plugin for prose content. Prettier plugin auto-sorts Tailwind classes.

**shadcn/ui** component primitives in `components/ui/` — built on Radix UI + CVA + tailwind-merge:
- `button.tsx` — variants: default, destructive, outline, secondary, ghost, link, gradient, shimmer. Supports `asChild` for polymorphic rendering
- `badge.tsx` — variants: default, secondary, destructive, outline, tag
- `input.tsx`, `textarea.tsx`, `label.tsx`, `checkbox.tsx` — form primitives
- `dialog.tsx` — modal dialogs (Radix Dialog)
- `sheet.tsx` — side panels (Radix Dialog, used for contact form, QR code, mobile nav)
- `card.tsx` — Card/CardHeader/CardTitle/CardDescription/CardContent/CardFooter
- `separator.tsx` — horizontal/vertical dividers
- `dropdown-menu.tsx` — menus with radio groups (Radix DropdownMenu, used for theme switch, language switch, authors menu)

**Utility:** `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class merging.

**CSS Variables:** `css/tailwind.css` defines HSL-based CSS variables in `:root` and `.dark` for background, foreground, card, popover, muted, accent, destructive, border, ring, primary, secondary. Gradient colors available as `--gradient-from` (#30c5d2) and `--gradient-to` (#9821e2).

**Configuration:** `components.json` at project root configures shadcn/ui (New York style, RSC enabled, CSS variables).

### Site Configuration

`data/siteMetadata.js` — central config for site title, social links, analytics (Google Analytics), comments (Giscus), newsletter (Buttondown), search provider, and Formspree contact forms.

## Code Conventions

- Semicolons off, single quotes, 100-char print width (Prettier config)
- Server components by default; mark client components with `'use client'`
- SVGs imported as React components via `@svgr/webpack`
- Pre-commit hooks (Husky + lint-staged) run ESLint and Prettier on staged files
