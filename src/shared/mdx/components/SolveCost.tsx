'use client'

import { useState } from 'react'

interface SolveCostProps {
  labels?: {
    hint?: string
    size?: string
    rhs?: string
    fresh?: string
    reuse?: string
    speedup?: string
    reset?: string
  }
}

const human = (v: number) => {
  if (v >= 1e12) return `${(v / 1e12).toFixed(1)}·10¹²`
  if (v >= 1e9) return `${(v / 1e9).toFixed(1)}·10⁹`
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}·10⁶`
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}·10³`
  return v.toFixed(0)
}

export default function SolveCost({ labels = {} }: SolveCostProps) {
  const [n, setN] = useState(500)
  const [k, setK] = useState(20)

  // LU factorisation ~ 2n³/3 flops; each pair of triangular solves ~ 2n².
  const factorCost = (2 / 3) * n ** 3
  const triCost = 2 * n ** 2
  const fresh = k * (factorCost + triCost)
  const reuse = factorCost + k * triCost
  const speedup = fresh / reuse

  const max = Math.max(fresh, reuse)

  return (
    <div className="scost">
      <div className="scost-stage">
        <div className="scost-bars">
          <div className="scost-row">
            <span className="scost-label">{labels.fresh ?? 'solve k times'}</span>
            <div className="scost-bar">
              <span className="is-bad" style={{ width: `${(fresh / max) * 100}%` }} />
            </div>
            <span className="scost-value">{human(fresh)}</span>
          </div>
          <div className="scost-row">
            <span className="scost-label">{labels.reuse ?? 'factor once'}</span>
            <div className="scost-bar">
              <span className="is-ok" style={{ width: `${(reuse / max) * 100}%` }} />
            </div>
            <span className="scost-value">{human(reuse)}</span>
          </div>
        </div>

        <p className="scost-speedup" aria-live="polite">
          {labels.speedup ?? 'speed-up'} <strong>×{speedup.toFixed(1)}</strong>
        </p>
      </div>

      <div className="scost-controls">
        <p className="dvec-hint">{labels.hint ?? 'Flop counts: 2n³/3 to factor, 2n² per triangular solve.'}</p>

        <label className="mplay-slider">
          <span className="mplay-name">n</span>
          <input type="range" min={50} max={2000} step={50} value={n}
                 onChange={(e) => setN(Number(e.target.value))} aria-label="n" />
          <span className="mplay-val">{n}</span>
        </label>
        <label className="mplay-slider">
          <span className="mplay-name">k</span>
          <input type="range" min={1} max={200} step={1} value={k}
                 onChange={(e) => setK(Number(e.target.value))} aria-label="k" />
          <span className="mplay-val">{k}</span>
        </label>

        <p className="mplay-readout">
          {labels.size ?? 'matrix'} {n}×{n} · {labels.rhs ?? 'right-hand sides'} k = {k}
        </p>

        <button className="mplay-reset" type="button" onClick={() => { setN(500); setK(20) }}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
