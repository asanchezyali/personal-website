'use client'

import { useState } from 'react'

interface Layer {
  id: string
  label: string
  /** One-line description shown when the layer is selected. */
  detail: string
}

interface SystemMapProps {
  /** Layer id to highlight ("you are here"). Omit to show the whole map. */
  highlight?: string
  /** Layers from top (user-facing) to bottom (hardware). */
  layers?: Layer[]
  /** Cross-cutting layer drawn as a vertical bar on the right. */
  side?: Layer
  /** Layer id drawn as a narrow box: the model is the smallest box. */
  narrow?: string
  labels?: { hint?: string }
}

const DEFAULT_LAYERS: Layer[] = [
  { id: 'app', label: 'Application', detail: 'Product, UX, channels and business rules.' },
  { id: 'gateway', label: 'Gateway & guardrails', detail: 'Auth, routing, fallbacks, checks.' },
  { id: 'context', label: 'Data & context', detail: 'Retrieval, tools, prompts, state.' },
  { id: 'model', label: 'Model', detail: 'The weights, or the API that hides them.' },
  { id: 'inference', label: 'Inference', detail: 'Serving, batching, KV cache, decoding.' },
  { id: 'hardware', label: 'Hardware', detail: 'GPUs, memory, network, storage.' },
]

const DEFAULT_SIDE: Layer = {
  id: 'monitoring',
  label: 'Monitoring & evals',
  detail: 'Traces, metrics, cost, evals and alerts.',
}

const W = 640
const ROW = 50
const GAP = 10
const STACK_W = 500
const SIDE_X = STACK_W + 24

export default function SystemMap({
  highlight,
  layers = DEFAULT_LAYERS,
  side = DEFAULT_SIDE,
  narrow = 'model',
  labels = {},
}: SystemMapProps) {
  const [selected, setSelected] = useState<string | undefined>(highlight)
  const active = selected ?? highlight
  const height = layers.length * (ROW + GAP) - GAP
  const all = [...layers, side]
  const current = all.find((l) => l.id === active)

  const state = (id: string) => {
    if (!active) return 'sm-box'
    return id === active ? 'sm-box is-on' : 'sm-box is-dim'
  }

  return (
    <div className="smap">
      <svg
        viewBox={`0 0 ${W} ${height + 4}`}
        role="img"
        aria-label={all.map((l) => l.label).join(', ')}
      >
        {layers.map((l, i) => {
          const y = i * (ROW + GAP) + 2
          const isNarrow = l.id === narrow
          const w = isNarrow ? STACK_W * 0.22 : STACK_W
          const x = isNarrow ? (STACK_W - w) / 2 : 0
          return (
            <g
              key={l.id}
              className={state(l.id)}
              onClick={() => setSelected(l.id)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelected(l.id)}
            >
              <rect x={x} y={y} width={w} height={ROW} rx={10} />
              <text x={STACK_W / 2} y={y + ROW / 2 + 5} textAnchor="middle">
                {l.label}
              </text>
            </g>
          )
        })}
        <g
          className={state(side.id)}
          onClick={() => setSelected(side.id)}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelected(side.id)}
        >
          <rect x={SIDE_X} y={2} width={W - SIDE_X - 2} height={height} rx={10} />
          <text
            x={SIDE_X + (W - SIDE_X) / 2}
            y={height / 2 + 2}
            textAnchor="middle"
            transform={`rotate(-90 ${SIDE_X + (W - SIDE_X) / 2} ${height / 2 + 2})`}
          >
            {side.label}
          </text>
        </g>
      </svg>
      <p className="smap-detail" aria-live="polite">
        {current ? (
          <>
            <strong>{current.label}.</strong> {current.detail}
          </>
        ) : (
          (labels.hint ?? 'Click a layer to see what it does.')
        )}
      </p>
    </div>
  )
}
