'use client'

import { useState } from 'react'

type SetId = 'line0' | 'line1' | 'quadrant' | 'parabola' | 'plane' | 'origin'

interface SubspaceTestProps {
  labels?: {
    zero?: string
    addition?: string
    scaling?: string
    isSubspace?: string
    isNot?: string
    counter?: string
  }
  sets?: { value: SetId; label: string }[]
}

const SIZE = 300
const RANGE = 4

interface Spec {
  /** Membership test. */
  has: (x: number, y: number) => boolean
  /** Drawing: a polyline, a filled region flag, or the whole plane. */
  draw: 'line' | 'lineOff' | 'quadrant' | 'parabola' | 'plane' | 'origin'
  /** Sample points used for the closure checks. */
  p: [number, number]
  q: [number, number]
  /** Scalar used for the scaling check. */
  lambda: number
}

const EPS = 1e-9
const SPECS: Record<SetId, Spec> = {
  line0: { has: (x, y) => Math.abs(y - 0.5 * x) < EPS, draw: 'line', p: [2, 1], q: [-2, -1], lambda: -1.5 },
  line1: { has: (x, y) => Math.abs(y - (0.5 * x + 1)) < EPS, draw: 'lineOff', p: [2, 2], q: [-2, 0], lambda: 2 },
  quadrant: { has: (x, y) => x >= -EPS && y >= -EPS, draw: 'quadrant', p: [2, 1], q: [1, 3], lambda: -1 },
  parabola: { has: (x, y) => Math.abs(y - x * x) < EPS, draw: 'parabola', p: [1, 1], q: [2, 4], lambda: 2 },
  plane: { has: () => true, draw: 'plane', p: [2, 1], q: [-1, 2], lambda: -1.5 },
  origin: { has: (x, y) => Math.abs(x) < EPS && Math.abs(y) < EPS, draw: 'origin', p: [0, 0], q: [0, 0], lambda: 3 },
}

export default function SubspaceTest({ labels = {}, sets }: SubspaceTestProps) {
  const options =
    sets ?? [
      { value: 'line0' as SetId, label: 'y = x/2' },
      { value: 'line1' as SetId, label: 'y = x/2 + 1' },
      { value: 'quadrant' as SetId, label: 'x ≥ 0, y ≥ 0' },
      { value: 'parabola' as SetId, label: 'y = x²' },
      { value: 'plane' as SetId, label: 'ℝ²' },
      { value: 'origin' as SetId, label: '{0}' },
    ]

  const [id, setId] = useState<SetId>('line0')
  const s = SPECS[id]

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const sum: [number, number] = [s.p[0] + s.q[0], s.p[1] + s.q[1]]
  const scaled: [number, number] = [s.p[0] * s.lambda, s.p[1] * s.lambda]

  const hasZero = s.has(0, 0)
  const closedAdd = s.has(...sum)
  const closedScale = s.has(...scaled)
  const ok = hasZero && closedAdd && closedScale

  const check = (pass: boolean, text: string, detail?: string) => (
    <li className={pass ? 'sub-check is-ok' : 'sub-check is-bad'}>
      <span aria-hidden="true">{pass ? '✓' : '✕'}</span>
      <div>
        {text}
        {!pass && detail && <em>{detail}</em>}
      </div>
    </li>
  )

  const parabolaPts = Array.from({ length: 41 }, (_, i) => {
    const x = -2 + (i * 4) / 40
    return `${toX(x)},${toY(x * x)}`
  }).join(' ')

  return (
    <div className="sub">
      <div className="sub-canvas">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Subspace test">
          <clipPath id="sub-clip">
            <rect x={0} y={0} width={SIZE} height={SIZE} />
          </clipPath>
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          <g clipPath="url(#sub-clip)">
            {s.draw === 'plane' && <rect className="sub-region" x={0} y={0} width={SIZE} height={SIZE} />}
            {s.draw === 'quadrant' && (
              <rect className="sub-region" x={half} y={0} width={half} height={half} />
            )}
            {s.draw === 'line' && (
              <line className="sub-set" x1={toX(-RANGE)} y1={toY(-RANGE / 2)} x2={toX(RANGE)} y2={toY(RANGE / 2)} />
            )}
            {s.draw === 'lineOff' && (
              <line className="sub-set" x1={toX(-RANGE)} y1={toY(-RANGE / 2 + 1)} x2={toX(RANGE)} y2={toY(RANGE / 2 + 1)} />
            )}
            {s.draw === 'parabola' && <polyline className="sub-set" points={parabolaPts} fill="none" />}
          </g>

          {s.draw === 'origin' && <circle className="sub-pt" cx={toX(0)} cy={toY(0)} r={6} />}
          {id !== 'origin' && (
            <>
              <circle className="sub-pt" cx={toX(s.p[0])} cy={toY(s.p[1])} r={5} />
              <circle className="sub-pt" cx={toX(s.q[0])} cy={toY(s.q[1])} r={5} />
              <circle
                className={closedAdd ? 'sub-sum is-in' : 'sub-sum is-out'}
                cx={toX(sum[0])}
                cy={toY(sum[1])}
                r={6}
              />
            </>
          )}
          <circle className={hasZero ? 'sub-zero is-in' : 'sub-zero is-out'} cx={toX(0)} cy={toY(0)} r={4} />
        </svg>
      </div>

      <div className="sub-controls">
        <div className="chooser-opts">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              className={o.value === id ? 'bc-preset is-active' : 'bc-preset'}
              onClick={() => setId(o.value)}
              aria-pressed={o.value === id}
            >
              {o.label}
            </button>
          ))}
        </div>

        <ul className="sub-checks" aria-live="polite">
          {check(hasZero, labels.zero ?? 'contains 0')}
          {check(
            closedAdd,
            labels.addition ?? 'closed under addition',
            id === 'origin' ? undefined : `(${s.p.join(', ')}) + (${s.q.join(', ')}) = (${sum.join(', ')})`
          )}
          {check(
            closedScale,
            labels.scaling ?? 'closed under scaling',
            id === 'origin' ? undefined : `${s.lambda} · (${s.p.join(', ')}) = (${scaled.join(', ')})`
          )}
        </ul>

        <p className={`sub-verdict ${ok ? 'is-ok' : 'is-bad'}`}>
          {ok ? (labels.isSubspace ?? 'is a subspace') : (labels.isNot ?? 'is not a subspace')}
        </p>
      </div>
    </div>
  )
}
