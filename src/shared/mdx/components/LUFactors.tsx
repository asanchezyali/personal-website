'use client'

import { useEffect, useMemo, useState } from 'react'

interface LUFactorsProps {
  a?: number[][]
  labels?: { step?: string; pause?: string; swap?: string; store?: string; done?: string }
}

const clean = (v: number) => (Math.abs(v) < 1e-12 ? 0 : Math.round(v * 1e6) / 1e6)
const fmt = (v: number) => {
  const n = clean(v)
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100)
}

interface Frame {
  L: number[][]
  U: number[][]
  perm: number[]
  note: string
  hi: { grid: 'L' | 'U'; row: number; col?: number } | null
}

/** Gaussian elimination with partial pivoting, recorded frame by frame. */
function factor(a: number[][], L: LUFactorsProps['labels'] = {}): Frame[] {
  const n = a.length
  const U = a.map((r) => r.map(clean))
  const Lm: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  )
  const perm = Array.from({ length: n }, (_, i) => i)
  const snap = (note: string, hi: Frame['hi']): Frame => ({
    L: Lm.map((r) => [...r]),
    U: U.map((r) => [...r]),
    perm: [...perm],
    note,
    hi,
  })
  const frames: Frame[] = [snap('P A = L U', null)]

  for (let k = 0; k < n; k++) {
    let p = k
    for (let r = k; r < n; r++) if (Math.abs(U[r][k]) > Math.abs(U[p][k])) p = r
    if (Math.abs(U[p][k]) < 1e-12) continue
    if (p !== k) {
      ;[U[k], U[p]] = [U[p], U[k]]
      for (let j = 0; j < k; j++) [Lm[k][j], Lm[p][j]] = [Lm[p][j], Lm[k][j]]
      ;[perm[k], perm[p]] = [perm[p], perm[k]]
      frames.push(snap(`${L.swap ?? 'swap'} F${k + 1} ⇄ F${p + 1}`, { grid: 'U', row: k }))
    }
    for (let r = k + 1; r < n; r++) {
      const m = clean(U[r][k] / U[k][k])
      if (m === 0) continue
      Lm[r][k] = m
      for (let j = 0; j < n; j++) U[r][j] = clean(U[r][j] - m * U[k][j])
      frames.push(
        snap(`${L.store ?? 'ℓ'}${r + 1}${k + 1} = ${fmt(m)}`, { grid: 'L', row: r, col: k })
      )
    }
  }
  frames.push(snap(L.done ?? 'P A = L U', null))
  return frames
}

export default function LUFactors({
  a = [
    [2, 1, -1],
    [-3, -1, 2],
    [-2, 1, 2],
  ],
  labels = {},
}: LUFactorsProps) {
  const frames = useMemo(() => factor(a, labels), [a, labels])
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const last = frames.length - 1
  const f = frames[i]
  const n = a.length

  useEffect(() => {
    if (!playing) return
    if (i >= last) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setI((k) => Math.min(k + 1, last)), 1400)
    return () => clearTimeout(t)
  }, [playing, i, last])

  const grid = (rows: number[][], kind: 'P' | 'L' | 'U', label: string) => (
    <div className="mmul-block">
      <span className="mmul-name">{label}</span>
      <div className="mmul-bracket">
        <div className="mmul-cells" style={{ gridTemplateColumns: `repeat(${n}, minmax(30px, auto))` }}>
          {rows.map((row, r) =>
            row.map((v, c) => {
              const active =
                f.hi?.grid === kind &&
                f.hi.row === r &&
                (f.hi.col === undefined || f.hi.col === c)
              return (
                <span
                  key={`${r}-${c}`}
                  className={[
                    'mmul-cell',
                    active ? 'is-target' : '',
                    kind === 'L' && r === c ? 'is-diagonal' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {fmt(v)}
                </span>
              )
            })
          )}
        </div>
      </div>
    </div>
  )

  // P as a matrix: row i of P A is row perm[i] of A.
  const P: number[][] = f.perm.map((src) => Array.from({ length: n }, (_, j) => (j === src ? 1 : 0)))

  return (
    <div className="mmul">
      <div className="mmul-stage">
        <div className="mmul-row">
          {grid(P, 'P', 'P')}
          {grid(f.L, 'L', 'L')}
          {grid(f.U, 'U', 'U')}
        </div>
        <p className="mmul-formula" aria-live="polite">
          {f.note}
        </p>
      </div>

      <div className="mmul-controls">
        <div className="elim-buttons">
          <button type="button" className="elim-btn" disabled={i === 0}
                  onClick={() => { setPlaying(false); setI((k) => Math.max(0, k - 1)) }} aria-label="−1">◀</button>
          <button type="button" className="elim-btn is-play"
                  onClick={() => { if (i >= last) setI(0); setPlaying((p) => !p) }}>
            {playing ? (labels.pause ?? '❚❚') : '▶'}
          </button>
          <button type="button" className="elim-btn" disabled={i === last}
                  onClick={() => { setPlaying(false); setI((k) => Math.min(last, k + 1)) }} aria-label="+1">▶</button>
        </div>
        <div className="elim-track" aria-hidden="true">
          <span style={{ width: `${(i / last) * 100}%` }} />
        </div>
        <p className="elim-count">{labels.step ?? 'Step'} {i + 1} / {frames.length}</p>
      </div>
    </div>
  )
}
