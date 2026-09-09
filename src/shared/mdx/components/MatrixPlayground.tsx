'use client'

import { useMemo, useState } from 'react'

interface MatrixPlaygroundProps {
  /** Initial matrix, column-major as [[a, c], [b, d]] is confusing — we take rows. */
  initial?: [number, number, number, number]
  /** Show the determinant and the shaded image of the unit square. */
  showDeterminant?: boolean
  /** Show real eigenvectors when they exist. */
  showEigen?: boolean
  /** Show the equivalent NumPy snippet. */
  showCode?: boolean
  labels?: {
    reset?: string
    determinant?: string
    eigen?: string
    noEigen?: string
    hint?: string
  }
}

const RANGE = 4
const SIZE = 320

function eigen2x2(a: number, b: number, c: number, d: number) {
  const tr = a + d
  const det = a * d - b * c
  const disc = (tr * tr) / 4 - det
  if (disc < 1e-9) return null
  const root = Math.sqrt(disc)
  const l1 = tr / 2 + root
  const l2 = tr / 2 - root
  const vecFor = (l: number): [number, number] => {
    // (A - lI)v = 0 → use whichever row is non-degenerate
    if (Math.abs(b) > 1e-9) return [b, l - a]
    if (Math.abs(c) > 1e-9) return [l - d, c]
    return Math.abs(a - l) < 1e-9 ? [1, 0] : [0, 1]
  }
  const norm = ([x, y]: [number, number]): [number, number] => {
    const m = Math.hypot(x, y) || 1
    return [x / m, y / m]
  }
  return [
    { value: l1, vec: norm(vecFor(l1)) },
    { value: l2, vec: norm(vecFor(l2)) },
  ]
}

export default function MatrixPlayground({
  initial = [1, 0, 0, 1],
  showDeterminant = true,
  showEigen = false,
  showCode = true,
  labels = {},
}: MatrixPlaygroundProps) {
  const [[a, b, c, d], setM] = useState<[number, number, number, number]>(initial)

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const det = a * d - b * c
  const eigs = useMemo(() => (showEigen ? eigen2x2(a, b, c, d) : null), [a, b, c, d, showEigen])

  const set = (i: number, v: number) => {
    const next = [a, b, c, d] as [number, number, number, number]
    next[i] = v
    setM(next)
  }

  // Image of the grid lines under the transform.
  const lines: Array<[number, number, number, number]> = []
  for (let i = -RANGE; i <= RANGE; i++) {
    lines.push([i, -RANGE, i, RANGE])
    lines.push([-RANGE, i, RANGE, i])
  }
  const map = (x: number, y: number): [number, number] => [a * x + b * y, c * x + d * y]

  const [ix, iy] = map(1, 0)
  const [jx, jy] = map(0, 1)

  const sliders: Array<{ i: number; v: number; name: string }> = [
    { i: 0, v: a, name: 'a' },
    { i: 1, v: b, name: 'b' },
    { i: 2, v: c, name: 'c' },
    { i: 3, v: d, name: 'd' },
  ]

  return (
    <div className="mplay">
      <div className="mplay-canvas">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Interactive linear transform">
          <defs>
            <marker id="mp-i" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--vp-a)" />
            </marker>
            <marker id="mp-j" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--vp-b)" />
            </marker>
          </defs>

          {lines.map((l, k) => {
            const [p, q] = map(l[0], l[1])
            const [r, s] = map(l[2], l[3])
            return (
              <line
                key={k}
                className="mplay-grid"
                x1={toX(p)}
                y1={toY(q)}
                x2={toX(r)}
                y2={toY(s)}
              />
            )
          })}

          <line className="mplay-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="mplay-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          {showDeterminant && (
            <polygon
              className="mplay-area"
              points={[
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
              ]
                .map(([x, y]) => map(x, y))
                .map(([x, y]) => `${toX(x)},${toY(y)}`)
                .join(' ')}
            />
          )}

          {showEigen &&
            eigs?.map((e, k) => (
              <line
                key={`e${k}`}
                className="mplay-eigen"
                x1={toX(-e.vec[0] * RANGE)}
                y1={toY(-e.vec[1] * RANGE)}
                x2={toX(e.vec[0] * RANGE)}
                y2={toY(e.vec[1] * RANGE)}
              />
            ))}

          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(ix)}
            y2={toY(iy)}
            stroke="var(--vp-a)"
            strokeWidth={2.6}
            markerEnd="url(#mp-i)"
          />
          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(jx)}
            y2={toY(jy)}
            stroke="var(--vp-b)"
            strokeWidth={2.6}
            markerEnd="url(#mp-j)"
          />
        </svg>
      </div>

      <div className="mplay-controls">
        <div className="mplay-matrix" aria-hidden="true">
          <span className="mplay-bracket">[</span>
          <div className="mplay-cells">
            <span>{a.toFixed(1)}</span>
            <span>{b.toFixed(1)}</span>
            <span>{c.toFixed(1)}</span>
            <span>{d.toFixed(1)}</span>
          </div>
          <span className="mplay-bracket">]</span>
        </div>

        {sliders.map((s) => (
          <label key={s.name} className="mplay-slider">
            <span className="mplay-name">{s.name}</span>
            <input
              type="range"
              min={-3}
              max={3}
              step={0.1}
              value={s.v}
              onChange={(e) => set(s.i, Number(e.target.value))}
              aria-label={s.name}
            />
            <span className="mplay-val">{s.v.toFixed(1)}</span>
          </label>
        ))}

        {showDeterminant && (
          <p className="mplay-readout">
            <strong>{labels.determinant ?? 'det'}</strong> = {det.toFixed(2)}
            {Math.abs(det) < 0.05 && <em> — {labels.hint ?? 'the plane collapses to a line'}</em>}
          </p>
        )}

        {showEigen && (
          <p className="mplay-readout">
            <strong>{labels.eigen ?? 'eigenvalues'}</strong>{' '}
            {eigs ? eigs.map((e) => e.value.toFixed(2)).join(' , ') : (labels.noEigen ?? 'none real')}
          </p>
        )}

        <button className="mplay-reset" type="button" onClick={() => setM(initial)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>

      {showCode && (
        <pre className="mplay-code">
          <code>{`import numpy as np

A = np.array([[${a.toFixed(1)}, ${b.toFixed(1)}],
              [${c.toFixed(1)}, ${d.toFixed(1)}]])

np.linalg.det(A)   # ${det.toFixed(2)}`}</code>
        </pre>
      )}
    </div>
  )
}
