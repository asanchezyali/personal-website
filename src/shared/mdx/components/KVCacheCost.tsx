'use client'

import { useState } from 'react'

interface KVCacheCostProps {
  labels?: {
    hint?: string
    cache?: string
    weights?: string
    perToken?: string
    tokens?: string
    exceeds?: string
    under?: string
    reset?: string
  }
}

const GiB = 1024 ** 3

interface Model {
  name: string
  layers: number
  /** Heads that actually own a key/value pair; grouped-query attention cuts this. */
  kvHeads: number
  dHead: number
  params: number
}

const MODELS: Model[] = [
  { name: 'Llama-2-7B', layers: 32, kvHeads: 32, dHead: 128, params: 7e9 },
  { name: 'Llama-2-13B', layers: 40, kvHeads: 40, dHead: 128, params: 13e9 },
  { name: 'Llama-2-70B · GQA', layers: 80, kvHeads: 8, dHead: 128, params: 70e9 },
  { name: 'GPT-3 175B', layers: 96, kvHeads: 96, dHead: 128, params: 175e9 },
]

export default function KVCacheCost({ labels = {} }: KVCacheCostProps) {
  const [sel, setSel] = useState(0)
  // The slider carries log2 of the context length.
  const [logCtx, setLogCtx] = useState(12)

  const m = MODELS[sel]
  const ctx = 2 ** logCtx

  // Two tensors (K and V), one per layer, per key/value head, in fp16.
  const bytesPerToken = 2 * m.layers * m.kvHeads * m.dHead * 2
  const cache = bytesPerToken * ctx
  const weights = m.params * 2

  const max = Math.max(cache, weights)
  const exceeds = cache > weights

  const fmt = (b: number) => `${(b / GiB).toFixed(2)} GiB`
  const fmtCtx = (n: number) => (n >= 1024 ? `${n / 1024}k` : String(n))

  return (
    <div className="dec">
      <div className="dec-stage">
        <div className="kv-row">
          <span className="kv-label">{labels.cache ?? 'KV cache'}</span>
          <span className="dec-track">
            <span
              className={exceeds ? 'kv-bar is-over' : 'kv-bar'}
              style={{ width: `${(cache / max) * 100}%` }}
            />
          </span>
          <span className="dec-val">{fmt(cache)}</span>
        </div>
        <div className="kv-row">
          <span className="kv-label">{labels.weights ?? 'weights, fp16'}</span>
          <span className="dec-track">
            <span className="kv-bar is-weights" style={{ width: `${(weights / max) * 100}%` }} />
          </span>
          <span className="dec-val">{fmt(weights)}</span>
        </div>
        <p className={`lyr-verdict ${exceeds ? 'is-bad' : 'is-ok'}`} aria-live="polite">
          {exceeds
            ? (labels.exceeds ?? 'the cache now costs more memory than the model')
            : (labels.under ?? 'the cache still fits under the weights')}
        </p>
      </div>

      <div className="dec-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'One sequence, fp16. The cache grows linearly with the context.'}
        </p>

        <div className="am-modes">
          {MODELS.map((x, i) => (
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

        <label className="mplay-slider">
          <span className="mplay-name">ctx</span>
          <input
            type="range"
            min={10}
            max={17}
            step={1}
            value={logCtx}
            onChange={(e) => setLogCtx(Number(e.target.value))}
            aria-label="context"
          />
          <span className="mplay-val">{fmtCtx(ctx)}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          {labels.perToken ?? 'per token'} ={' '}
          <strong>{(bytesPerToken / 1024 / 1024).toFixed(3)} MiB</strong> × {ctx}{' '}
          {labels.tokens ?? 'tokens'}
        </p>
        <p className="cs-note">
          2 × {m.layers} × {m.kvHeads} × {m.dHead} × {ctx} × 2 B = {fmt(cache)}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setSel(0)
            setLogCtx(12)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
