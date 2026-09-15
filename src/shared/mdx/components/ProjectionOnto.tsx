'use client'

import { useRef, useState } from 'react'

interface ProjectionOntoProps {
  /** Direction spanning the line; only its direction matters. */
  v?: [number, number]
  w?: [number, number]
  labels?: {
    hint?: string
    proj?: string
    residual?: string
    idempotent?: string
    reset?: string
  }
}

const SIZE = 320
const RANGE = 4
const STEP = 0.25

export default function ProjectionOnto({
  v = [3, 1],
  w = [1, 2.5],
  labels = {},
}: ProjectionOntoProps) {
  const [dir, setDir] = useState<[number, number]>(v)
  const [pt, setPt] = useState<[number, number]>(w)
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

  const vv = dir[0] * dir[0] + dir[1] * dir[1]
  const ok = vv > 1e-9
  // P = v vᵀ / vᵀv projects onto the line spanned by v.
  const P = ok
    ? [
        [(dir[0] * dir[0]) / vv, (dir[0] * dir[1]) / vv],
        [(dir[1] * dir[0]) / vv, (dir[1] * dir[1]) / vv],
      ]
    : [
        [0, 0],
        [0, 0],
      ]
  const proj: [number, number] = [
    P[0][0] * pt[0] + P[0][1] * pt[1],
    P[1][0] * pt[0] + P[1][1] * pt[1],
  ]
  const res: [number, number] = [pt[0] - proj[0], pt[1] - proj[1]]
  const normRes = Math.hypot(...res)
  // P² = P, so projecting twice changes nothing.
  const twice: [number, number] = [
    P[0][0] * proj[0] + P[0][1] * proj[1],
    P[1][0] * proj[0] + P[1][1] * proj[1],
  ]
  const idem = Math.hypot(twice[0] - proj[0], twice[1] - proj[1]) < 1e-9

  const far = RANGE * 1.6
  const nd = ok ? Math.sqrt(vv) : 1
  const u: [number, number] = [dir[0] / nd, dir[1] / nd]

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

  const f = (n: number) => n.toFixed(2)

  return (
    <div className="dvec">
      <div className="dvec-canvas">
        <svg ref={svgRef} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={labels.hint ?? 'Projection onto a line'}>
          <clipPath id="proj-clip"><rect x={0} y={0} width={SIZE} height={SIZE} /></clipPath>
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          <g clipPath="url(#proj-clip)">
            <line className="sub-set" x1={toX(-far * u[0])} y1={toY(-far * u[1])}
                  x2={toX(far * u[0])} y2={toY(far * u[1])} />
            <line className="proj-res" x1={toX(pt[0])} y1={toY(pt[1])} x2={toX(proj[0])} y2={toY(proj[1])} />
          </g>

          <circle className="proj-dot" cx={toX(proj[0])} cy={toY(proj[1])} r={6} />
          {handle(dir, setDir, 'var(--vp-c)', 'v')}
          {handle(pt, setPt, 'var(--vp-a)', 'w')}
        </svg>
      </div>

      <div className="dvec-controls">
        <p className="dvec-hint">{labels.hint ?? 'Drag the direction of the line, or the point being projected.'}</p>

        <p className="mplay-readout" aria-live="polite">
          <strong style={{ color: 'var(--vp-b)' }}>{labels.proj ?? 'Pw'}</strong> = ({f(proj[0])}, {f(proj[1])})
        </p>
        <p className="mplay-readout" aria-live="polite">
          {labels.residual ?? '‖w − Pw‖'} = {f(normRes)}
        </p>

        <div className="mmul-bracket proj-matrix">
          <div className="mmul-cells" style={{ gridTemplateColumns: 'repeat(2, minmax(44px, auto))' }}>
            {P.flat().map((x, i) => (
              <span key={i} className="mmul-cell">{f(x)}</span>
            ))}
          </div>
        </div>

        <p className="cs-note">
          {labels.idempotent ?? 'P² = P: projecting an already projected point changes nothing.'}
          {idem ? ' ✓' : ''}
        </p>

        <button className="mplay-reset" type="button" onClick={() => { setDir(v); setPt(w) }}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
