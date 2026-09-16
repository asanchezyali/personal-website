'use client'

import { useState } from 'react'

interface ScaledDotProductProps {
  labels?: {
    hint?: string
    unscaled?: string
    scaled?: string
    spread?: string
    entropy?: string
    peak?: string
    note?: string
    reset?: string
  }
}

const KEYS = ['k₁', 'k₂', 'k₃', 'k₄', 'k₅']
// Scores for unit-variance components; the real ones grow with the square root of d_k.
const BASE = [1.2, 0.4, -0.3, 0.8, -1.1]

const softmax = (v: number[]) => {
  const m = Math.max(...v)
  const e = v.map((x) => Math.exp(x - m))
  const s = e.reduce((a, b) => a + b, 0)
  return e.map((x) => x / s)
}
const entropy = (p: number[]) => -p.reduce((a, x) => a + (x > 0 ? x * Math.log(x) : 0), 0)

export default function ScaledDotProduct({ labels = {} }: ScaledDotProductProps) {
  // The slider carries log2 of the per-head dimension.
  const [logDk, setLogDk] = useState(6)
  const dk = 2 ** logDk
  const root = Math.sqrt(dk)

  // Var(q·k) = d_k, so the raw scores are the unit ones stretched by √d_k.
  const raw = BASE.map((x) => x * root)
  const pRaw = softmax(raw)
  const pScaled = softmax(BASE)

  const row = (p: number[], kind: string) => (
    <div className="sdp-bars">
      {p.map((x, i) => (
        <span key={i} className="sdp-col">
          <span className="sdp-track">
            <span className={`sdp-bar ${kind}`} style={{ height: `${x * 100}%` }} />
          </span>
          <em>{KEYS[i]}</em>
        </span>
      ))}
    </div>
  )

  const maxEnt = Math.log(KEYS.length)

  return (
    <div className="perm">
      <div className="perm-stage">
        <span className="evs-tag">
          {labels.unscaled ?? 'without dividing'} · {labels.peak ?? 'peak'}{' '}
          {Math.max(...pRaw).toFixed(4)}
        </span>
        {row(pRaw, 'is-raw')}
        <span className="evs-tag">
          {labels.scaled ?? 'divided by √dₖ'} · {labels.peak ?? 'peak'}{' '}
          {Math.max(...pScaled).toFixed(4)}
        </span>
        {row(pScaled, 'is-scaled')}
      </div>

      <div className="perm-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'The same scores, read at different per-head dimensions.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">d&#8342;</span>
          <input
            type="range"
            min={0}
            max={9}
            step={1}
            value={logDk}
            onChange={(e) => setLogDk(Number(e.target.value))}
            aria-label="d_k"
          />
          <span className="mplay-val">{dk}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          {labels.spread ?? 'spread of q·k'} = √{dk} = <strong>{root.toFixed(2)}</strong>
        </p>
        <p className="mplay-readout">
          {labels.entropy ?? 'entropy'}: <strong>{entropy(pRaw).toFixed(3)}</strong> vs{' '}
          <strong>{entropy(pScaled).toFixed(3)}</strong> / {maxEnt.toFixed(3)}
        </p>
        <p className="cs-note">
          {labels.note ??
            'Var(q·k) = dₖ, so without the division the softmax saturates and the gradient vanishes. BERT holds dₖ = 64 at both sizes.'}
        </p>

        <button className="mplay-reset" type="button" onClick={() => setLogDk(6)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
