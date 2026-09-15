'use client'

import { useState } from 'react'

interface NumericalRankProps {
  labels?: {
    hint?: string
    sigma?: string
    tol?: string
    rank?: string
    nullity?: string
    exact?: string
    note?: string
    reset?: string
  }
}

const EPS = 2.220446049250313e-16

/**
 * Singular values of a 2×3. The large one comes from the eigenvalues of A Aᵀ,
 * but the small one must NOT: mid − gap cancels catastrophically once σ₂ is
 * small, which is precisely the regime this figure is about. Cauchy–Binet gives
 * det(A Aᵀ) as a sum of squared 2×2 minors, and σ₂ = √det / σ₁ stays accurate.
 */
function singular(A: number[][]) {
  const dot = (i: number, j: number) => A[i].reduce((s, v, k) => s + v * A[j][k], 0)
  const p = dot(0, 0)
  const q = dot(0, 1)
  const r = dot(1, 1)
  const mid = (p + r) / 2
  const gap = Math.hypot((p - r) / 2, q)
  const s0 = Math.sqrt(Math.max(0, mid + gap))

  const minor = (j: number, k: number) => A[0][j] * A[1][k] - A[0][k] * A[1][j]
  const detG = minor(0, 1) ** 2 + minor(0, 2) ** 2 + minor(1, 2) ** 2
  const s1 = s0 > 0 ? Math.sqrt(detG) / s0 : 0
  return [s0, s1]
}

export default function NumericalRank({ labels = {} }: NumericalRankProps) {
  // exponent of the perturbation; -18 is indistinguishable from zero
  const [exp, setExp] = useState(-6)
  const eps = exp <= -18 ? 0 : 10 ** exp

  const A = [
    [1, 2, -1],
    [2 + eps, 4, -2],
  ]
  const [s0, s1] = singular(A)
  const tol = Math.max(A.length, A[0].length) * EPS * s0
  const rank = (s0 > tol ? 1 : 0) + (s1 > tol ? 1 : 0)
  const nullity = A[0].length - rank
  const exact = eps === 0

  const sci = (v: number) => (v === 0 ? '0' : v.toExponential(2))

  return (
    <div className="nrank">
      <div className="nrank-stage">
        <dl className="cond-readout">
          <div>
            <dt>σ₁</dt>
            <dd>{s0.toFixed(4)}</dd>
          </div>
          <div>
            <dt>σ₂</dt>
            <dd className={s1 > tol ? '' : 'is-bad'}>{sci(s1)}</dd>
          </div>
          <div>
            <dt>{labels.tol ?? 'tolerancia'}</dt>
            <dd>{sci(tol)}</dd>
          </div>
          <div>
            <dt>{labels.rank ?? 'matrix_rank'}</dt>
            <dd className={rank < 2 ? 'is-warn' : ''}>{rank}</dd>
          </div>
        </dl>

        <div className="nrank-scale" aria-hidden="true">
          <span className="nrank-tol" style={{ left: '50%' }} />
          <span
            className="nrank-sigma"
            style={{
              left: `${Math.max(2, Math.min(98, 50 + (Math.log10(Math.max(s1, 1e-20)) - Math.log10(tol)) * 6))}%`,
            }}
          />
        </div>
        <p className="nrank-legend">
          <em>σ₂</em> {labels.sigma ?? 'frente a la tolerancia'}
        </p>

        <p className={`nrank-verdict ${rank < 2 ? 'is-deficient' : ''}`} aria-live="polite">
          {labels.nullity ?? 'dim ker(A)'} = {nullity}
          {exact && <span> · {labels.exact ?? 'exactamente singular'}</span>}
        </p>
      </div>

      <div className="nrank-controls">
        <p className="dvec-hint">{labels.hint ?? 'ε perturbs a single entry of a rank-deficient matrix.'}</p>

        <label className="mplay-slider">
          <span className="mplay-name">ε</span>
          <input
            type="range"
            min={-18}
            max={-2}
            step={1}
            value={exp}
            onChange={(e) => setExp(Number(e.target.value))}
            aria-label="epsilon exponent"
          />
          <span className="mplay-val">{exact ? '0' : `1e${exp}`}</span>
        </label>

        <p className="cs-note">{labels.note ?? 'Rank in floating point is a decision about a threshold, not a property read off the matrix.'}</p>

        <button className="mplay-reset" type="button" onClick={() => setExp(-6)}>
          {labels.reset ?? 'Reiniciar'}
        </button>
      </div>
    </div>
  )
}
