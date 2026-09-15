'use client'

import { useState } from 'react'

interface SolutionSetProps {
  /** Single equation a[0]·x₁ + a[1]·x₂ = b, so the solution set is a line in R². */
  a?: [number, number]
  b?: number
  labels?: {
    hint?: string
    minimal?: string
    norm?: string
    check?: string
    reset?: string
    particular?: string
  }
}

const SIZE = 320
const RANGE = 4

export default function SolutionSet({ a = [1, 2], b = 4, labels = {} }: SolutionSetProps) {
  const [c, setC] = useState(1.2)

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const aNorm2 = a[0] * a[0] + a[1] * a[1]
  // Minimum-norm solution: the row space representative, A^T(AA^T)^-1 b.
  const xStar: [number, number] = [(a[0] * b) / aNorm2, (a[1] * b) / aNorm2]
  // Null space of a 1x2: the direction orthogonal to a, normalised.
  const n: [number, number] = [a[1] / Math.sqrt(aNorm2), -a[0] / Math.sqrt(aNorm2)]

  const x: [number, number] = [xStar[0] + c * n[0], xStar[1] + c * n[1]]
  const normX = Math.hypot(...x)
  const normStar = Math.hypot(...xStar)
  const residual = a[0] * x[0] + a[1] * x[1] - b
  const atMin = Math.abs(c) < 0.06

  // The solution line, clipped generously to the viewport.
  const far = RANGE * 2
  const p1: [number, number] = [xStar[0] - far * n[0], xStar[1] - far * n[1]]
  const p2: [number, number] = [xStar[0] + far * n[0], xStar[1] + far * n[1]]

  const ticks: number[] = []
  for (let i = -RANGE; i <= RANGE; i++) if (i !== 0) ticks.push(i)

  return (
    <div className="sset">
      <div className="sset-canvas">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={labels.hint ?? 'Solution set'}>
          <clipPath id="sset-clip">
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

          <g clipPath="url(#sset-clip)">
            {/* every point of this line satisfies A x = b */}
            <line
              className="sset-line"
              x1={toX(p1[0])}
              y1={toY(p1[1])}
              x2={toX(p2[0])}
              y2={toY(p2[1])}
            />
            {/* the minimum-norm solution is the foot of the perpendicular from the origin */}
            <line
              className="sset-perp"
              x1={toX(0)}
              y1={toY(0)}
              x2={toX(xStar[0])}
              y2={toY(xStar[1])}
            />
            <line className="sset-current" x1={toX(0)} y1={toY(0)} x2={toX(x[0])} y2={toY(x[1])} />
          </g>

          <circle className="sset-star" cx={toX(xStar[0])} cy={toY(xStar[1])} r={5.5} />
          <circle className="sset-dot" cx={toX(x[0])} cy={toY(x[1])} r={6} />
        </svg>
      </div>

      <div className="sset-controls">
        <p className="dvec-hint">{labels.hint ?? 'Every point on the line solves the system.'}</p>

        <label className="mplay-slider">
          <span className="mplay-name">c</span>
          <input
            type="range"
            min={-3}
            max={3}
            step={0.05}
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
            aria-label="c"
          />
          <span className="mplay-val">{c.toFixed(2)}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          <strong>x</strong> = ({x[0].toFixed(2)}, {x[1].toFixed(2)})
        </p>
        <p className="mplay-readout">
          {labels.check ?? 'A·x − b'} = {residual.toExponential(0)}
        </p>
        <p className={`sset-norm ${atMin ? 'is-min' : ''}`} aria-live="polite">
          {labels.norm ?? '‖x‖'} = {normX.toFixed(3)}
          {atMin && <em> · {labels.minimal ?? 'minimum'}</em>}
        </p>
        <div className="cond-bar" aria-hidden="true">
          <span
            className={atMin ? 'is-min' : undefined}
            style={{ width: `${Math.min(100, (normX / (normStar + 3)) * 100)}%` }}
          />
        </div>
        <p className="cs-note">
          {labels.particular ??
            '‖x‖² = ‖x*‖² + c², so the minimum sits where x is orthogonal to the null space.'}
        </p>

        <button className="mplay-reset" type="button" onClick={() => setC(1.2)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
