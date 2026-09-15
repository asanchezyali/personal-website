'use client'

import { useState } from 'react'

interface InverseAccuracyProps {
  labels?: {
    hint?: string
    residual?: string
    error?: string
    cond?: string
    note?: string
    passes?: string
    reset?: string
  }
}

const EPS = 2.220446049250313e-16

/** Gauss-Jordan inverse of a 2×2, in plain floating point. */
function invert(A: number[][]) {
  const m = [
    [A[0][0], A[0][1], 1, 0],
    [A[1][0], A[1][1], 0, 1],
  ]
  if (Math.abs(m[1][0]) > Math.abs(m[0][0])) [m[0], m[1]] = [m[1], m[0]]
  const p0 = m[0][0]
  for (let j = 0; j < 4; j++) m[0][j] /= p0
  const f = m[1][0]
  for (let j = 0; j < 4; j++) m[1][j] -= f * m[0][j]
  const p1 = m[1][1]
  for (let j = 0; j < 4; j++) m[1][j] /= p1
  const g = m[0][1]
  for (let j = 0; j < 4; j++) m[0][j] -= g * m[1][j]
  return [
    [m[0][2], m[0][3]],
    [m[1][2], m[1][3]],
  ]
}

const maxAbs = (M: number[][]) => Math.max(...M.flat().map(Math.abs))

export default function InverseAccuracy({ labels = {} }: InverseAccuracyProps) {
  const [exp, setExp] = useState(-6)
  const d = 10 ** exp

  const A = [
    [1, 1],
    [1, 1 + d],
  ]
  // Exact inverse of [[1,1],[1,1+d]] is (1/d)·[[1+d,-1],[-1,1]].
  const exact = [
    [(1 + d) / d, -1 / d],
    [-1 / d, 1 / d],
  ]
  const computed = invert(A)

  const prod = [0, 1].map((i) =>
    [0, 1].map((j) => A[i][0] * computed[0][j] + A[i][1] * computed[1][j] - (i === j ? 1 : 0))
  )
  const residual = maxAbs(prod)
  const diff = [0, 1].map((i) => [0, 1].map((j) => computed[i][j] - exact[i][j]))
  const relError = maxAbs(diff) / maxAbs(exact)
  const kappa = 4 / d

  const sci = (v: number) => (v === 0 ? '0' : v.toExponential(1))
  const bad = relError > 1e-9

  return (
    <div className="nrank">
      <div className="nrank-stage">
        <dl className="cond-readout">
          <div>
            <dt>{labels.cond ?? 'cond(A) ≈'}</dt>
            <dd>{sci(kappa)}</dd>
          </div>
          <div>
            <dt>{labels.residual ?? '‖A·Â⁻¹ − I‖'}</dt>
            <dd className="is-ok">{sci(residual)}</dd>
          </div>
          <div>
            <dt>{labels.error ?? 'error real de Â⁻¹'}</dt>
            <dd className={bad ? 'is-bad' : ''}>{sci(relError)}</dd>
          </div>
          <div>
            <dt>κ · ε</dt>
            <dd>{sci(kappa * EPS)}</dd>
          </div>
        </dl>

        <p className={`nrank-verdict ${bad ? 'is-deficient' : ''}`} aria-live="polite">
          {labels.passes ?? 'la comprobación A·Â⁻¹ ≈ I pasa siempre'}
        </p>
      </div>

      <div className="nrank-controls">
        <p className="dvec-hint">
          {labels.hint ??
            'A = [[1, 1], [1, 1 + δ]]. Its exact inverse is known, so the true error is measurable.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">δ</span>
          <input
            type="range"
            min={-12}
            max={-1}
            step={1}
            value={exp}
            onChange={(e) => setExp(Number(e.target.value))}
            aria-label="delta exponent"
          />
          <span className="mplay-val">1e{exp}</span>
        </label>

        <p className="cs-note">
          {labels.note ??
            'The residual stays at machine precision while the error grows like κ·ε: the check cannot detect it.'}
        </p>

        <button className="mplay-reset" type="button" onClick={() => setExp(-6)}>
          {labels.reset ?? 'Reiniciar'}
        </button>
      </div>
    </div>
  )
}
