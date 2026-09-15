'use client'

import { useRef, useState } from 'react'

interface LinearityCheckProps {
  a?: [number, number, number, number]
  x?: [number, number]
  y?: [number, number]
  labels?: {
    hint?: string
    domain?: string
    codomain?: string
    combine?: string
    apply?: string
    agree?: string
    reset?: string
  }
}

const SIZE = 150
const RANGE = 5
const STEP = 0.5

export default function LinearityCheck({
  a = [1.2, -0.6, 0.5, 1.1],
  x = [2, 1],
  y = [-1, 2],
  labels = {},
}: LinearityCheckProps) {
  const [vx, setVx] = useState<[number, number]>(x)
  const [vy, setVy] = useState<[number, number]>(y)
  const [lam, setLam] = useState(1.5)
  const ref = useRef<SVGSVGElement>(null)

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (p: number) => half + p * unit
  const toY = (p: number) => half - p * unit
  const clamp = (n: number) => Math.max(-RANGE, Math.min(RANGE, Math.round(n / STEP) * STEP))

  const apply = (v: [number, number]): [number, number] => [
    a[0] * v[0] + a[1] * v[1],
    a[2] * v[0] + a[3] * v[1],
  ]

  const comb: [number, number] = [lam * vx[0] + vy[0], lam * vx[1] + vy[1]]
  const imgX = apply(vx)
  const imgY = apply(vy)
  // Route 1: combine, then apply. Route 2: apply, then combine.
  const route1 = apply(comb)
  const route2: [number, number] = [lam * imgX[0] + imgY[0], lam * imgX[1] + imgY[1]]
  const gap = Math.hypot(route1[0] - route2[0], route1[1] - route2[1])

  const fromPointer = (e: React.PointerEvent): [number, number] | null => {
    const svg = ref.current
    if (!svg) return null
    const r = svg.getBoundingClientRect()
    if (!r.width) return null
    return [
      clamp((((e.clientX - r.left) / r.width) * SIZE - half) / unit),
      clamp((half - ((e.clientY - r.top) / r.height) * SIZE) / unit),
    ]
  }

  const handle = (vec: [number, number], set: (n: [number, number]) => void, color: string, name: string) => (
    <g className="dvec-handle" tabIndex={0} role="button" aria-label={`${name} = (${vec[0]}, ${vec[1]})`}
       onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); const p = fromPointer(e); if (p) set(p) }}
       onPointerMove={(e) => { if (!e.currentTarget.hasPointerCapture(e.pointerId)) return; const p = fromPointer(e); if (p) set(p) }}
       onKeyDown={(e) => {
         const d: Record<string, [number, number]> = {
           ArrowRight: [STEP, 0], ArrowLeft: [-STEP, 0], ArrowUp: [0, STEP], ArrowDown: [0, -STEP],
         }
         const m = d[e.key]
         if (!m) return
         e.preventDefault()
         set([clamp(vec[0] + m[0]), clamp(vec[1] + m[1])])
       }}>
      <circle cx={toX(vec[0])} cy={toY(vec[1])} r={13} fill="transparent" />
      <circle className="dvec-grip" cx={toX(vec[0])} cy={toY(vec[1])} r={5} style={{ fill: color }} />
    </g>
  )

  const panel = (
    title: string,
    vectors: Array<{ v: [number, number]; color: string; bold?: boolean }>,
    withHandles: boolean
  ) => (
    <div className="lc-panel">
      <span className="mmul-name">{title}</span>
      <svg ref={withHandles ? ref : undefined} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={title}>
        <clipPath id={`lc-${title}`}><rect x={0} y={0} width={SIZE} height={SIZE} /></clipPath>
        <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
        <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />
        <g clipPath={`url(#lc-${title})`}>
          {vectors.map((o, i) => (
            <line key={i} x1={toX(0)} y1={toY(0)} x2={toX(o.v[0])} y2={toY(o.v[1])}
                  stroke={o.color} strokeWidth={o.bold ? 3 : 1.8} opacity={o.bold ? 1 : 0.75} />
          ))}
        </g>
        {withHandles && (
          <>
            {handle(vx, setVx, 'var(--vp-a)', 'x')}
            {handle(vy, setVy, 'var(--vp-b)', 'y')}
          </>
        )}
      </svg>
    </div>
  )

  const f = (n: number) => n.toFixed(2)

  return (
    <div className="lc">
      <div className="lc-stage">
        <div className="lc-row">
          {panel(labels.domain ?? 'x, y', [
            { v: vx, color: 'var(--vp-a)' },
            { v: vy, color: 'var(--vp-b)' },
            { v: comb, color: 'var(--vp-c)', bold: true },
          ], true)}
          <span className="mmul-op">Φ →</span>
          {panel(labels.codomain ?? 'Φ(x), Φ(y)', [
            { v: imgX, color: 'var(--vp-a)' },
            { v: imgY, color: 'var(--vp-b)' },
            { v: route1, color: 'var(--vp-c)', bold: true },
          ], false)}
        </div>
        <p className="mmul-formula" aria-live="polite">
          {labels.combine ?? 'Φ(λx + y)'} = ({f(route1[0])}, {f(route1[1])}) ·{' '}
          {labels.apply ?? 'λΦ(x) + Φ(y)'} = ({f(route2[0])}, {f(route2[1])})
        </p>
      </div>

      <div className="lc-controls">
        <p className="dvec-hint">{labels.hint ?? 'Drag x or y on the left panel.'}</p>
        <label className="mplay-slider">
          <span className="mplay-name">λ</span>
          <input type="range" min={-2} max={3} step={0.1} value={lam}
                 onChange={(e) => setLam(Number(e.target.value))} aria-label="lambda" />
          <span className="mplay-val">{lam.toFixed(1)}</span>
        </label>
        <p className="lc-verdict" aria-live="polite">
          {labels.agree ?? 'difference'} = {gap.toExponential(0)}
        </p>
        <button className="mplay-reset" type="button"
                onClick={() => { setVx(x); setVy(y); setLam(1.5) }}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
