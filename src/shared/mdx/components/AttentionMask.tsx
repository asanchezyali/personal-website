'use client'

import { useState } from 'react'

type Mode = 'bidirectional' | 'causal' | 'prefix'

interface AttentionMaskProps {
  n?: number
  labels?: {
    hint?: string
    bidirectional?: string
    causal?: string
    prefix?: string
    visible?: string
    query?: string
    key?: string
    whyBi?: string
    whyCausal?: string
    whyPrefix?: string
    reset?: string
  }
}

export default function AttentionMask({ n = 8, labels = {} }: AttentionMaskProps) {
  const [mode, setMode] = useState<Mode>('causal')
  const [p, setP] = useState(3)

  // Can query i read key j?
  const visible = (i: number, j: number) => {
    if (mode === 'bidirectional') return true
    if (mode === 'causal') return j <= i
    // prefix: bidirectional inside the prefix, causal from there on
    return (i < p && j < p) || j <= i
  }

  let count = 0
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (visible(i, j)) count++

  const S = 200
  const cell = S / n

  const why =
    mode === 'bidirectional'
      ? (labels.whyBi ??
        'Every position sees the whole sequence, so no position can be predicted without leaking. Represents; cannot generate.')
      : mode === 'causal'
        ? (labels.whyCausal ??
          'Position i sees only what precedes it, so every position is a valid prediction target at once.')
        : (labels.whyPrefix ??
          'The prefix is read in full; the continuation is generated one token at a time.')

  const names: [Mode, string][] = [
    ['bidirectional', labels.bidirectional ?? 'bidirectional'],
    ['causal', labels.causal ?? 'causal'],
    ['prefix', labels.prefix ?? 'prefix'],
  ]

  return (
    <div className="amask">
      <div className="amask-stage">
        <svg
          viewBox={`0 0 ${S + 26} ${S + 26}`}
          role="img"
          aria-label={labels.hint ?? 'Which positions each query can attend to'}
        >
          {Array.from({ length: n }, (_, i) =>
            Array.from({ length: n }, (_, j) => (
              <rect
                key={`${i}-${j}`}
                className={visible(i, j) ? 'am-cell is-on' : 'am-cell'}
                x={26 + j * cell}
                y={i * cell}
                width={cell - 1.5}
                height={cell - 1.5}
                rx={2}
              />
            ))
          )}
          {Array.from({ length: n }, (_, i) => (
            <text key={i} className="am-idx" x={20} y={i * cell + cell / 2 + 3} textAnchor="end">
              {i}
            </text>
          ))}
          {Array.from({ length: n }, (_, j) => (
            <text
              key={j}
              className="am-idx"
              x={26 + j * cell + cell / 2 - 1}
              y={S + 12}
              textAnchor="middle"
            >
              {j}
            </text>
          ))}
          <text className="am-axis" x={26 + S / 2} y={S + 24} textAnchor="middle">
            {labels.key ?? 'key j'}
          </text>
          <text
            className="am-axis"
            x={9}
            y={S / 2}
            textAnchor="middle"
            transform={`rotate(-90 9 ${S / 2})`}
          >
            {labels.query ?? 'query i'}
          </text>
        </svg>
      </div>

      <div className="amask-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'A lit cell means query i is allowed to read key j.'}
        </p>

        <div className="am-modes">
          {names.map(([m, label]) => (
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

        {mode === 'prefix' && (
          <label className="mplay-slider">
            <span className="mplay-name">p</span>
            <input
              type="range"
              min={1}
              max={n - 1}
              step={1}
              value={p}
              onChange={(e) => setP(Number(e.target.value))}
              aria-label="prefix"
            />
            <span className="mplay-val">{p}</span>
          </label>
        )}

        <p className="mplay-readout" aria-live="polite">
          {labels.visible ?? 'visible pairs'} = <strong>{count}</strong> / {n * n}
        </p>
        <p className="cs-note">{why}</p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setMode('causal')
            setP(3)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
