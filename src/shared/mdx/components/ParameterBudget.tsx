'use client'

import { useState } from 'react'

interface ParameterBudgetProps {
  labels?: {
    hint?: string
    embeddings?: string
    positional?: string
    layers?: string
    pooler?: string
    total?: string
    share?: string
    note?: string
    reset?: string
  }
}

const V = 30522
const MAXPOS = 512
const SEGMENTS = 2

interface Config {
  name: string
  layers: number
  hidden: number
  heads: number
  ffn: number
  published: string
}

const CONFIGS: Config[] = [
  { name: 'BERT-base', layers: 12, hidden: 768, heads: 12, ffn: 3072, published: '110M' },
  { name: 'BERT-large', layers: 24, hidden: 1024, heads: 16, ffn: 4096, published: '340M' },
]

function budget(c: Config) {
  const tokens = V * c.hidden
  // Position and segment tables, plus the layer norm over the summed embedding.
  const positional = MAXPOS * c.hidden + SEGMENTS * c.hidden + 2 * c.hidden
  // Four square projections for Q, K, V and the output.
  const attn = 4 * (c.hidden * c.hidden + c.hidden)
  const ffn = c.hidden * c.ffn + c.ffn + (c.ffn * c.hidden + c.hidden)
  const perLayer = attn + ffn + 2 * 2 * c.hidden
  const layers = c.layers * perLayer
  const pooler = c.hidden * c.hidden + c.hidden
  return {
    tokens,
    positional,
    layers,
    pooler,
    perLayer,
    total: tokens + positional + layers + pooler,
  }
}

export default function ParameterBudget({ labels = {} }: ParameterBudgetProps) {
  const [sel, setSel] = useState(0)
  const c = CONFIGS[sel]
  const b = budget(c)

  const rows: [string, number, string][] = [
    [labels.embeddings ?? 'token embeddings', b.tokens, 'is-emb'],
    [labels.positional ?? 'position + segment', b.positional, 'is-pos'],
    [labels.layers ?? `${c.layers} layers`, b.layers, 'is-layers'],
    [labels.pooler ?? 'pooler', b.pooler, 'is-pooler'],
  ]
  const max = Math.max(...rows.map((r) => r[1]))
  const m = (n: number) => `${(n / 1e6).toFixed(2)}M`
  const embShare = Math.round((b.tokens / b.total) * 100)

  return (
    <div className="dec">
      <div className="dec-stage">
        {rows.map(([name, value, kind]) => (
          <div key={name} className="kv-row">
            <span className="kv-label">{name}</span>
            <span className="dec-track">
              <span className={`pb-bar ${kind}`} style={{ width: `${(value / max) * 100}%` }} />
            </span>
            <span className="dec-val">{m(value)}</span>
          </div>
        ))}
        <p className="mmul-formula" aria-live="polite">
          {labels.total ?? 'total'} <strong>{m(b.total)}</strong> · {c.published}
        </p>
      </div>

      <div className="dec-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'Every count is derived from the published configuration.'}
        </p>

        <div className="am-modes">
          {CONFIGS.map((x, i) => (
            <button
              key={x.name}
              type="button"
              className={sel === i ? 'am-mode is-on' : 'am-mode'}
              onClick={() => setSel(i)}
            >
              {x.name}
            </button>
          ))}
        </div>

        <p className="mplay-readout" aria-live="polite">
          {labels.share ?? 'the lookup table alone'} = <strong>{embShare}%</strong>
        </p>
        <p className="cs-note">
          {c.layers} × {m(b.perLayer)} · V = {V.toLocaleString('en-US')} × {c.hidden}
        </p>
        <p className="cs-note">
          {labels.note ??
            'The token table holds no context: it is a lookup. ALBERT factorised it for exactly this reason.'}
        </p>

        <button className="mplay-reset" type="button" onClick={() => setSel(0)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
