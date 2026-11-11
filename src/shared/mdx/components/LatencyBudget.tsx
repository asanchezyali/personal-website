'use client'

import { useState } from 'react'

interface LatencyBudgetProps {
  /** BCP 47 locale for number formatting, e.g. 'es-CO'. */
  locale?: string
  labels?: {
    gateway?: string
    inputGuard?: string
    retrieval?: string
    prefill?: string
    decode?: string
    outputGuard?: string
    telemetry?: string
    cache?: string
    timeout?: string
    fallback?: string
    guardMs?: string
    retrievalMs?: string
    ttft?: string
    tokens?: string
    speed?: string
    cacheHit?: string
    blockingGuard?: string
    primaryDown?: string
    firstToken?: string
    fullAnswer?: string
    decodeShare?: string
    offPath?: string
    hint?: string
    reset?: string
  }
}

interface Stage {
  key: string
  label: string
  start: number
  ms: number
  /** Runs in the background, off the user's critical path. */
  async?: boolean
  tone?: 'model' | 'guard' | 'fail'
}

const DEFAULTS = {
  guardMs: 60,
  retrievalMs: 120,
  ttftMs: 500,
  tokens: 250,
  speed: 60,
  timeoutMs: 4000,
}

const GATEWAY_MS = 5
const CACHE_LOOKUP_MS = 3
const TELEMETRY_MS = 30

/**
 * Waterfall of one chat request. Every duration is an adjustable assumption; the
 * point is the shape: where time goes, and which stages sit on the critical path.
 */
export default function LatencyBudget({ locale, labels = {} }: LatencyBudgetProps) {
  const seconds = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const fmt = (ms: number) =>
    ms >= 1000 ? `${seconds.format(ms / 1000)} s` : `${Math.round(ms)} ms`
  const [guardMs, setGuardMs] = useState(DEFAULTS.guardMs)
  const [retrievalMs, setRetrievalMs] = useState(DEFAULTS.retrievalMs)
  const [ttftMs, setTtftMs] = useState(DEFAULTS.ttftMs)
  const [tokens, setTokens] = useState(DEFAULTS.tokens)
  const [speed, setSpeed] = useState(DEFAULTS.speed)
  const [cacheHit, setCacheHit] = useState(false)
  const [blockingGuard, setBlockingGuard] = useState(true)
  const [primaryDown, setPrimaryDown] = useState(false)

  const L = {
    gateway: labels.gateway ?? 'gateway + auth',
    inputGuard: labels.inputGuard ?? 'input guard',
    retrieval: labels.retrieval ?? 'retrieval',
    prefill: labels.prefill ?? 'prefill (TTFT)',
    decode: labels.decode ?? 'decode',
    outputGuard: labels.outputGuard ?? 'output guard',
    telemetry: labels.telemetry ?? 'telemetry',
    cache: labels.cache ?? 'cache hit',
    timeout: labels.timeout ?? 'primary timeout',
    fallback: labels.fallback ?? 'fallback',
  }

  const decodeMs = (tokens / speed) * 1000
  const stages: Stage[] = []
  let t = 0
  const push = (s: Omit<Stage, 'start'>) => {
    stages.push({ ...s, start: t })
    if (!s.async) t += s.ms
  }

  push({ key: 'gw', label: L.gateway, ms: GATEWAY_MS })
  if (cacheHit) {
    push({ key: 'cache', label: L.cache, ms: CACHE_LOOKUP_MS })
  } else {
    push({ key: 'ig', label: L.inputGuard, ms: guardMs, tone: 'guard' })
    push({ key: 'rt', label: L.retrieval, ms: retrievalMs })
    if (primaryDown) {
      push({ key: 'to', label: L.timeout, ms: DEFAULTS.timeoutMs, tone: 'fail' })
    }
    push({
      key: 'pf',
      label: primaryDown ? `${L.prefill} · ${L.fallback}` : L.prefill,
      ms: ttftMs,
      tone: 'model',
    })
  }
  const firstTokenModel = t
  if (!cacheHit) {
    push({ key: 'dc', label: L.decode, ms: decodeMs, tone: 'model' })
    push({
      key: 'og',
      label: L.outputGuard,
      ms: guardMs,
      tone: 'guard',
      async: !blockingGuard,
    })
  }
  const total = t
  // With a blocking output guard nothing reaches the user until the check passes.
  const firstVisible = cacheHit ? total : blockingGuard ? total : firstTokenModel
  push({ key: 'tm', label: L.telemetry, ms: TELEMETRY_MS, async: true })

  const span = Math.max(...stages.map((s) => s.start + s.ms))
  const decodeShare = cacheHit ? 0 : (decodeMs / total) * 100

  const reset = () => {
    setGuardMs(DEFAULTS.guardMs)
    setRetrievalMs(DEFAULTS.retrievalMs)
    setTtftMs(DEFAULTS.ttftMs)
    setTokens(DEFAULTS.tokens)
    setSpeed(DEFAULTS.speed)
    setCacheHit(false)
    setBlockingGuard(true)
    setPrimaryDown(false)
  }

  const slider = (
    name: string,
    value: number,
    set: (v: number) => void,
    min: number,
    max: number,
    step: number,
    shown: string
  ) => (
    <label className="mplay-slider lb-slider">
      <span className="mplay-name">{name}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        aria-label={name}
      />
      <span className="mplay-val">{shown}</span>
    </label>
  )

  return (
    <div className="lbud">
      <div className="lbud-stage">
        {stages.map((s) => (
          <div key={s.key} className={s.async ? 'lbud-row is-async' : 'lbud-row'}>
            <span className="lbud-label">
              {s.label}
              {s.async ? ` · ${labels.offPath ?? 'async'}` : ''}
            </span>
            <span className="lbud-track">
              <span
                className={`lbud-bar ${s.tone ? `is-${s.tone}` : ''}`}
                style={{
                  left: `${(s.start / span) * 100}%`,
                  width: `${Math.max((s.ms / span) * 100, 0.6)}%`,
                }}
              />
            </span>
            <span className="dec-val">{fmt(s.ms)}</span>
          </div>
        ))}
        <p className="lbud-sum" aria-live="polite">
          {labels.firstToken ?? 'first visible token'}: <strong>{fmt(firstVisible)}</strong> ·{' '}
          {labels.fullAnswer ?? 'full answer'}: <strong>{fmt(total)}</strong>
          {cacheHit ? null : (
            <>
              {' '}
              · {labels.decodeShare ?? 'decode share'}: <strong>{decodeShare.toFixed(0)}%</strong>
            </>
          )}
        </p>
      </div>

      <div className="lbud-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'Every number is an assumption. Replace them with your own traces.'}
        </p>
        {slider(labels.guardMs ?? 'guard', guardMs, setGuardMs, 0, 400, 10, fmt(guardMs))}
        {slider(
          labels.retrievalMs ?? 'retrieval',
          retrievalMs,
          setRetrievalMs,
          0,
          800,
          10,
          fmt(retrievalMs)
        )}
        {slider(labels.ttft ?? 'TTFT', ttftMs, setTtftMs, 100, 3000, 50, fmt(ttftMs))}
        {slider(labels.tokens ?? 'tokens out', tokens, setTokens, 20, 1500, 10, String(tokens))}
        {slider(labels.speed ?? 'tokens/s', speed, setSpeed, 10, 200, 5, String(speed))}
        <div className="am-modes">
          <button
            type="button"
            className={cacheHit ? 'am-mode is-on' : 'am-mode'}
            onClick={() => setCacheHit(!cacheHit)}
          >
            {labels.cacheHit ?? 'cache hit'}
          </button>
          <button
            type="button"
            className={blockingGuard ? 'am-mode is-on' : 'am-mode'}
            onClick={() => setBlockingGuard(!blockingGuard)}
          >
            {labels.blockingGuard ?? 'blocking output guard'}
          </button>
          <button
            type="button"
            className={primaryDown ? 'am-mode is-on' : 'am-mode'}
            onClick={() => setPrimaryDown(!primaryDown)}
          >
            {labels.primaryDown ?? 'primary model down'}
          </button>
        </div>
        <button className="mplay-reset" type="button" onClick={reset}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
