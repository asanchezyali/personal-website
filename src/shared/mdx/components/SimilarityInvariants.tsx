'use client'

import { useState } from 'react'

interface SimilarityInvariantsProps {
  a?: [number, number, number, number]
  labels?: {
    hint?: string
    original?: string
    changed?: string
    invariant?: string
    singular?: string
    reset?: string
  }
}

type M2 = [number, number, number, number]

const mul = (X: M2, Y: M2): M2 => [
  X[0] * Y[0] + X[1] * Y[2],
  X[0] * Y[1] + X[1] * Y[3],
  X[2] * Y[0] + X[3] * Y[2],
  X[2] * Y[1] + X[3] * Y[3],
]

const inv = (X: M2): M2 | null => {
  const det = X[0] * X[3] - X[1] * X[2]
  if (Math.abs(det) < 1e-9) return null
  return [X[3] / det, -X[1] / det, -X[2] / det, X[0] / det]
}

const eigs = (X: M2) => {
  const tr = X[0] + X[3]
  const det = X[0] * X[3] - X[1] * X[2]
  const disc = tr * tr - 4 * det
  if (disc < -1e-9) return null
  const root = Math.sqrt(Math.max(0, disc))
  return [(tr + root) / 2, (tr - root) / 2]
}

export default function SimilarityInvariants({
  a = [2, 1, 0, 3],
  labels = {},
}: SimilarityInvariantsProps) {
  // Not the eigenbasis: that choice would come back diagonal and hide the point.
  const [s, setS] = useState<M2>([2, -1, 1, 3])
  const si = inv(s)
  const tilde = si ? mul(si, mul(a, s)) : null

  const f = (n: number) => (Math.abs(n) < 5e-3 ? '0' : n.toFixed(2))
  const eA = eigs(a)
  const eT = tilde ? eigs(tilde) : null

  const grid = (M: M2, title: string) => (
    <div className="mmul-block">
      <span className="mmul-name">{title}</span>
      <div className="mmul-bracket">
        <div
          className="mmul-cells"
          style={{ gridTemplateColumns: 'repeat(2, minmax(48px, auto))' }}
        >
          {M.map((x, i) => (
            <span key={i} className="mmul-cell">
              {f(x)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  const row = (name: string, x: string, y: string) => (
    <tr>
      <th scope="row">{name}</th>
      <td>{x}</td>
      <td>{y}</td>
    </tr>
  )

  return (
    <div className="si">
      <div className="si-stage">
        <div className="mmul-row">
          {grid(a, labels.original ?? 'A')}
          <span className="mmul-op">→</span>
          {tilde ? (
            grid(tilde, labels.changed ?? 'S⁻¹AS')
          ) : (
            <p className="cond-warning">{labels.singular ?? 'S is singular'}</p>
          )}
        </div>

        {tilde && eA && eT && (
          <table className="si-table">
            <tbody>
              {row('tr', f(a[0] + a[3]), f(tilde[0] + tilde[3]))}
              {row(
                'det',
                f(a[0] * a[3] - a[1] * a[2]),
                f(tilde[0] * tilde[3] - tilde[1] * tilde[2])
              )}
              {row('λ', eA.map(f).join(' , '), eT.map(f).join(' , '))}
            </tbody>
          </table>
        )}
      </div>

      <div className="si-controls">
        <p className="dvec-hint">{labels.hint ?? 'S is the basis; A stays fixed.'}</p>
        <div className="dg-sliders">
          {(['s₁₁', 's₁₂', 's₂₁', 's₂₂'] as const).map((name, i) => (
            <label key={name} className="mplay-slider">
              <span className="mplay-name">{name}</span>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.25}
                value={s[i]}
                onChange={(e) => {
                  const next = [...s] as M2
                  next[i] = Number(e.target.value)
                  setS(next)
                }}
                aria-label={name}
              />
              <span className="mplay-val">{s[i]}</span>
            </label>
          ))}
        </div>
        <p className="cs-note">
          {labels.invariant ??
            'The entries change; the trace, the determinant and the eigenvalues do not.'}
        </p>
        <button className="mplay-reset" type="button" onClick={() => setS([2, -1, 1, 3])}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
