'use client'

import { useMemo, useState } from 'react'

interface Preset {
  label: string
  a: number[]
  b: number[]
}

interface BroadcastingProps {
  presets?: Preset[]
  labels?: {
    shapeA?: string
    shapeB?: string
    result?: string
    error?: string
    stretch?: string
    match?: string
    clash?: string
  }
}

const parseShape = (s: string): number[] | null => {
  const parts = s.split(',').map((p) => p.trim()).filter(Boolean)
  if (parts.length === 0 || parts.length > 4) return null
  const nums = parts.map(Number)
  if (nums.some((n) => !Number.isInteger(n) || n < 1 || n > 4096)) return null
  return nums
}

/** NumPy alignment: shapes are compared from the trailing dimension backwards. */
function align(a: number[], b: number[]) {
  const len = Math.max(a.length, b.length)
  const rows: Array<{ a: number | null; b: number | null; out: number | null; kind: string }> = []
  for (let p = 0; p < len; p++) {
    const ia = a.length - len + p
    const ib = b.length - len + p
    const va = ia >= 0 ? a[ia] : null
    const vb = ib >= 0 ? b[ib] : null
    let out: number | null = null
    let kind = 'match'
    if (va === null || vb === null) {
      out = (va ?? vb) as number
      kind = 'pad'
    } else if (va === vb) {
      out = va
      kind = 'match'
    } else if (va === 1 || vb === 1) {
      out = Math.max(va, vb)
      kind = 'stretch'
    } else {
      kind = 'clash'
    }
    rows.push({ a: va, b: vb, out, kind })
  }
  return rows
}

export default function Broadcasting({ presets = [], labels = {} }: BroadcastingProps) {
  const fallback: Preset[] = presets.length
    ? presets
    : [
        { label: '(64, 8) + (8,)', a: [64, 8], b: [8] },
        { label: '(3, 1) + (1, 4)', a: [3, 1], b: [1, 4] },
        { label: '(2, 3) + (3, 2)', a: [2, 3], b: [3, 2] },
      ]

  const [textA, setTextA] = useState(fallback[0].a.join(', '))
  const [textB, setTextB] = useState(fallback[0].b.join(', '))

  const a = parseShape(textA)
  const b = parseShape(textB)
  const rows = useMemo(() => (a && b ? align(a, b) : null), [a, b])
  const ok = rows ? rows.every((r) => r.kind !== 'clash') : false
  const result = ok && rows ? rows.map((r) => r.out).join(', ') : null

  const cell = (v: number | null) => (v === null ? <span className="bc-pad">—</span> : v)

  return (
    <div className="bc">
      <div className="bc-stage">
        <div className="bc-presets">
          {fallback.map((p) => (
            <button
              key={p.label}
              type="button"
              className="bc-preset"
              onClick={() => {
                setTextA(p.a.join(', '))
                setTextB(p.b.join(', '))
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <table className="bc-table">
          <tbody>
            <tr>
              <th scope="row">{labels.shapeA ?? 'A.shape'}</th>
              {rows?.map((r, i) => (
                <td key={i}>
                  <span className={`bc-pill is-${r.kind}`}>{cell(r.a)}</span>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row">{labels.shapeB ?? 'B.shape'}</th>
              {rows?.map((r, i) => (
                <td key={i}>
                  <span className={`bc-pill is-${r.kind}`}>{cell(r.b)}</span>
                </td>
              ))}
            </tr>
            <tr className="bc-out">
              <th scope="row">{labels.result ?? 'resultado'}</th>
              {rows?.map((r, i) => (
                <td key={i}>
                  <span className={`bc-pill is-${r.kind}`}>
                    {r.kind === 'clash' ? '✕' : cell(r.out)}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <p className={`bc-verdict ${ok ? 'is-ok' : 'is-error'}`} aria-live="polite">
          {!rows
            ? '—'
            : ok
              ? `(${result})`
              : (labels.error ??
                'ValueError: operands could not be broadcast together')}
        </p>
      </div>

      <div className="bc-controls">
        <label className="bc-field">
          <span>{labels.shapeA ?? 'A.shape'}</span>
          <input
            type="text"
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            aria-label={labels.shapeA ?? 'A.shape'}
            spellCheck={false}
          />
        </label>
        <label className="bc-field">
          <span>{labels.shapeB ?? 'B.shape'}</span>
          <input
            type="text"
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            aria-label={labels.shapeB ?? 'B.shape'}
            spellCheck={false}
          />
        </label>

        <ul className="bc-legend">
          <li>
            <i className="is-match" /> {labels.match ?? 'dimensiones iguales'}
          </li>
          <li>
            <i className="is-stretch" /> {labels.stretch ?? 'se estira desde 1'}
          </li>
          <li>
            <i className="is-clash" /> {labels.clash ?? 'incompatibles'}
          </li>
        </ul>
      </div>
    </div>
  )
}
