'use client'

import { useRef, useState } from 'react'

interface DragVectorProps {
  /** Starting vector, in data coordinates. */
  initial?: [number, number]
  /** Second draggable vector. Omit for a single-vector figure. */
  second?: [number, number]
  /** Draw v + w tip-to-tail. Requires `second`. */
  showSum?: boolean
  /** Show the equivalent NumPy snippet. */
  showCode?: boolean
  range?: number
  labels?: {
    hint?: string
    length?: string
    sum?: string
    reset?: string
  }
}

const SIZE = 320
const STEP = 0.5

export default function DragVector({
  initial = [3, 2],
  second,
  showSum = false,
  showCode = true,
  range = 5,
  labels = {},
}: DragVectorProps) {
  const [v, setV] = useState<[number, number]>(initial)
  const [w, setW] = useState<[number, number]>(second ?? [-2, 3])
  const svgRef = useRef<SVGSVGElement>(null)

  const half = SIZE / 2
  const unit = half / range
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const clamp = (n: number) => Math.max(-range, Math.min(range, Math.round(n / STEP) * STEP))

  const fromPointer = (e: React.PointerEvent): [number, number] | null => {
    const svg = svgRef.current
    if (!svg) return null
    const rect = svg.getBoundingClientRect()
    if (!rect.width || !rect.height) return null
    const px = ((e.clientX - rect.left) / rect.width) * SIZE
    const py = ((e.clientY - rect.top) / rect.height) * SIZE
    return [clamp((px - half) / unit), clamp((half - py) / unit)]
  }

  const nudge = (
    cur: [number, number],
    set: (n: [number, number]) => void,
    key: string
  ): boolean => {
    const d: Record<string, [number, number]> = {
      ArrowRight: [STEP, 0],
      ArrowLeft: [-STEP, 0],
      ArrowUp: [0, STEP],
      ArrowDown: [0, -STEP],
    }
    const move = d[key]
    if (!move) return false
    set([clamp(cur[0] + move[0]), clamp(cur[1] + move[1])])
    return true
  }

  const sum: [number, number] = [v[0] + w[0], v[1] + w[1]]
  const norm = Math.hypot(v[0], v[1])

  const ticks: number[] = []
  for (let i = -range; i <= range; i++) if (i !== 0) ticks.push(i)

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
        if (nudge(vec, set, e.key)) e.preventDefault()
      }}
    >
      {/* generous invisible hit target */}
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

  return (
    <div className="dvec">
      <div className="dvec-canvas">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={labels.hint ?? 'Drag the vector tips'}
        >
          <defs>
            <marker id="dv-v" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--vp-a)" />
            </marker>
            <marker id="dv-w" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--vp-b)" />
            </marker>
            <marker id="dv-s" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--vp-c)" />
            </marker>
          </defs>

          {ticks.map((k) => (
            <g key={k}>
              <line className="vplot-grid" x1={toX(k)} y1={0} x2={toX(k)} y2={SIZE} />
              <line className="vplot-grid" x1={0} y1={toY(k)} x2={SIZE} y2={toY(k)} />
            </g>
          ))}
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          {showSum && second && (
            <line
              className="dvec-ghost"
              x1={toX(v[0])}
              y1={toY(v[1])}
              x2={toX(sum[0])}
              y2={toY(sum[1])}
              stroke="var(--vp-b)"
            />
          )}

          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(v[0])}
            y2={toY(v[1])}
            stroke="var(--vp-a)"
            strokeWidth={2.6}
            markerEnd="url(#dv-v)"
          />
          {second && (
            <line
              x1={toX(0)}
              y1={toY(0)}
              x2={toX(w[0])}
              y2={toY(w[1])}
              stroke="var(--vp-b)"
              strokeWidth={2.6}
              markerEnd="url(#dv-w)"
            />
          )}
          {showSum && second && (
            <line
              x1={toX(0)}
              y1={toY(0)}
              x2={toX(sum[0])}
              y2={toY(sum[1])}
              stroke="var(--vp-c)"
              strokeWidth={3}
              markerEnd="url(#dv-s)"
            />
          )}

          {handle(v, setV, 'var(--vp-a)', 'v')}
          {second && handle(w, setW, 'var(--vp-b)', 'w')}
        </svg>
      </div>

      <div className="dvec-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'Drag either tip — or focus it and use the arrow keys.'}
        </p>

        <p className="mplay-readout" aria-live="polite">
          <strong style={{ color: 'var(--vp-a)' }}>v</strong> = ({v[0].toFixed(1)},{' '}
          {v[1].toFixed(1)}){'  ·  '}
          {labels.length ?? '‖v‖'} = {norm.toFixed(2)}
        </p>
        {second && (
          <p className="mplay-readout" aria-live="polite">
            <strong style={{ color: 'var(--vp-b)' }}>w</strong> = ({w[0].toFixed(1)},{' '}
            {w[1].toFixed(1)})
          </p>
        )}
        {showSum && second && (
          <p className="mplay-readout" aria-live="polite">
            <strong style={{ color: 'var(--vp-c)' }}>{labels.sum ?? 'v + w'}</strong> = (
            {sum[0].toFixed(1)}, {sum[1].toFixed(1)})
          </p>
        )}

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setV(initial)
            setW(second ?? [-2, 3])
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>

      {showCode && (
        <pre className="mplay-code">
          <code>{`import numpy as np

v = np.array([${v[0]}, ${v[1]}])${
            second
              ? `
w = np.array([${w[0]}, ${w[1]}])`
              : ''
          }${
            showSum && second
              ? `

v + w                # array([${sum[0]}, ${sum[1]}])`
              : `

np.linalg.norm(v)    # ${norm.toFixed(6)}`
          }`}</code>
        </pre>
      )}
    </div>
  )
}
