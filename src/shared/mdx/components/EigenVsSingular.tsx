'use client'

import { useState } from 'react'

interface EigenVsSingularProps {
  labels?: {
    hint?: string
    eigen?: string
    singular?: string
    none?: string
    defective?: string
    distinct?: string
    scalar?: string
    note?: string
    reset?: string
  }
}

/** Closed-form singular values of a 2x2 matrix. */
function sing2([a, b, c, d]: number[]): [number, number] {
  const E = a * a + c * c
  const F = a * b + c * d
  const G = b * b + d * d
  const disc = Math.sqrt((E - G) * (E - G) + 4 * F * F)
  return [Math.sqrt(Math.max((E + G + disc) / 2, 0)), Math.sqrt(Math.max((E + G - disc) / 2, 0))]
}

export default function EigenVsSingular({ labels = {} }: EigenVsSingularProps) {
  const [t, setT] = useState(0)

  // A(t) = [[1, 1], [t, 1]] sweeps every eigenvalue regime with one parameter.
  const m = [1, 1, t, 1]
  const tr = 2
  const det = 1 - t
  const disc = tr * tr - 4 * det
  const [s1, s2] = sing2(m)

  let kind: 'none' | 'defective' | 'scalar' | 'distinct'
  if (disc < -1e-12) kind = 'none'
  else if (Math.abs(disc) < 1e-12) kind = Math.abs(m[1]) < 1e-12 && Math.abs(m[2]) < 1e-12 ? 'scalar' : 'defective'
  else kind = 'distinct'

  const f = (n: number) => n.toFixed(2)
  const eigenText =
    kind === 'none'
      ? (labels.none ?? 'no real eigenvalues')
      : kind === 'defective'
        ? (labels.defective ?? 'repeated eigenvalue, one direction: defective')
        : kind === 'scalar'
          ? (labels.scalar ?? 'scalar multiple of the identity')
          : `${labels.distinct ?? 'two real eigenvalues'}: ${f((tr + Math.sqrt(disc)) / 2)}, ${f((tr - Math.sqrt(disc)) / 2)}`

  const bar = (v: number, max: number) => `${Math.min(100, (v / max) * 100)}%`
  const max = Math.max(s1, 1e-9)

  return (
    <div className="evs">
      <div className="evs-stage">
        <div className="mmul-bracket">
          <div className="mmul-cells" style={{ gridTemplateColumns: 'repeat(2, minmax(48px, auto))' }}>
            {m.map((x, i) => (
              <span key={i} className={i === 2 ? 'mmul-cell is-live' : 'mmul-cell'}>{f(x)}</span>
            ))}
          </div>
        </div>

        <div className="evs-row">
          <span className="evs-tag">{labels.eigen ?? 'eigenvalues'}</span>
          <span className={kind === 'distinct' || kind === 'scalar' ? 'evs-verdict is-ok' : 'evs-verdict is-bad'}>
            {eigenText}
          </span>
        </div>

        <div className="evs-row">
          <span className="evs-tag">{labels.singular ?? 'singular values'}</span>
          <span className="evs-verdict is-ok">
            {f(s1)}, {f(s2)}
          </span>
        </div>

        <div className="evs-bars">
          <span className="evs-bar is-1" style={{ width: bar(s1, max) }} />
          <span className="evs-bar is-2" style={{ width: bar(s2, max) }} />
        </div>
      </div>

      <div className="evs-controls">
        <p className="dvec-hint">{labels.hint ?? 'One parameter sweeps every eigenvalue regime.'}</p>

        <label className="mplay-slider">
          <span className="mplay-name">t</span>
          <input type="range" min={-1} max={1.5} step={0.05} value={t}
                 onChange={(e) => setT(Number(e.target.value))} aria-label="t" />
          <span className="mplay-val">{t.toFixed(2)}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          det A = <strong>{f(det)}</strong> · σ₁σ₂ = <strong>{f(s1 * s2)}</strong>
        </p>
        <p className="cs-note">
          {labels.note ??
            'The eigenvalue story changes character three times along this slider. The singular values never flinch.'}
        </p>

        <button className="mplay-reset" type="button" onClick={() => setT(0)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
