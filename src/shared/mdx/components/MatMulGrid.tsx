'use client'

import { useEffect, useMemo, useState } from 'react'

interface MatMulGridProps {
  a?: number[][]
  b?: number[][]
  names?: { a?: string; b?: string; c?: string }
  labels?: { step?: string; pause?: string }
}

const fmt = (v: number) => {
  const n = Math.abs(v) < 1e-10 ? 0 : Math.round(v * 100) / 100
  return String(n)
}

export default function MatMulGrid({
  a = [
    [1, 2],
    [3, 4],
  ],
  b = [
    [1, 0],
    [3, 1],
  ],
  names = {},
  labels = {},
}: MatMulGridProps) {
  const m = a.length
  const k = a[0].length
  const n = b[0].length

  const c = useMemo(() => {
    const out: number[][] = []
    for (let i = 0; i < m; i++) {
      const row: number[] = []
      for (let j = 0; j < n; j++) {
        let s = 0
        for (let l = 0; l < k; l++) s += a[i][l] * b[l][j]
        row.push(s)
      }
      out.push(row)
    }
    return out
  }, [a, b, m, n, k])

  const total = m * n
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const i = Math.floor(step / n)
  const j = step % n

  useEffect(() => {
    if (!playing) return
    if (step >= total - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 1300)
    return () => clearTimeout(t)
  }, [playing, step, total])

  const nameA = names.a ?? 'A'
  const nameB = names.b ?? 'B'
  const nameC = names.c ?? 'C'

  const grid = (rows: number[][], kind: 'a' | 'b' | 'c', label: string, shape: string) => (
    <div className="mmul-block">
      <span className="mmul-name">
        {label} <em>{shape}</em>
      </span>
      <div className="mmul-bracket">
        <div
          className="mmul-cells"
          style={{ gridTemplateColumns: `repeat(${rows[0].length}, minmax(28px, auto))` }}
        >
          {rows.map((row, r) =>
            row.map((v, col) => {
              const done = kind === 'c' && r * n + col < step
              const active =
                (kind === 'a' && r === i) ||
                (kind === 'b' && col === j) ||
                (kind === 'c' && r === i && col === j)
              const cls = [
                'mmul-cell',
                active ? (kind === 'c' ? 'is-target' : 'is-source') : '',
                kind === 'c' && !active && !done ? 'is-pending' : '',
              ]
                .filter(Boolean)
                .join(' ')
              return (
                <span key={`${r}-${col}`} className={cls}>
                  {kind === 'c' && !active && !done ? '·' : fmt(v)}
                </span>
              )
            })
          )}
        </div>
      </div>
    </div>
  )

  const terms = Array.from({ length: k }, (_, l) => `${fmt(a[i][l])}·${fmt(b[l][j])}`)

  return (
    <div className="mmul">
      <div className="mmul-stage">
        <div className="mmul-row">
          {grid(a, 'a', nameA, `${m}×${k}`)}
          <span className="mmul-op">@</span>
          {grid(b, 'b', nameB, `${k}×${n}`)}
          <span className="mmul-op">=</span>
          {grid(c, 'c', nameC, `${m}×${n}`)}
        </div>

        <p className="mmul-formula" aria-live="polite">
          <span className="mmul-lhs">
            {nameC}
            <sub>
              {i + 1}
              {j + 1}
            </sub>
          </span>
          {' = '}
          {terms.join(' + ')}
          {' = '}
          <strong>{fmt(c[i][j])}</strong>
        </p>
      </div>

      <div className="mmul-controls">
        <div className="elim-buttons">
          <button
            type="button"
            className="elim-btn"
            onClick={() => {
              setPlaying(false)
              setStep((s) => Math.max(0, s - 1))
            }}
            disabled={step === 0}
            aria-label="−1"
          >
            ◀
          </button>
          <button
            type="button"
            className="elim-btn is-play"
            onClick={() => {
              if (step >= total - 1) setStep(0)
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
              setStep((s) => Math.min(total - 1, s + 1))
            }}
            disabled={step === total - 1}
            aria-label="+1"
          >
            ▶
          </button>
        </div>
        <div className="elim-track" aria-hidden="true">
          <span style={{ width: `${(step / (total - 1)) * 100}%` }} />
        </div>
        <p className="elim-count">
          {labels.step ?? 'Step'} {step + 1} / {total}
        </p>
      </div>
    </div>
  )
}
