'use client'

import { useEffect, useMemo, useState } from 'react'

interface GradientStepsProps {
  /** Curvature of f(w) = ½(a·w₁² + b·w₂²). */
  a?: number
  b?: number
  start?: [number, number]
  maxSteps?: number
  labels?: {
    hint?: string
    rate?: string
    steps?: string
    norm?: string
    converges?: string
    diverges?: string
    threshold?: string
    reset?: string
  }
}

const SIZE = 320
const RANGE = 3

export default function GradientSteps({
  a = 1,
  b = 4,
  start = [2.4, 1.4],
  maxSteps = 24,
  labels = {},
}: GradientStepsProps) {
  const [lr, setLr] = useState(0.2)
  const [shown, setShown] = useState(maxSteps)
  const [playing, setPlaying] = useState(false)

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  // w ← w − α∇f contracts each axis by (1 − α·curvature).
  const path = useMemo(() => {
    const pts: Array<[number, number]> = [start]
    let [x, y] = start
    for (let k = 0; k < maxSteps; k++) {
      x = x * (1 - lr * a)
      y = y * (1 - lr * b)
      if (!Number.isFinite(x) || !Number.isFinite(y) || Math.abs(x) > 1e6 || Math.abs(y) > 1e6)
        break
      pts.push([x, y])
    }
    return pts
  }, [lr, a, b, start, maxSteps])

  const critical = 2 / Math.max(a, b)
  const converges = Math.abs(1 - lr * a) < 1 && Math.abs(1 - lr * b) < 1
  const visible = path.slice(0, shown + 1)
  const last = visible[visible.length - 1]
  const dist = Math.hypot(last[0], last[1])

  useEffect(() => {
    if (!playing) return
    if (shown >= path.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setShown((s) => s + 1), 220)
    return () => clearTimeout(t)
  }, [playing, shown, path.length])

  // Level sets of f are ellipses with semi-axes proportional to 1/√curvature.
  const ellipses = [0.5, 1, 1.75, 2.6].map((c) => ({
    rx: (c / Math.sqrt(a)) * unit,
    ry: (c / Math.sqrt(b)) * unit,
  }))

  const clamp = (v: number) => Math.max(-RANGE * 1.4, Math.min(RANGE * 1.4, v))

  return (
    <div className="gstep">
      <div className="gstep-canvas">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={labels.hint ?? 'Gradient descent path'}
        >
          {ellipses.map((e, i) => (
            <ellipse key={i} className="gstep-level" cx={half} cy={half} rx={e.rx} ry={e.ry} />
          ))}
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />

          <polyline
            className="gstep-path"
            points={visible.map(([x, y]) => `${toX(clamp(x))},${toY(clamp(y))}`).join(' ')}
          />
          {visible.map(([x, y], i) => (
            <circle
              key={i}
              className={i === visible.length - 1 ? 'gstep-dot is-last' : 'gstep-dot'}
              cx={toX(clamp(x))}
              cy={toY(clamp(y))}
              r={i === visible.length - 1 ? 5 : 3}
            />
          ))}
          <circle className="gstep-min" cx={half} cy={half} r={4} />
        </svg>
      </div>

      <div className="gstep-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'The learning rate is the only thing changing.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">α</span>
          <input
            type="range"
            min={0.02}
            max={0.7}
            step={0.01}
            value={lr}
            onChange={(e) => {
              setLr(Number(e.target.value))
              setShown(maxSteps)
              setPlaying(false)
            }}
            aria-label="learning rate"
          />
          <span className="mplay-val">{lr.toFixed(2)}</span>
        </label>

        <p className={`gstep-verdict ${converges ? 'is-ok' : 'is-bad'}`} aria-live="polite">
          {converges ? (labels.converges ?? 'Converges') : (labels.diverges ?? 'Diverges')}
        </p>
        <p className="mplay-readout">
          {labels.threshold ?? 'stable while α <'} {critical.toFixed(2)}
        </p>
        <p className="mplay-readout">
          {labels.norm ?? '‖w‖ after'} {shown} {labels.steps ?? 'steps'} ={' '}
          <strong>{dist > 1e5 ? '→ ∞' : dist.toFixed(3)}</strong>
        </p>

        <div className="elim-buttons">
          <button
            type="button"
            className="elim-btn is-play"
            onClick={() => {
              if (shown >= path.length - 1) setShown(0)
              setPlaying((p) => !p)
            }}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <button
            className="mplay-reset"
            type="button"
            onClick={() => {
              setLr(0.2)
              setShown(maxSteps)
              setPlaying(false)
            }}
          >
            {labels.reset ?? 'Reset'}
          </button>
        </div>
      </div>
    </div>
  )
}
