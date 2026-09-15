'use client'

import { useState } from 'react'

interface FourSubspacesProps {
  labels?: {
    hint?: string
    domain?: string
    codomain?: string
    row?: string
    kernel?: string
    image?: string
    left?: string
    bijection?: string
    toZero?: string
    unreachable?: string
    identity?: string
    reset?: string
  }
}

export default function FourSubspaces({ labels = {} }: FourSubspacesProps) {
  const [n, setN] = useState(5)
  const [m, setM] = useState(4)
  const [r, setR] = useState(2)

  const rank = Math.min(r, m, n)
  const nullity = n - rank
  const coker = m - rank

  const W = 360
  const H = 200
  const boxW = 86
  const pad = 18
  const usable = H - 2 * pad

  // Each column is split in proportion to the dimensions it holds.
  const leftTop = (rank / n) * usable
  const rightTop = (rank / m) * usable

  const lx = 22
  const rx = W - boxW - 22

  return (
    <div className="fs">
      <div className="fs-stage">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={labels.hint ?? 'The four fundamental subspaces'}>
          <text className="fs-cap" x={lx + boxW / 2} y={12} textAnchor="middle">
            {labels.domain ?? 'ℝⁿ'}
          </text>
          <text className="fs-cap" x={rx + boxW / 2} y={12} textAnchor="middle">
            {labels.codomain ?? 'ℝᵐ'}
          </text>

          {/* domain: row space on top, kernel below */}
          <rect className="fs-box is-row" x={lx} y={pad} width={boxW} height={leftTop} />
          <rect className="fs-box is-ker" x={lx} y={pad + leftTop} width={boxW} height={usable - leftTop} />
          {/* codomain: image on top, left null space below */}
          <rect className="fs-box is-img" x={rx} y={pad} width={boxW} height={rightTop} />
          <rect className="fs-box is-coker" x={rx} y={pad + rightTop} width={boxW} height={usable - rightTop} />

          <text className="fs-lab" x={lx + boxW / 2} y={pad + leftTop / 2 + 4} textAnchor="middle">
            {labels.row ?? 'fila'} · {rank}
          </text>
          <text className="fs-lab" x={lx + boxW / 2} y={pad + leftTop + (usable - leftTop) / 2 + 4} textAnchor="middle">
            ker · {nullity}
          </text>
          <text className="fs-lab" x={rx + boxW / 2} y={pad + rightTop / 2 + 4} textAnchor="middle">
            im · {rank}
          </text>
          <text className="fs-lab" x={rx + boxW / 2} y={pad + rightTop + (usable - rightTop) / 2 + 4} textAnchor="middle">
            kerᵀ · {coker}
          </text>

          {/* row space maps bijectively onto the image; with rank 0 there is nothing to map */}
          {rank > 0 && (
            <line className="fs-arrow is-bij" x1={lx + boxW + 4} y1={pad + leftTop / 2}
                  x2={rx - 8} y2={pad + rightTop / 2} markerEnd="url(#fs-head)" />
          )}
          {/* the kernel collapses to the origin: a single point of the codomain */}
          {nullity > 0 && (
            <line className="fs-arrow is-zero" x1={lx + boxW + 4} y1={pad + leftTop + (usable - leftTop) / 2}
                  x2={rx - 14} y2={pad + rightTop - 1} />
          )}
          <circle className="fs-origin" cx={rx - 8} cy={pad + rightTop - 1} r={4} />
          <text className="fs-cap" x={rx - 8} y={pad + rightTop + 15} textAnchor="middle">0</text>

          <defs>
            <marker id="fs-head" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--vp-b)" />
            </marker>
          </defs>
        </svg>

        <p className="mmul-formula" aria-live="polite">
          {rank} + {nullity} = {n} · <strong>{labels.identity ?? 'rank + dim ker = n'}</strong>
        </p>
      </div>

      <div className="fs-controls">
        <p className="dvec-hint">{labels.hint ?? 'The blocks are sized by the dimension they hold.'}</p>

        {([['n', n, setN, 1, 8], ['m', m, setM, 1, 8], ['r', r, setR, 0, 8]] as const).map(
          ([name, val, set, lo, hi]) => (
            <label key={name} className="mplay-slider">
              <span className="mplay-name">{name}</span>
              <input type="range" min={lo} max={hi} step={1} value={val}
                     onChange={(e) => set(Number(e.target.value))} aria-label={name} />
              <span className="mplay-val">{name === 'r' ? rank : val}</span>
            </label>
          )
        )}

        <ul className="fs-legend">
          <li><i className="is-bij" /> {labels.bijection ?? 'row space → image, one to one'}</li>
          <li><i className="is-zero" /> {labels.toZero ?? 'kernel → 0'}</li>
          <li><i className="is-coker" /> {labels.unreachable ?? 'left null space: never reached'}</li>
        </ul>

        <button className="mplay-reset" type="button" onClick={() => { setN(5); setM(4); setR(2) }}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
