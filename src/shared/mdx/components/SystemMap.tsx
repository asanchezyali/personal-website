'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface Layer {
  id: string
  label: string
  /** One-line description shown when the layer is selected. */
  detail: string
  /** Concrete components drawn inside the layer as chips. */
  parts?: string[]
}

interface SystemMapProps {
  /** Layer id to highlight ("you are here"). Omit to show the whole map. */
  highlight?: string
  /** Layers from top (user-facing) to bottom (hardware). */
  layers?: Layer[]
  /** Cross-cutting layer drawn as a column on the right, holding the live trace. */
  side?: Layer
  /** Layer id drawn as a narrow box: the model is the smallest box. */
  narrow?: string
  labels?: {
    hint?: string
    request?: string
    response?: string
    trace?: string
    play?: string
    pause?: string
  }
}

const DEFAULT_LAYERS: Layer[] = [
  {
    id: 'app',
    label: 'Application',
    detail: 'Product, UX, channels and business rules.',
    parts: ['WhatsApp', 'Web', 'Business rules'],
  },
  {
    id: 'gateway',
    label: 'Gateway & guardrails',
    detail: 'Auth, routing, fallbacks, checks.',
    parts: ['Auth', 'Rate limit', 'Router', 'Fallback', 'Guards'],
  },
  {
    id: 'context',
    label: 'Data & context',
    detail: 'Retrieval, tools, prompts, state.',
    parts: ['RAG', 'Vector DB', 'Tools', 'Memory', 'Prompt'],
  },
  {
    id: 'model',
    label: 'Model',
    detail: 'The weights, or the API that hides them.',
    parts: ['LLM'],
  },
  {
    id: 'inference',
    label: 'Inference',
    detail: 'Serving, batching, KV cache, decoding.',
    parts: ['Prefill', 'Decode', 'Batching', 'KV cache'],
  },
  {
    id: 'hardware',
    label: 'Hardware',
    detail: 'GPUs, memory, network, storage.',
    parts: ['GPU', 'HBM', 'Network'],
  },
]

const DEFAULT_SIDE: Layer = {
  id: 'monitoring',
  label: 'Monitoring & evals',
  detail: 'Traces, metrics, cost, evals and alerts.',
  parts: ['p99', 'Tokens', 'Cost', 'Evals'],
}

const STEP_MS = 520
const HOLD_STEPS = 4

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const ICONS: Record<string, ReactNode> = {
  app: <path d="M4 5h16v10H9l-5 4z" {...stroke} />,
  gateway: <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" {...stroke} />,
  context: (
    <g {...stroke}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </g>
  ),
  model: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" {...stroke} />,
  inference: <path d="M13 2L4 14h7l-1 8 9-12h-7z" {...stroke} />,
  hardware: (
    <g {...stroke}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
    </g>
  ),
  monitoring: <path d="M3 12h4l3-7 4 14 3-7h4" {...stroke} />,
}

function Icon({ id }: { id: string }) {
  const glyph = ICONS[id]
  if (!glyph) return null
  return (
    <svg className="sm2-ic" viewBox="0 0 24 24" aria-hidden="true">
      {glyph}
    </svg>
  )
}

/**
 * Layered map of an AI system. A request travels down to the hardware and back up,
 * and the monitoring column records one nested span per layer, the way a
 * distributed trace does.
 */
export default function SystemMap({
  highlight,
  layers = DEFAULT_LAYERS,
  side = DEFAULT_SIDE,
  narrow = 'model',
  labels = {},
}: SystemMapProps) {
  const n = layers.length
  // Visit order: down through every layer, then back up.
  const pathLen = 2 * n - 1
  const done = pathLen

  const [selected, setSelected] = useState<string | undefined>(highlight)
  const [step, setStep] = useState(done)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  // Start only when on screen, and never for readers who ask for reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !root.current) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35,
    })
    io.observe(root.current)
    setPlaying(true)
    return () => io.disconnect()
  }, [])

  const running = playing && visible && !userPaused

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setStep((s) => (s >= done + HOLD_STEPS ? 0 : s + 1))
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [running, done])

  const active = selected ?? highlight
  const all = [...layers, side]
  const current = all.find((l) => l.id === active)
  const passIndex = step < pathLen ? (step < n ? step : pathLen - 1 - step) : -1
  const goingUp = step >= n && step < pathLen

  const state = (id: string) => {
    if (!active) return ''
    return id === active ? ' is-on' : ' is-dim'
  }

  // Span of layer i in the trace: it opens when the request arrives (step i)
  // and closes when the response leaves it (step pathLen - 1 - i).
  const span = (i: number) => {
    const start = i
    const end = pathLen - 1 - i
    const shown = step >= done ? end : Math.min(step, end)
    const width = step < start ? 0 : ((shown - start + 1) / pathLen) * 100
    return { left: (start / pathLen) * 100, width }
  }

  const select = (id: string) => setSelected(id)
  const keySelect = (id: string) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSelected(id)
    }
  }

  return (
    <div className="smap2" ref={root}>
      <div className="sm2-grid" style={{ gridTemplateRows: `auto repeat(${n}, auto) auto` }}>
        {/* Header row */}
        <div className="sm2-hdr">
          <span className="sm2-dir" aria-hidden="true">
            {goingUp ? `↑ ${labels.response ?? 'response'}` : `↓ ${labels.request ?? 'request'}`}
          </span>
          {playing ? (
            <button type="button" className="sm2-play" onClick={() => setUserPaused(!userPaused)}>
              {userPaused ? (labels.play ?? 'Play') : (labels.pause ?? 'Pause')}
            </button>
          ) : null}
        </div>
        <div
          className={`sm2-sidehead${state(side.id)}`}
          onClick={() => select(side.id)}
          onKeyDown={keySelect(side.id)}
          role="button"
          tabIndex={0}
        >
          <Icon id={side.id} />
          <span>{side.label}</span>
        </div>
        <div
          className={`sm2-sidebox${state(side.id)}`}
          style={{ gridRow: `1 / span ${n + 2}` }}
          aria-hidden="true"
        />

        {layers.map((l, i) => {
          const isNarrow = l.id === narrow
          const isPass = passIndex === i
          const s = span(i)
          const row = i + 2
          return (
            <div key={l.id} className="sm2-row" style={{ display: 'contents' }}>
              <span
                className={`sm2-rail${isPass ? ' is-pass' : ''}${i === 0 ? ' is-first' : ''}${i === n - 1 ? ' is-last' : ''}`}
                style={{ gridRow: row }}
                aria-hidden="true"
              />
              <div
                className={`sm2-layer${isNarrow ? ' is-narrow' : ''}${isPass ? ' is-pass' : ''}${state(l.id)}`}
                style={{ gridRow: row }}
                onClick={() => select(l.id)}
                onKeyDown={keySelect(l.id)}
                role="button"
                tabIndex={0}
                aria-pressed={active === l.id}
              >
                <span className="sm2-head">
                  <Icon id={l.id} />
                  <span className="sm2-label">{l.label}</span>
                </span>
                {l.parts && l.parts.length > 0 ? (
                  <span className="sm2-parts">
                    {l.parts.map((p) => (
                      <span key={p} className="sm2-chip">
                        {p}
                      </span>
                    ))}
                  </span>
                ) : null}
              </div>
              <span
                className={`sm2-tap${isPass ? ' is-pass' : ''}`}
                style={{ gridRow: row }}
                aria-hidden="true"
              />
              <span className="sm2-span" style={{ gridRow: row }} aria-hidden="true">
                <span className="sm2-track">
                  <span
                    className={`sm2-bar${isNarrow ? ' is-narrow' : ''}`}
                    style={{ left: `${s.left}%`, width: `${s.width}%` }}
                  />
                </span>
              </span>
            </div>
          )
        })}

        {/* Footer row */}
        <div className="sm2-foot" style={{ gridRow: n + 2 }}>
          {labels.trace ?? 'One request, one trace: each bar is the time spent inside a layer.'}
        </div>
        {side.parts && side.parts.length > 0 ? (
          <div className="sm2-sideparts" style={{ gridRow: n + 2 }}>
            {side.parts.map((p) => (
              <span key={p} className="sm2-chip">
                {p}
              </span>
            ))}
          </div>
        ) : null}
      </div>

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
