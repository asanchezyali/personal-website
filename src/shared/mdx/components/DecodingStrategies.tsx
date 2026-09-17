'use client'

import { useState } from 'react'

type Mode = 'greedy' | 'sample' | 'topk' | 'topp'

interface DecodingStrategiesProps {
  labels?: {
    hint?: string
    greedy?: string
    sample?: string
    topk?: string
    topp?: string
    kept?: string
    mass?: string
    note?: string
    reset?: string
  }
}

const TOKENS = ['on', 'down', 'near', 'beside', 'under', 'into', 'across', 'atop']
const LOGITS = [3.2, 2.3, 1.9, 1.5, 1.2, 0.8, 0.4, 0.0]

const softmax = (logits: number[], T: number) => {
  const m = Math.max(...logits)
  const e = logits.map((x) => Math.exp((x - m) / Math.max(T, 0.01)))
  const s = e.reduce((a, b) => a + b, 0)
  return e.map((x) => x / s)
}

export default function DecodingStrategies({ labels = {} }: DecodingStrategiesProps) {
  const [mode, setMode] = useState<Mode>('topp')
  const [T, setT] = useState(1)
  const [k, setK] = useState(3)
  const [p, setP] = useState(0.9)

  const base = softmax(LOGITS, mode === 'greedy' ? 0.01 : T)
  // Rank once; both truncations work off the same ordering.
  const order = [...base.keys()].sort((a, b) => base[b] - base[a])

  let keep: Set<number>
  if (mode === 'greedy') keep = new Set([order[0]])
  else if (mode === 'topk') keep = new Set(order.slice(0, k))
  else if (mode === 'topp') {
    const acc: number[] = []
    let cum = 0
    for (const i of order) {
      acc.push(i)
      cum += base[i]
      if (cum >= p) break
    }
    keep = new Set(acc)
  } else keep = new Set(order)

  // Whatever survives is renormalised, so the kept mass always returns to one.
  const keptMass = [...keep].reduce((a, i) => a + base[i], 0)
  const final = base.map((x, i) => (keep.has(i) ? x / keptMass : 0))
  const max = Math.max(...final)

  const modes: [Mode, string][] = [
    ['greedy', labels.greedy ?? 'greedy'],
    ['sample', labels.sample ?? 'sampling'],
    ['topk', labels.topk ?? 'top-k'],
    ['topp', labels.topp ?? 'top-p'],
  ]

  return (
    <div className="dec">
      <div className="dec-stage">
        {TOKENS.map((t, i) => (
          <div key={t} className={keep.has(i) ? 'dec-row' : 'dec-row is-cut'}>
            <span className="dec-tok">{t}</span>
            <span className="dec-track">
              <span className="dec-bar" style={{ width: `${(final[i] / max) * 100}%` }} />
            </span>
            <span className="dec-val">{final[i] > 0 ? final[i].toFixed(3) : '—'}</span>
          </div>
        ))}
      </div>

      <div className="dec-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'The same model; only the way a token is chosen changes.'}
        </p>

        <div className="am-modes">
          {modes.map(([m, label]) => (
            <button
              key={m}
              type="button"
              className={mode === m ? 'am-mode is-on' : 'am-mode'}
              onClick={() => setMode(m)}
            >
              {label}
            </button>
          ))}
        </div>

        {mode !== 'greedy' && (
          <label className="mplay-slider">
            <span className="mplay-name">T</span>
            <input
              type="range"
              min={0.3}
              max={2}
              step={0.05}
              value={T}
              onChange={(e) => setT(Number(e.target.value))}
              aria-label="temperature"
            />
            <span className="mplay-val">{T.toFixed(2)}</span>
          </label>
        )}
        {mode === 'topk' && (
          <label className="mplay-slider">
            <span className="mplay-name">k</span>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              aria-label="k"
            />
            <span className="mplay-val">{k}</span>
          </label>
        )}
        {mode === 'topp' && (
          <label className="mplay-slider">
            <span className="mplay-name">p</span>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={p}
              onChange={(e) => setP(Number(e.target.value))}
              aria-label="p"
            />
            <span className="mplay-val">{p.toFixed(2)}</span>
          </label>
        )}

        <p className="mplay-readout" aria-live="polite">
          {labels.kept ?? 'candidates'} = <strong>{keep.size}</strong> / {TOKENS.length} ·{' '}
          {labels.mass ?? 'mass'} <strong>{keptMass.toFixed(3)}</strong>
        </p>
        <p className="cs-note">
          {labels.note ??
            'top-p adapts its candidate set to the shape of the distribution; top-k always keeps the same number.'}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setMode('topp')
            setT(1)
            setK(3)
            setP(0.9)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
