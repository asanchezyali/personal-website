'use client'

import { useState } from 'react'

interface NormPlacementProps {
  labels?: {
    hint?: string
    post?: string
    pre?: string
    clean?: string
    broken?: string
    sublayer?: string
    note?: string
    reset?: string
  }
}

export default function NormPlacement({ labels = {} }: NormPlacementProps) {
  const [mode, setMode] = useState<'post' | 'pre'>('post')
  const [depth, setDepth] = useState(4)

  const isPre = mode === 'pre'

  // In pre-norm the residual stream never passes through a normalisation;
  // in post-norm every layer normalises the sum, so no identity path survives.
  const layer = (i: number) => (
    <div key={i} className="np-layer">
      <span className="np-idx">{i + 1}</span>
      <span className={isPre ? 'np-stream is-clean' : 'np-stream'} />
      <span className="np-blocks">
        {isPre ? (
          <>
            <span className="np-box is-ln">LN</span>
            <span className="np-box is-f">{labels.sublayer ?? 'sub-layer'}</span>
            <span className="np-box is-add">+</span>
          </>
        ) : (
          <>
            <span className="np-box is-f">{labels.sublayer ?? 'sub-layer'}</span>
            <span className="np-box is-add">+</span>
            <span className="np-box is-ln">LN</span>
          </>
        )}
      </span>
    </div>
  )

  return (
    <div className="perm">
      <div className="perm-stage">
        <div className="np-stack">{Array.from({ length: depth }, (_, i) => layer(i))}</div>
        <p className={`lyr-verdict ${isPre ? 'is-ok' : 'is-bad'}`} aria-live="polite">
          {isPre
            ? (labels.clean ?? 'an unbroken identity path from input to output')
            : (labels.broken ?? 'every layer normalises the sum: no identity path')}
        </p>
      </div>

      <div className="perm-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'The only difference is where the normalisation sits.'}
        </p>

        <div className="am-modes">
          <button
            type="button"
            className={mode === 'post' ? 'am-mode is-on' : 'am-mode'}
            onClick={() => setMode('post')}
          >
            {labels.post ?? 'post-norm'}
          </button>
          <button
            type="button"
            className={mode === 'pre' ? 'am-mode is-on' : 'am-mode'}
            onClick={() => setMode('pre')}
          >
            {labels.pre ?? 'pre-norm'}
          </button>
        </div>

        <label className="mplay-slider">
          <span className="mplay-name">L</span>
          <input
            type="range"
            min={2}
            max={8}
            step={1}
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            aria-label="depth"
          />
          <span className="mplay-val">{depth}</span>
        </label>

        <p className="cs-note">
          {labels.note ??
            'BERT is post-norm, which is why its recipe needs a warm-up phase. Xiong et al. (2020) traced this to large gradients near the output at initialisation.'}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setMode('post')
            setDepth(4)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
