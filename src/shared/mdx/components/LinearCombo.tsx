'use client'

import { useState } from 'react'

interface LinearComboProps {
  v?: [number, number]
  w?: [number, number]
  labels?: { result?: string; reset?: string; degenerate?: string }
}

const RANGE = 5
const SIZE = 320

export default function LinearCombo({
  v = [2, 1],
  w = [-1, 2],
  labels = {},
}: LinearComboProps) {
  const [s, setS] = useState(1)
  const [t, setT] = useState(1)

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const rx = s * v[0] + t * w[0]
  const ry = s * v[1] + t * w[1]

  const det = v[0] * w[1] - v[1] * w[0]
  const degenerate = Math.abs(det) < 1e-9

  const ticks: number[] = []
  for (let i = -RANGE; i <= RANGE; i++) if (i !== 0) ticks.push(i)

  return (
    <div className="lcombo">
      <div className="lcombo-canvas">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Linear combination of two vectors">
          <defs>
            <marker id="lc-v" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--vp-a)" />
            </marker>
            <marker id="lc-w" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--vp-b)" />
            </marker>
            <marker id="lc-r" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
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

          {/* scaled components, drawn tip-to-tail */}
          <line
            className="lcombo-ghost"
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(s * v[0])}
            y2={toY(s * v[1])}
            stroke="var(--vp-a)"
          />
          <line
            className="lcombo-ghost"
            x1={toX(s * v[0])}
            y1={toY(s * v[1])}
            x2={toX(rx)}
            y2={toY(ry)}
            stroke="var(--vp-b)"
          />

          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(v[0])}
            y2={toY(v[1])}
            stroke="var(--vp-a)"
            strokeWidth={2.4}
            markerEnd="url(#lc-v)"
          />
          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(w[0])}
            y2={toY(w[1])}
            stroke="var(--vp-b)"
            strokeWidth={2.4}
            markerEnd="url(#lc-w)"
          />
          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(rx)}
            y2={toY(ry)}
            stroke="var(--vp-c)"
            strokeWidth={3}
            markerEnd="url(#lc-r)"
          />
        </svg>
      </div>

      <div className="lcombo-controls">
        <label className="mplay-slider">
          <span className="mplay-name">s</span>
          <input
            type="range"
            min={-3}
            max={3}
            step={0.1}
            value={s}
            onChange={(e) => setS(Number(e.target.value))}
            aria-label="s"
          />
          <span className="mplay-val">{s.toFixed(1)}</span>
        </label>
        <label className="mplay-slider">
          <span className="mplay-name">t</span>
          <input
            type="range"
            min={-3}
            max={3}
            step={0.1}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            aria-label="t"
          />
          <span className="mplay-val">{t.toFixed(1)}</span>
        </label>

        <p className="mplay-readout">
          <strong>{labels.result ?? 'result'}</strong> = ({rx.toFixed(1)}, {ry.toFixed(1)})
        </p>
        {degenerate && (
          <p className="mplay-readout">
            <em>{labels.degenerate ?? 'These two vectors are parallel — their span is a line.'}</em>
          </p>
        )}

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setS(1)
            setT(1)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
