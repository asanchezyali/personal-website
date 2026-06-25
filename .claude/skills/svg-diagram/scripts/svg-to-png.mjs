#!/usr/bin/env node
/**
 * svg-to-png — render hand-authored SVG diagrams to crisp PNGs.
 *
 * next/image refuses raw SVG, so we rasterize at 2x (retina) using the system
 * Chrome via Playwright. Because our SVGs declare only a viewBox (no fixed
 * width/height), they scale to fill the viewport — so rendering at 2x the
 * viewBox gives a sharp PNG.
 *
 * Usage:
 *   node svg-to-png.mjs <file.svg | dir> [more...] [--scale 2]
 *
 * Examples:
 *   node svg-to-png.mjs public/images/plixiq/architecture.svg
 *   node svg-to-png.mjs public/images/plixiq            # every .svg in the dir
 *   node svg-to-png.mjs diagrams --scale 3
 *
 * Output: <name>.png written next to each <name>.svg.
 * Requires: Google Chrome installed (Playwright is fetched on the fly via npx).
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync, readdirSync } from 'node:fs'
import { resolve, join, dirname, basename } from 'node:path'

const args = process.argv.slice(2)
let scale = 2
const inputs = []
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--scale') {
    scale = Number(args[++i]) || 2
  } else {
    inputs.push(args[i])
  }
}

if (inputs.length === 0) {
  console.error('Usage: node svg-to-png.mjs <file.svg | dir> [...] [--scale N]')
  process.exit(1)
}

// Expand directories into their .svg files.
const svgFiles = []
for (const input of inputs) {
  const abs = resolve(input)
  const st = statSync(abs)
  if (st.isDirectory()) {
    for (const f of readdirSync(abs)) {
      if (f.toLowerCase().endsWith('.svg')) svgFiles.push(join(abs, f))
    }
  } else if (abs.toLowerCase().endsWith('.svg')) {
    svgFiles.push(abs)
  } else {
    console.warn(`Skipping (not an .svg): ${input}`)
  }
}

if (svgFiles.length === 0) {
  console.error('No .svg files found.')
  process.exit(1)
}

function dimsFromViewBox(svg) {
  const m = svg.match(/viewBox\s*=\s*["']\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)/)
  if (!m) throw new Error('No viewBox found — add viewBox="0 0 W H" to the <svg>.')
  return { w: Math.round(Number(m[1])), h: Math.round(Number(m[2])) }
}

for (const svgPath of svgFiles) {
  const svg = readFileSync(svgPath, 'utf8')
  // Cheap guard against the most common SVG-breaks-XML mistake.
  // Ignore <!-- comments -->, where a bare "&" is harmless.
  const svgNoComments = svg.replace(/<!--[\s\S]*?-->/g, '')
  if (/&(?!amp;|lt;|gt;|quot;|apos;|#)/.test(svgNoComments)) {
    console.warn(`⚠ ${basename(svgPath)}: bare "&" found — escape it as &amp; or the render will error.`)
  }
  const { w, h } = dimsFromViewBox(svg)
  const out = join(dirname(svgPath), basename(svgPath).replace(/\.svg$/i, '.png'))
  const vw = w * scale
  const vh = h * scale
  console.log(`→ ${basename(svgPath)}  ${w}x${h} @${scale}x → ${vw}x${vh}`)
  execFileSync(
    'npx',
    [
      '--yes',
      'playwright@latest',
      'screenshot',
      '--channel',
      'chrome',
      '--viewport-size',
      `${vw},${vh}`,
      `file://${svgPath}`,
      out,
    ],
    { stdio: ['ignore', 'ignore', 'inherit'] }
  )
  console.log(`  ✓ ${out}`)
}

console.log(`\nDone — ${svgFiles.length} PNG(s). Now eyeball each one before shipping.`)
