'use client'

import { useState } from 'react'

interface FeatureVsFineTuneProps {
  labels?: {
    hint?: string
    finetune?: string
    baseline?: string
    gap?: string
    note?: string
    reset?: string
  }
  options?: { name: string; f1: number }[]
}

// CoNLL-2003 development F1, as published in the BERT paper's feature-based ablation.
const FINETUNE = 96.4
const DEFAULT = [
  { name: 'embeddings', f1: 91.0 },
  { name: 'last hidden', f1: 94.9 },
  { name: 'weighted sum, all 12', f1: 95.5 },
  { name: 'second-to-last', f1: 95.6 },
  { name: 'weighted sum, last 4', f1: 95.9 },
  { name: 'concat, last 4', f1: 96.1 },
]

export default function FeatureVsFineTune({
  labels = {},
  options = DEFAULT,
}: FeatureVsFineTuneProps) {
  const [sel, setSel] = useState(options.length - 1)

  // Anchor the axis below the worst option so the differences stay legible.
  const lo = 90
  const span = FINETUNE - lo
  const pick = options[sel]
  const gap = FINETUNE - pick.f1

  return (
    <div className="perm">
      <div className="perm-stage">
        {options.map((o, i) => (
          <div key={o.name} className={i === sel ? 'fvf-row is-sel' : 'fvf-row'}>
            <span className="fvf-name">{o.name}</span>
            <span className="dec-track">
              <span
                className={i === sel ? 'fvf-bar is-sel' : 'fvf-bar'}
                style={{ width: `${((o.f1 - lo) / span) * 100}%` }}
              />
            </span>
            <span className="dec-val">{o.f1.toFixed(1)}</span>
          </div>
        ))}
        <div className="fvf-row is-base">
          <span className="fvf-name">{labels.finetune ?? 'fine-tuning'}</span>
          <span className="dec-track">
            <span className="fvf-bar is-base" style={{ width: '100%' }} />
          </span>
          <span className="dec-val">{FINETUNE.toFixed(1)}</span>
        </div>
      </div>

      <div className="perm-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'CoNLL-2003 development F1, with the encoder frozen.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">#</span>
          <input
            type="range"
            min={0}
            max={options.length - 1}
            step={1}
            value={sel}
            onChange={(e) => setSel(Number(e.target.value))}
            aria-label="option"
          />
          <span className="mplay-val">{sel + 1}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          {labels.gap ?? 'behind fine-tuning by'} <strong>{gap.toFixed(1)}</strong> F1
        </p>
        <p className="cs-note">
          {labels.note ??
            'The last layer alone does worse than the second-to-last: it is the most specialised to the pre-training objective.'}
        </p>

        <button className="mplay-reset" type="button" onClick={() => setSel(options.length - 1)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
