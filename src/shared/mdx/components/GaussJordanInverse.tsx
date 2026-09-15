'use client'

import { useEffect, useMemo, useState } from 'react'

interface GaussJordanInverseProps {
  a?: number[][]
  rowLetter?: string
  labels?: { start?: string; done?: string; singular?: string; step?: string; pause?: string }
}

const clean = (v: number) => (Math.abs(v) < 1e-10 ? 0 : Math.round(v * 1e6) / 1e6)
const fmt = (v: number) => {
  const n = clean(v)
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100)
}

interface Frame {
  m: number[][]
  note: string
  hi: { row: number; pivot?: number } | null
}

/** Gauss-Jordan on [A | I]; when it terminates the right block is A⁻¹. */
function build(a: number[][], L: string, labels: GaussJordanInverseProps['labels'] = {}): Frame[] {
  const n = a.length
  const m = a.map((row, i) => [
    ...row.map(clean),
    ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  ])
  const snap = (note: string, hi: Frame['hi']): Frame => ({ m: m.map((r) => [...r]), note, hi })
  const frames: Frame[] = [snap(labels.start ?? '[ A | I ]', null)]
  let singular = false

  for (let col = 0; col < n; col++) {
    let p = col
    for (let r = col; r < n; r++) if (Math.abs(m[r][col]) > Math.abs(m[p][col])) p = r
    if (Math.abs(m[p][col]) < 1e-12) {
      singular = true
      continue
    }
    if (p !== col) {
      ;[m[p], m[col]] = [m[col], m[p]]
      frames.push(snap(`${L}${col + 1} ⇄ ${L}${p + 1}`, { row: col, pivot: p }))
    }
    const pv = m[col][col]
    if (Math.abs(pv - 1) > 1e-12) {
      m[col] = m[col].map((v) => clean(v / pv))
      frames.push(snap(`${L}${col + 1} ← ${L}${col + 1} ÷ ${fmt(pv)}`, { row: col }))
    }
    for (let r = 0; r < n; r++) {
      if (r === col) continue
      const f = m[r][col]
      if (Math.abs(f) < 1e-12) continue
      m[r] = m[r].map((v, j) => clean(v - f * m[col][j]))
      frames.push(
        snap(
          `${L}${r + 1} ← ${L}${r + 1} ${f < 0 ? '+' : '−'} ${fmt(Math.abs(f))}·${L}${col + 1}`,
          {
            row: r,
            pivot: col,
          }
        )
      )
    }
  }
  frames.push(
    snap(singular ? (labels.singular ?? 'A is singular') : (labels.done ?? '[ I | A⁻¹ ]'), null)
  )
  return frames
}

export default function GaussJordanInverse({
  a = [
    [1, 2, 1],
    [4, 4, 5],
    [6, 7, 7],
  ],
  rowLetter = 'R',
  labels = {},
}: GaussJordanInverseProps) {
  const frames = useMemo(() => build(a, rowLetter, labels), [a, rowLetter, labels])
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const last = frames.length - 1
  const f = frames[i]
  const prev = i > 0 ? frames[i - 1] : null
  const n = a.length

  useEffect(() => {
    if (!playing) return
    if (i >= last) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setI((k) => Math.min(k + 1, last)), 1100)
    return () => clearTimeout(t)
  }, [playing, i, last])

  return (
    <div className="elim">
      <div className="elim-stage">
        <div className="elim-matrix" role="img" aria-label={f.note}>
          <span className="elim-bracket" aria-hidden="true" />
          <div
            className="elim-cells"
            style={{ gridTemplateColumns: `repeat(${n}, 1fr) 10px repeat(${n}, 1fr)` }}
          >
            {f.m.map((row, r) => (
              <div key={r} style={{ display: 'contents' }}>
                {row.slice(0, n).map((v, c) => (
                  <span
                    key={`l${r}-${c}`}
                    className={[
                      'elim-cell',
                      prev && clean(prev.m[r][c]) !== clean(v) ? 'is-changed' : '',
                      f.hi?.pivot === r ? 'is-pivot' : '',
                      f.hi?.row === r ? 'is-target' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {fmt(v)}
                  </span>
                ))}
                <span className="elim-sep" aria-hidden="true" />
                {row.slice(n).map((v, c) => (
                  <span
                    key={`r${r}-${c}`}
                    className={[
                      'elim-cell',
                      prev && clean(prev.m[r][n + c]) !== clean(v) ? 'is-changed' : '',
                      f.hi?.pivot === r ? 'is-pivot' : '',
                      f.hi?.row === r ? 'is-target' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {fmt(v)}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <span className="elim-bracket is-right" aria-hidden="true" />
        </div>
        <p className="elim-note" aria-live="polite">
          {f.note}
        </p>
      </div>

      <div className="elim-controls">
        <div className="elim-buttons">
          <button
            type="button"
            className="elim-btn"
            disabled={i === 0}
            onClick={() => {
              setPlaying(false)
              setI((k) => Math.max(0, k - 1))
            }}
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
            disabled={i === last}
            onClick={() => {
              setPlaying(false)
              setI((k) => Math.min(last, k + 1))
            }}
            aria-label="+1"
          >
            ▶
          </button>
        </div>
        <div className="elim-track" aria-hidden="true">
          <span style={{ width: `${(i / last) * 100}%` }} />
        </div>
        <p className="elim-count">
          {labels.step ?? 'Step'} {i + 1} / {frames.length}
        </p>
      </div>
    </div>
  )
}
