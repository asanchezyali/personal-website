'use client'

import { useRef, useState } from 'react'

interface CoordinatesInBasisProps {
  b1?: [number, number]
  b2?: [number, number]
  v?: [number, number]
  labels?: {
    hint?: string
    canonical?: string
    inBasis?: string
    degenerate?: string
    reconstruct?: string
    reset?: string
  }
}

const SIZE = 320
const RANGE = 4
const STEP = 0.25

export default function CoordinatesInBasis({
  b1 = [2, 0.5],
  b2 = [-0.5, 1.5],
  v = [3, 2],
  labels = {},
}: CoordinatesInBasisProps) {
  const [u1, setU1] = useState<[number, number]>(b1)
  const [u2, setU2] = useState<[number, number]>(b2)
  const [pt, setPt] = useState<[number, number]>(v)
  const svgRef = useRef<SVGSVGElement>(null)

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit
  const clamp = (n: number) => Math.max(-RANGE, Math.min(RANGE, Math.round(n / STEP) * STEP))

  const fromPointer = (e: React.PointerEvent): [number, number] | null => {
    const svg = svgRef.current
    if (!svg) return null
    const r = svg.getBoundingClientRect()
    if (!r.width) return null
    return [
      clamp((((e.clientX - r.left) / r.width) * SIZE - half) / unit),
      clamp((half - ((e.clientY - r.top) / r.height) * SIZE) / unit),
    ]
  }

  // Coordinates in the basis: solve B c = v for the 2×2 case.
  const det = u1[0] * u2[1] - u2[0] * u1[1]
  const degenerate = Math.abs(det) < 1e-9
  const c: [number, number] = degenerate
    ? [0, 0]
    : [(pt[0] * u2[1] - u2[0] * pt[1]) / det, (u1[0] * pt[1] - pt[0] * u1[1]) / det]

  // Grid lines of the basis, drawn as the lattice it defines.
  const lattice: Array<[number, number, number, number]> = []
  if (!degenerate) {
    for (let k = -6; k <= 6; k++) {
      lattice.push([
        k * u1[0] - 8 * u2[0],
        k * u1[1] - 8 * u2[1],
        k * u1[0] + 8 * u2[0],
        k * u1[1] + 8 * u2[1],
      ])
      lattice.push([
        k * u2[0] - 8 * u1[0],
        k * u2[1] - 8 * u1[1],
        k * u2[0] + 8 * u1[0],
        k * u2[1] + 8 * u1[1],
      ])
    }
  }

  const handle = (
    vec: [number, number],
    set: (n: [number, number]) => void,
    color: string,
    name: string
  ) => (
    <g
      className="dvec-handle"
      tabIndex={0}
      role="button"
      aria-label={`${name} = (${vec[0]}, ${vec[1]})`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        const p = fromPointer(e)
        if (p) set(p)
      }}
      onPointerMove={(e) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
        const p = fromPointer(e)
        if (p) set(p)
      }}
      onKeyDown={(e) => {
        const d: Record<string, [number, number]> = {
          ArrowRight: [STEP, 0],
          ArrowLeft: [-STEP, 0],
          ArrowUp: [0, STEP],
          ArrowDown: [0, -STEP],
        }
        const m = d[e.key]
        if (!m) return
        e.preventDefault()
        set([clamp(vec[0] + m[0]), clamp(vec[1] + m[1])])
      }}
    >
      <circle cx={toX(vec[0])} cy={toY(vec[1])} r={18} fill="transparent" />
      <circle
        className="dvec-grip"
        cx={toX(vec[0])}
        cy={toY(vec[1])}
        r={7}
        style={{ fill: color }}
      />
    </g>
  )

  const f = (n: number) => (Math.abs(n) < 1e-9 ? '0' : n.toFixed(2))

  return (
    <div className="dvec">
      <div className="dvec-canvas">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={labels.hint ?? 'Coordinates in a basis'}
        >
          <clipPath id="cib-clip">
            <rect x={0} y={0} width={SIZE} height={SIZE} />
          </clipPath>
          <g clipPath="url(#cib-clip)">
            {lattice.map((l, i) => (
              <line
                key={i}
                className="cib-lattice"
                x1={toX(l[0])}
                y1={toY(l[1])}
                x2={toX(l[2])}
                y2={toY(l[3])}
              />
            ))}
          </g>
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          {!degenerate && (
            <g clipPath="url(#cib-clip)">
              <line
                className="cib-step"
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(c[0] * u1[0])}
                y2={toY(c[0] * u1[1])}
              />
              <line
                className="cib-step"
                x1={toX(c[0] * u1[0])}
                y1={toY(c[0] * u1[1])}
                x2={toX(pt[0])}
                y2={toY(pt[1])}
              />
            </g>
          )}

          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(u1[0])}
            y2={toY(u1[1])}
            stroke="var(--vp-a)"
            strokeWidth={2.6}
          />
          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(u2[0])}
            y2={toY(u2[1])}
            stroke="var(--vp-b)"
            strokeWidth={2.6}
          />
          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(pt[0])}
            y2={toY(pt[1])}
            stroke="var(--vp-c)"
            strokeWidth={2.6}
          />

          {handle(u1, setU1, 'var(--vp-a)', 'b1')}
          {handle(u2, setU2, 'var(--vp-b)', 'b2')}
          {handle(pt, setPt, 'var(--vp-c)', 'v')}
        </svg>
      </div>

      <div className="dvec-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'Drag the two basis vectors, or the vector being expressed.'}
        </p>

        <p className="mplay-readout" aria-live="polite">
          <strong>{labels.canonical ?? '[v]ₑ'}</strong> = ({f(pt[0])}, {f(pt[1])})
        </p>
        <p className="mplay-readout" aria-live="polite">
          <strong style={{ color: 'var(--vp-c)' }}>{labels.inBasis ?? '[v]_B'}</strong> ={' '}
          {degenerate ? '—' : `(${f(c[0])}, ${f(c[1])})`}
        </p>
        {degenerate ? (
          <p className="cond-warning">
            {labels.degenerate ?? 'b₁ and b₂ are dependent: not a basis.'}
          </p>
        ) : (
          <p className="cs-note">
            {labels.reconstruct ?? 'v = c₁b₁ + c₂b₂'} = {f(c[0])}·b₁ + {f(c[1])}·b₂
          </p>
        )}

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setU1(b1)
            setU2(b2)
            setPt(v)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
