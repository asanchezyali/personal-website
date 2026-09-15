'use client'

import { useState } from 'react'

interface LayerCollapseProps {
  labels?: {
    hint?: string
    widths?: string
    bottleneck?: string
    composed?: string
    rankBound?: string
    injective?: string
    lossy?: string
    note?: string
    reset?: string
  }
}

export default function LayerCollapse({ labels = {} }: LayerCollapseProps) {
  const [d, setD] = useState(64)
  const [r, setR] = useState(8)

  // A chain d → d → r → d → d of linear layers, with one bottleneck.
  const widths = [d, d, r, d, d]
  const bound = Math.min(...widths)
  const injective = bound >= d

  const max = Math.max(...widths)

  return (
    <div className="lyr">
      <div className="lyr-stage">
        <div className="lyr-chain">
          {widths.map((w, i) => (
            <span key={i} className="lyr-step">
              <span
                className={w === bound ? 'lyr-bar is-min' : 'lyr-bar'}
                style={{ height: `${(w / max) * 100}%` }}
              />
              <em>{w}</em>
            </span>
          ))}
        </div>

        <p className="mmul-formula" aria-live="polite">
          {labels.composed ?? 'W = W₄W₃W₂W₁'} · {labels.rankBound ?? 'rank(W) ≤'}{' '}
          <strong>{bound}</strong>
        </p>
        <p className={`lyr-verdict ${injective ? 'is-ok' : 'is-bad'}`}>
          {injective
            ? (labels.injective ?? 'no information is lost')
            : (labels.lossy ?? 'the map is not injective: information is lost')}
        </p>
      </div>

      <div className="lyr-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'A chain of linear layers, one of them narrow.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">d</span>
          <input
            type="range"
            min={8}
            max={128}
            step={8}
            value={d}
            onChange={(e) => setD(Number(e.target.value))}
            aria-label="width"
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
            aria-label="bottleneck"
          />
          <span className="mplay-val">{r}</span>
        </label>

        <p className="cs-note">
          {labels.note ??
            'Without non-linearities the chain is one matrix, and the narrowest layer caps its rank.'}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setD(64)
            setR(8)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
