'use client'

import { useState } from 'react'

interface SVDEllipseProps {
  a?: [number, number, number, number]
  labels?: {
    hint?: string
    circle?: string
    ellipse?: string
    volume?: string
    conditioning?: string
    singular?: string
    note?: string
    reset?: string
  }
}

const SIZE = 320
const RANGE = 4

/** Closed-form SVD of a 2x2 matrix, via the spectral decomposition of AᵀA. */
function svd2([a, b, c, d]: number[]) {
  const E = a * a + c * c
  const F = a * b + c * d
  const G = b * b + d * d
  const disc = Math.sqrt((E - G) * (E - G) + 4 * F * F)
  const s1 = Math.sqrt(Math.max((E + G + disc) / 2, 0))
  const s2 = Math.sqrt(Math.max((E + G - disc) / 2, 0))

  let v1: [number, number]
  if (Math.abs(F) > 1e-12) {
    const l1 = (E + G + disc) / 2
    const n = Math.hypot(F, l1 - E)
    v1 = [F / n, (l1 - E) / n]
  } else {
    v1 = E >= G ? [1, 0] : [0, 1]
  }
  const v2: [number, number] = [-v1[1], v1[0]]
  const mv = (v: [number, number]): [number, number] => [a * v[0] + b * v[1], c * v[0] + d * v[1]]
  const u1: [number, number] = s1 > 1e-12 ? (mv(v1).map((x) => x / s1) as [number, number]) : [1, 0]
  const u2: [number, number] =
    s2 > 1e-12 ? (mv(v2).map((x) => x / s2) as [number, number]) : [-u1[1], u1[0]]
  return { s1, s2, v1, v2, u1, u2 }
}

export default function SVDEllipse({ a = [2, 1, 0, 1.5], labels = {} }: SVDEllipseProps) {
  const [m, setM] = useState<number[]>(a)

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const { s1, s2, v1, v2, u1, u2 } = svd2(m)
  const det = m[0] * m[3] - m[1] * m[2]
  const kappa = s2 > 1e-12 ? s1 / s2 : Infinity

  // The image of the unit circle is an ellipse with semi-axes σ₁ and σ₂.
  const N = 96
  const circle: string[] = []
  const ellipse: string[] = []
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * 2 * Math.PI
    const x = Math.cos(t)
    const y = Math.sin(t)
    circle.push(`${toX(x)},${toY(y)}`)
    ellipse.push(`${toX(m[0] * x + m[1] * y)},${toY(m[2] * x + m[3] * y)}`)
  }

  const f = (n: number) => n.toFixed(2)
  const names = ['a', 'b', 'c', 'd']

  return (
    <div className="dvec">
      <div className="dvec-canvas">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img"
             aria-label={labels.hint ?? 'The unit circle maps to an ellipse with semi-axes the singular values'}>
          <clipPath id="sv-clip"><rect x={0} y={0} width={SIZE} height={SIZE} /></clipPath>
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          <g clipPath="url(#sv-clip)">
            <polyline className="sv-circle" points={circle.join(' ')} />
            <polyline className="sv-ellipse" points={ellipse.join(' ')} />

            {/* the right singular vectors, on the circle */}
            <line className="sv-v" x1={half} y1={half} x2={toX(v1[0])} y2={toY(v1[1])} />
            <line className="sv-v" x1={half} y1={half} x2={toX(v2[0])} y2={toY(v2[1])} />
            {/* their images: the semi-axes of the ellipse */}
            <line className="sv-u is-1" x1={half} y1={half}
                  x2={toX(s1 * u1[0])} y2={toY(s1 * u1[1])} />
            <line className="sv-u is-2" x1={half} y1={half}
                  x2={toX(s2 * u2[0])} y2={toY(s2 * u2[1])} />
          </g>

          {/* v labels sit inside the circle, σu labels outside the ellipse, so they never collide */}
          <text className="mn-tag" textAnchor="middle" x={toX(0.58 * v1[0])} y={toY(0.58 * v1[1]) - 5}>v₁</text>
          <text className="mn-tag" textAnchor="middle" x={toX(0.58 * v2[0])} y={toY(0.58 * v2[1]) - 5}>v₂</text>
          <text className="mn-tag is-min" textAnchor="middle"
                x={toX((s1 + 0.45) * u1[0])} y={toY((s1 + 0.45) * u1[1]) + 4}>σ₁u₁</text>
          <text className="mn-tag is-min" textAnchor="middle"
                x={toX((s2 + 0.45) * u2[0])} y={toY((s2 + 0.45) * u2[1]) + 4}>σ₂u₂</text>
        </svg>
      </div>

      <div className="dvec-controls">
        <p className="dvec-hint">{labels.hint ?? 'Every matrix turns the unit circle into an ellipse.'}</p>

        <div className="mmul-bracket sv-matrix">
          <div className="mmul-cells" style={{ gridTemplateColumns: 'repeat(2, minmax(56px, auto))' }}>
            {m.map((x, i) => (
              <label key={i} className="sv-cell">
                <span className="sr-only">{names[i]}</span>
                <input type="number" step={0.5} value={x} aria-label={names[i]}
                       onChange={(e) => {
                         const n = Number(e.target.value)
                         if (Number.isNaN(n)) return
                         setM(m.map((y, j) => (j === i ? n : y)))
                       }} />
              </label>
            ))}
          </div>
        </div>

        <p className="mplay-readout" aria-live="polite">
          {labels.singular ?? 'σ₁, σ₂'} = <strong>{f(s1)}</strong>, <strong>{f(s2)}</strong>
        </p>
        <p className="mplay-readout">
          {labels.volume ?? 'σ₁σ₂'} = <strong>{f(s1 * s2)}</strong> · |det A| = <strong>{f(Math.abs(det))}</strong>
        </p>
        <p className="mplay-readout">
          {labels.conditioning ?? 'κ = σ₁/σ₂'} ={' '}
          <strong>{Number.isFinite(kappa) ? f(kappa) : '∞'}</strong>
        </p>
        <p className="cs-note">
          {labels.note ?? 'The two axes of the ellipse are always perpendicular, for every matrix.'}
        </p>

        <button className="mplay-reset" type="button" onClick={() => setM(a)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
