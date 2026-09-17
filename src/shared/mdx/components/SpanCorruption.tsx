'use client'

import { useState } from 'react'

interface SpanCorruptionProps {
  tokens?: string[]
  labels?: {
    hint?: string
    encoderIn?: string
    decoderOut?: string
    rate?: string
    span?: string
    targetLen?: string
    fullLen?: string
    real?: string
    note?: string
    reset?: string
  }
}

const DEFAULT = ['The', 'puppies', 'are', 'frolicking', 'outside', 'the', 'house', 'today', 'again']
const SENTINEL = ['⟨X⟩', '⟨Y⟩', '⟨Z⟩', '⟨W⟩', '⟨V⟩']

export default function SpanCorruption({ tokens = DEFAULT, labels = {} }: SpanCorruptionProps) {
  const [rate, setRate] = useState(0.15)
  const [span, setSpan] = useState(3)

  const n = tokens.length
  const corrupt = Math.max(1, Math.round(rate * n))
  const spans = Math.max(1, Math.min(Math.round(corrupt / span), SENTINEL.length))
  const per = Math.max(1, Math.round(corrupt / spans))

  // Spans are laid out deterministically so the figure is stable while sliding.
  const starts: number[] = []
  const gap = Math.floor(n / (spans + 1))
  for (let s = 0; s < spans; s++) {
    const at = Math.min(Math.max(1, gap * (s + 1)), n - per)
    if (starts.length === 0 || at >= starts[starts.length - 1] + per + 1) starts.push(at)
  }

  const inSpan = (i: number) => starts.findIndex((s) => i >= s && i < s + per)

  const encoder: { text: string; kind: 'plain' | 'sentinel' }[] = []
  for (let i = 0; i < n; i++) {
    const s = inSpan(i)
    if (s < 0) encoder.push({ text: tokens[i], kind: 'plain' })
    else if (i === starts[s]) encoder.push({ text: SENTINEL[s], kind: 'sentinel' })
  }

  const target: { text: string; kind: 'plain' | 'sentinel' }[] = []
  starts.forEach((s, k) => {
    target.push({ text: SENTINEL[k], kind: 'sentinel' })
    for (let i = s; i < Math.min(s + per, n); i++) target.push({ text: tokens[i], kind: 'plain' })
  })
  target.push({ text: SENTINEL[starts.length] ?? '⟨/⟩', kind: 'sentinel' })

  const saved = Math.round((1 - target.length / n) * 100)

  // The rate only becomes representative over a real input, so show that too.
  const REAL = 512
  const realCorrupt = Math.round(rate * REAL)
  const realSpans = Math.max(1, Math.round(realCorrupt / span))
  const realTarget = realSpans + realCorrupt + 1
  const realSaved = Math.round((1 - realTarget / REAL) * 100)

  const strip = (items: typeof encoder, key: string) => (
    <div className="perm-row">
      {items.map((t, i) => (
        <span key={`${key}-${i}`} className={t.kind === 'sentinel' ? 'sc-tok is-sent' : 'sc-tok'}>
          {t.text}
        </span>
      ))}
    </div>
  )

  return (
    <div className="perm">
      <div className="perm-stage">
        <span className="evs-tag">{labels.encoderIn ?? 'encoder input'}</span>
        {strip(encoder, 'e')}
        <span className="evs-tag">{labels.decoderOut ?? 'decoder target'}</span>
        {strip(target, 'd')}
      </div>

      <div className="perm-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'Only the removed spans are generated, each tagged by its sentinel.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">{labels.rate ?? 'rate'}</span>
          <input
            type="range"
            min={0.1}
            max={0.4}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            aria-label="corruption rate"
          />
          <span className="mplay-val">{Math.round(rate * 100)}%</span>
        </label>
        <label className="mplay-slider">
          <span className="mplay-name">{labels.span ?? 'span'}</span>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={span}
            onChange={(e) => setSpan(Number(e.target.value))}
            aria-label="span length"
          />
          <span className="mplay-val">{per}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          {labels.targetLen ?? 'target'} = <strong>{target.length}</strong> ·{' '}
          {labels.fullLen ?? 'full sentence'} = <strong>{n}</strong>
        </p>
        <p className={`lyr-verdict ${saved > 0 ? 'is-ok' : 'is-bad'}`}>
          {saved > 0 ? `−${saved}%` : `+${-saved}%`}
        </p>
        <p className="cs-note">
          {labels.real ?? 'on a 512-token input'}: {realSpans} × {labels.span ?? 'span'} ·{' '}
          <strong>{realTarget}</strong> / 512 → −{realSaved}%
        </p>
        <p className="cs-note">
          {labels.note ??
            'BART reconstructs the whole sentence; T5 emits only what is missing, which is why its targets are short.'}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setRate(0.15)
            setSpan(3)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
