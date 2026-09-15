'use client'

import { useState } from 'react'

interface LoRABudgetProps {
  labels?: {
    hint?: string
    full?: string
    lora?: string
    ratio?: string
    rank?: string
    note?: string
    reset?: string
  }
}

const human = (v: number) => {
  if (v >= 1e9) return `${(v / 1e9).toFixed(2)} G`
  if (v >= 1e6) return `${(v / 1e6).toFixed(2)} M`
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)} k`
  return String(v)
}

export default function LoRABudget({ labels = {} }: LoRABudgetProps) {
  const [d, setD] = useState(4096)
  const [r, setR] = useState(8)

  const full = d * d
  const lora = 2 * d * r
  const ratio = full / lora

  return (
    <div className="scost">
      <div className="scost-stage">
        <div className="scost-bars">
          <div className="scost-row">
            <span className="scost-label">{labels.full ?? 'ΔW completa'}</span>
            <div className="scost-bar">
              <span className="is-bad" style={{ width: '100%' }} />
            </div>
            <span className="scost-value">{human(full)}</span>
          </div>
          <div className="scost-row">
            <span className="scost-label">{labels.lora ?? 'B·A, rango r'}</span>
            <div className="scost-bar">
              <span className="is-ok" style={{ width: `${Math.max(0.4, (lora / full) * 100)}%` }} />
            </div>
            <span className="scost-value">{human(lora)}</span>
          </div>
        </div>
        <p className="scost-speedup" aria-live="polite">
          {labels.ratio ?? 'parámetros entrenables'}{' '}
          <strong>{((lora / full) * 100).toFixed(2)} %</strong>
        </p>
      </div>

      <div className="scost-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'ΔW is d×d; B is d×r and A is r×d, so rank(BA) ≤ r by construction.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">d</span>
          <input
            type="range"
            min={512}
            max={8192}
            step={512}
            value={d}
            onChange={(e) => setD(Number(e.target.value))}
            aria-label="d"
          />
          <span className="mplay-val">{d}</span>
        </label>
        <label className="mplay-slider">
          <span className="mplay-name">r</span>
          <input
            type="range"
            min={1}
            max={128}
            step={1}
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            aria-label="r"
          />
          <span className="mplay-val">{r}</span>
        </label>

        <p className="mplay-readout">
          {labels.rank ?? 'factor de reducción'} ×{ratio.toFixed(0)}
        </p>
        <p className="cs-note">
          {labels.note ?? 'The saving is d²/(2dr) = d/(2r), and grows with the size of the layer.'}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setD(4096)
            setR(8)
          }}
        >
          {labels.reset ?? 'Reiniciar'}
        </button>
      </div>
    </div>
  )
}
