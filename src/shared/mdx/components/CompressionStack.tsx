'use client'

import { useState } from 'react'

interface CompressionStackProps {
  labels?: {
    hint?: string
    distil?: string
    quant?: string
    params?: string
    memory?: string
    factor?: string
    note?: string
    reset?: string
  }
}

const V = 30522
const POS = 512
const MiB = 1024 * 1024
const layer = (h: number, f: number) => 4 * (h * h + h) + (h * f + f) + (f * h + h) + 2 * 2 * h

// BERT-base, exactly as counted in the lesson on the parameter budget.
const BASE = V * 768 + POS * 768 + 2 * 768 + 2 * 768 + 12 * layer(768, 3072) + (768 * 768 + 768)
// DistilBERT keeps six layers and drops the segment table and the pooler.
const DISTIL = V * 768 + POS * 768 + 2 * 768 + 6 * layer(768, 3072)

export default function CompressionStack({ labels = {} }: CompressionStackProps) {
  const [distil, setDistil] = useState(false)
  const [bytes, setBytes] = useState(4)

  const params = distil ? DISTIL : BASE
  const memory = params * bytes
  const reference = BASE * 4
  const factor = reference / memory

  const precision = bytes === 4 ? 'fp32' : bytes === 2 ? 'fp16' : 'int8'

  return (
    <div className="dec">
      <div className="dec-stage">
        <div className="kv-row">
          <span className="kv-label">BERT-base · fp32</span>
          <span className="dec-track">
            <span className="kv-bar is-weights" style={{ width: '100%' }} />
          </span>
          <span className="dec-val">{(reference / MiB).toFixed(1)} MiB</span>
        </div>
        <div className="kv-row">
          <span className="kv-label">
            {distil ? (labels.distil ?? 'distilled') : 'BERT-base'} · {precision}
          </span>
          <span className="dec-track">
            <span className="kv-bar" style={{ width: `${(memory / reference) * 100}%` }} />
          </span>
          <span className="dec-val">{(memory / MiB).toFixed(1)} MiB</span>
        </div>
        <p className="mmul-formula" aria-live="polite">
          {labels.factor ?? 'smaller by'} <strong>×{factor.toFixed(1)}</strong>
        </p>
      </div>

      <div className="dec-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'The two techniques act on different factors, so they compose.'}
        </p>

        <div className="am-modes">
          <button
            type="button"
            className={distil ? 'am-mode is-on' : 'am-mode'}
            onClick={() => setDistil(!distil)}
          >
            {labels.distil ?? 'distillation'}
          </button>
          {[4, 2, 1].map((b) => (
            <button
              key={b}
              type="button"
              className={bytes === b ? 'am-mode is-on' : 'am-mode'}
              onClick={() => setBytes(b)}
            >
              {b === 4 ? 'fp32' : b === 2 ? 'fp16' : 'int8'}
            </button>
          ))}
        </div>

        <p className="mplay-readout" aria-live="polite">
          {labels.params ?? 'parameters'} = <strong>{(params / 1e6).toFixed(1)}M</strong> · {bytes}{' '}
          B {labels.memory ?? 'each'}
        </p>
        <p className="cs-note">
          {labels.note ??
            'Distillation removes weights; quantisation shrinks each one. Neither excludes the other.'}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setDistil(false)
            setBytes(4)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
