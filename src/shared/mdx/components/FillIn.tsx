'use client'

import { useMemo, useState } from 'react'

interface FillInProps {
  n?: number
  labels?: {
    hint?: string
    arrowFirst?: string
    arrowLast?: string
    original?: string
    factors?: string
    nnz?: string
    fill?: string
    none?: string
  }
}

/**
 * Symbolic elimination: an entry (i,j) becomes non-zero when a[i][k] and a[k][j]
 * are both non-zero for some pivot k < min(i,j). No arithmetic, only the pattern.
 */
function symbolic(pattern: boolean[][]) {
  const n = pattern.length
  const P = pattern.map((r) => [...r])
  const filled: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false))
  for (let k = 0; k < n; k++) {
    for (let i = k + 1; i < n; i++) {
      if (!P[i][k]) continue
      for (let j = k + 1; j < n; j++) {
        if (!P[k][j]) continue
        if (!P[i][j]) {
          P[i][j] = true
          filled[i][j] = true
        }
      }
    }
  }
  return { P, filled }
}

export default function FillIn({ n = 8, labels = {} }: FillInProps) {
  const [last, setLast] = useState(false)

  const base = useMemo(() => {
    // Arrowhead: diagonal plus one dense row and column, at the first or last index.
    const tip = last ? n - 1 : 0
    return Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => i === j || i === tip || j === tip)
    )
  }, [n, last])

  const { P, filled } = useMemo(() => symbolic(base), [base])

  const nnzA = base.flat().filter(Boolean).length
  const nnzLU = P.flat().filter(Boolean).length
  const added = nnzLU - nnzA

  const cellSize = 15

  const grid = (pattern: boolean[][], marks: boolean[][] | null, title: string, count: number) => (
    <div className="fill-block">
      <span className="mmul-name">
        {title} <em>{count} nnz</em>
      </span>
      <div
        className="fill-grid"
        style={{ gridTemplateColumns: `repeat(${n}, ${cellSize}px)` }}
        aria-hidden="true"
      >
        {pattern.map((row, i) =>
          row.map((on, j) => (
            <span
              key={`${i}-${j}`}
              className={['fill-cell', on ? 'is-on' : '', marks?.[i][j] ? 'is-fill' : '']
                .filter(Boolean)
                .join(' ')}
            />
          ))
        )}
      </div>
    </div>
  )

  return (
    <div className="fill">
      <div className="fill-stage">
        <div className="fill-row">
          {grid(base, null, labels.original ?? 'A', nnzA)}
          <span className="mmul-op">→</span>
          {grid(P, filled, labels.factors ?? 'L + U', nnzLU)}
        </div>
        <p className="mmul-formula" aria-live="polite">
          {added > 0 ? (
            <>
              <strong>{added}</strong> {labels.fill ?? 'entries created by elimination'}
            </>
          ) : (
            <>{labels.none ?? 'no fill-in: the factors keep the sparsity of A'}</>
          )}
        </p>
      </div>

      <div className="fill-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'The same matrix, with its rows and columns in a different order.'}
        </p>
        <div className="fill-toggle">
          <button
            type="button"
            className={!last ? 'bc-preset is-active' : 'bc-preset'}
            onClick={() => setLast(false)}
          >
            {labels.arrowFirst ?? 'arrow first'}
          </button>
          <button
            type="button"
            className={last ? 'bc-preset is-active' : 'bc-preset'}
            onClick={() => setLast(true)}
          >
            {labels.arrowLast ?? 'arrow last'}
          </button>
        </div>
        <p className="mplay-readout">
          {labels.nnz ?? 'non-zeros'}: A = {nnzA} · L + U = {nnzLU}
        </p>
      </div>
    </div>
  )
}
