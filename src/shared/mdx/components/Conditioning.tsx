'use client'

import { useState } from 'react'

interface ConditioningProps {
  /** b of the system A x = b. */
  b?: [number, number]
  /** Relative size of the perturbation applied to b. */
  nudge?: number
  labels?: {
    hint?: string
    epsilon?: string
    det?: string
    cond?: string
    changeB?: string
    changeX?: string
    amplification?: string
    singular?: string
    reset?: string
  }
}

const fmt = (v: number, d = 2) =>
  !Number.isFinite(v) ? '∞' : Math.abs(v) >= 1e4 ? v.toExponential(1) : v.toFixed(d)

/** Condition number in the 2-norm: ratio of the singular values of a 2x2. */
function cond2(a: number, b: number, c: number, d: number) {
  const p = a * a + c * c
  const q = a * b + c * d
  const r = b * b + d * d
  const mid = (p + r) / 2
  const gap = Math.sqrt(((p - r) / 2) ** 2 + q * q)
  const lmax = mid + gap
  const lmin = mid - gap
  if (lmin <= 1e-15) return Infinity
  return Math.sqrt(lmax / lmin)
}

function solve2(a: number, b: number, c: number, d: number, u: number, v: number) {
  const det = a * d - b * c
  if (Math.abs(det) < 1e-15) return null
  return [(u * d - b * v) / det, (a * v - u * c) / det] as const
}

const norm = (x: readonly number[]) => Math.hypot(...x)

export default function Conditioning({
  b = [3, 6],
  nudge = 0.001,
  labels = {},
}: ConditioningProps) {
  const [eps, setEps] = useState(0.5)

  // Second row drifts towards twice the first: at eps = 0 the matrix is singular.
  const A: [number, number, number, number] = [1, 2, 2, 4 + eps]
  const det = A[0] * A[3] - A[1] * A[2]
  const kappa = cond2(...A)

  const x = solve2(...A, b[0], b[1])
  const bPert: [number, number] = [b[0], b[1] + nudge]
  const xPert = solve2(...A, bPert[0], bPert[1])

  const relB = norm([0, nudge]) / norm(b)
  const relX =
    x && xPert ? norm([xPert[0] - x[0], xPert[1] - x[1]]) / norm(x) : Infinity
  const amp = relX / relB

  // log scale: 1x fills nothing, 10000x fills the bar
  const fill = Number.isFinite(amp) ? Math.min(1, Math.max(0, Math.log10(Math.max(amp, 1)) / 4)) : 1
  const severity = !Number.isFinite(amp) || amp > 100 ? 'is-bad' : amp > 10 ? 'is-warn' : 'is-ok'

  return (
    <div className="cond">
      <div className="cond-stage">
        <div className="cond-matrix" aria-hidden="true">
          <span className="elim-bracket" />
          <div className="cond-cells">
            <span>1</span>
            <span>2</span>
            <span>2</span>
            <span className="is-eps">{fmt(4 + eps, 2)}</span>
          </div>
          <span className="elim-bracket is-right" />
        </div>

        <dl className="cond-readout">
          <div>
            <dt>{labels.det ?? 'det(A)'}</dt>
            <dd>{fmt(det, 3)}</dd>
          </div>
          <div>
            <dt>{labels.cond ?? 'cond(A)'}</dt>
            <dd>{fmt(kappa, 1)}</dd>
          </div>
          <div>
            <dt>{labels.changeB ?? 'cambio en b'}</dt>
            <dd>{(relB * 100).toFixed(3)} %</dd>
          </div>
          <div>
            <dt>{labels.changeX ?? 'cambio en x'}</dt>
            <dd className={severity}>
              {Number.isFinite(relX) ? `${(relX * 100).toFixed(2)} %` : '—'}
            </dd>
          </div>
        </dl>

        <div className="cond-amp">
          <div className="cond-amp-head">
            <span>{labels.amplification ?? 'amplificación del error'}</span>
            <strong className={severity}>×{fmt(amp, 0)}</strong>
          </div>
          <div className="cond-bar" aria-hidden="true">
            <span className={severity} style={{ width: `${fill * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="cond-controls">
        <p className="dvec-hint">
          {labels.hint ??
            'ε separates the second row from twice the first. At ε = 0 the matrix is singular.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">ε</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={eps}
            onChange={(e) => setEps(Number(e.target.value))}
            aria-label="epsilon"
          />
          <span className="mplay-val">{eps.toFixed(2)}</span>
        </label>

        {det === 0 && (
          <p className="cond-warning">{labels.singular ?? 'LinAlgError: Singular matrix'}</p>
        )}

        <button className="mplay-reset" type="button" onClick={() => setEps(0.5)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
