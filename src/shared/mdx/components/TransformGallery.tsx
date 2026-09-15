'use client'

import { useState } from 'react'

type Kind = 'rotate' | 'scale' | 'reflect' | 'shear' | 'project'

interface TransformGalleryProps {
  labels?: {
    hint?: string
    det?: string
    param?: Partial<Record<Kind, string>>
    names?: Partial<Record<Kind, string>>
    collapses?: string
    flips?: string
  }
}

const SIZE = 260
const RANGE = 4

/** An asymmetric outline, so rotations and reflections are distinguishable. */
const SHAPE: [number, number][] = [
  [0, 0],
  [0, 3],
  [2, 3],
  [2, 2.4],
  [0.7, 2.4],
  [0.7, 1.8],
  [1.7, 1.8],
  [1.7, 1.2],
  [0.7, 1.2],
  [0.7, 0],
].map(([x, y]) => [x - 0.85, y - 1.5] as [number, number])

function matrixFor(kind: Kind, t: number): [number, number, number, number] {
  switch (kind) {
    case 'rotate': {
      const r = (t * Math.PI) / 180
      return [Math.cos(r), -Math.sin(r), Math.sin(r), Math.cos(r)]
    }
    case 'scale':
      return [t, 0, 0, 1 / Math.max(0.2, t)]
    case 'reflect': {
      const r = (t * Math.PI) / 180
      return [Math.cos(2 * r), Math.sin(2 * r), Math.sin(2 * r), -Math.cos(2 * r)]
    }
    case 'shear':
      return [1, t, 0, 1]
    case 'project': {
      const r = (t * Math.PI) / 180
      const c = Math.cos(r),
        s = Math.sin(r)
      return [c * c, c * s, c * s, s * s]
    }
  }
}

const RANGES: Record<Kind, { min: number; max: number; step: number; init: number }> = {
  rotate: { min: -180, max: 180, step: 5, init: 45 },
  scale: { min: 0.3, max: 3, step: 0.1, init: 1.6 },
  reflect: { min: -90, max: 90, step: 5, init: 30 },
  shear: { min: -2, max: 2, step: 0.1, init: 0.8 },
  project: { min: -90, max: 90, step: 5, init: 30 },
}

export default function TransformGallery({ labels = {} }: TransformGalleryProps) {
  const [kind, setKind] = useState<Kind>('rotate')
  const [t, setT] = useState(RANGES.rotate.init)

  const A = matrixFor(kind, t)
  const det = A[0] * A[3] - A[1] * A[2]

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const mapped = SHAPE.map(
    ([x, y]) => [A[0] * x + A[1] * y, A[2] * x + A[3] * y] as [number, number]
  )
  const path = (pts: [number, number][]) => pts.map(([x, y]) => `${toX(x)},${toY(y)}`).join(' ')

  const names: Record<Kind, string> = {
    rotate: labels.names?.rotate ?? 'rotation',
    scale: labels.names?.scale ?? 'scaling',
    reflect: labels.names?.reflect ?? 'reflection',
    shear: labels.names?.shear ?? 'shear',
    project: labels.names?.project ?? 'projection',
  }

  const f = (n: number) => (Math.abs(n) < 5e-3 ? '0' : n.toFixed(2))

  return (
    <div className="tg">
      <div className="tg-canvas">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={names[kind]}>
          <clipPath id="tg-clip">
            <rect x={0} y={0} width={SIZE} height={SIZE} />
          </clipPath>
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />
          <g clipPath="url(#tg-clip)">
            <polygon className="tg-before" points={path(SHAPE)} />
            <polygon className="tg-after" points={path(mapped)} />
          </g>
        </svg>
      </div>

      <div className="tg-controls">
        <div className="chooser-opts">
          {(Object.keys(names) as Kind[]).map((k) => (
            <button
              key={k}
              type="button"
              className={k === kind ? 'bc-preset is-active' : 'bc-preset'}
              onClick={() => {
                setKind(k)
                setT(RANGES[k].init)
              }}
              aria-pressed={k === kind}
            >
              {names[k]}
            </button>
          ))}
        </div>

        <label className="mplay-slider">
          <span className="mplay-name">{labels.param?.[kind] ?? 'θ'}</span>
          <input
            type="range"
            {...RANGES[kind]}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            aria-label="parameter"
          />
          <span className="mplay-val">
            {kind === 'scale' || kind === 'shear' ? t.toFixed(1) : `${t}°`}
          </span>
        </label>

        <div className="mmul-bracket tg-matrix">
          <div
            className="mmul-cells"
            style={{ gridTemplateColumns: 'repeat(2, minmax(46px, auto))' }}
          >
            {A.map((x, i) => (
              <span key={i} className="mmul-cell">
                {f(x)}
              </span>
            ))}
          </div>
        </div>

        <p className="mplay-readout" aria-live="polite">
          {labels.det ?? 'det'} = {f(det)}
          {Math.abs(det) < 1e-9 && <em> · {labels.collapses ?? 'collapses to a line'}</em>}
          {det < -1e-9 && <em> · {labels.flips ?? 'reverses orientation'}</em>}
        </p>
      </div>
    </div>
  )
}
