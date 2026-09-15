'use client'

import { useEffect, useMemo, useState } from 'react'

interface EliminationStepsProps {
  /** Coefficient matrix, row by row. */
  a?: number[][]
  /** Right-hand side. */
  b?: number[]
  /** Letter used for rows in the operation notation: F for "fila", R for "row". */
  rowLetter?: string
  labels?: {
    start?: string
    done?: string
    singular?: string
    play?: string
    pause?: string
    step?: string
  }
}

type Highlight = { row: number; pivot?: number } | null
interface Step {
  m: number[][]
  note: string
  hi: Highlight
}

const clean = (v: number) => (Math.abs(v) < 1e-10 ? 0 : Math.round(v * 1e6) / 1e6)
const fmt = (v: number) => {
  const n = clean(v)
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100)
}

function buildSteps(
  a: number[][],
  b: number[],
  L: string,
  labels: EliminationStepsProps['labels'] = {}
): Step[] {
  const n = a.length
  const m = a.map((row, i) => [...row.map(clean), clean(b[i])])
  const snap = () => m.map((r) => [...r])
  const steps: Step[] = [{ m: snap(), note: labels.start ?? 'Augmented matrix [A | b]', hi: null }]
  let singular = false

  for (let col = 0; col < n; col++) {
    let p = col
    for (let r = col; r < n; r++) if (Math.abs(m[r][col]) > Math.abs(m[p][col])) p = r
    if (Math.abs(m[p][col]) < 1e-9) {
      singular = true
      continue
    }
    if (p !== col) {
      const t = m[p]
      m[p] = m[col]
      m[col] = t
      steps.push({ m: snap(), note: `${L}${col + 1} ⇄ ${L}${p + 1}`, hi: { row: col, pivot: p } })
    }
    const pv = m[col][col]
    if (Math.abs(pv - 1) > 1e-9) {
      m[col] = m[col].map((v) => clean(v / pv))
      steps.push({
        m: snap(),
        note: `${L}${col + 1} ← ${L}${col + 1} ÷ ${fmt(pv)}`,
        hi: { row: col },
      })
    }
    for (let r = 0; r < n; r++) {
      if (r === col) continue
      const f = m[r][col]
      if (Math.abs(f) < 1e-9) continue
      m[r] = m[r].map((v, k) => clean(v - f * m[col][k]))
      const sign = f < 0 ? '+' : '−'
      steps.push({
        m: snap(),
        note: `${L}${r + 1} ← ${L}${r + 1} ${sign} ${fmt(Math.abs(f))}·${L}${col + 1}`,
        hi: { row: r, pivot: col },
      })
    }
  }

  steps.push({
    m: snap(),
    note: singular
      ? (labels.singular ?? 'A is singular')
      : (labels.done ?? 'Done — the last column is x'),
    hi: null,
  })
  return steps
}

export default function EliminationSteps({
  a = [
    [1, 1, 1],
    [1, -1, 2],
    [0, 1, 1],
  ],
  b = [3, 2, 2],
  rowLetter = 'R',
  labels = {},
}: EliminationStepsProps) {
  const steps = useMemo(() => buildSteps(a, b, rowLetter, labels), [a, b, rowLetter, labels])
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const last = steps.length - 1

  useEffect(() => {
    if (!playing) return
    if (i >= last) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setI((k) => Math.min(k + 1, last)), 1500)
    return () => clearTimeout(t)
  }, [playing, i, last])

  const step = steps[i]
  const prev = i > 0 ? steps[i - 1] : null
  const n = step.m.length

  return (
    <div className="elim">
      <div className="elim-stage">
        <div className="elim-matrix" role="img" aria-label={step.note}>
          <span className="elim-bracket" aria-hidden="true" />
          <div className="elim-cells" style={{ gridTemplateColumns: `repeat(${n}, 1fr) 10px 1fr` }}>
            {step.m.map((row, r) => (
              <div key={r} className="elim-rowgroup" style={{ display: 'contents' }}>
                {row.slice(0, n).map((v, c) => (
                  <span
                    key={`${i}-${r}-${c}`}
                    className={[
                      'elim-cell',
                      prev && clean(prev.m[r][c]) !== clean(v) ? 'is-changed' : '',
                      step.hi?.pivot === r ? 'is-pivot' : '',
                      step.hi?.row === r ? 'is-target' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {fmt(v)}
                  </span>
                ))}
                <span className="elim-sep" aria-hidden="true" />
                <span
                  key={`${i}-${r}-b`}
                  className={[
                    'elim-cell',
                    prev && clean(prev.m[r][n]) !== clean(row[n]) ? 'is-changed' : '',
                    step.hi?.pivot === r ? 'is-pivot' : '',
                    step.hi?.row === r ? 'is-target' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {fmt(row[n])}
                </span>
              </div>
            ))}
          </div>
          <span className="elim-bracket is-right" aria-hidden="true" />
        </div>

        <p className="elim-note" aria-live="polite">
          {step.note}
        </p>
      </div>

      <div className="elim-controls">
        <div className="elim-buttons">
          <button
            type="button"
            className="elim-btn"
            onClick={() => {
              setPlaying(false)
              setI((k) => Math.max(0, k - 1))
            }}
            disabled={i === 0}
            aria-label="−1"
          >
            ◀
          </button>
          <button
            type="button"
            className="elim-btn is-play"
            onClick={() => {
              if (i >= last) setI(0)
              setPlaying((p) => !p)
            }}
          >
            {playing ? (labels.pause ?? '❚❚') : '▶'}
          </button>
          <button
            type="button"
            className="elim-btn"
            onClick={() => {
              setPlaying(false)
              setI((k) => Math.min(last, k + 1))
            }}
            disabled={i === last}
            aria-label="+1"
          >
            ▶
          </button>
        </div>

        <div className="elim-track" aria-hidden="true">
          <span style={{ width: `${(i / last) * 100}%` }} />
        </div>
        <p className="elim-count">
          {labels.step ?? 'Step'} {i + 1} / {steps.length}
        </p>
      </div>
    </div>
  )
}
