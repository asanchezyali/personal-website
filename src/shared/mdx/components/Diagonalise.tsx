'use client'

import { useState } from 'react'

interface DiagonaliseProps {
  initial?: [number, number, number, number]
  labels?: {
    hint?: string
    distinct?: string
    complex?: string
    defective?: string
    scalar?: string
    eigen?: string
    inBasis?: string
    reset?: string
  }
}

const SIZE = 280
const RANGE = 3

/** Eigen-analysis of a 2×2, distinguishing the three regimes. */
function analyse(a: number, b: number, c: number, d: number) {
  const tr = a + d
  const det = a * d - b * c
  const disc = tr * tr - 4 * det
  const isScalar = Math.abs(b) < 1e-12 && Math.abs(c) < 1e-12 && Math.abs(a - d) < 1e-12

  if (disc < -1e-9) return { kind: 'complex' as const, tr, det, values: [], vectors: [] }

  const root = Math.sqrt(Math.max(0, disc))
  const l1 = (tr + root) / 2
  const l2 = (tr - root) / 2

  const vecFor = (l: number): [number, number] | null => {
    if (Math.abs(b) > 1e-9) return [b, l - a]
    if (Math.abs(c) > 1e-9) return [l - d, c]
    // b = c = 0: the matrix is already diagonal
    if (Math.abs(a - l) < 1e-9) return [1, 0]
    if (Math.abs(d - l) < 1e-9) return [0, 1]
    return null
  }

  if (Math.abs(disc) <= 1e-9) {
    if (isScalar) {
      return { kind: 'scalar' as const, tr, det, values: [l1, l1], vectors: [[1, 0], [0, 1]] as [number, number][] }
    }
    const v = vecFor(l1)
    return { kind: 'defective' as const, tr, det, values: [l1, l1], vectors: v ? [v] : [] }
  }

  const v1 = vecFor(l1)
  const v2 = vecFor(l2)
  return {
    kind: 'distinct' as const,
    tr, det,
    values: [l1, l2],
    vectors: [v1, v2].filter(Boolean) as [number, number][],
  }
}

export default function Diagonalise({
  initial = [2, 1, 0, 3],
  labels = {},
}: DiagonaliseProps) {
  const [m, setM] = useState<[number, number, number, number]>(initial)
  const [a, b, c, d] = m
  const r = analyse(a, b, c, d)

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const set = (i: number, v: number) => {
    const next = [...m] as [number, number, number, number]
    next[i] = v
    setM(next)
  }

  const verdict =
    r.kind === 'distinct' ? (labels.distinct ?? 'two independent eigen-directions: diagonalisable')
    : r.kind === 'scalar' ? (labels.scalar ?? 'a multiple of the identity: already diagonal')
    : r.kind === 'defective' ? (labels.defective ?? 'one eigen-direction only: not diagonalisable')
    : (labels.complex ?? 'no real eigenvalues: the map rotates')

  const ok = r.kind === 'distinct' || r.kind === 'scalar'
  const f = (n: number) => (Math.abs(n) < 5e-3 ? '0' : n.toFixed(2))

  const far = RANGE * 1.6
  const grid: number[] = []
  for (let i = -RANGE; i <= RANGE; i++) if (i !== 0) grid.push(i)

  return (
    <div className="dg">
      <div className="dg-canvas">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={verdict}>
          <clipPath id="dg-clip"><rect x={0} y={0} width={SIZE} height={SIZE} /></clipPath>
          {grid.map((k) => (
            <g key={k}>
              <line className="vplot-grid" x1={toX(k)} y1={0} x2={toX(k)} y2={SIZE} />
              <line className="vplot-grid" x1={0} y1={toY(k)} x2={SIZE} y2={toY(k)} />
            </g>
          ))}
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          <g clipPath="url(#dg-clip)">
            {r.vectors.map((v, i) => {
              const n = Math.hypot(v[0], v[1]) || 1
              const u: [number, number] = [v[0] / n, v[1] / n]
              return (
                <g key={i}>
                  <line className="dg-axis" x1={toX(-far * u[0])} y1={toY(-far * u[1])}
                        x2={toX(far * u[0])} y2={toY(far * u[1])} />
                  <line className="dg-vec" x1={toX(0)} y1={toY(0)}
                        x2={toX(u[0])} y2={toY(u[1])} />
                  <line className="dg-img" x1={toX(0)} y1={toY(0)}
                        x2={toX(r.values[i] * u[0])} y2={toY(r.values[i] * u[1])} />
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      <div className="dg-controls">
        <p className="dvec-hint">{labels.hint ?? 'The lines are the directions the map leaves invariant.'}</p>

        <div className="dg-sliders">
          {(['a', 'b', 'c', 'd'] as const).map((name, i) => (
            <label key={name} className="mplay-slider">
              <span className="mplay-name">{name}</span>
              <input type="range" min={-3} max={4} step={0.25} value={m[i]}
                     onChange={(e) => set(i, Number(e.target.value))} aria-label={name} />
              <span className="mplay-val">{m[i]}</span>
            </label>
          ))}
        </div>

        <p className={`dg-verdict ${ok ? 'is-ok' : 'is-bad'}`} aria-live="polite">{verdict}</p>

        <p className="mplay-readout" aria-live="polite">
          {labels.eigen ?? 'λ'} ={' '}
          {r.kind === 'complex' ? '—' : r.values.map(f).join(' , ')}
        </p>
        <p className="mplay-readout">
          tr = {f(r.tr)} · det = {f(r.det)}
        </p>
        {ok && (
          <p className="cs-note">
            {labels.inBasis ?? 'In its eigenbasis the matrix is diag('}
            {r.values.map(f).join(', ')}
            {')'}
          </p>
        )}

        <button className="mplay-reset" type="button" onClick={() => setM(initial)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
