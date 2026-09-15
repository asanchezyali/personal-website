'use client'

import { useState } from 'react'

type Row = [number, number, number]

interface LinearSystem2DProps {
  /** First equation as [a, b, c] meaning a·x₁ + b·x₂ = c. */
  first?: Row
  /** Second equation. */
  second?: Row
  range?: number
  labels?: {
    hint?: string
    unique?: string
    none?: string
    infinite?: string
    solution?: string
    reset?: string
  }
}

const SIZE = 320
const EPS = 1e-9

const fmt = (n: number) => {
  const v = Object.is(n, -0) ? 0 : n
  return Number.isInteger(v) ? String(v) : v.toFixed(2).replace(/0$/, '')
}

/** Endpoints of a·x + b·y = c clipped to the square [-R, R]². */
function segment(a: number, b: number, c: number, R: number) {
  if (Math.abs(b) > EPS) {
    return [
      [-R, (c + a * R) / b],
      [R, (c - a * R) / b],
    ] as const
  }
  if (Math.abs(a) > EPS) {
    const x = c / a
    return [
      [x, -R],
      [x, R],
    ] as const
  }
  return null
}

export default function LinearSystem2D({
  first = [1, 1, 1.25],
  second = [1, -2, 0.5],
  range = 3,
  labels = {},
}: LinearSystem2DProps) {
  const [r1, setR1] = useState<Row>(first)
  const [r2, setR2] = useState<Row>(second)

  const half = SIZE / 2
  const unit = half / range
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const [a1, b1, c1] = r1
  const [a2, b2, c2] = r2

  const det = a1 * b2 - a2 * b1
  const singular = Math.abs(det) < 1e-6

  // Rank of the coefficient matrix and of the augmented one decide the regime.
  const rowsProportional =
    Math.abs(a1 * b2 - a2 * b1) < 1e-6 &&
    Math.abs(a1 * c2 - a2 * c1) < 1e-6 &&
    Math.abs(b1 * c2 - b2 * c1) < 1e-6

  const solution = singular
    ? null
    : ([(c1 * b2 - c2 * b1) / det, (a1 * c2 - a2 * c1) / det] as const)

  const verdict = !singular
    ? { key: 'unique', text: labels.unique ?? 'One solution — the lines cross once.' }
    : rowsProportional
      ? { key: 'infinite', text: labels.infinite ?? 'Infinitely many — the two lines coincide.' }
      : { key: 'none', text: labels.none ?? 'No solution — the lines are parallel.' }

  const s1 = segment(a1, b1, c1, range * 1.6)
  const s2 = segment(a2, b2, c2, range * 1.6)

  const ticks: number[] = []
  for (let i = -range; i <= range; i++) if (i !== 0) ticks.push(i)

  const set = (which: 0 | 1, i: number, v: number) => {
    const target = which === 0 ? [...r1] : [...r2]
    target[i] = v
    ;(which === 0 ? setR1 : setR2)(target as Row)
  }

  const slider = (which: 0 | 1, i: number, name: string, value: number) => (
    <label key={`${which}${i}`} className="mplay-slider">
      <span className="mplay-name">{name}</span>
      <input
        type="range"
        min={-3}
        max={3}
        step={0.25}
        value={value}
        onChange={(e) => set(which, i, Number(e.target.value))}
        aria-label={name}
      />
      <span className="mplay-val">{fmt(value)}</span>
    </label>
  )

  const eq = (a: number, b: number, c: number) =>
    `${fmt(a)}·x₁ ${b < 0 ? '−' : '+'} ${fmt(Math.abs(b))}·x₂ = ${fmt(c)}`

  return (
    <div className="lsys">
      <div className="lsys-canvas">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={labels.hint ?? 'Two lines in the plane'}>
          <clipPath id="lsys-clip">
            <rect x={0} y={0} width={SIZE} height={SIZE} />
          </clipPath>

          {ticks.map((k) => (
            <g key={k}>
              <line className="vplot-grid" x1={toX(k)} y1={0} x2={toX(k)} y2={SIZE} />
              <line className="vplot-grid" x1={0} y1={toY(k)} x2={SIZE} y2={toY(k)} />
            </g>
          ))}
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          <g clipPath="url(#lsys-clip)">
            {s1 && (
              <line
                className="lsys-line"
                x1={toX(s1[0][0])}
                y1={toY(s1[0][1])}
                x2={toX(s1[1][0])}
                y2={toY(s1[1][1])}
                stroke="var(--vp-a)"
              />
            )}
            {s2 && (
              <line
                className="lsys-line"
                x1={toX(s2[0][0])}
                y1={toY(s2[0][1])}
                x2={toX(s2[1][0])}
                y2={toY(s2[1][1])}
                stroke="var(--vp-b)"
              />
            )}
          </g>

          {solution && Math.abs(solution[0]) <= range && Math.abs(solution[1]) <= range && (
            <circle
              className="lsys-dot"
              cx={toX(solution[0])}
              cy={toY(solution[1])}
              r={6}
            />
          )}
        </svg>
      </div>

      <div className="lsys-controls">
        <p className="dvec-hint">{labels.hint ?? 'Move the coefficients and watch the lines.'}</p>

        <p className="lsys-eq" style={{ color: 'var(--vp-a)' }}>{eq(a1, b1, c1)}</p>
        <div className="lsys-row">
          {slider(0, 0, 'a₁', a1)}
          {slider(0, 1, 'b₁', b1)}
          {slider(0, 2, 'c₁', c1)}
        </div>

        <p className="lsys-eq" style={{ color: 'var(--vp-b)' }}>{eq(a2, b2, c2)}</p>
        <div className="lsys-row">
          {slider(1, 0, 'a₂', a2)}
          {slider(1, 1, 'b₂', b2)}
          {slider(1, 2, 'c₂', c2)}
        </div>

        <p className={`lsys-verdict is-${verdict.key}`} aria-live="polite">
          {verdict.text}
        </p>
        <p className="mplay-readout">
          det = {fmt(det)}
          {solution && (
            <>
              {'  ·  '}
              {labels.solution ?? 'x'} = ({fmt(solution[0])}, {fmt(solution[1])})
            </>
          )}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setR1(first)
            setR2(second)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
