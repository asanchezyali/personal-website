'use client'

import { useRef, useState } from 'react'

interface MinimumNormProps {
  /** The single row of A; it fixes both the row space and the kernel. */
  a?: [number, number]
  b?: number
  labels?: {
    hint?: string
    kernel?: string
    solutions?: string
    minimal?: string
    current?: string
    decomposition?: string
    note?: string
    reset?: string
  }
}

const SIZE = 320
const RANGE = 4
const STEP = 0.25

export default function MinimumNorm({ a = [2, 1], b = 2, labels = {} }: MinimumNormProps) {
  const [row, setRow] = useState<[number, number]>(a)
  const [t, setT] = useState(1.4)
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

  const aa = row[0] * row[0] + row[1] * row[1]
  const ok = aa > 1e-9

  // x† = Aᵀ(AAᵀ)⁻¹b — the solution that lies in the row space.
  const xmin: [number, number] = ok ? [(b / aa) * row[0], (b / aa) * row[1]] : [0, 0]
  // The kernel is spanned by the quarter turn of the row.
  const ker: [number, number] = [-row[1], row[0]]
  const kn = Math.hypot(...ker)
  const ku: [number, number] = ok ? [ker[0] / kn, ker[1] / kn] : [0, 0]

  // Every solution is x† + t·k̂, and ‖x‖² = ‖x†‖² + t².
  const x: [number, number] = [xmin[0] + t * ku[0], xmin[1] + t * ku[1]]
  const nmin = Math.hypot(...xmin)
  const ncur = Math.hypot(...x)
  const residual = Math.abs(row[0] * x[0] + row[1] * x[1] - b)

  const far = RANGE * 2
  const f = (n: number) => n.toFixed(2)

  return (
    <div className="dvec">
      <div className="dvec-canvas">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={labels.hint ?? 'The solution set is a translate of the kernel'}
        >
          <clipPath id="mn-clip">
            <rect x={0} y={0} width={SIZE} height={SIZE} />
          </clipPath>
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          <g clipPath="url(#mn-clip)">
            {/* the kernel, through the origin */}
            <line
              className="mn-ker"
              x1={toX(-far * ku[0])}
              y1={toY(-far * ku[1])}
              x2={toX(far * ku[0])}
              y2={toY(far * ku[1])}
            />
            {/* the solution set, parallel to it */}
            <line
              className="mn-sol"
              x1={toX(xmin[0] - far * ku[0])}
              y1={toY(xmin[1] - far * ku[1])}
              x2={toX(xmin[0] + far * ku[0])}
              y2={toY(xmin[1] + far * ku[1])}
            />
            {/* the row space: the direction x† lives on */}
            <line
              className="mn-row"
              x1={toX(-far * row[0])}
              y1={toY(-far * row[1])}
              x2={toX(far * row[0])}
              y2={toY(far * row[1])}
            />
            {/* radius to the current solution, and to the shortest one */}
            <line className="mn-reach" x1={toX(0)} y1={toY(0)} x2={toX(x[0])} y2={toY(x[1])} />
            <line
              className="mn-reach is-min"
              x1={toX(0)}
              y1={toY(0)}
              x2={toX(xmin[0])}
              y2={toY(xmin[1])}
            />
            <circle className="mn-ring" cx={half} cy={half} r={ncur * unit} />
          </g>

          {/* x† is the foot of the perpendicular from the origin: mark the right angle */}
          {nmin > 0.3 &&
            (() => {
              const u: [number, number] = [xmin[0] / nmin, xmin[1] / nmin]
              const s = 9 / unit
              const pts = [
                [xmin[0] - s * u[0], xmin[1] - s * u[1]],
                [xmin[0] - s * u[0] + s * ku[0], xmin[1] - s * u[1] + s * ku[1]],
                [xmin[0] + s * ku[0], xmin[1] + s * ku[1]],
              ]
              return (
                <polyline
                  className="mn-right"
                  points={pts.map(([px, py]) => `${toX(px)},${toY(py)}`).join(' ')}
                />
              )
            })()}

          <circle className="mn-dot is-min" cx={toX(xmin[0])} cy={toY(xmin[1])} r={6} />
          <circle className="mn-dot" cx={toX(x[0])} cy={toY(x[1])} r={6} />
          <text className="mn-tag is-min" x={toX(xmin[0]) + 10} y={toY(xmin[1]) + 15}>
            x†
          </text>
          <text className="mn-tag" x={toX(x[0]) + 10} y={toY(x[1]) - 8}>
            x
          </text>
          <text className="mn-tag is-row" x={toX(row[0]) + 12} y={toY(row[1]) - 10}>
            a
          </text>

          <g
            className="dvec-handle"
            tabIndex={0}
            role="button"
            aria-label={`a = (${row[0]}, ${row[1]})`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId)
              const p = fromPointer(e)
              if (p) setRow(p)
            }}
            onPointerMove={(e) => {
              if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
              const p = fromPointer(e)
              if (p) setRow(p)
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
              setRow([clamp(row[0] + m[0]), clamp(row[1] + m[1])])
            }}
          >
            <circle cx={toX(row[0])} cy={toY(row[1])} r={18} fill="transparent" />
            <circle
              className="dvec-grip"
              cx={toX(row[0])}
              cy={toY(row[1])}
              r={7}
              style={{ fill: 'var(--vp-c)' }}
            />
          </g>
        </svg>
      </div>

      <div className="dvec-controls">
        <p className="dvec-hint">{labels.hint ?? 'Drag the row of A; slide along the kernel.'}</p>

        <label className="mplay-slider">
          <span className="mplay-name">t</span>
          <input
            type="range"
            min={-3}
            max={3}
            step={0.05}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            aria-label="t"
          />
          <span className="mplay-val">{t.toFixed(2)}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          {labels.current ?? '‖x‖'} = <strong>{f(ncur)}</strong> · {labels.minimal ?? '‖x†‖'} ={' '}
          <strong style={{ color: 'var(--vp-c)' }}>{f(nmin)}</strong>
        </p>
        <p className="mplay-readout">
          {labels.decomposition ?? '‖x‖² = ‖x†‖² + t²'} · {f(ncur * ncur)} = {f(nmin * nmin)} +{' '}
          {f(t * t)}
        </p>
        <p className="cs-note">
          {labels.note ??
            'Every point on the line solves Ax = b; only one of them lies in the row space.'}
          {residual < 1e-9 ? ' ✓' : ''}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setRow(a)
            setT(1.4)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
