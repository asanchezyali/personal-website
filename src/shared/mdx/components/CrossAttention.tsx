'use client'

import { useState } from 'react'

interface CrossAttentionProps {
  source?: string[]
  target?: string[]
  labels?: {
    hint?: string
    source?: string
    target?: string
    selfAttn?: string
    crossAttn?: string
    reads?: string
    note?: string
    reset?: string
  }
}

const SRC = ['Der', 'Hund', 'schläft', 'im', 'Garten']
const TGT = ['The', 'dog', 'sleeps', 'in', 'the', 'garden']

export default function CrossAttention({
  source = SRC,
  target = TGT,
  labels = {},
}: CrossAttentionProps) {
  const [t, setT] = useState(2)

  // Self-attention over the target is causal; cross-attention over the source is not.
  const seesTarget = (j: number) => j <= t
  const seesSource = () => true

  const strip = (
    items: string[],
    lit: (i: number) => boolean,
    cur: number | null,
    kind: string
  ) => (
    <div className="perm-row">
      {items.map((w, i) => (
        <span
          key={`${kind}-${i}`}
          className={i === cur ? 'ca-tok is-cur' : lit(i) ? `ca-tok is-lit ${kind}` : 'ca-tok'}
        >
          {w}
        </span>
      ))}
    </div>
  )

  return (
    <div className="perm">
      <div className="perm-stage">
        <span className="evs-tag">
          {labels.crossAttn ?? 'cross-attention'} → {labels.source ?? 'source'}
        </span>
        {strip(source, seesSource, null, 'is-src')}

        <span className="evs-tag">
          {labels.selfAttn ?? 'masked self-attention'} → {labels.target ?? 'target so far'}
        </span>
        {strip(target, seesTarget, t, 'is-tgt')}

        <p className="mmul-formula" aria-live="polite">
          {labels.reads ?? 'reads'} <strong>{source.length}</strong> + <strong>{t + 1}</strong> /{' '}
          {source.length} + {target.length}
        </p>
      </div>

      <div className="perm-controls">
        <p className="dvec-hint">
          {labels.hint ??
            'One decoder position runs two attention steps over two different sequences.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">t</span>
          <input
            type="range"
            min={0}
            max={target.length - 1}
            step={1}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            aria-label="step"
          />
          <span className="mplay-val">{t}</span>
        </label>

        <ul className="fs-legend">
          <li>
            <i className="ca-k-src" /> {labels.source ?? 'source'}
          </li>
          <li>
            <i className="ca-k-tgt" /> {labels.target ?? 'target so far'}
          </li>
        </ul>

        <p className="cs-note">
          {labels.note ??
            'The source is never masked: every generated token may read the whole input. Only the target is causal.'}
        </p>

        <button className="mplay-reset" type="button" onClick={() => setT(2)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
