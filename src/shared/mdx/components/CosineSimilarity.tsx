'use client'

import { useRef, useState } from 'react'

interface CosineSimilarityProps {
  u?: [number, number]
  v?: [number, number]
  labels?: {
    hint?: string
    scale?: string
    cos?: string
    angle?: string
    invariant?: string
    reset?: string
  }
}

const SIZE = 320
const RANGE = 4
const STEP = 0.25

export default function CosineSimilarity({
  u = [3, 1],
  v = [1, 2.5],
  labels = {},
}: CosineSimilarityProps) {
  const [a, setA] = useState<[number, number]>(u)
  const [b, setB] = useState<[number, number]>(v)
  const [lambda, setLambda] = useState(1)
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
    const px = ((e.clientX - r.left) / r.width) * SIZE
    const py = ((e.clientY - r.top) / r.height) * SIZE
    return [clamp((px - half) / unit), clamp((half - py) / unit)]
  }

  const scaled: [number, number] = [a[0] * lambda, a[1] * lambda]
  const na = Math.hypot(...scaled)
  const nb = Math.hypot(...b)
  const dot = scaled[0] * b[0] + scaled[1] * b[1]
  const cos = na > 1e-9 && nb > 1e-9 ? dot / (na * nb) : NaN
  const angle = Number.isNaN(cos) ? NaN : (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI

  const unitOf = (w: [number, number]): [number, number] => {
    const n = Math.hypot(...w)
    return n > 1e-9 ? [w[0] / n, w[1] / n] : [0, 0]
  }
  const ua = unitOf(scaled)
  const ub = unitOf(b)

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
          ArrowRight: [STEP, 0], ArrowLeft: [-STEP, 0], ArrowUp: [0, STEP], ArrowDown: [0, -STEP],
        }
        const m = d[e.key]
        if (!m) return
        e.preventDefault()
        set([clamp(vec[0] + m[0]), clamp(vec[1] + m[1])])
      }}
    >
      <circle cx={toX(vec[0])} cy={toY(vec[1])} r={18} fill="transparent" />
      <circle className="dvec-grip" cx={toX(vec[0])} cy={toY(vec[1])} r={7} style={{ fill: color }} />
    </g>
  )

  return (
    <div className="dvec">
      <div className="dvec-canvas">
        <svg ref={svgRef} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={labels.hint ?? 'Cosine similarity'}>
          <defs>
            <marker id="cs-u" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--vp-a)" />
            </marker>
            <marker id="cs-v" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--vp-b)" />
            </marker>
          </defs>

          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />
          <circle className="cs-circle" cx={half} cy={half} r={unit} />

          <line x1={toX(0)} y1={toY(0)} x2={toX(scaled[0])} y2={toY(scaled[1])}
                stroke="var(--vp-a)" strokeWidth={2.4} markerEnd="url(#cs-u)" />
          <line x1={toX(0)} y1={toY(0)} x2={toX(b[0])} y2={toY(b[1])}
                stroke="var(--vp-b)" strokeWidth={2.4} markerEnd="url(#cs-v)" />

          {/* the normalised pair: identical direction, length one */}
          <line className="cs-unit" x1={toX(0)} y1={toY(0)} x2={toX(ua[0])} y2={toY(ua[1])} stroke="var(--vp-a)" />
          <line className="cs-unit" x1={toX(0)} y1={toY(0)} x2={toX(ub[0])} y2={toY(ub[1])} stroke="var(--vp-b)" />
          <circle className="cs-unit-dot" cx={toX(ua[0])} cy={toY(ua[1])} style={{ fill: 'var(--vp-a)' }} r={4} />
          <circle className="cs-unit-dot" cx={toX(ub[0])} cy={toY(ub[1])} style={{ fill: 'var(--vp-b)' }} r={4} />

          {handle(a, setA, 'var(--vp-a)', 'u')}
          {handle(b, setB, 'var(--vp-b)', 'v')}
        </svg>
      </div>

      <div className="dvec-controls">
        <p className="dvec-hint">{labels.hint ?? 'Drag either tip. The inner arrows are the normalised pair.'}</p>

        <label className="mplay-slider">
          <span className="mplay-name">λ</span>
          <input type="range" min={0.25} max={2} step={0.05} value={lambda}
                 onChange={(e) => setLambda(Number(e.target.value))} aria-label="lambda" />
          <span className="mplay-val">{lambda.toFixed(2)}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          ‖λu‖ = {na.toFixed(2)} · ‖v‖ = {nb.toFixed(2)}
        </p>
        <p className="mplay-readout" aria-live="polite">
          <strong>{labels.cos ?? 'cos θ'}</strong> ={' '}
          {Number.isNaN(cos) ? '—' : cos.toFixed(4)}
          {!Number.isNaN(angle) && <> · θ = {angle.toFixed(1)}°</>}
        </p>
        <p className="cs-note">{labels.invariant ?? 'λ changes ‖λu‖ but never cos θ.'}</p>

        <button className="mplay-reset" type="button"
                onClick={() => { setA(u); setB(v); setLambda(1) }}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
