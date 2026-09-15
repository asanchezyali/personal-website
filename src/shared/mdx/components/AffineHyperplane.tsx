'use client'

import { useRef, useState } from 'react'

interface AffineHyperplaneProps {
  /** Normal of the hyperplane; its direction fixes the orientation. */
  w?: [number, number]
  /** Offset. With b = 0 the hyperplane is forced through the origin. */
  b?: number
  point?: [number, number]
  labels?: {
    hint?: string
    score?: string
    distance?: string
    positive?: string
    negative?: string
    onPlane?: string
    throughOrigin?: string
    reset?: string
  }
}

const SIZE = 320
const RANGE = 4
const STEP = 0.25

export default function AffineHyperplane({
  w = [2, 1],
  b = -2,
  point = [2, 2],
  labels = {},
}: AffineHyperplaneProps) {
  const [nrm, setNrm] = useState<[number, number]>(w)
  const [off, setOff] = useState(b)
  const [pt, setPt] = useState<[number, number]>(point)
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

  const ww = nrm[0] * nrm[0] + nrm[1] * nrm[1]
  const ok = ww > 1e-9
  const nw = ok ? Math.sqrt(ww) : 1
  const wh: [number, number] = [nrm[0] / nw, nrm[1] / nw]
  // direction along the hyperplane: the quarter turn of the normal
  const dir: [number, number] = [-wh[1], wh[0]]
  // the point of the hyperplane closest to the origin
  const anchor: [number, number] = ok ? [(-off / ww) * nrm[0], (-off / ww) * nrm[1]] : [0, 0]

  // wᵀx + b is the score; dividing by ‖w‖ turns it into a signed distance.
  const score = nrm[0] * pt[0] + nrm[1] * pt[1] + off
  const dist = ok ? score / nw : 0
  const foot: [number, number] = [pt[0] - dist * wh[0], pt[1] - dist * wh[1]]

  const far = RANGE * 2.4
  const A: [number, number] = [anchor[0] - far * dir[0], anchor[1] - far * dir[1]]
  const B: [number, number] = [anchor[0] + far * dir[0], anchor[1] + far * dir[1]]
  const poly = [
    A,
    B,
    [B[0] + far * wh[0], B[1] + far * wh[1]],
    [A[0] + far * wh[0], A[1] + far * wh[1]],
  ]
    .map(([x, y]) => `${toX(x)},${toY(y)}`)
    .join(' ')

  const f = (n: number) => n.toFixed(2)
  const side =
    Math.abs(score) < 1e-9
      ? (labels.onPlane ?? 'on the hyperplane')
      : score > 0
        ? (labels.positive ?? 'positive side')
        : (labels.negative ?? 'negative side')

  const drag = (
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

  return (
    <div className="dvec">
      <div className="dvec-canvas">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={labels.hint ?? 'An affine hyperplane and the signed distance to it'}
        >
          <clipPath id="ah-clip">
            <rect x={0} y={0} width={SIZE} height={SIZE} />
          </clipPath>
          <g clipPath="url(#ah-clip)">
            <polygon className="ah-side" points={poly} />
          </g>

          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          <g clipPath="url(#ah-clip)">
            <line
              className="ah-plane"
              x1={toX(A[0])}
              y1={toY(A[1])}
              x2={toX(B[0])}
              y2={toY(B[1])}
            />
            {/* the unit normal, anchored on the hyperplane */}
            <line
              className="ah-unit"
              x1={toX(anchor[0])}
              y1={toY(anchor[1])}
              x2={toX(anchor[0] + wh[0])}
              y2={toY(anchor[1] + wh[1])}
            />
            {/* w itself, drawn from the origin like every other vector in the course */}
            <line
              className="ah-normal"
              x1={half}
              y1={half}
              x2={toX(nrm[0])}
              y2={toY(nrm[1])}
              markerEnd="url(#ah-head)"
            />
            {/* the perpendicular that realises the distance */}
            <line
              className="ah-drop"
              x1={toX(pt[0])}
              y1={toY(pt[1])}
              x2={toX(foot[0])}
              y2={toY(foot[1])}
            />
          </g>

          <circle className="ah-foot" cx={toX(foot[0])} cy={toY(foot[1])} r={4} />
          {drag(nrm, setNrm, 'var(--vp-c)', 'w')}
          {drag(pt, setPt, score >= 0 ? 'var(--vp-b)' : 'var(--vp-a)', 'x')}
          <text className="mn-tag is-row" x={toX(nrm[0]) + 12} y={toY(nrm[1]) - 10}>
            w
          </text>
          <text className="mn-tag" x={toX(pt[0]) + 12} y={toY(pt[1]) - 10}>
            x
          </text>

          <defs>
            <marker id="ah-head" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--vp-c)" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="dvec-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'Drag the normal w or the point x; slide the offset b.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">b</span>
          <input
            type="range"
            min={-4}
            max={4}
            step={0.25}
            value={off}
            onChange={(e) => setOff(Number(e.target.value))}
            aria-label="b"
          />
          <span className="mplay-val">{off.toFixed(2)}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          {labels.score ?? 'wᵀx + b'} = <strong>{f(score)}</strong> · {side}
        </p>
        <p className="mplay-readout">
          {labels.distance ?? 'distance'} = |wᵀx + b| / ‖w‖ = <strong>{f(Math.abs(dist))}</strong>
        </p>
        <p className="cs-note">
          {off === 0
            ? (labels.throughOrigin ?? 'With b = 0 the hyperplane passes through the origin.')
            : ''}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setNrm(w)
            setOff(b)
            setPt(point)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
