'use client'

import { useMemo, useState } from 'react'

interface LowRankImageProps {
  /** Side of the square field; the SVD is computed in the browser. */
  n?: number
  labels?: {
    hint?: string
    original?: string
    approx?: string
    error?: string
    energy?: string
    storage?: string
    note?: string
  }
}

/**
 * One-sided Jacobi SVD. Columns of A are orthogonalised in pairs by Givens
 * rotations accumulated into V; at convergence the column norms are the
 * singular values. Stable for the small matrices used here.
 */
function svd(input: number[][]) {
  const m = input.length
  const n = input[0].length
  const A = input.map((r) => [...r])
  const V: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  )
  const col = (M: number[][], j: number) => M.map((r) => r[j])

  for (let sweep = 0; sweep < 40; sweep++) {
    let off = 0
    for (let p = 0; p < n - 1; p++) {
      for (let q = p + 1; q < n; q++) {
        let alpha = 0,
          beta = 0,
          gamma = 0
        for (let i = 0; i < m; i++) {
          alpha += A[i][p] * A[i][p]
          beta += A[i][q] * A[i][q]
          gamma += A[i][p] * A[i][q]
        }
        if (Math.abs(gamma) < 1e-15 * Math.sqrt(alpha * beta) || gamma === 0) continue
        off += Math.abs(gamma)
        const zeta = (beta - alpha) / (2 * gamma)
        const t = Math.sign(zeta || 1) / (Math.abs(zeta) + Math.sqrt(1 + zeta * zeta))
        const c = 1 / Math.sqrt(1 + t * t)
        const s = c * t
        for (let i = 0; i < m; i++) {
          const ap = A[i][p],
            aq = A[i][q]
          A[i][p] = c * ap - s * aq
          A[i][q] = s * ap + c * aq
        }
        for (let i = 0; i < n; i++) {
          const vp = V[i][p],
            vq = V[i][q]
          V[i][p] = c * vp - s * vq
          V[i][q] = s * vp + c * vq
        }
      }
    }
    if (off < 1e-14) break
  }

  const order = Array.from({ length: n }, (_, j) => {
    const cj = col(A, j)
    return { j, s: Math.sqrt(cj.reduce((t, v) => t + v * v, 0)) }
  }).sort((a, b) => b.s - a.s)

  const sigma = order.map((o) => o.s)
  const U = order.map((o) =>
    o.s > 1e-14 ? col(A, o.j).map((v) => v / o.s) : col(A, o.j).map(() => 0)
  )
  const Vt = order.map((o) => col(V, o.j))
  return { sigma, U, Vt } // U[k] and Vt[k] are the k-th left/right singular vectors
}

/**
 * Blobs are separable and therefore rank one each, so a picture made only of
 * them has an exactly finite rank and nothing to truncate. The diagonal ridge
 * and the ring are not separable, which is what gives the spectrum a tail.
 */
function picture(n: number) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      const x = i / (n - 1),
        y = j / (n - 1)
      const blob = (cx: number, cy: number, r: number) =>
        Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * r * r))
      const ridge = Math.exp(-((x - y) ** 2) / (2 * 0.06 ** 2))
      const ring = Math.exp(-((Math.hypot(x - 0.5, y - 0.5) - 0.32) ** 2) / (2 * 0.05 ** 2))
      return (
        0.35 * x +
        0.9 * blob(0.25, 0.3, 0.13) -
        0.7 * blob(0.72, 0.7, 0.1) +
        0.8 * ridge +
        0.6 * ring +
        0.04 * Math.sin(29 * i + 13 * j)
      )
    })
  )
}

export default function LowRankImage({ n = 32, labels = {} }: LowRankImageProps) {
  const [k, setK] = useState(2)

  // The decomposition depends only on n, so it is not redone on every slider move.
  const { X, sigma, U, Vt } = useMemo(() => {
    const X = picture(n)
    return { X, ...svd(X) }
  }, [n])

  const { approx, relErr, energy } = useMemo(() => {
    const approx = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => {
        let s = 0
        for (let t = 0; t < k; t++) s += sigma[t] * U[t][i] * Vt[t][j]
        return s
      })
    )
    const tot = sigma.reduce((s, v) => s + v * v, 0)
    const kept = sigma.slice(0, k).reduce((s, v) => s + v * v, 0)
    return { approx, relErr: Math.sqrt(Math.max(0, 1 - kept / tot)), energy: kept / tot }
  }, [n, k, sigma, U, Vt])

  const flat = X.flat()
  const lo = Math.min(...flat),
    hi = Math.max(...flat)
  const shade = (v: number) => {
    const t = Math.max(0, Math.min(1, (v - lo) / (hi - lo)))
    const g = Math.round(t * 255)
    return `rgb(${g}, ${g}, ${g})`
  }

  const grid = (M: number[][], title: string) => (
    <div className="lr-block">
      <span className="mmul-name">{title}</span>
      <div
        className="lr-grid"
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
        aria-hidden="true"
      >
        {M.flat().map((v, i) => (
          <span key={i} className="lr-cell" style={{ background: shade(v) }} />
        ))}
      </div>
    </div>
  )

  const full = n * n
  const stored = k * (2 * n + 1)

  return (
    <div className="lr">
      <div className="lr-stage">
        <div className="lr-row">
          {grid(X, labels.original ?? 'A')}
          {grid(approx, `${labels.approx ?? 'A'}${k}`)}
        </div>
        <div className="ec-bars lr-spectrum">
          {sigma.map((s, i) => (
            <span
              key={i}
              className={`ec-bar ${i < k ? 'is-dct' : 'is-dropped'}`}
              style={{ height: `${Math.max(1.5, (s / sigma[0]) * 100)}%` }}
            />
          ))}
        </div>
      </div>

      <div className="lr-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'The bars are the singular values; the kept ones are highlighted.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">k</span>
          <input
            type="range"
            min={1}
            max={n}
            step={1}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            aria-label="rank"
          />
          <span className="mplay-val">{k}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          {labels.energy ?? 'energía'} {(energy * 100).toFixed(2)} % · {labels.error ?? 'error'}{' '}
          {(relErr * 100).toFixed(2)} %
        </p>
        <p className="mplay-readout">
          {labels.storage ?? 'almacenamiento'} {stored} / {full} ={' '}
          {((stored / full) * 100).toFixed(0)} %
        </p>
        <p className="cs-note">{labels.note ?? 'Rank k costs k(2n+1) numbers instead of n².'}</p>
      </div>
    </div>
  )
}
