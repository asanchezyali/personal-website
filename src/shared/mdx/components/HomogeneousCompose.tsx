'use client'

import { useState } from 'react'

interface HomogeneousComposeProps {
  labels?: {
    hint?: string
    rotateFirst?: string
    translateFirst?: string
    composed?: string
    note?: string
    angle?: string
    shift?: string
  }
}

const SIZE = 260
const RANGE = 5

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

type M3 = number[][]

const mul = (A: M3, B: M3): M3 =>
  A.map((row) => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)))

const rot = (deg: number): M3 => {
  const r = (deg * Math.PI) / 180
  return [
    [Math.cos(r), -Math.sin(r), 0],
    [Math.sin(r), Math.cos(r), 0],
    [0, 0, 1],
  ]
}
const trans = (tx: number, ty: number): M3 => [
  [1, 0, tx],
  [0, 1, ty],
  [0, 0, 1],
]

export default function HomogeneousCompose({ labels = {} }: HomogeneousComposeProps) {
  const [deg, setDeg] = useState(60)
  const [tx, setTx] = useState(2.5)
  const [rotFirst, setRotFirst] = useState(true)

  const R = rot(deg)
  const T = trans(tx, 0)
  // Rightmost factor acts first.
  const M = rotFirst ? mul(T, R) : mul(R, T)

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const apply = (m: M3, [x, y]: [number, number]): [number, number] => {
    const h = [x, y, 1]
    return [
      m[0][0] * h[0] + m[0][1] * h[1] + m[0][2] * h[2],
      m[1][0] * h[0] + m[1][1] * h[1] + m[1][2] * h[2],
    ]
  }

  const mapped = SHAPE.map((p) => apply(M, p))
  const other = SHAPE.map((p) => apply(rotFirst ? mul(R, T) : mul(T, R), p))
  const path = (pts: [number, number][]) => pts.map(([x, y]) => `${toX(x)},${toY(y)}`).join(' ')

  const f = (n: number) => (Math.abs(n) < 5e-3 ? '0' : n.toFixed(2))

  return (
    <div className="tg">
      <div className="tg-canvas">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={labels.hint ?? 'Composing in homogeneous coordinates'}
        >
          <clipPath id="hc-clip">
            <rect x={0} y={0} width={SIZE} height={SIZE} />
          </clipPath>
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />
          <g clipPath="url(#hc-clip)">
            <polygon className="tg-before" points={path(SHAPE)} />
            <polygon className="tg-ghost" points={path(other)} />
            <polygon className="tg-after" points={path(mapped)} />
          </g>
        </svg>
      </div>

      <div className="tg-controls">
        <div className="chooser-opts">
          <button
            type="button"
            className={rotFirst ? 'bc-preset is-active' : 'bc-preset'}
            onClick={() => setRotFirst(true)}
            aria-pressed={rotFirst}
          >
            {labels.rotateFirst ?? 'T · R'}
          </button>
          <button
            type="button"
            className={!rotFirst ? 'bc-preset is-active' : 'bc-preset'}
            onClick={() => setRotFirst(false)}
            aria-pressed={!rotFirst}
          >
            {labels.translateFirst ?? 'R · T'}
          </button>
        </div>

        <label className="mplay-slider">
          <span className="mplay-name">{labels.angle ?? 'θ'}</span>
          <input
            type="range"
            min={-180}
            max={180}
            step={5}
            value={deg}
            onChange={(e) => setDeg(Number(e.target.value))}
            aria-label="angle"
          />
          <span className="mplay-val">{deg}°</span>
        </label>
        <label className="mplay-slider">
          <span className="mplay-name">{labels.shift ?? 'tx'}</span>
          <input
            type="range"
            min={-4}
            max={4}
            step={0.5}
            value={tx}
            onChange={(e) => setTx(Number(e.target.value))}
            aria-label="translation"
          />
          <span className="mplay-val">{tx.toFixed(1)}</span>
        </label>

        <span className="mmul-name">{labels.composed ?? (rotFirst ? 'T · R' : 'R · T')}</span>
        <div className="mmul-bracket tg-matrix">
          <div
            className="mmul-cells"
            style={{ gridTemplateColumns: 'repeat(3, minmax(44px, auto))' }}
          >
            {M.flat().map((x, i) => (
              <span key={i} className={`mmul-cell ${i % 3 === 2 && i < 6 ? 'is-source' : ''}`}>
                {f(x)}
              </span>
            ))}
          </div>
        </div>

        <p className="cs-note">
          {labels.note ??
            'The third column holds the translation; the third row keeps the block a matrix.'}
        </p>
      </div>
    </div>
  )
}
