'use client'

import { useState } from 'react'

interface PermutationOrderProps {
  tokens?: string[]
  labels?: {
    hint?: string
    shuffle?: string
    predicted?: string
    context?: string
    pending?: string
    sees?: string
    target?: string
    note?: string
    reset?: string
  }
}

const DEFAULT = ['The', 'sun', 'is', 'very', 'bright', 'today']
const START: number[] = [0, 1, 4, 2, 5, 3]

export default function PermutationOrder({ tokens = DEFAULT, labels = {} }: PermutationOrderProps) {
  const n = tokens.length
  const [order, setOrder] = useState<number[]>(START.slice(0, n))
  // Partial prediction: only the tail of the factorisation order is a target.
  const [predict, setPredict] = useState(3)

  const cut = n - predict
  const stepOf = new Map<number, number>()
  order.forEach((pos, step) => stepOf.set(pos, step))

  // The current target is the first predicted position in the order.
  const [focus, setFocus] = useState(0)
  const targetStep = cut + Math.min(focus, predict - 1)
  const target = order[targetStep]
  // It may condition on everything earlier in the order, wherever that sits in the sentence.
  const visible = new Set(order.slice(0, targetStep))

  const shuffle = () => {
    const a = [...Array(n).keys()]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    setOrder(a)
    setFocus(0)
  }

  const rightward = [...visible].filter((p) => p > target).length

  return (
    <div className="perm">
      <div className="perm-stage">
        <div className="perm-row">
          {tokens.map((t, pos) => {
            const step = stepOf.get(pos) ?? 0
            const isTarget = pos === target
            const isCtx = visible.has(pos)
            const cls = isTarget ? 'perm-tok is-target' : isCtx ? 'perm-tok is-ctx' : 'perm-tok'
            return (
              <span key={pos} className={cls}>
                <em>{pos + 1}</em>
                {t}
                <i>{step >= cut ? `#${step - cut + 1}` : '·'}</i>
              </span>
            )
          })}
        </div>

        <p className="mmul-formula" aria-live="polite">
          {labels.target ?? 'target'} <strong>{tokens[target]}</strong> · {labels.sees ?? 'sees'}{' '}
          <strong>{visible.size}</strong>
          {rightward > 0 && <> ({rightward} →)</>}
        </p>
      </div>

      <div className="perm-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'Positions never move; only the order of prediction does.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">#</span>
          <input
            type="range"
            min={1}
            max={Math.max(predict, 1)}
            step={1}
            value={focus + 1}
            onChange={(e) => setFocus(Number(e.target.value) - 1)}
            aria-label="step"
          />
          <span className="mplay-val">
            {focus + 1}/{predict}
          </span>
        </label>

        <label className="mplay-slider">
          <span className="mplay-name">k</span>
          <input
            type="range"
            min={1}
            max={n - 1}
            step={1}
            value={predict}
            onChange={(e) => {
              setPredict(Number(e.target.value))
              setFocus(0)
            }}
            aria-label="predicted"
          />
          <span className="mplay-val">{predict}</span>
        </label>

        <ul className="fs-legend">
          <li>
            <i className="perm-k-target" /> {labels.target ?? 'target'}
          </li>
          <li>
            <i className="perm-k-ctx" /> {labels.context ?? 'visible to it'}
          </li>
          <li>
            <i className="perm-k-pending" /> {labels.pending ?? 'not predicted yet'}
          </li>
        </ul>

        <p className="cs-note">
          {labels.note ??
            'A target may condition on tokens to its right, which is what a causal model cannot do.'}
        </p>

        <div className="perm-btns">
          <button className="mplay-reset" type="button" onClick={shuffle}>
            {labels.shuffle ?? 'Another order'}
          </button>
          <button
            className="mplay-reset"
            type="button"
            onClick={() => {
              setOrder(START.slice(0, n))
              setPredict(3)
              setFocus(0)
            }}
          >
            {labels.reset ?? 'Reset'}
          </button>
        </div>
      </div>
    </div>
  )
}
