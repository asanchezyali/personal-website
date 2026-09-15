'use client'

import { useEffect, useMemo, useState } from 'react'

interface GramSchmidtProps {
  vectors?: number[][]
  alternative?: number[]
  labels?: {
    step?: string
    pause?: string
    subtract?: string
    residual?: string
    dependent?: string
    independent?: string
    swap?: string
    restore?: string
  }
}

const fmt = (v: number) => {
  const n = Math.abs(v) < 1e-10 ? 0 : Math.round(v * 1000) / 1000
  return Number.isInteger(n) ? String(n) : n.toFixed(2)
}

interface Frame {
  q: number[][]
  current: number[]
  norm: number
  note: string
  index: number
  dependent: boolean
}

const dot = (a: number[], b: number[]) => a.reduce((s, x, i) => s + x * b[i], 0)
const norm = (a: number[]) => Math.sqrt(dot(a, a))

/** Classical Gram-Schmidt, recorded frame by frame. */
function run(vs: number[][], L: GramSchmidtProps['labels'] = {}): Frame[] {
  const frames: Frame[] = []
  const q: number[][] = []
  vs.forEach((v, k) => {
    let r = [...v]
    frames.push({
      q: q.map((x) => [...x]),
      current: [...r],
      norm: norm(r),
      note: `v${k + 1}`,
      index: k,
      dependent: false,
    })
    q.forEach((u, j) => {
      const c = dot(u, r)
      r = r.map((x, i) => x - c * u[i])
      frames.push({
        q: q.map((x) => [...x]),
        current: [...r],
        norm: norm(r),
        note: `${L.subtract ?? 'remove'} ⟨v${k + 1}, q${j + 1}⟩ q${j + 1}`,
        index: k,
        dependent: false,
      })
    })
    const n = norm(r)
    const dep = n < 1e-8
    frames.push({
      q: q.map((x) => [...x]),
      current: [...r],
      norm: n,
      note: dep ? (L.dependent ?? 'residual zero: dependent') : `q${k + 1} = v${k + 1}′ / ‖v${k + 1}′‖`,
      index: k,
      dependent: dep,
    })
    if (!dep) q.push(r.map((x) => x / n))
  })
  return frames
}

export default function GramSchmidt({
  vectors = [
    [1, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  alternative = [0, 0, 1],
  labels = {},
}: GramSchmidtProps) {
  const [alt, setAlt] = useState(false)
  const vs = useMemo(
    () => (alt ? [...vectors.slice(0, -1), alternative] : vectors),
    [alt, vectors, alternative]
  )
  const frames = useMemo(() => run(vs, labels), [vs, labels])

  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const last = frames.length - 1
  const f = frames[Math.min(i, last)]

  useEffect(() => setI(0), [alt])
  useEffect(() => {
    if (!playing) return
    if (i >= last) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setI((k) => Math.min(k + 1, last)), 1200)
    return () => clearTimeout(t)
  }, [playing, i, last])

  const anyDependent = frames.some((fr) => fr.dependent)

  const col = (v: number[], name: string, cls = '') => (
    <div className="mmul-block" key={name}>
      <span className="mmul-name">{name}</span>
      <div className="mmul-bracket">
        <div className="mmul-cells" style={{ gridTemplateColumns: 'minmax(46px, auto)' }}>
          {v.map((x, k) => (
            <span key={k} className={`mmul-cell ${cls}`}>{fmt(x)}</span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="mmul">
      <div className="mmul-stage">
        <div className="mmul-row">
          {f.q.map((u, k) => col(u, `q${k + 1}`))}
          {f.q.length > 0 && <span className="mmul-op">|</span>}
          {col(f.current, `v${f.index + 1}′`, f.dependent ? 'is-target' : 'is-source')}
        </div>
        <p className="mmul-formula" aria-live="polite">
          {f.note} · {labels.residual ?? '‖·‖'} = <strong>{fmt(f.norm)}</strong>
        </p>
      </div>

      <div className="mmul-controls">
        <button
          type="button"
          className="bc-preset"
          onClick={() => setAlt((a) => !a)}
        >
          {alt ? (labels.restore ?? 'restore v3') : (labels.swap ?? 'replace v3')}
        </button>

        <p className={`gs-verdict ${anyDependent ? 'is-dep' : 'is-indep'}`}>
          {anyDependent ? (labels.dependent ?? 'dependent') : (labels.independent ?? 'independent')}
        </p>

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
