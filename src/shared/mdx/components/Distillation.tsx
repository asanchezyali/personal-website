'use client'

import { useState } from 'react'

interface DistillationProps {
  classes?: string[]
  logits?: number[]
  labels?: {
    hint?: string
    teacher?: string
    wrongMass?: string
    entropy?: string
    order?: string
    note?: string
    reset?: string
  }
}

const CLASSES = ['cat', 'dog', 'car', 'tree', 'house']
const LOGITS = [5.0, 2.0, 0.5, 0.2, 0.0]

const softmax = (z: number[], T: number) => {
  const s = z.map((x) => x / Math.max(T, 0.1))
  const m = Math.max(...s)
  const e = s.map((x) => Math.exp(x - m))
  const t = e.reduce((a, b) => a + b, 0)
  return e.map((x) => x / t)
}
const entropy = (p: number[]) => -p.reduce((a, x) => a + (x > 0 ? x * Math.log(x) : 0), 0)

export default function Distillation({
  classes = CLASSES,
  logits = LOGITS,
  labels = {},
}: DistillationProps) {
  const [T, setT] = useState(3)

  const p = softmax(logits, T)
  const top = p.indexOf(Math.max(...p))
  // Everything the true label throws away lives in the remaining mass.
  const wrong = 1 - p[top]
  const max = Math.max(...p)

  return (
    <div className="perm">
      <div className="perm-stage">
        {classes.map((c, i) => (
          <div key={c} className="dec-row">
            <span className="dec-tok">{c}</span>
            <span className="dec-track">
              <span
                className={i === top ? 'dst-bar is-top' : 'dst-bar'}
                style={{ width: `${(p[i] / max) * 100}%` }}
              />
            </span>
            <span className="dec-val">{p[i].toFixed(4)}</span>
          </div>
        ))}
      </div>

      <div className="perm-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'The same teacher, read at different temperatures.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">T</span>
          <input
            type="range"
            min={1}
            max={10}
            step={0.5}
            value={T}
            onChange={(e) => setT(Number(e.target.value))}
            aria-label="temperature"
          />
          <span className="mplay-val">{T.toFixed(1)}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          {labels.wrongMass ?? 'mass outside the answer'} ={' '}
          <strong>{(wrong * 100).toFixed(1)}%</strong>
        </p>
        <p className="mplay-readout">
          {labels.entropy ?? 'entropy'} = <strong>{entropy(p).toFixed(3)}</strong> /{' '}
          {Math.log(classes.length).toFixed(3)}
        </p>
        <p className="cs-note">
          {labels.order ??
            'The ordering holds at every temperature. What changes is whether it carries enough mass to teach anything.'}
        </p>
        <p className="cs-note">
          {labels.note ??
            'A one-hot label says only "cat". The teacher also says a dog is a nearer miss than a house.'}
        </p>

        <button className="mplay-reset" type="button" onClick={() => setT(3)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
