'use client'

import { useState } from 'react'

interface AffineCombinationProps {
  labels?: {
    hint?: string
    sum?: string
    convex?: string
    affineOnly?: string
    note?: string
    reset?: string
  }
}

const SIZE = 320
const RANGE = 4

const V: [number, number][] = [
  [-2.5, -1.5],
  [2.5, -1.5],
  [0, 2.5],
]

export default function AffineCombination({ labels = {} }: AffineCombinationProps) {
  const [l1, setL1] = useState(0.5)
  const [l2, setL2] = useState(0.2)

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  // The third weight is not free: affine combinations must sum to one.
  const l3 = 1 - l1 - l2
  const lam = [l1, l2, l3]
  const x: [number, number] = [
    lam[0] * V[0][0] + lam[1] * V[1][0] + lam[2] * V[2][0],
    lam[0] * V[0][1] + lam[1] * V[1][1] + lam[2] * V[2][1],
  ]
  const convex = lam.every((l) => l >= -1e-9)

  const tri = V.map(([a, b]) => `${toX(a)},${toY(b)}`).join(' ')
  const f = (n: number) => n.toFixed(2)

  return (
    <div className="dvec">
      <div className="dvec-canvas">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={labels.hint ?? 'Affine and convex combinations of three points'}
        >
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          <polygon className="ac-hull" points={tri} />
          {V.map(([a, b], i) => (
            <g key={i}>
              <circle className="ac-vertex" cx={toX(a)} cy={toY(b)} r={6} />
              <text className="mn-tag" x={toX(a) + 10} y={toY(b) - 9}>{`v${i + 1}`}</text>
            </g>
          ))}

          <circle
            className={convex ? 'ac-point' : 'ac-point is-out'}
            cx={toX(x[0])}
            cy={toY(x[1])}
            r={7}
          />
        </svg>
      </div>

      <div className="dvec-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'Two weights are free; the third is fixed by the sum.'}
        </p>

        {(
          [
            ['λ₁', l1, setL1],
            ['λ₂', l2, setL2],
          ] as const
        ).map(([name, val, set]) => (
          <label key={name} className="mplay-slider">
            <span className="mplay-name">{name}</span>
            <input
              type="range"
              min={-1}
              max={2}
              step={0.05}
              value={val}
              onChange={(e) => set(Number(e.target.value))}
              aria-label={name}
            />
            <span className="mplay-val">{val.toFixed(2)}</span>
          </label>
        ))}

        <p className="mplay-readout" aria-live="polite">
          λ₃ = 1 − λ₁ − λ₂ = <strong>{f(l3)}</strong>
        </p>
        <p className="mplay-readout">
          {labels.sum ?? 'λ₁ + λ₂ + λ₃'} = <strong>{f(lam[0] + lam[1] + lam[2])}</strong>
        </p>
        <p className={`lyr-verdict ${convex ? 'is-ok' : 'is-bad'}`} aria-live="polite">
          {convex
            ? (labels.convex ?? 'convex combination: inside the hull')
            : (labels.affineOnly ?? 'a weight is negative: affine but not convex')}
        </p>
        <p className="cs-note">
          {labels.note ??
            'Softmax weights are non-negative and sum to one: attention output never leaves the hull.'}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setL1(0.5)
            setL2(0.2)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
