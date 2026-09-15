'use client'

import { useEffect, useState } from 'react'

interface TransposeGridProps {
  a?: number[][]
  names?: { a?: string; t?: string }
  labels?: { step?: string; pause?: string; diagonal?: string }
}

export default function TransposeGrid({
  a = [
    [1, 2, 3],
    [4, 5, 6],
  ],
  names = {},
  labels = {},
}: TransposeGridProps) {
  const m = a.length
  const n = a[0].length
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
    const t = setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 900)
    return () => clearTimeout(t)
  }, [playing, step, total])

  const t: number[][] = Array.from({ length: n }, (_, r) =>
    Array.from({ length: m }, (_, c) => a[c][r])
  )

  const grid = (rows: number[][], kind: 'a' | 't', label: string, shape: string) => (
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
            row.map((v, c) => {
              const active = kind === 'a' ? r === i && c === j : r === j && c === i
              const onDiagonal = r === c
              return (
                <span
                  key={`${r}-${c}`}
                  className={[
                    'mmul-cell',
                    active ? 'is-target' : '',
                    !active && onDiagonal ? 'is-diagonal' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {v}
                </span>
              )
            })
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="mmul">
      <div className="mmul-stage">
        <div className="mmul-row">
          {grid(a, 'a', names.a ?? 'A', `${m}×${n}`)}
          <span className="mmul-op">→</span>
          {grid(t, 't', names.t ?? 'Aᵀ', `${n}×${m}`)}
        </div>

        <p className="mmul-formula" aria-live="polite">
          <span className="mmul-lhs">
            a
            <sub>
              {i + 1}
              {j + 1}
            </sub>
          </span>
          {' = '}
          <strong>{a[i][j]}</strong>
          {'  →  '}
          <span className="mmul-lhs">
            (Aᵀ)
            <sub>
              {j + 1}
              {i + 1}
            </sub>
          </span>
          {' = '}
          <strong>{a[i][j]}</strong>
        </p>
      </div>

      <div className="mmul-controls">
        <p className="dvec-hint">
          {labels.diagonal ?? 'The diagonal stays fixed; every other entry swaps its indices.'}
        </p>
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
