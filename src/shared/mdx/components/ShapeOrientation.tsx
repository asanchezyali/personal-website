'use client'

import { useState } from 'react'

type Kind = 'flat' | 'col' | 'row'

interface ShapeOrientationProps {
  v?: number[]
  labels?: {
    left?: string
    right?: string
    result?: string
    elementwise?: string
    outer?: string
    warning?: string
  }
  names?: { flat?: string; col?: string; row?: string }
}

const SHAPES: Record<Kind, (n: number) => string> = {
  flat: (n) => `(${n},)`,
  col: (n) => `(${n}, 1)`,
  row: (n) => `(1, ${n})`,
}

/** Broadcast shape of the two operands, written as NumPy would report it. */
function resultOf(a: Kind, b: Kind, n: number) {
  const dims = (k: Kind): number[] => (k === 'flat' ? [n] : k === 'col' ? [n, 1] : [1, n])
  const A = dims(a)
  const B = dims(b)
  const len = Math.max(A.length, B.length)
  const out: number[] = []
  for (let i = 0; i < len; i++) {
    const x = A[A.length - len + i] ?? 1
    const y = B[B.length - len + i] ?? 1
    out.push(Math.max(x, y))
  }
  return out
}

export default function ShapeOrientation({
  v = [1, 2, 3],
  labels = {},
  names = {},
}: ShapeOrientationProps) {
  const n = v.length
  const [a, setA] = useState<Kind>('flat')
  const [b, setB] = useState<Kind>('flat')

  const out = resultOf(a, b, n)
  const isOuter = out.length === 2 && out[0] === n && out[1] === n
  const isElementwise = out.length === 1 || (out.length === 2 && (out[0] === 1 || out[1] === 1))

  // Values of the broadcast sum, for display.
  const grid: number[][] = isOuter
    ? v.map((x) => v.map((y) => (a === 'col' ? x : y) + (b === 'col' ? x : y)))
    : [v.map((x) => x + x)]

  const label: Record<Kind, string> = {
    flat: names.flat ?? '1-D',
    col: names.col ?? 'column',
    row: names.row ?? 'row',
  }

  const picker = (value: Kind, set: (k: Kind) => void, title: string) => (
    <div className="chooser-group">
      <span className="chooser-label">{title}</span>
      <div className="chooser-opts">
        {(['flat', 'col', 'row'] as Kind[]).map((k) => (
          <button
            key={k}
            type="button"
            className={k === value ? 'bc-preset is-active' : 'bc-preset'}
            onClick={() => set(k)}
            aria-pressed={k === value}
          >
            {label[k]} <em>{SHAPES[k](n)}</em>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="shp">
      <div className="shp-stage">
        <p className="shp-expr">
          <code>
            v{a === 'col' ? '.reshape(-1, 1)' : a === 'row' ? '.reshape(1, -1)' : ''} + v
            {b === 'col' ? '.reshape(-1, 1)' : b === 'row' ? '.reshape(1, -1)' : ''}
          </code>
        </p>

        <div className="mmul-bracket">
          <div
            className="mmul-cells"
            style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(30px, auto))` }}
          >
            {grid.map((row, i) =>
              row.map((x, j) => (
                <span key={`${i}-${j}`} className={isOuter ? 'mmul-cell is-source' : 'mmul-cell'}>
                  {x}
                </span>
              ))
            )}
          </div>
        </div>

        <p className={`shp-verdict ${isOuter ? 'is-bad' : 'is-ok'}`} aria-live="polite">
          {labels.result ?? 'result'} ({out.join(', ')}) ·{' '}
          {isOuter
            ? (labels.outer ?? 'every pair, not element by element')
            : (labels.elementwise ?? 'element by element')}
        </p>
        {isOuter && (
          <p className="shp-warning">{labels.warning ?? 'Silent: no error is raised.'}</p>
        )}
      </div>

      <div className="shp-controls">
        {picker(a, setA, labels.left ?? 'left operand')}
        {picker(b, setB, labels.right ?? 'right operand')}
      </div>
    </div>
  )
}
