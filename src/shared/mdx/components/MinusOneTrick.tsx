'use client'

import { useEffect, useMemo, useState } from 'react'

interface MinusOneTrickProps {
  a?: number[][]
  labels?: {
    step?: string
    pause?: string
    original?: string
    rref?: string
    insert?: string
    basis?: string
    check?: string
  }
}

const clean = (v: number) => (Math.abs(v) < 1e-10 ? 0 : Math.round(v * 1e6) / 1e6)
const fmt = (v: number) => {
  const n = clean(v)
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100)
}

/** Reduced row echelon form, returning the pivot column of each pivot row. */
function rref(src: number[][]) {
  const R = src.map((r) => r.map(clean))
  const m = R.length
  const n = R[0].length
  const pivots: number[] = []
  let row = 0
  for (let col = 0; col < n && row < m; col++) {
    let p = row
    for (let r = row; r < m; r++) if (Math.abs(R[r][col]) > Math.abs(R[p][col])) p = r
    if (Math.abs(R[p][col]) < 1e-9) continue
    ;[R[row], R[p]] = [R[p], R[row]]
    const pv = R[row][col]
    R[row] = R[row].map((v) => clean(v / pv))
    for (let r = 0; r < m; r++) {
      if (r === row) continue
      const f = R[r][col]
      if (f === 0) continue
      R[r] = R[r].map((v, j) => clean(v - f * R[row][j]))
    }
    pivots.push(col)
    row++
  }
  return { R, pivots }
}

export default function MinusOneTrick({
  a = [
    [1, 2, -1],
    [2, 4, -2],
  ],
  labels = {},
}: MinusOneTrickProps) {
  const n = a[0].length

  const { R, pivots, square, free } = useMemo(() => {
    const { R, pivots } = rref(a)
    const free = Array.from({ length: n }, (_, j) => j).filter((j) => !pivots.includes(j))
    // Square n×n: pivot rows keep their RREF row, free rows carry a −1 on the diagonal.
    const square: number[][] = Array.from({ length: n }, (_, i) => {
      const k = pivots.indexOf(i)
      if (k >= 0) return [...R[k]]
      return Array.from({ length: n }, (_, j) => (j === i ? -1 : 0))
    })
    return { R, pivots, square, free }
  }, [a, n])

  // phases: 0 = A, 1 = RREF, then one per inserted row, then the basis
  const total = 2 + free.length + 1
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= total - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 1500)
    return () => clearTimeout(t)
  }, [playing, step, total])

  const insertedUpTo = Math.max(0, Math.min(free.length, step - 1))
  const showBasis = step >= total - 1

  const rows: Array<{ cells: number[]; kind: 'rref' | 'minus' | 'hidden' }> =
    step === 0
      ? a.map((r) => ({ cells: r, kind: 'rref' as const }))
      : Array.from({ length: n }, (_, i) => {
          const k = pivots.indexOf(i)
          if (k >= 0) return { cells: square[i], kind: 'rref' as const }
          const order = free.indexOf(i)
          return order < insertedUpTo
            ? { cells: square[i], kind: 'minus' as const }
            : { cells: square[i], kind: 'hidden' as const }
        })

  const note =
    step === 0
      ? (labels.original ?? 'A')
      : step === 1
        ? (labels.rref ?? 'reduced row echelon form')
        : showBasis
          ? (labels.basis ?? 'the −1 columns are a basis of the null space')
          : `${labels.insert ?? 'insert'} −1 → x${free[insertedUpTo - 1] + 1}`

  const basis = free.map((j) => square.map((r) => r[j]))

  return (
    <div className="mmul">
      <div className="mmul-stage">
        <div className="mmul-row">
          <div className="mmul-block">
            <span className="mmul-name">{step === 0 ? 'A' : 'RREF'}</span>
            <div className="mmul-bracket">
              <div
                className="mmul-cells"
                style={{ gridTemplateColumns: `repeat(${n}, minmax(32px, auto))` }}
              >
                {rows.map((r, i) =>
                  r.cells.map((v, j) => (
                    <span
                      key={`${i}-${j}`}
                      className={[
                        'mmul-cell',
                        r.kind === 'hidden' ? 'is-pending' : '',
                        r.kind === 'minus' && j === i ? 'is-target' : '',
                        showBasis && free.includes(j) ? 'is-source' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {r.kind === 'hidden' ? '·' : fmt(v)}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {showBasis && (
            <>
              <span className="mmul-op">→</span>
              {basis.map((vec, k) => (
                <div className="mmul-block" key={k}>
                  <span className="mmul-name">
                    n<em>{k + 1}</em>
                  </span>
                  <div className="mmul-bracket">
                    <div
                      className="mmul-cells"
                      style={{ gridTemplateColumns: 'minmax(32px, auto)' }}
                    >
                      {vec.map((v, i) => (
                        <span key={i} className="mmul-cell">
                          {fmt(v)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <p className="mmul-formula" aria-live="polite">
          {note}
        </p>
      </div>

      <div className="mmul-controls">
        <div className="elim-buttons">
          <button
            type="button"
            className="elim-btn"
            disabled={step === 0}
            onClick={() => {
              setPlaying(false)
              setStep((s) => Math.max(0, s - 1))
            }}
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
            disabled={step === total - 1}
            onClick={() => {
              setPlaying(false)
              setStep((s) => Math.min(total - 1, s + 1))
            }}
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
